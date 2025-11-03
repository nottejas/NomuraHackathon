# waste_classifier.py
"""
Waste Image Classification Model using Transfer Learning
Classifies waste into categories: Plastic, Paper, Metal, Glass, Organic, E-waste
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import json

# Define waste categories
WASTE_CATEGORIES = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-waste']

def create_waste_classifier_model():
    """
    Create a CNN model for waste classification using MobileNetV2 transfer learning
    """
    # Load pre-trained MobileNetV2 (without top layers)
    base_model = MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model layers
    base_model.trainable = False
    
    # Add custom classification layers
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.3)(x)
    predictions = Dense(len(WASTE_CATEGORIES), activation='softmax')(x)
    
    # Create final model
    model = Model(inputs=base_model.input, outputs=predictions)
    
    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_waste_classifier(data_dir='waste_images', epochs=20):
    """
    Train the waste classifier model
    
    Expected directory structure:
    waste_images/
        train/
            Plastic/
            Paper/
            Metal/
            Glass/
            Organic/
            E-waste/
        validation/
            Plastic/
            Paper/
            ...
    """
    # Data augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        zoom_range=0.2,
        shear_range=0.2,
        fill_mode='nearest'
    )
    
    # Only rescaling for validation
    val_datagen = ImageDataGenerator(rescale=1./255)
    
    # Load training data
    train_generator = train_datagen.flow_from_directory(
        f'{data_dir}/train',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        classes=WASTE_CATEGORIES
    )
    
    # Load validation data
    validation_generator = val_datagen.flow_from_directory(
        f'{data_dir}/validation',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        classes=WASTE_CATEGORIES
    )
    
    # Create model
    model = create_waste_classifier_model()
    
    print("Model Architecture:")
    model.summary()
    
    # Callbacks
    callbacks = [
        keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        ),
        keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=1e-7
        ),
        keras.callbacks.ModelCheckpoint(
            'waste_classifier_best.h5',
            monitor='val_accuracy',
            save_best_only=True,
            mode='max'
        )
    ]
    
    # Train model
    history = model.fit(
        train_generator,
        epochs=epochs,
        validation_data=validation_generator,
        callbacks=callbacks
    )
    
    # Save final model
    model.save('waste_classifier_model.h5')
    
    # Save category mapping
    with open('waste_categories.json', 'w') as f:
        json.dump(WASTE_CATEGORIES, f)
    
    print("\n✓ Waste classifier model trained and saved!")
    print(f"Final Training Accuracy: {history.history['accuracy'][-1]:.4f}")
    print(f"Final Validation Accuracy: {history.history['val_accuracy'][-1]:.4f}")
    
    return model, history

def predict_waste_type(model, image_path):
    """
    Predict waste category from image
    """
    # Load and preprocess image
    img = keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    
    # Predict
    predictions = model.predict(img_array)
    predicted_class_idx = np.argmax(predictions[0])
    confidence = predictions[0][predicted_class_idx]
    
    # Load categories
    with open('waste_categories.json', 'r') as f:
        categories = json.load(f)
    
    result = {
        'category': categories[predicted_class_idx],
        'confidence': float(confidence),
        'all_probabilities': {
            categories[i]: float(predictions[0][i]) 
            for i in range(len(categories))
        }
    }
    
    return result

# For demonstration without actual image data
def create_demo_model():
    """
    Create and save a demo model without training
    """
    model = create_waste_classifier_model()
    model.save('waste_classifier_model.h5')
    
    with open('waste_categories.json', 'w') as f:
        json.dump(WASTE_CATEGORIES, f)
    
    print("✓ Demo waste classifier model created!")
    print(f"Categories: {', '.join(WASTE_CATEGORIES)}")

if __name__ == "__main__":
    # Create demo model (since we don't have actual waste image dataset)
    create_demo_model()
    
    # To train with actual data, uncomment:
    # model, history = train_waste_classifier(data_dir='waste_images', epochs=20)

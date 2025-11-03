# 🎓 ECOTRACK - FINAL TEAM WORK DISTRIBUTION
## One ML Model Per Person + Other Responsibilities

---

## 👥 TEAM STRUCTURE

### **TEJAS** - Waste Image Classifier + Backend Auth
### **VAIBHAVI** - CO2 Emission Predictor + Event Management  
### **MANSI** - User Engagement Predictor + Gamification
### **RUKWESH** - Waste Hotspot Detector + Admin Dashboard

---

## 🤖 TEJAS - WASTE IMAGE CLASSIFIER & BACKEND AUTH

### ML Model: Waste Image Classification (CNN)

**Algorithm:** Convolutional Neural Network using MobileNetV2 Transfer Learning

**Purpose:** Auto-classify waste from uploaded images

**Categories:**
1. Plastic
2. Paper
3. Metal
4. Glass
5. Organic
6. E-waste

**Technical Details:**
- Base Model: MobileNetV2 (pre-trained on ImageNet)
- Input: 224x224x3 RGB images
- Architecture: MobileNetV2 → GlobalAveragePooling → Dense(256) → Dropout(0.5) → Dense(128) → Dropout(0.3) → Dense(6, softmax)
- Training: Transfer learning with frozen base layers
- Optimizer: Adam (lr=0.001)
- Loss: Categorical Crossentropy
- Expected Accuracy: 85-90%

**File:** `ml_service/waste_classifier.py`

**API Endpoint:**
```http
POST /api/classify-waste
Content-Type: multipart/form-data

Form data:
  image: <file>

Response:
{
  "category": "Plastic",
  "confidence": 0.87,
  "all_probabilities": {
    "Plastic": 0.87,
    "Paper": 0.05,
    "Metal": 0.03,
    "Glass": 0.02,
    "Organic": 0.02,
    "E-waste": 0.01
  }
}
```

**Use Cases:**
- Auto-categorize waste when users upload photos
- Verify user-submitted waste categories
- Generate waste composition statistics
- Train users on proper waste identification

### Backend: Authentication System

**Files:**
- `backend/routes/auth.js`
- `backend/middleware/auth.js`
- `backend/models/User.js`

**Endpoints:**
```javascript
POST /api/auth/register     // User registration
POST /api/auth/login        // User login
POST /api/auth/admin-login  // Admin authentication
GET  /api/auth/verify       // Verify JWT token
POST /api/auth/logout       // Logout
POST /api/auth/forgot-password  // Password reset
```

**Technologies:**
- JWT (JSON Web Tokens)
- bcrypt for password hashing
- Express middleware
- MongoDB for user storage

**Security Features:**
- Password hashing (bcrypt, 10 rounds)
- JWT token expiration (24h)
- Role-based access control (User/Admin/Sponsor)
- Protected route middleware
- Token refresh mechanism

### Presentation Topics for Tejas:

**ML Model:**
1. What is Transfer Learning and why use it?
2. MobileNetV2 architecture overview
3. Why CNN for image classification?
4. Data augmentation techniques
5. Model training process
6. How to handle overfitting (Dropout, Early Stopping)
7. Real-world accuracy vs training accuracy

**Backend Auth:**
1. JWT vs Session-based auth
2. Password hashing with bcrypt
3. Middleware pattern in Express
4. Role-based access control
5. Security best practices
6. API protection strategies

**Demo Script:**
```bash
# 1. Show model architecture
python waste_classifier.py

# 2. Test image classification
# Upload image via API or demo function

# 3. Show authentication flow
# Register → Login → Get Token → Access Protected Route

# 4. Demonstrate token verification
# Show valid token vs expired token
```

---

## 💻 VAIBHAVI - CO2 EMISSION PREDICTOR & EVENT MANAGEMENT

### ML Model: CO2 Emission Impact Prediction

**Algorithm:** Random Forest Regressor

**Purpose:** Predict environmental impact (CO2 emissions) from waste collected

**Technical Details:**
- Algorithm: Random Forest with 100 estimators
- Input Features: Waste types (Plastic, Metal, Paper, Glass) and quantities
- Output: CO2 equivalent in kg
- Performance: R² = 0.89
- Training Data: Beach cleanup dataset with emission factors
- Cross-validation: 5-fold CV

**File:** `ml_service/train_model.py` (already exists)

**API Endpoint:**
```http
POST /api/predict-emission
Content-Type: application/json

{
  "Plastic": 15,
  "Metal": 5,
  "Paper": 20,
  "Glass": 8
}

Response:
{
  "predicted_emission_CO2e": 45.23,
  "status": "success",
  "message": "This waste will produce approximately 45.23 kg of CO2 equivalent"
}
```

**Use Cases:**
- Calculate environmental impact after cleanup events
- Show users their personal CO2 prevention
- Display on leaderboards (CO2 impact category)
- Generate impact reports for sponsors
- Motivate users with tangible metrics

**Real-World Context:**
- 1 kg CO2e ≈ Driving 4.3 km in a car
- 1 kg CO2e ≈ 0.25 kg of beef production
- Average person: 4 tons CO2/year in India

### Frontend: Event Management System

**Files:**
- `frontend/src/components/EventFeedback.jsx`
- `frontend/src/components/BasicExample.jsx` (Navigation)
- `frontend/src/pages/Home.jsx`

**Features:**

**Event Feedback Component:**
- Event selection dropdown
- Star rating system (1-5 stars)
- Quality scores (organization, equipment, communication, impact)
- Written reviews with photo upload
- Past events history
- Overall rating statistics

**Navigation System:**
- Responsive navbar
- Mobile hamburger menu
- User authentication state
- Dynamic menu items
- Dropdown sections

**Home/Landing Page:**
- Hero section
- Feature highlights
- Statistics display
- Impact metrics
- Event carousel
- Call-to-action buttons

### Backend: Event Management APIs

**File:** `backend/routes/events.js`

**Endpoints:**
```javascript
GET    /api/events                   // List all events
POST   /api/events                   // Create event (admin)
GET    /api/events/:id               // Event details
PUT    /api/events/:id               // Update event
DELETE /api/events/:id               // Delete event
POST   /api/events/:id/register      // Register for event
POST   /api/events/:id/checkin       // Check-in at event
POST   /api/events/:id/feedback      // Submit feedback
POST   /api/events/:id/impact        // Calculate CO2 impact
```

**Event Model:**
```javascript
{
  title, description, location,
  date, duration, maxParticipants,
  registeredUsers, attendedUsers,
  wasteCollected, co2Impact,
  photos, reviews, ratings, status
}
```

### Presentation Topics for Vaibhavi:

**ML Model:**
1. What is Random Forest and why use it?
2. How does regression differ from classification?
3. Feature engineering for waste data
4. Model evaluation metrics (R², RMSE, MAE)
5. Overfitting prevention (max_depth, min_samples)
6. Why ensemble methods work better

**Frontend:**
1. React component architecture
2. State management (useState, useEffect)
3. Responsive design with Tailwind CSS
4. Framer Motion animations
5. User experience design principles
6. Form validation and error handling

**Integration:**
1. How frontend calls CO2 prediction API
2. Displaying impact metrics to users
3. Event workflow (Register → Attend → Feedback)
4. Real-time data updates

**Demo Script:**
```bash
# 1. Show CO2 prediction
POST /api/predict-emission
{
  "Plastic": 20,
  "Paper": 30
}

# 2. Navigate through UI
Home → Events → Event Details

# 3. Register for event

# 4. Submit feedback with CO2 impact shown

# 5. Show impact on leaderboard
```

---

## 🏆 MANSI - USER ENGAGEMENT PREDICTOR & GAMIFICATION

### ML Model: User Engagement Prediction

**Algorithm:** Random Forest Classifier

**Purpose:** Predict likelihood of user participating in upcoming events

**Technical Details:**
- Algorithm: Random Forest Classifier (100 estimators)
- Input Features: 10 user behavior metrics
- Output: Binary classification (Will Participate / Won't Participate) + Probability
- Accuracy: 87.5%
- Cross-validation: 89.1% (±2.8%)
- Feature Importance: Top features are events_attended, points_earned, days_since_last_activity

**Input Features:**
```python
1. age                        # User age
2. points_earned              # Total points
3. events_attended            # Number of events
4. waste_reports              # Reports submitted
5. days_since_last_activity   # Recency
6. badges_earned              # Badge count
7. avg_event_rating           # Average rating given
8. friend_count               # Social connections
9. time_on_platform_mins      # Engagement time
10. login_frequency           # Logins per month
```

**File:** `ml_service/user_engagement_predictor.py`

**API Endpoints:**
```http
POST /api/predict-engagement
{
  "age": 28,
  "points_earned": 150,
  "events_attended": 5,
  "waste_reports": 12,
  "days_since_last_activity": 3,
  "badges_earned": 4,
  "avg_event_rating": 4.5,
  "friend_count": 15,
  "time_on_platform_mins": 120,
  "login_frequency": 20
}

Response:
{
  "will_participate": true,
  "participation_probability": 0.85,
  "confidence": 0.85,
  "recommendation": "High priority for event invitation"
}
```

**Use Cases:**
- Target high-probability users for event invitations
- Identify at-risk users (low engagement probability)
- Personalize notification strategies
- Optimize event timing and capacity planning
- Re-engagement campaigns for inactive users

### Frontend: Gamification & Leaderboard System

**File:** `frontend/src/components/Leaderboard.jsx`

**Features:**

**Multiple Leaderboard Categories:**
- Waste Collected (kg)
- CO2 Impact Prevented
- Events Attended
- Points Earned

**Time Period Filters:**
- Monthly
- Yearly
- All-time

**UI Components:**
- Podium display (Top 3 with animations)
- Full ranking table
- User position highlighting
- Rank change indicators (↑ ↓)
- Progress bars
- Badge showcase

**Gamification Logic:**

**Points System:**
```javascript
Event Participation:     50-100 points
Waste Reporting:         10-25 points
Event Feedback:          5 points
Friend Referral:         20 points
Login Streak (7 days):   50 bonus points
Verified Impact:         1.5x multiplier
```

**Badge System:**
```javascript
🌱 Beginner        - First event attended
🌿 Eco Friend      - 5 events attended
🏆 Champion        - 10 events attended
💚 Eco Warrior     - 50 events attended
🌟 Impact Leader   - Top 10 monthly leaderboard
🔥 Streak Master   - 7 day login streak
👥 Community Hero  - 50+ friend referrals
```

**Level System:**
```javascript
Level 1: 0-100 points      (Beginner)
Level 2: 101-250 points    (Active)
Level 3: 251-500 points    (Committed)
Level 4: 501-1000 points   (Champion)
Level 5: 1000+ points      (Legend)
```

### Backend: Gamification APIs

**File:** `backend/routes/gamification.js`

**Endpoints:**
```javascript
GET  /api/leaderboard/:category/:period  // Get leaderboard
POST /api/points/award                   // Award points
GET  /api/user/:id/stats                 // User statistics
POST /api/badges/check                   // Check badge eligibility
GET  /api/achievements                   // Get achievements
POST /api/engagement/predict             // Predict user engagement
GET  /api/engagement/at-risk             // Get at-risk users
```

### Presentation Topics for Mansi:

**ML Model:**
1. Classification vs Regression
2. Random Forest for classification
3. Feature importance and interpretation
4. Probability calibration
5. Confusion matrix and accuracy metrics
6. Handling imbalanced classes
7. Real-time prediction integration

**Gamification:**
1. Psychology of gamification
2. Intrinsic vs extrinsic motivation
3. Social comparison theory
4. Point system design principles
5. Badge progression psychology
6. Leaderboard effectiveness research

**Implementation:**
1. Point calculation algorithm
2. Badge trigger conditions
3. Leaderboard ranking algorithm
4. Real-time updates strategy
5. Data caching for performance

**Demo Script:**
```bash
# 1. Show engagement prediction
# Active user → 96% probability
# Inactive user → 5% probability

# 2. Navigate to leaderboard
# Switch categories (Waste, CO2, Events)
# Change time periods

# 3. Show user profile
# Points, badges, level

# 4. Demonstrate point earning
# Complete action → Points awarded → Rank updated

# 5. Show at-risk users for admin
```

---

## 🔐 RUKWESH - WASTE HOTSPOT DETECTOR & ADMIN DASHBOARD

### ML Model: Waste Hotspot Detection

**Algorithm:** K-Means Clustering

**Purpose:** Identify geographic areas with high waste accumulation for targeted cleanup

**Technical Details:**
- Algorithm: K-Means Clustering with optimal cluster selection
- Input Features: latitude, longitude, waste_amount_kg, severity, recency_weight
- Optimal Clusters: Determined by silhouette score (2-10 clusters tested)
- Silhouette Score: 0.70 (good cluster separation)
- Priority Calculation: num_reports × avg_severity × total_waste / 100

**Input Features:**
```python
latitude             # GPS latitude
longitude            # GPS longitude
waste_amount_kg      # Waste quantity
severity            # User-rated severity (1-5)
recency_weight      # Time decay factor (recent = higher weight)
```

**File:** `ml_service/waste_hotspot_detector.py`

**API Endpoints:**
```http
POST /api/detect-hotspots
{
  "reports": [
    {
      "latitude": 19.0760,
      "longitude": 72.8777,
      "waste_amount_kg": 50,
      "severity": 4,
      "report_date": "2024-11-03"
    }
  ]
}

Response:
{
  "predictions": [
    {
      "report_index": 0,
      "cluster_id": 2,
      "priority": "High",
      "hotspot_location": {
        "latitude": 19.0765,
        "longitude": 72.8780
      },
      "cluster_info": {
        "num_reports": 45,
        "total_waste_kg": 2250.5,
        "avg_severity": 3.8
      }
    }
  ]
}

GET /api/hotspots/top-priority?top_n=5
```

**Use Cases:**
- Plan cleanup event locations
- Resource allocation optimization
- Identify waste accumulation patterns
- Track geographic trends over time
- Priority-based municipal response
- Generate heatmaps for reports

**Visualization:**
- Map with cluster markers
- Color-coded priority levels
- Cluster size by waste amount
- Generated: `waste_hotspots_map.png`

### Frontend: Admin Dashboard

**File:** `frontend/src/pages/AdminDashboard.jsx`

**Features:**

**User Management:**
- View all users (table with search/filter)
- User details modal
- Edit user information
- Suspend/activate accounts
- View activity logs
- Export user data

**Content Moderation:**
- Pending waste reports queue
- Verify/reject reports
- Review flagged content
- User review moderation
- Spam detection alerts

**Event Management:**
- Create/edit/delete events
- Approve registrations
- Monitor attendance
- View event analytics
- Generate event reports

**Analytics Dashboard:**
- Total users, events, waste reports
- Growth charts (daily/weekly/monthly)
- Engagement metrics
- Geographic distribution map
- Top contributors
- Impact statistics

**Hotspot Management:**
- View waste hotspot map
- Top priority locations
- Schedule cleanup events at hotspots
- Track hotspot resolution
- Historical trends

### Admin Login System

**File:** `frontend/src/pages/AdminLogin.jsx`

**Features:**
- Separate admin authentication
- Role-based access control
- Session management
- Login attempt tracking
- Secure password policies

### Sponsor Showcase

**File:** `frontend/src/components/SponsorShowcase.jsx`

**Sections:**
1. Our Sponsors (Tier-based display)
2. Partner Organizations
3. Donation Tracking
4. CSR Programs

**Sponsor Tiers:**
- 💎 Platinum ($50,000+)
- 🥇 Gold ($25,000+)
- 🥈 Silver ($10,000+)
- 🥉 Bronze ($5,000+)

### Backend: Admin & Hotspot APIs

**Files:**
- `backend/routes/admin.js`
- `backend/routes/sponsors.js`

**Endpoints:**
```javascript
// User Management
GET    /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
POST   /api/admin/users/:id/suspend

// Content Moderation
GET    /api/admin/reports/pending
PUT    /api/admin/reports/:id/verify
DELETE /api/admin/reports/:id/reject

// Analytics
GET    /api/admin/analytics/dashboard
GET    /api/admin/analytics/hotspots  // Integration with ML

// Sponsors
GET    /api/sponsors
POST   /api/sponsors
PUT    /api/sponsors/:id
GET    /api/sponsors/:id/impact
```

### Presentation Topics for Rukwesh:

**ML Model:**
1. What is clustering and when to use it?
2. K-Means algorithm explanation
3. How to determine optimal clusters (Elbow method, Silhouette)
4. Geographic data handling
5. Priority scoring algorithm
6. Real-time vs batch clustering

**Admin Features:**
1. Admin authentication and security
2. Role-based access control
3. Content moderation workflows
4. Analytics dashboard design
5. System configuration management

**Hotspot Integration:**
1. How ML predictions help admin decisions
2. Visualizing geographic data
3. Priority-based resource allocation
4. Event planning using hotspot data

**Demo Script:**
```bash
# 1. Show hotspot detection
# Upload multiple waste reports
# Show clustering results
# Display priority hotspots

# 2. Admin login

# 3. View hotspot map in dashboard

# 4. Top priority locations

# 5. Schedule event at hotspot location

# 6. Show sponsor management

# 7. View analytics
```

---

## 📊 QUICK REFERENCE TABLE

| Team Member | ML Model | Algorithm | Other Responsibilities |
|-------------|----------|-----------|------------------------|
| **Tejas** | Waste Image Classifier | CNN (MobileNetV2) | Backend Authentication |
| **Vaibhavi** | CO2 Emission Predictor | Random Forest Regressor | Event Management Frontend |
| **Mansi** | User Engagement Predictor | Random Forest Classifier | Gamification & Leaderboards |
| **Rukwesh** | Waste Hotspot Detector | K-Means Clustering | Admin Dashboard & Sponsors |

---

## 🎯 PRESENTATION ORDER & TIMING

**Total Time: 40 minutes**

### 1. Introduction (2 min) - Any team member
- Project overview
- Problem statement
- Solution approach

### 2. Vaibhavi (10 min)
- CO2 Emission Predictor model
- Event management system
- Frontend UI/UX
- Demo: Event flow + CO2 calculation

### 3. Mansi (10 min)
- User Engagement Predictor model
- Gamification system
- Leaderboard mechanics
- Demo: Predict engagement + Show leaderboard

### 4. Tejas (10 min)
- Waste Image Classifier model
- Transfer learning concept
- Backend authentication
- Demo: Image classification + Auth flow

### 5. Rukwesh (10 min)
- Waste Hotspot Detector model
- Admin dashboard features
- Sponsor management
- Demo: Hotspot detection + Admin panel

### 6. Q&A (5 min) - All team members

---

## 📁 FILE LOCATIONS QUICK ACCESS

### Tejas:
- `ml_service/waste_classifier.py`
- `backend/routes/auth.js`
- `backend/middleware/auth.js`

### Vaibhavi:
- `ml_service/train_model.py`
- `frontend/src/components/EventFeedback.jsx`
- `frontend/src/pages/Home.jsx`
- `backend/routes/events.js`

### Mansi:
- `ml_service/user_engagement_predictor.py`
- `frontend/src/components/Leaderboard.jsx`
- `backend/routes/gamification.js`

### Rukwesh:
- `ml_service/waste_hotspot_detector.py`
- `frontend/src/pages/AdminDashboard.jsx`
- `frontend/src/pages/AdminLogin.jsx`
- `frontend/src/components/SponsorShowcase.jsx`
- `backend/routes/admin.js`

---

## 🚀 TESTING YOUR MODEL

### Tejas:
```bash
cd ml_service
python waste_classifier.py
# Test image classification
```

### Vaibhavi:
```bash
cd ml_service
python train_model.py
python test_models_demo.py  # See CO2 prediction
```

### Mansi:
```bash
cd ml_service
python user_engagement_predictor.py
# Test with sample users
```

### Rukwesh:
```bash
cd ml_service
python waste_hotspot_detector.py
# View waste_hotspots_map.png
```

---

## ✅ FINAL CHECKLIST

### Tejas:
- [ ] Understand CNN and Transfer Learning
- [ ] Explain MobileNetV2 architecture
- [ ] Demo image classification
- [ ] Explain JWT authentication
- [ ] Show API protection

### Vaibhavi:
- [ ] Understand Random Forest Regression
- [ ] Explain R² and model evaluation
- [ ] Demo event management flow
- [ ] Show CO2 impact calculation
- [ ] Present UI/UX design

### Mansi:
- [ ] Understand Random Forest Classification
- [ ] Explain feature importance
- [ ] Demo engagement prediction
- [ ] Show gamification mechanics
- [ ] Present leaderboard system

### Rukwesh:
- [ ] Understand K-Means Clustering
- [ ] Explain Silhouette score
- [ ] Demo hotspot detection
- [ ] Show admin dashboard
- [ ] Present sponsor management

---

## 💡 KEY POINTS FOR EACH PERSON

**Tejas:** Deep Learning + Security → Most technical ML model + Backend security
**Vaibhavi:** Impact Metrics + UX → Environmental impact + User experience
**Mansi:** Behavior Prediction + Motivation → User psychology + Engagement
**Rukwesh:** Location Intelligence + Management → Geographic analysis + System admin

---

**Everyone gets equal ML complexity and complementary non-ML work! 🎉**

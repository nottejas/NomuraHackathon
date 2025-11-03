# 🎓 ECOTRACK PROJECT - TEAM WORK DISTRIBUTION

## Team Members
- **Tejas** - ML & Backend Core Services
- **Vaibhavi** - Frontend UI & Event Management  
- **Mansi** - Gamification & Leaderboards
- **Rukwesh** - Admin Dashboard & Sponsor Management

---

## 🤖 TEJAS - ML SPECIALIST & BACKEND CORE

### 📊 Machine Learning Models (4 Models Implemented)

#### 1. CO2 Emission Impact Predictor
- **Algorithm:** Random Forest Regressor
- **Purpose:** Predicts CO2 emissions from waste collected
- **Input:** Waste types (Plastic, Metal, Paper, Glass) and quantities
- **Output:** CO2 equivalent in kg
- **Performance:** R² = 0.89
- **File:** `ml_service/train_model.py`

#### 2. Waste Image Classifier
- **Algorithm:** CNN using MobileNetV2 Transfer Learning
- **Purpose:** Auto-classify waste from photos
- **Categories:** Plastic, Paper, Metal, Glass, Organic, E-waste
- **Architecture:** MobileNetV2 base + Custom layers
- **Input:** 224x224 RGB images
- **Output:** Category + confidence scores
- **File:** `ml_service/waste_classifier.py`

#### 3. User Engagement Predictor
- **Algorithm:** Random Forest Classifier
- **Purpose:** Predict user participation in events
- **Features:** 10 features (points, events attended, activity recency, etc.)
- **Output:** Participation probability + recommendation
- **Accuracy:** 87.5%
- **Cross-validation:** 89.1% (±2.8%)
- **File:** `ml_service/user_engagement_predictor.py`

#### 4. Waste Hotspot Detector
- **Algorithm:** K-Means Clustering
- **Purpose:** Identify high-priority cleanup areas
- **Features:** GPS coordinates, waste amount, severity, recency
- **Output:** Cluster assignments, priority levels, recommendations
- **Quality:** Silhouette score = 0.70
- **File:** `ml_service/waste_hotspot_detector.py`

### 🔧 Backend Core Services

#### Authentication System
**Files:**
- `backend/routes/auth.js`
- `backend/middleware/auth.js`

**Endpoints:**
```javascript
POST /api/auth/register  // User registration
POST /api/auth/login     // User login with JWT
POST /api/auth/admin-login  // Admin authentication
```

**Technologies:**
- JWT (JSON Web Tokens) for session management
- bcrypt for password hashing
- Express middleware for route protection

#### Waste Reporting Backend
**Files:**
- `backend/routes/reports.js`
- `backend/models/Report.js`

**Endpoints:**
```javascript
POST /api/reports        // Submit waste report
GET /api/reports         // Get all reports
PUT /api/reports/:id/status  // Update report status
POST /api/reports/:id/verify  // Admin verification
```

**Features:**
- Geolocation data processing
- Image upload handling
- Status management (Reported → In Progress → Resolved)
- Admin verification workflow

#### ML API Service
**File:** `ml_service/ml_api.py`

**Endpoints:**
```python
POST /api/predict-emission          # CO2 prediction
POST /api/classify-waste            # Image classification
POST /api/predict-engagement        # Single user engagement
POST /api/predict-engagement-batch  # Batch predictions
POST /api/detect-hotspots           # Hotspot detection
GET  /api/hotspots/top-priority     # Top cleanup priorities
GET  /api/health                    # Service health check
GET  /api/models/info               # Models information
```

### 📚 What to Explain in Presentation

**Theory:**
1. Why Random Forest for regression/classification?
2. Transfer Learning concept in CNN
3. K-Means clustering algorithm
4. Feature engineering and importance
5. Model evaluation metrics

**Implementation:**
1. Model training pipeline
2. Hyperparameter tuning approach
3. Feature scaling and preprocessing
4. API design (RESTful principles)
5. Model serialization (joblib, TensorFlow)

**Integration:**
1. How frontend calls ML API
2. How backend uses ML predictions
3. Real-time vs batch processing
4. Error handling and fallbacks

**Demo Script:**
```bash
# 1. Show trained models
cd ml_service
ls *.pkl *.h5 *.json

# 2. Test models
python test_models_demo.py

# 3. Start ML API
python ml_api.py

# 4. Test API (Postman)
POST http://localhost:5001/api/predict-emission
{
  "Plastic": 15,
  "Metal": 5,
  "Paper": 20
}

# 5. Check health
GET http://localhost:5001/api/health
```

---

## 💻 VAIBHAVI - FRONTEND UI & EVENT MANAGEMENT

### 🎨 Frontend Components

#### Navigation System
**File:** `frontend/src/components/BasicExample.jsx`

**Features:**
- Responsive navigation bar
- Dynamic menu items
- User authentication state display
- Mobile hamburger menu
- Dropdown menus for sections

**Technologies:**
- React Bootstrap NavBar
- React Router for navigation
- Conditional rendering based on auth state

#### Home/Landing Page
**File:** `frontend/src/pages/Home.jsx`

**Sections:**
- Hero section with call-to-action
- Features showcase
- Statistics display
- Impact metrics
- Event highlights
- Sponsor logos

**Styling:**
- Tailwind CSS for responsive design
- Framer Motion for animations
- Gradient backgrounds
- Glass morphism effects

#### Event Feedback System
**File:** `frontend/src/components/EventFeedback.jsx`

**Features:**
- Event rating system (1-5 stars)
- Quality scores (organization, equipment, communication, impact)
- Written reviews with photos
- Past events list
- Filtering and sorting
- Issue reporting

**Components:**
- Event selection dropdown
- Star rating widget
- Photo upload
- Review submission form
- Reviews display with pagination

### ⚙️ Event Management Backend

**File:** `backend/routes/events.js`

**Endpoints:**
```javascript
GET    /api/events            // List all events
POST   /api/events            // Create event (admin)
GET    /api/events/:id        // Get event details
PUT    /api/events/:id        // Update event (admin)
DELETE /api/events/:id        // Delete event (admin)
POST   /api/events/:id/register  // Register for event
POST   /api/events/:id/checkin   // Check-in at event
POST   /api/events/:id/feedback  // Submit feedback
```

**Event Model:** `backend/models/Event.js`
```javascript
{
  title, description, location,
  date, duration, maxParticipants,
  registeredUsers, attendedUsers,
  wasteCollected, co2Impact,
  photos, reviews, status
}
```

### 📚 What to Explain in Presentation

**UI/UX Design:**
1. User-centered design principles
2. Responsive layout strategy
3. Accessibility considerations
4. Color scheme and branding
5. Animation and micro-interactions

**React Concepts:**
1. Component architecture
2. State management (useState, useEffect)
3. Props and data flow
4. Conditional rendering
5. Event handling

**Event System:**
1. Event lifecycle (Create → Register → Attend → Feedback)
2. Real-time updates
3. Participant tracking
4. Impact calculation
5. Review aggregation

**Demo Flow:**
```
1. Show home page → Navigate to Events
2. Browse available events → Filter/Sort
3. Register for an event
4. View event details
5. Submit event feedback/review
6. Show review aggregation
```

---

## 🏆 MANSI - GAMIFICATION & LEADERBOARDS

### 🎮 Leaderboard System

**File:** `frontend/src/components/Leaderboard.jsx`

**Features:**
- Multiple leaderboard categories:
  - Waste Collected (kg)
  - CO2 Impact Prevented
  - Events Attended
  - Points Earned
- Time period filters:
  - Monthly
  - Yearly  
  - All-time
- Podium display (Top 3)
- Full rankings with pagination
- User position highlighting
- Rank change indicators (↑↓)
- City/Region filtering

**UI Components:**
- Category selection tabs
- Time period buttons
- Podium cards with animations
- Ranking table
- User stats card
- Progress bars

### 🎯 Gamification Logic

**Points System:**
```javascript
Event Participation:    50-100 points
Waste Reporting:        10-25 points
Event Feedback:         5 points
Friend Referral:        20 points
Verified Impact:        Bonus multiplier (1.5x)
```

**Badge System:**
```javascript
Badges:
- 🌱 Beginner (First event)
- 🌿 Eco Friend (5 events)
- 🏆 Champion (10 events)
- 💚 Eco Warrior (50 events)
- 🌟 Impact Leader (Top 10 monthly)
- 🔥 Streak Master (7 day streak)
```

**Levels:**
```javascript
Level 1: 0-100 points
Level 2: 101-250 points
Level 3: 251-500 points
Level 4: 501-1000 points
Level 5: 1000+ points
```

### 🔧 Gamification Backend

**File:** `backend/routes/gamification.js`

**Endpoints:**
```javascript
GET  /api/leaderboard/:category/:period  // Get leaderboard
POST /api/points/award                   // Award points
GET  /api/user/:id/stats                 // User statistics
POST /api/badges/check                   // Check badge eligibility
GET  /api/achievements                   // Get achievements list
```

**Database Updates:**
```javascript
User Model additions:
- points: Number
- level: Number
- badges: [String]
- eventsAttended: Number
- wasteReported: Number
- co2Prevented: Number
- rank: Number
- rankChange: Number
```

### 📊 Leaderboard Calculation Algorithm

```javascript
// Pseudo-code
function calculateLeaderboard(category, period) {
  // 1. Filter users by time period
  users = getActiveUsers(period);
  
  // 2. Calculate category score
  users.forEach(user => {
    switch(category) {
      case 'waste':
        user.score = user.totalWasteCollected;
      case 'co2':
        user.score = user.totalCO2Prevented;
      case 'events':
        user.score = user.eventsAttended;
    }
  });
  
  // 3. Sort by score (descending)
  users.sort((a, b) => b.score - a.score);
  
  // 4. Assign ranks
  users.forEach((user, index) => {
    user.rank = index + 1;
    user.rankChange = user.previousRank - user.rank;
  });
  
  return users;
}
```

### 📚 What to Explain in Presentation

**Gamification Theory:**
1. Why gamification works for behavior change
2. Intrinsic vs extrinsic motivation
3. Social comparison theory
4. Achievement psychology
5. Progress feedback loops

**Implementation:**
1. Point calculation logic
2. Badge trigger conditions
3. Leaderboard ranking algorithm
4. Real-time updates
5. Data caching strategy

**User Engagement:**
1. How points motivate action
2. Badge progression path
3. Competitive vs cooperative elements
4. Retention strategies
5. Reward psychology

**Demo Flow:**
```
1. Show leaderboard → Switch categories
2. Filter by time period
3. Highlight user position
4. Show badges earned
5. Display point history
6. Demonstrate rank changes
```

---

## 🔐 RUKWESH - ADMIN DASHBOARD & SPONSOR MANAGEMENT

### 🎛️ Admin Dashboard

**File:** `frontend/src/pages/AdminDashboard.jsx`

**Features:**

**User Management:**
- View all users
- Search and filter
- Edit user details
- Deactivate accounts
- View user activity logs
- Manage permissions

**Content Moderation:**
- Review waste reports
- Verify/reject reports
- Moderate user reviews
- Handle flagged content
- Spam detection

**Event Management:**
- Create/Edit/Delete events
- Approve event registrations
- Monitor attendance
- View event analytics
- Export event data

**Analytics Dashboard:**
- Total users, events, reports
- Growth charts
- Engagement metrics
- Impact statistics
- Geographic distribution

**System Settings:**
- Platform configuration
- Point system adjustments
- Badge management
- Notification settings

### 🔑 Admin Login System

**File:** `frontend/src/pages/AdminLogin.jsx`

**Features:**
- Separate admin authentication
- Two-factor authentication (optional)
- Session management
- Role-based access control
- Audit logging

**Security:**
- Admin-only JWT tokens
- IP whitelisting (optional)
- Login attempt tracking
- Session timeout
- Password policies

### 🤝 Sponsor Showcase

**File:** `frontend/src/components/SponsorShowcase.jsx`

**Features:**

**Sponsor Tiers:**
- 💎 Platinum ($50,000+)
- 🥇 Gold ($25,000+)
- 🥈 Silver ($10,000+)
- 🥉 Bronze ($5,000+)

**Sections:**
1. **Our Sponsors**
   - Sponsor cards with logos
   - Contribution amounts
   - Events sponsored
   - Website links

2. **Partner Organizations**
   - NGO partners
   - Government partners
   - Community groups
   - Impact metrics

3. **Donation Tracking**
   - Monthly donations graph
   - Total raised
   - Corporate vs individual
   - Donor count

4. **CSR Programs**
   - Active CSR initiatives
   - Company programs
   - Impact reports
   - Investment amounts

### 🔧 Admin & Sponsor Backend

**File:** `backend/routes/admin.js`

**Endpoints:**
```javascript
// User Management
GET    /api/admin/users              // List all users
PUT    /api/admin/users/:id          // Update user
DELETE /api/admin/users/:id          // Delete user
POST   /api/admin/users/:id/suspend  // Suspend user

// Content Moderation
GET    /api/admin/reports/pending    // Pending reports
PUT    /api/admin/reports/:id/verify // Verify report
DELETE /api/admin/reports/:id/reject // Reject report

// Analytics
GET    /api/admin/analytics/dashboard  // Dashboard stats
GET    /api/admin/analytics/users      // User analytics
GET    /api/admin/analytics/events     // Event analytics

// System Config
GET    /api/admin/config               // Get config
PUT    /api/admin/config               // Update config
```

**File:** `backend/routes/sponsors.js`

**Endpoints:**
```javascript
GET    /api/sponsors              // List sponsors
POST   /api/sponsors              // Add sponsor (admin)
PUT    /api/sponsors/:id          // Update sponsor
DELETE /api/sponsors/:id          // Remove sponsor
GET    /api/sponsors/:id/impact   // Sponsor impact report
POST   /api/donations             // Record donation
GET    /api/donations/stats       // Donation statistics
```

### 📊 Database Models

**Sponsor Model:** `backend/models/Sponsor.js`
```javascript
{
  name, tier, logo, website,
  contribution, eventsSponsored,
  description, contactInfo,
  isActive, joinedDate
}
```

**Admin Model:** `backend/models/Admin.js`
```javascript
{
  username, email, password,
  role, permissions,
  lastLogin, loginAttempts,
  isActive
}
```

### 📚 What to Explain in Presentation

**Admin Features:**
1. User management workflow
2. Content moderation process
3. Analytics dashboard insights
4. System configuration options
5. Security measures

**Sponsor Management:**
1. Tier system rationale
2. Impact measurement
3. Transparency features
4. CSR integration benefits
5. Donation tracking

**Security:**
1. Role-based access control
2. Authentication flow
3. Audit logging
4. Data protection
5. Admin privileges

**Demo Flow:**
```
1. Admin login
2. View dashboard analytics
3. Manage users (search, edit)
4. Moderate waste reports
5. View/create sponsors
6. Check donation stats
7. Configure system settings
```

---

## 🗂️ SHARED COMPONENTS & UNDERSTANDING

### All Team Members Should Know:

**1. Overall Architecture:**
```
Frontend (React) ←→ Backend (Node.js/Express) ←→ Database (MongoDB)
                        ↓
                   ML Service (Flask/Python)
```

**2. Technology Stack:**
- Frontend: React, Tailwind CSS, Framer Motion, React Router
- Backend: Node.js, Express, MongoDB, JWT, bcrypt
- ML: Python, scikit-learn, TensorFlow, Flask
- Tools: Git, Postman, VS Code

**3. API Communication:**
- RESTful API design
- JSON data format
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 400, 401, 404, 500)
- Authentication headers (Bearer tokens)

**4. Database Schema:**
- Users collection
- Events collection
- Reports collection
- Sponsors collection
- Reviews collection

**5. Deployment (Future):**
- Frontend: Vercel/Netlify
- Backend: Heroku/Railway
- Database: MongoDB Atlas
- ML Service: Docker container

---

## 📋 FINAL CHECKLIST

### Tejas ✓
- [x] 4 ML models trained and working
- [x] ML API service created
- [x] Backend authentication implemented
- [x] Waste reporting backend ready
- [x] Documentation complete

### Vaibhavi ✓
- [x] Navigation component
- [x] Home page
- [x] Event feedback system
- [x] Event management backend
- [x] UI responsive design

### Mansi ✓
- [x] Leaderboard component
- [x] Gamification logic
- [x] Points calculation
- [x] Badge system
- [x] Analytics integration

### Rukwesh ✓
- [x] Admin dashboard
- [x] Admin login
- [x] Sponsor showcase
- [x] Content moderation
- [x] System analytics

---

## 🎯 PRESENTATION TIPS

**Each Person Should:**
1. Start with "My responsibility was..."
2. Explain technical choices
3. Show live demo
4. Discuss challenges faced
5. Mention future improvements
6. Connect to other team members' work

**Time Allocation:**
- Introduction: 2 min
- Each member: 8-10 min
- Demo: 5 min
- Q&A: 5 min

**Demo Order:**
1. Vaibhavi shows UI/UX flow
2. Mansi shows gamification
3. Rukwesh shows admin features
4. Tejas shows ML models and backend

---

**Good Luck Team! 🚀**

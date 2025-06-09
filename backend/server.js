const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chatRoute = require('./routes/chat');
const eventRoutes = require('./routes/event');
const aiModelRoutes = require('./routes/aiRoute'); // <-- your AI route

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoute);
app.use('/api/events', eventRoutes);
app.use('/api/aimodel', aiModelRoutes); // <-- use your aiRoute here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

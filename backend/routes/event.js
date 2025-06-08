const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// 🟢 Admin creates an event
router.post('/create', async (req, res) => {
  try {
    const { title, description, location, date, time } = req.body;
    const newEvent = new Event({ title, description, location, date, time });
    await newEvent.save();
    res.status(201).json({ msg: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating event', error: err.message });
  }
});

// 🟢 Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching events', error: err.message });
  }
});

// 🟢 User enrolls in an event
router.post('/enroll/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { username } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.volunteers.includes(username)) {
      return res.status(400).json({ msg: 'Already enrolled' });
    }

    event.volunteers.push(username);
    await event.save();

    res.status(200).json({ msg: 'Enrollment successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Error enrolling', error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const userMsg = req.body.message?.toLowerCase();
  let response = "I'm not sure about that.";

  if (userMsg.includes('beach cleaning') || userMsg.includes('motive')) {
    response = 'Beach cleaning helps keep marine life safe.';
  } else if (userMsg.includes('register')) {
    response = 'You can register on our app to join the event!';
  } else if (userMsg.includes('time') || userMsg.includes('when')) {
    response = 'Our next beach clean-up is this Sunday at 7 AM.';
  }

  res.json({ reply: response });
});

module.exports = router;

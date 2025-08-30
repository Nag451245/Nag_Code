const express = require('express');
const app = express();
app.use(express.json());

let chittis = [];
let nextId = 1;

// Login stub: returns OTP
app.post('/login', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'phone required' });
  }
  // In a real app, OTP would be sent via SMS using Firebase
  const otp = '123456';
  res.json({ otp });
});

// Verify stub: checks OTP
app.post('/verify', (req, res) => {
  const { phone, otp } = req.body;
  if (otp === '123456') {
    return res.json({ token: 'mock-token' });
  }
  res.status(400).json({ error: 'invalid OTP' });
});

// List all chittis
app.get('/chittis', (req, res) => {
  res.json(chittis);
});

// Create a chitti
app.post('/chittis', (req, res) => {
  const { name, amount, duration, members } = req.body;
  if (!name || !amount || !duration || !members) {
    return res.status(400).json({ error: 'missing fields' });
  }
  const chitti = { id: nextId++, name, amount, duration, members };
  chittis.push(chitti);
  res.status(201).json(chitti);
});

// Get chitti by id
app.get('/chittis/:id', (req, res) => {
  const chitti = chittis.find((c) => c.id === Number(req.params.id));
  if (!chitti) {
    return res.status(404).json({ error: 'not found' });
  }
  res.json(chitti);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let data = {};

app.post('/data', (req, res) => {
  const { id, bpm } = req.body;
  
  // Check if required fields are present
  if (!id || bpm === undefined) {
    return res.status(400).json({ message: 'Invalid input. Please provide id and bpm.' });
  }

  // Get the current time in UTC and convert to IST (India Standard Time)
  const timestamp = moment().tz("Asia/Kolkata").format('DD-MM-YYYY HH:mm:ss');

  // Initialize the data for this id if it doesn't exist
  if (!data[id]) {
    data[id] = [];
  }

  // Store the received data with the correct timestamp
  data[id].push({ id, timestamp, bpm });

  return res.status(201).json({ message: 'Data added successfully.', d: { id, timestamp, bpm } });
});

app.get('/data', (req, res) => {
  return res.status(200).json(data);
});

app.get('/data/:id', (req, res) => {
  const { id } = req.params;

  if (!data[id]) {
    return res.status(404).json({ message: 'Data not found.' });
  }

  return res.status(200).json(data[id]); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

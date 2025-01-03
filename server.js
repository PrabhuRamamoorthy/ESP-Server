const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let data = {};

// POST route to receive the data
app.post('/data', (req, res) => {
  const { id, bpm } = req.body;

  // Validate incoming data
  if (!id || bpm === undefined) {
    return res.status(400).json({ message: 'Invalid input. Please provide id and bpm.' });
  }

  // Get the current timestamp when the data is received
  const receivedTimestamp = new Date().toISOString();  // Current time in ISO format

  // Initialize data object for the sensor if it doesn't exist
  if (!data[id]) {
    data[id] = [];
  }

  // Add the data entry including the received timestamp
  data[id].push({
    id,
    bpm,            // Beats Per Minute
    receivedAt: receivedTimestamp  // Timestamp when the data was received by the server
  });

  // Send response to client
  return res.status(201).json({
    message: 'Data added successfully.',
    data: {
      id,
      bpm,
      receivedAt: receivedTimestamp
    }
  });
});

// Route to get all the data
app.get('/data', (req, res) => {
  return res.status(200).json(data);
});

// Route to get data by sensor id
app.get('/data/:id', (req, res) => {
  const { id } = req.params;

  if (!data[id]) {
    return res.status(404).json({ message: 'Data not found.' });
  }

  return res.status(200).json(data[id]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

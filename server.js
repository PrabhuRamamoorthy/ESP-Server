const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; 

app.use(bodyParser.json());

let data = {};

app.post('/data', (req, res) => {
    const { id, timestamp, value } = req.body;

    if (!id || !timestamp || value === undefined) {
        return res.status(400).json({ message: 'Invalid input. Please provide id, timestamp, and value.' });
    }

    if (!data[id]) {
        data[id] = []; 
    }

    data[id].push({ id, timestamp, value });
    return res.status(201).json({ message: 'Data added successfully.', d: { id, timestamp, value } });
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
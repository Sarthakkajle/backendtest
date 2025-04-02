const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3090;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html directly at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission
app.post('/save-data', (req, res) => {
    const name = req.body.name;
    const data = `Name: ${name}\nSubmitted on: ${new Date().toLocaleString()}\n\n`;

    fs.appendFile('form-data.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

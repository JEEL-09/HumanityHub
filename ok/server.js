const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML file
app.get('/', (req, res,next) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle the POST request
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    console.log(req.body);

    // You can process the data here as needed

    // Send a response back to the client
    res.send(`Received jijij data:\nName: ${name}\nEmail: ${email}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

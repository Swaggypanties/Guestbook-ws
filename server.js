const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the guestbook page
app.get('/guestbook', (req, res) => {
    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading messages.");

        const messages = JSON.parse(data);
        res.render('guestbook', { messages }); // Renders 'guestbook.ejs' with messages
    });
});

// Route for the new message form
app.get('/newmessage', (req, res) => {
    res.sendFile(path.join(__dirname,'public','newmesg.html'));
});

// Handles the new message form
app.post('/newmessage', (req, res) => {
    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date()
    };
    // Read existing messages from the file
    fs.readFile('guestbookdata.json', 'utf8', (err, data) => {
        const messages = err ? [] : JSON.parse(data);
        messages.push(newMessage);
    // Write the updated messages back to the file
        fs.writeFile('guestbookdata.json', JSON.stringify(messages), (err) => {
            if (err) return res.status(500).send("Error saving message.");
            res.json({ message: "Message saved successfully!" }); // Redirect to the guestbook page
        });
    });
});

// Route for the Ajax message form
app.get('/ajaxmessage', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'ajaxmessageform.html'));
});

// Handles the Ajax message submissions
app.post('/ajaxmessage', (req, res) => {
    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date()
    };

    // Read existing messages from the file
    fs.readFile('ajaxmessage.json', 'utf8', (err, data) => {
        const messages = err ? [] : JSON.parse(data);
        messages.push(newMessage);  // Add the new message

        // Write the updated messages back to the file
        fs.writeFile('ajaxmessage.json', JSON.stringify(messages), (err) => {
            if (err) return res.status(500).send("Error saving message.");
            res.json(messages);  // Send updated messages back to the client
        });
    });
});


// Starts the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

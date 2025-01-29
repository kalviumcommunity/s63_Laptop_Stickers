const express = require('express');
const app = express();

app.get('/Ping', (req, res) => {
    res.send('Pong');
    });

app.listen(8000, () => {
    console.log('Server is running on port 8000');
    });
    // kalvium
// kalvium1
// kalvium2
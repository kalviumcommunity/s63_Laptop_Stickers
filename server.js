const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.send('pong');
    });

app.listen(8000, () => {
    console.log('Server is running on port 8000');
    });
const express = require('express');
const db = require('./db/conn');
const app = express();
const port = process.env.PORT || 3000;


// AS I WANT TO REGISTER A NEW STUDENT, I WILL USE POST METHOD

// Create a new student
app.post('/students', (req, res) => {
    res.send('THIS A STUDENT POST REQUEST');
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});
const express = require('express');
const connectDB = require('./config/server')

const app = express();
connectDB();

const PORT = 5000;

app.listen(5000,()=> {
    console.log(`Server running on port ${PORT}`)
});

app.get('/', (req, res)=> {
    res.status(200).send('Hello World');
});
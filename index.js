// Express imports
const express = require('express');
const server = express();
const bodyparser = require('body-parser');

// Database imports
const mongoose = require('mongoose');

const DATABASE_NAME = 'letzgo_database';
const CONNECTION_STRING = 'mongodb+srv://sam:A7wf1XbQpxoCyZI3@letzgo-cluster-fspr1.mongodb.net/' + DATABASE_NAME +'?retryWrites=true';

// Connect to the mongo database
mongoose.connect(CONNECTION_STRING,
    {useNewUrlParser: true});

// Print a message informing that the connection to the database has been made
mongoose.connection
    .once('open', () => {
        console.log('DATABASE CONNECTED')
    });

// Load the body-parser to read the request body
server.use(bodyparser.json());

server.get('/api', (req, res) => {
    res.json("Welcome to the V1 LetzGo api")
});

server.listen(3000, () => {
    console.log("server works");
});
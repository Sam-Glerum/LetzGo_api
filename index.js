// Load environment variables
require('dotenv').load();
// Express imports
const express = require('express');
const server = express();
const bodyparser = require('body-parser');
let PORT = process.env.PORT || 3000;

// Database imports
const mongoose = require('mongoose');

const DATABASE_NAME = process.env.dbName;
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const CONNECTION_STRING = 'mongodb+srv://'+ dbUser + ':' + dbPassword + '@letzgo-cluster-fspr1.mongodb.net/' + DATABASE_NAME +'?retryWrites=true';

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

// //CORS headers
// server.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'https://letzgo.herokuapp.com/' || 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     if (req.method === 'OPTIONS') {
//         res.status(200);
//         res.end();
//     } else {
//         next();
//     }
//     //next();
// });
var cors = require('cors')
server.use(cors())

/*
Load routes
*/
// Load Authentication routes
server.use('/api', require('./routes/authentication_routes_v1'));
// Load artist routes
server.use('/api/artists', require('./routes/artist_routes_v1'));
// Load concert routes
server.use('/api/concerts', require('./routes/concert_routes_v1'));
// Load ticket routes
server.use('/api/tickets', require('./routes/ticket_routes_v1'));

server.get('/api', (req, res) => {
    res.json("Welcome to the V1 LetzGo api")
});

server.listen(PORT, () => {
    console.log("server works");
});

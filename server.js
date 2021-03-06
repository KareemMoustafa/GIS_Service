const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// create express app
const app = express();

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const config = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true,
    authSource: 'admin'
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Geo application"});
});

require('./app/routes/geo.js')(app);

// listen for requests
app.listen(config.port, () => {
    console.log("Server is listening on port 3000");
});
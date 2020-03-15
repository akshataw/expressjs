const express = require("express");
const dbConfig = require('./config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
   res.json("Express Application!");
});

app.get("/url", (req, res, next) => {
   res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

require('./route.js')(app);

app.listen(4000, () => {
 console.log("Server running on port 4000");
});
require('express-async-errors');
const error = require('./middlewares/error');
const app = require('express')();

require('./middlewares')(app);
require('./middlewares/routes')(app);
app.use(error);

{/* Newly added starts*/}
const express = require("express");


const cors = require("cors");

app.use(express.json({limit: '50mb'}));
var corsOptions = {
  origin: "http://localhost:8081"
};
 
app.use(cors(corsOptions));
 
// parse requests of content-type - application/json
app.use(express.json());
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to esparkinfo application." });
});
const db = require("./models");
db.sequelize.sync();

{/* Newly added ends*/}

module.exports = app;

// OAuth - Open Authorization
// passport.js
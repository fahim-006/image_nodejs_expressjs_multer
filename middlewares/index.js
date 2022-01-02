const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    const bodyParser = require("body-parser");
    app.use(bodyParser.json({
      limit: '1000000mb'
    }));
    
    app.use(bodyParser.urlencoded({
      limit: '1000000mb',
      parameterLimit: 100000000,
      extended: true 
    }));
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
}
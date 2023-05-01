require('dotenv').config();
var express = require('express');
var app = express();
var {getHerokuApps, cache_herokuapp} = require('./src/server-controllers/herokuapp');
var async = require('async');
var request = require('request');
const path = require('path');
let PORT = process.env.PORT || 5000;

app.get('/', async(req,res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})
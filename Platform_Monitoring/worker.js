const cron = require('node-cron');
const request = require('request');
var express = require('express');
var http = require('http');
var app = express();
var plat = require('./platformmon');

require('dotenv').config();

if(process.env.ENABLE_CRON_JOBS === 'true') {

    cron.schedule('0 0 */4 * * *', async() => {
        console.log('Working every 4 hour');
        plat.platform();
    });

    cron.schedule('0 */10 * * * *', async () => {
        console.log('Working every 10 minute');
        plat.incident_platform();
    })
}
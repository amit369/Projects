require('dotenv').config();
var http = require('http');
var express = require('express');
var app = express();
var worker  = require('./worker');

var globalTunnel = require('global-tunnel-ng');

globalTunnel.initialize({
    host : 'proxy.gtm.lilly.com',
    port : 9000,
    proxyAuth : 'userid : pwd',
    sockets : 50
})
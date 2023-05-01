require("dotenv").config();
var express = require('express');
var app =express();
const path = require("path");
const hbs = require("hbs");

const forceSSL = require("express-force-ssl");
const authorize = require("./middleware/authorisation");
const { fetchDetails } = require("./server-controller/jenkins");

var { category } = require('./constants');

if(process.env.FORCE_SSL === "true") {
    app.set("forceSSLOptions" , { 
        trustXFPHeader : true,
        sslRequireMessage : "SSL Required"
    });
    app.use(forceSSL);
}

const auth = require("cirrus-oidc-auth-module");
auth.authenticate(app);

app.use(authorize);

const publicPath = path.join(__dirname , "/views/public");

app.use(express.static(publicPath));
const viewPath = path.join(__dirname, "/views");

app.get("/" , (req,res) => {
     res.render("home", { access : req.access});
});

app.get("/pods" , (req,res) => {
    let token = req.session.passport.user.access_token;
    fetchDetails(req, res, token, category.pod);
});

app.get("/statefulset", (req , res) => {
    let token = req.session.passport.user.access_token;
    fetchDetails(req, res, token, category.statefulset);
})
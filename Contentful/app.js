require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const auth = require('cirrus-auth-module');
const {getUserData , cache } = require('./src/server-controllers/contentful');

auth.authenticate(app);

app.get('/spaces', async ( req, res) => {
    const contentfulUserData = await cache('contentful:userdata', getUserData);
    res.json(contentfulUserData);
})

app.use(express.static(path.join(__dirname, 'views/public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

let port = process.env.PORT || 5000;

let server = app.listen(port, function() {
    console.log("server is running");
});
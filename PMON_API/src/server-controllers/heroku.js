require('dotenv').config();
var request = require('request');

const getData = async() => {
    return new Promise((resolve , reject) => {
        var options = {
            'method' : 'GET',
            'url' : 'https://api.heroku.com/',
            'headers' : {
                'Authorization' : `${process.env.HEROKU_TOKEN}`,
                'Accept' : 'application/vnd.heroku+json; version=3',
                'Content-Type' : 'application/json'
            },
        };

        request(options, function(request, response) {
            if(error)
            reject(error);
            if(response.body)
            resolve(response.body);
        })
    })
}

module.exports = {getData};
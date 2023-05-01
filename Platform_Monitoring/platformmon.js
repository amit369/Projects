var http = rquire('http');
var await = require('asyncawait/await');
const nodemailer = require('nodemailer');
let Parser = require('rss-parser');
const request = require('request');
const cheerio = require('cheerio');
let parser =new Parser();
const mailer = require('sendgrid').mail;
require('dotenv').config();
var phantom = require('phantom');
const express = require('express');

let returnobj = {};
let incidentcount = {};
incidentcount.contentfulsendmailstatus = true;
incidentcount.githubsendmailstatus = true;
incidentcount.artifactorysendmailstatus = true;
incidentcount.slacksendmailstatus = true;

incidentcount.salesforce_eu8sendmailstatus = true;
incidentcount.herokusendmailstatus = true;
incidentcount.saucelabssendmailstatus = true;

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const platform = () => {
    return new Promise ( (resolve, reject) => {
        (async () => {
            returnobj.contentful = await parser.parseURL(process.env.CONTENTFUL_URL).catch((err) => {
                console.log(err);
            })
            returnobj.github = await parser.parseURL(process.env.GITHUB_URL).catch((err) => {
                console.log(err);
            })
    
            let slackOverAllStatus = await slakCrawledData().catch((err) => {
                console.log(err);
            })

        
        })
    })
}

const SendEmailonIncident = function(object, platform, incident_link, currentstatus) {
    return new Promise ((resolve, reject) => {
        toEmail = new mailer.Email(process.env.CIRRUS_EMAIL_GROUP);
        const bodyContent = new mailer.Content('text/html' , `<body> <p> Hi Team, <br/> </t> There is an incident on ${platform} platform related to ${currentstatus} </p>`);
        subject = `Alert! ${platform} platform is faccing issue`;
        fromEmail = new mailer.Mail(fromEmail, subject,toEmail,bodyContent);
        const mailRequest = sg.emptyRequest({
            method : 'POST',
            path : '/v3/mail/send',
            body : mail.toJSON(),
        });
       sg.API(mailRequest , (err,response) => {
           if(err) {
               console.log('Error');
               reject(true);
           }
           else {
               console.log(respons.statusCode);
               resolve(true);
           }
       })


    })
}
const cron = require('node-cron');
var {getData} = require('./src/server-controllers/heroku');
var {getSpaces} = require('./src/server-controllers/contentful');
var {sync} = require('./src/server-controllers/github');
var {getHerokuApps, setKey} = require('./src/server-controllers/herokuapp');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

if(process.env.ENABLE_CRON_JOBS === 'true') {

    cron.schedule('*/25 * * * *', async() => {
        const fresh = await getData();
        setKey('heroku:pmondata', fresh).then(() => {
            console.log( () => {
                console.log("Heroku fresh user data cached successfully");
            })
        })
    })
}
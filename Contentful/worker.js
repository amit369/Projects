const cron = require('node-cron');
const {getUserData , setKey} = require('./src/server-controllers/contentful');

if(process.env.ENABLE_CRON_JOBS === 'true') {
    cron.schedule('01 09 * * *' , async () => {
        const fresh = await getUserData();
        setKey('contentful:userdata', fresh).then(() => {
            console.log('User data cached')
        })
    })
}
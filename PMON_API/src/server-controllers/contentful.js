require('dotenv').config();
const contentful = require('contentful-management');

const contentClient = contentful.createClient({
    accessToken : process.env.ACCESS_TOKEN,
    ratelimit : 3,
    maxRetries : 3
})

const getSpaces = async () => {
    try {
        let spaceInfo = await contentClient.getSpaces({
            skip : 0,
            limit : 1 
        }).catch((err) => {
            throw new Error(err);
        })
        spacecount = spaceInfo.total;
        return spacecount;
    }catch(err) {
        return new Error(err);
    }
}

module.exports = { getSpaces};
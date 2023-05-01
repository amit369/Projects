require('dotenv').config();
const contentful = require('contentful-management');
const HttpsProxyAgent = require('https-proxy-agent');
const rp = require('request-promise');
const Promise = require('bluebird');
const redis = require('redis');
const _ = require('underscore');
const client = redis.createClient(process.env.REDIS_URL);

const cfClient = contentful.createClient({
    accessToken : process.env.ACCESS_TOKEN,
    ratelimit : 3,
    maxRetries :3
});

const getSpaces = async () => {
    return new Promise ( (resolve, rejct) => {
        cfClient.getSpaces({
            skip : 0,
            limit : 1
        }).then((spaceInfo) => {
            let skipArr = [];
            for(let i=0; i < spaceInfo.total; i = i+100) {
                console.log(i);
                skipArr.push(i);
            }
            let dataArr = [];
            skipArr.filter((skip) => dataArr.push(getAllSpaces(skip)));
            Promise.all(dataArr).then((spacesArray) => {
                resolve(spacesArray);
            }).catch((error) => {
                reject(error);
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
const setKey = (key,val) => new Promise((res,rej) => {
    let ins = val;
    if(!Array.isArray(val)) ins = Object.assign({key}, val);
    const stringified = JSON.stringify(ins);
    client.set(key, stringified, (err, reply) => {
        if(err) rej(err);
        res(reply);
    });
});

const getByKey = key => new Promise ((res, rej) =>  {
    client.get(key, (err, reply) => {
        if(err) rej(err);
        !reply ? res({ found : false , data : ''}) : 
        res({ found : true , data : JSON.parse(reply.toString())});
    });
});

const cache = (key, callback) => new Promise(async res => {
   const {data, found } = await getByKey(key);
   if(found) {
       res(data);
   }
   else {
       const fresh = await callback();
       res(fresh);
       setKey(key , fresh).then(() => {
           console.log('Fresh user data cached successfully');
       })
   }
});

module.exports = { getUserData , setKey , cache};
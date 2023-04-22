require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));

const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (message, toPhoneNumber) => {
    await redisClient.connect();

    const redisKey = JSON.stringify(toPhoneNumber);
    const redisValue = JSON.stringify(message);

    const retrievedKey = await redisClient.get(redisKey)
    if ((retrievedKey !== null && retrievedKey === redisValue)) {
        await redisClient.quit()
        return
    }


    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_NUMBER,
            to: toPhoneNumber
        })
        .then(async message => {
            console.log(`Message sent: ${message.sid}`);
            await redisClient.set(redisKey, redisValue);
            await redisClient.expire(redisKey, 60 * 15);
            await redisClient.quit();
        }
        )
        .catch(error => { console.log(`Error sending message: ${error.message}`); redisClient.quit() }
        );
};

sendMessage("hi", "+15107661520")
require('dotenv').config();
const redis = require('redis');
const lib = require("./speechToText");

const redisClient = redis.createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));

const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

const express = require('express');
const { sentiment } = require('sentiment.js');

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const audioRecognition = new SpeechRecognition();
audioRecognition.continuous = true;
audioRecognition.lang = "en-US";
audioRecognition.interimResults = true;
audioRecognition.maxAlternatives = 1;
audioRecognition.onstart = function() {
    // console.log("Microphone recording started");
}

audioRecognition.onresult = function(event) {
    var script = event.results[event.resultIndex][0].transcript;
    // console.log(script);
    document.getElementById("transcript").innerHTML = script;
}

audioRecognition.onend = function()
{
    audioRecognition.abort();
    // console.log("Microphone recording ended");
    audioRecognition.start();
}

module.exports = {
    setupAudio,
    audioRecognition
}

const app = express();
app.use(express.json());

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



// Endpoint to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await sentiment(res.query.speech);
    if(data['body']['classifications'][0]['prediction'] == 'Crime'){
        res.send("Threat Detected");
    } else {
        res.send("No Threat Detected");
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});
// sendMessage("hi", "+15107661520")
// setupAudio();
// audioRecognition.start();

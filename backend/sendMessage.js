require('dotenv').config();

const accountSid = process.env.TWILIO_ACCT_SID; // Your Twilio account SID

const authToken = process.env.TWILIO_AUTH; // Your Twilio auth token
const client = require('twilio')(accountSid, authToken);

const sendMessage = (message, toPhoneNumber) => {
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_NUMBER, // Your Twilio phone number
      to: toPhoneNumber // The phone number you want to send the message to
    })
    .then(message => console.log(`Message sent: ${message.sid}`))
    .catch(error => console.log(`Error sending message: ${error.message}`));
};

// Usage example:
sendMessage('Hello, this is another test message!', '+15107661520'); // Replace with your desired message and phone number

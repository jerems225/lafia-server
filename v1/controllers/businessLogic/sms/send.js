require('dotenv').config();
const { VONAGE_APIKEY, VONAGE_SECRET } = process.env;
const { Vonage } = require('@vonage/server-sdk');

async function sendSms(to, content) {
    const vonage = new Vonage({
        apiKey: VONAGE_APIKEY,
        apiSecret: VONAGE_SECRET
    });

    const from = "2250701959933"

    vonage.messages.send({ to, from, content })
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });

}

module.exports = sendSms;
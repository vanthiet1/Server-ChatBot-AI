const axios = require('axios');

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCSESS_TOKEN = process.env.PAGE_ACCSESS_TOKEN;
console.log(VERIFY_TOKEN, PAGE_ACCSESS_TOKEN);
const webhookContrller = {
    verifyWebhook: (req, res) => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('Webhook verified');
                res.status(200).send(challenge);
            } else {
                res.status(403).send('Forbidden');
            }
        }
    },
    receiveMessage: (req, res) => {
        const data = req.body;
        if (data.object === 'page') {
            data.entry.forEach(entry => {
                const messaging = entry.messaging[0];
                const senderId = messaging.sender.id;
                const message = messaging.message.text;
                console.log(`Received message: ${message}`);
                sendMessage(senderId, 'Cảm ơn bạn đã liên hệ, tôi sẽ giúp bạn ngay!');
            });
        }
        res.status(200).send('EVENT_RECEIVED');
    },
    sendMessage: (recipientId, message) => {
        console.log(recipientId, message);
        axios.post(`https://graph.facebook.com/v22.0/me/messages?access_token=${PAGE_ACCSESS_TOKEN}`, {
            recipient: { id: recipientId },
            message: { text: message }
        })
            .then(response => {
                console.log('Message sent:', response.data);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
}
module.exports = webhookContrller;
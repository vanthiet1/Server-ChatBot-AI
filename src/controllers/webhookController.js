const axios = require('axios');
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCSESS_TOKEN = process.env.PAGE_ACCSESS_TOKEN;
const webhookContrller = {
    // Xác minh webhook khi cấu hình trên Facebook Developer
    verifyWebhook: (req, res) => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('Webhook verified');
                return res.status(200).send(challenge);
            } else {
                return res.status(403).send('Forbidden');
            }
        }
    },

    // Nhận tin nhắn từ người dùng gửi đến page
    receiveMessage: (req, res) => {
        const data = req.body;
          console.log('data',data);
        if (data.object === 'page') {
            data.entry.forEach(entry => {
                const messaging = entry.messaging[0];
                const senderId = messaging.sender.id;

                if (messaging.message && messaging.message.text) {
                    const message = messaging.message.text;
                    console.log(`Received message from ${senderId}: ${message}`);
                    webhookContrller.sendMessage(senderId, 'Cảm ơn bạn đã liên hệ, tôi sẽ giúp bạn ngay!');
                }
            });
        }

        return res.status(200).send('EVENT_RECEIVED');
    },

    // Gửi tin nhắn từ page cho người dùng
    sendMessage: (recipientId, message) => {
        axios.post(`https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCSESS_TOKEN}`, {
            recipient: { id: recipientId },
            message: { text: message }
        })
            .then(response => {
                console.log('Message sent:', response.data);
            })
            .catch(error => {
                console.error('Error sending message:', error?.response?.data || error.message);
            });
    }
}
module.exports = webhookContrller;

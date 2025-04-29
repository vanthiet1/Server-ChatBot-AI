const VERIFY_TOKEN = process.env.VERIFY_TOKEN; 
const sendMessage = require('./messageController');
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
    receiveMessage:(req,res)=>{
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
    }
}
module.exports = webhookContrller;
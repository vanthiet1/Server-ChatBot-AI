const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

const app = express();
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN; 
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Hello World!');
})
app.get('/webhook', (req, res) => {
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
});

app.post('/webhook', (req, res) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      const messaging = entry.messaging[0];
      const senderId = messaging.sender.id;
      const message = messaging.message.text;

      console.log(`Received message: ${message}`);

      // Gửi phản hồi tự động
      sendMessage(senderId, 'Cảm ơn bạn đã liên hệ, tôi sẽ giúp bạn ngay!');
    });
  }

  res.status(200).send('EVENT_RECEIVED');
});

const sendMessage = (recipientId, message) => {
  axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
    recipient: { id: recipientId },
    message: { text: message }
  })
  .then(response => {
    console.log('Message sent:', response.data);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

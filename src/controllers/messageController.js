const axios = require('axios');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
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
  module.exports = sendMessage;
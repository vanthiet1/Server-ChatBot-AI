const Router = require('express').Rourer()
const webhookController = require('../controllers/webhookController')
Router.get('/webhook',webhookController.verifyWebhook)
Router.post('/webhook',webhookController.receiveMessage)
module.exports = Router
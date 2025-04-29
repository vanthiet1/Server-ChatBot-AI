const Router = require('express').Router()
const webhookController = require('../controllers/webhookController')
Router.get('/',webhookController.verifyWebhook)
Router.post('/',webhookController.receiveMessage)
module.exports = Router
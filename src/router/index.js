const express = require("express");
const router = express.Router();
const WebhookRoutes = require("./webhook");
router.use("/webhook", WebhookRoutes);
module.exports = router
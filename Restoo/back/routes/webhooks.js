const express = require('express');
const { postWebhook, sse } = require('../controllers/webhook');

const router = express.Router();

router.post('/', postWebhook);
router.get('/sse', sse);

module.exports = router;

const template = require("../controllers/template")
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/',auth, template.createTemplate);
router.post('/sendtempl',auth, template.sendTemplate);
module.exports = router;

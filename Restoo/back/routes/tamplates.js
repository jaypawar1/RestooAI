const createTemplate = require("../controllers/template")
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/',auth, createTemplate);

module.exports = router;

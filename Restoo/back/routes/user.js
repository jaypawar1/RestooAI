const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/',auth, user.getUser);


module.exports = router;
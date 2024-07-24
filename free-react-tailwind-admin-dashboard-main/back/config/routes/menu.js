const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');

router.post('/',auth, menuController.createMenu);
router.get('/',auth, menuController.getMenu);
router.put('/',auth, menuController.updateMenu);
router.get('/:resto', menuController.getMenuID);

module.exports = router;
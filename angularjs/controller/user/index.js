var express = require('express');
var router = express.Router();
var CONFIG = require('../../config/config.json')
var controller = require('./controller');

router.post(CONFIG.routes.user, controller.createUser);

module.exports = router;
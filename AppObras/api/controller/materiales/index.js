var express = require('express');
var router = express.Router();
var controller = require('./insumos.controller');

router.get('/', controller.verTodos);

module.exports = router;
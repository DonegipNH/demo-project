var express = require('express');
var router = express.Router();

var controller = require('../control/chanel.control');

router.get('/', controller.index);
router.get('/update', controller.update);
router.get('/get', controller.get);

module.exports = router;
var express = require('express');

var router = express.Router();

var controller = require('../control/user.control');
var userValidate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/create', controller.getCreate);
router.get('/search', controller.search);
router.post('/create', userValidate.postCreate, controller.postCreate);
// router.get('/:id', controller.getId);

module.exports = router;
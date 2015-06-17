'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
// router.put('/:id', auth.isAuthenticated(), controller.update);
// router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
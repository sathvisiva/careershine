'use strict';

var express = require('express');
var controller = require('./colleges.controller');

var router = express.Router();

router.param('id', controller.colleges);

//router.get('/', controller.index);
router.get('/', controller.query);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
router.delete('/:id', controller.remove);

module.exports = router;

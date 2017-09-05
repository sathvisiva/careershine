'use strict';

var express = require('express');
var controller = require('./programs.controller');

var router = express.Router();

/*router.param('id', controller.programs);*/

//router.get('/', controller.index);
router.get('/:slug', controller.show);
router.get('/', controller.query);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);
router.delete('/:id', controller.remove);

module.exports = router;

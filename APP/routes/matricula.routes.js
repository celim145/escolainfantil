const express = require('express');
const router = express.Router();
const matriculaController = require('../APP/controllers/matricula.controller');

router.get('/', matriculaController.getAll);
router.get('/:id', matriculaController.getById);
router.post('/', matriculaController.create);
router.put('/:id', matriculaController.update);
router.delete('/:id', matriculaController.delete);

module.exports = router;
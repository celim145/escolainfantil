const express = require('express');
const router = express.Router();
const frequenciaController = require('../APP/controllers/frequencia.controller');

router.get('/', frequenciaController.getAll);
router.get('/:id', frequenciaController.getById);
router.post('/', frequenciaController.create);
router.put('/:id', frequenciaController.update);
router.delete('/:id', frequenciaController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const disciplinaController = require('../APP/controllers/disciplina.controller');

router.get('/', disciplinaController.getAll);
router.get('/:id', disciplinaController.getById);
router.post('/', disciplinaController.create);
router.put('/:id', disciplinaController.update);
router.delete('/:id', disciplinaController.delete);

module.exports = router;
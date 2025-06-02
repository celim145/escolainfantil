const express = require('express');
const router = express.Router();
const alunoController = require('../APP/controllers/aluno.controller');

router.get('/', alunoController.getAll);
router.get('/:id', alunoController.getById);
router.post('/', alunoController.create);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.delete);

module.exports = router;
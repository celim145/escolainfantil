const express = require('express');
const router = express.Router();
const turmaController = require('../APP/controllers/turma.controller');

router.get('/', turmaController.getAll);
router.get('/:id', turmaController.getById);
router.post('/', turmaController.create);
router.put('/:id', turmaController.update);
router.delete('/:id', turmaController.delete);

module.exports = router;
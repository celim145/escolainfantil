const express = require('express');
const router = express.Router();
const professorController = require('../APP/controllers/professor.controller');

router.get('/', professorController.getAll);
router.post('/', professorController.create);
router.get('/:id', professorController.getById);
router.put('/:id', professorController.update);
router.delete('/:id', professorController.delete);

module.exports = router;
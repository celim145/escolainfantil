const express = require('express');
const router = express.Router();
const aulaController = require('../APP/controllers/aula.controller');

router.get('/', aulaController.getAll); 
router.get('/:id', aulaController.getById); 
router.post('/', aulaController.create); 
router.put('/:id', aulaController.update);
router.delete('/:id', aulaController.delete); 

module.exports = router;
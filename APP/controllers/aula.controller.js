const Aula = require('../APP/models/aula.model');

exports.getAll = (req, res) => Aula.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Aula.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Aula não encontrada' }) : res.json(results[0]));
exports.create = (req, res) => Aula.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Aula.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Aula atualizada' }));
exports.delete = (req, res) => Aula.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Aula removida' }));
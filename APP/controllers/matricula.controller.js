const Matricula = require('../APP/models/matricula.model');

exports.getAll = (req, res) => Matricula.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Matricula.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Matrícula não encontrada' }) : res.json(results[0]));
exports.create = (req, res) => Matricula.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Matricula.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Matrícula atualizada' }));
exports.delete = (req, res) => Matricula.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Matrícula removida' }));
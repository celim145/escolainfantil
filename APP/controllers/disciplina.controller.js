const Disciplina = require('../APP/models/disciplina.model');

exports.getAll = (req, res) => Disciplina.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Disciplina.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Disciplina não encontrada' }) : res.json(results[0]));
exports.create = (req, res) => Disciplina.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Disciplina.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Disciplina atualizada' }));
exports.delete = (req, res) => Disciplina.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Disciplina removida' }));
const Turma = require('../models/turma.model');

exports.getAll = (req, res) => Turma.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Turma.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Turma não encontrada' }) : res.json(results[0]));
exports.create = (req, res) => Turma.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Turma.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Turma atualizada' }));
exports.delete = (req, res) => Turma.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Turma removida' }));
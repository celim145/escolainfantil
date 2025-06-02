const Frequencia = require('../APP/models/frequencia.model');

exports.getAll = (req, res) => Frequencia.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Frequencia.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Frequência não encontrada' }) : res.json(results[0]));
exports.create = (req, res) => Frequencia.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Frequencia.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Frequência atualizada' }));
exports.delete = (req, res) => Frequencia.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Frequência removida' }));
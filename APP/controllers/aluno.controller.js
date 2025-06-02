const Aluno = require('../models/aluno.model');

exports.getAll = (req, res) => Aluno.getAll((err, results) => err ? res.status(500).json({ error: err }) : res.json(results));
exports.getById = (req, res) => Aluno.getById(req.params.id, (err, results) => err ? res.status(500).json({ error: err }) : results.length === 0 ? res.status(404).json({ message: 'Aluno não encontrado' }) : res.json(results[0]));
exports.create = (req, res) => Aluno.create(req.body, (err, result) => err ? res.status(500).json({ error: err }) : res.status(201).json({ id: result.insertId, ...req.body }));
exports.update = (req, res) => Aluno.update(req.params.id, req.body, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Aluno atualizado' }));
exports.delete = (req, res) => Aluno.delete(req.params.id, (err) => err ? res.status(500).json({ error: err }) : res.json({ message: 'Aluno removido' }));
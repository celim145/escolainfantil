const db = require('../database');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM professor');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM professor WHERE id_professor = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Professor não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nome, especialidade, telefone } = req.body;
        const [result] = await db.query(
            'INSERT INTO professor (nome, especialidade, telefone) VALUES (?, ?, ?)',
            [nome, especialidade, telefone]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { nome, especialidade, telefone } = req.body;
        const [result] = await db.query(
            'UPDATE professor SET nome = ?, especialidade = ?, telefone = ? WHERE id_professor = ?',
            [nome, especialidade, telefone, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Professor não encontrado' });
        res.status(200).json({ message: 'Professor atualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM professor WHERE id_professor = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Professor não encontrado' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
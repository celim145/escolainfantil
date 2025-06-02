const db = require('../config/database');

const Aluno = {
  getAll: (cb) => db.query('SELECT * FROM aluno', cb),
  getById: (id, cb) => db.query('SELECT * FROM aluno WHERE id_aluno = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO aluno SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE aluno SET ? WHERE id_aluno = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM aluno WHERE id_aluno = ?', [id], cb)
};

module.exports = Aluno;
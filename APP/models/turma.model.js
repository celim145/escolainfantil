const db = require('../controllers/database');

const Turma = {
  getAll: (cb) => db.query('SELECT * FROM turma', cb),
  getById: (id, cb) => db.query('SELECT * FROM turma WHERE id_turma = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO turma SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE turma SET ? WHERE id_turma = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM turma WHERE id_turma = ?', [id], cb)
};

module.exports = Turma;
const db = require('../../config/database');
const Professor = {
  getAll: (cb) => db.query('SELECT * FROM professor', cb),
  getById: (id, cb) => db.query('SELECT * FROM professor WHERE id_professor = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO professor SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE professor SET ? WHERE id_professor = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM professor WHERE id_professor = ?', [id], cb),
};

module.exports = Professor;
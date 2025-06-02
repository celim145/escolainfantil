const Disciplina = require('./disciplina.model');

const Disciplina = {
  getAll: (cb) => db.query('SELECT * FROM disciplina', cb),
  getById: (id, cb) => db.query('SELECT * FROM disciplina WHERE id_disciplina = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO disciplina SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE disciplina SET ? WHERE id_disciplina = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM disciplina WHERE id_disciplina = ?', [id], cb)
};

module.exports = Disciplina;
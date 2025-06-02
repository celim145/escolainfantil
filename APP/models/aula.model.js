const db = require('../../config/database');

const Aula = {
  getAll: (cb) => db.query('SELECT * FROM aula', cb),
  getById: (id, cb) => db.query('SELECT * FROM aula WHERE id_aula = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO aula SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE aula SET ? WHERE id_aula = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM aula WHERE id_aula = ?', [id], cb)
};

module.exports = Aula;
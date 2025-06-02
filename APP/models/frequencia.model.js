const db = require('../../config/database');

const Frequencia = {
  getAll: (cb) => db.query('SELECT * FROM frequencia', cb),
  getById: (id, cb) => db.query('SELECT * FROM frequencia WHERE id_frequencia = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO frequencia SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE frequencia SET ? WHERE id_frequencia = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM frequencia WHERE id_frequencia = ?', [id], cb)
};

module.exports = Frequencia;
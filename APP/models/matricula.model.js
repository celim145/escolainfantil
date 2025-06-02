const db =require('../../config/database');

const Matricula = {
  getAll: (cb) => db.query('SELECT * FROM matricula', cb),
  getById: (id, cb) => db.query('SELECT * FROM matricula WHERE id_matricula = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO matricula SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE matricula SET ? WHERE id_matricula = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM matricula WHERE id_matricula = ?', [id], cb)
};

module.exports = Matricula;
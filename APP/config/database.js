const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'usuario',
  password: process.env.DB_PASS || 'senha',
  database: process.env.DB_NAME || 'escolar',
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '271201vi',
  database: 'rh_plataforma'
})

db.connect((err) => {
  if (err) throw err
  console.log('Conectado ao MySQL!')
})

module.exports = db

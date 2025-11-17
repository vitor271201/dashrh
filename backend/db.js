const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'rh_plataforma',
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar PostgreSQL:', err)
    return
  }
  console.log('Conectado ao PostgreSQL!')
})

module.exports = pool

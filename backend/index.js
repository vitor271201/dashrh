const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/users')
const app = express()
const avisosRoutes = require('./routes/avisos')
const metasRoutes = require('./routes/metas')
const calendarioRoutes = require('./routes/calendario')
const eventosRoutes = require('./routes/eventos')
const perfilRoutes = require('./routes/perfil')

app.use(cors())
app.use(express.json())
app.use('/avisos', avisosRoutes)
app.use('/metas', metasRoutes)
app.use('/calendario', calendarioRoutes)
app.use('/eventos', eventosRoutes)
app.use('/perfil', perfilRoutes)
app.use(userRoutes)


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})
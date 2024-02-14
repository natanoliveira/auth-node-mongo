const express = require('express');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ "extended": false }))

// app.listen(3000)
const PORT_SERVER = 3000


// app.get('/', (req, res) => {
//     res.send({ "message": "ok" })
// })

// require('./app/controllers/authController')(app)
// require('./app/controllers/projetcController')(app)
require('./app/controllers/index')(app)

app.listen(PORT_SERVER, () => {
    console.log(`🖥️  Servidor rodando em: http://localhost:${PORT_SERVER} 🚪`)
})

const express = require('express');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ "extended": false }))

// app.listen(3000)
const PORT_SERVER = 3000

// app.use('/', (req, res, next) => {
//     const timeout = 90000; // 90 segundos (ajuste conforme necessário)
//     let isTimeout = false;

//     // Configura um temporizador para acionar um timeout
//     const timeoutId = setTimeout(() => {
//         isTimeout = true;
//         const erro = new Error('Tempo limite de solicitação excedido');
//         erro.status = 504; // Gateway Timeout
//         next(erro);
//     }, timeout);

//     // Chama o próximo middleware (exRouter)
//     next();

//     // Quando a solicitação é concluída (após exRouter), cancela o temporizador se ainda não tiver ocorrido um timeout
//     res.on('finish', () => {
//         if (!isTimeout) {
//             clearTimeout(timeoutId);
//         }
//     });
// });

// require('./app/controllers/authController')(app)
// require('./app/controllers/projetcController')(app)
require('./app/controllers/index')(app)

app.listen(PORT_SERVER, () => {
    console.log(`🖥️  Servidor rodando em: http://localhost:${PORT_SERVER} 🚪`)
    console.log(`❌ Para finalizar o servidor utilize: ctrl/cmd + c 🛫`)
})

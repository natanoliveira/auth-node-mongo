const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization

    // Não enviado
    if (!authHeader) {
        return res.status(401).send({ message: "No token provider" })
    }

    const parts = authHeader.split(' ')

    // Enviado errado/incompleto
    if (!parts.length === 2) {
        return res.status(401).send({ message: "Token error" })
    }

    // Desestruturando o array splitado
    const [scheme, token] = parts

    const regex = !/^Bearer$/i

    // Sem esquema
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: "Token malformated" })
    }

    // Se é válido ou seja, se ele permanece nas configurações
    jwt.verify(token, authConfig.secret, (erro, decoded) => {
        if (erro) {
            return res.status(401).send({ message: "Token invalid" })
        }

        // Atribuindo o userID para permanecer dentro do sistema
        req.userId = decoded.id
        return next()
    })
}
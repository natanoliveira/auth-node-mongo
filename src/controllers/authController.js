const express = require('express')

const User = require('../models/user')

const router = express.Router()

const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {

    let dados = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    // Trabalhando o hash da senha
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(dados.password, salt)

    // req.body.password = hash
    dados.password = hash

    console.log(req.body, dados)

    // Paraverificar se o e-mail ja existe
    const email = dados.email

    try {
        // console.log('findOne');
        // const existe = await User.findOne({ email: email }).exec()
        // console.log('existe', existe);
        // return;

        // if (existe) {
        //     return res.status(400).send({ message: 'E-mail ja existente' })
        // }

        // console.log('existe',existe);

        const user = await User.create(dados)

        // Não retornando a senha
        user.password = undefined

        return res.status(200).send({ user })
    } catch (error) {

        return res.status(400).send({ message: "resgistration failed", error: error })
    }
})

module.exports = app => app.use('/auth', router)
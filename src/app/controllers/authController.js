// Importações
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const hbsTemplate = require('handlebars')

// Configs
const authConfig = require('../../config/auth.json')
const mailerConfig = require('../../config/mail.json')
const mailer = require('../../modules/mailer')

// Modelo
const User = require('../models/user')

const router = express.Router()

router.post('/register', async (req, res) => {

    let dados = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    // Trabalhando o hash da senha
    // var salt = bcrypt.genSaltSync(10)
    // var hash = bcrypt.hashSync(dados.password, salt)

    // // req.body.password = hash
    // dados.password = hash

    // Paraverificar se o e-mail ja existe
    const email = dados.email

    try {

        // console.log('Tentando conectar ao banco de dados...');
        // // Verificando se a conexão com o banco de dados está ativa
        // if (mongoose.connection.readyState !== 1) {
        //     console.log('Conexão com o banco de dados não está ativa');
        //     return res.status(500).send({ message: 'Erro interno do servidor' });
        // }

        const existe = await User.findOne({ email: email })

        if (existe) {
            return res.status(400).send({ message: 'E-mail ja existente' })
        }

        const user = await User.create(dados)

        // Não retornando a senha
        user.password = undefined

        // retorno com o token
        return res.status(200).send({
            user,
            token: generateToken({ id: user.id })
        })

    } catch (error) {

        return res.status(400).send({ message: "resgistration failed", error: error })
    }
})

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body

    // Para trazer o usuário com o item de senha
    const user = await User.findOne({ email: email }).select('+password')

    if (!user) {
        return res.status(400).send({ message: "User not found" })
    }

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) {
        return res.status(400).send({ message: 'Invalid password' })
    }

    user.password = undefined

    // retorno com o token
    res.send({
        user,
        token: generateToken({ id: user.id })
    })

})

router.post('/forgot-password', async (req, res) => {

    const { email } = req.body

    try {

        // req.setTimeout(60000);

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).send({ message: "User not found" })
        }

        // Criando token para recuperar senha
        const token = crypto.randomBytes(20).toString('hex')

        // Criando o temporizador do token para recuperação de senha
        const now = new Date()
        now.setHours(now.getHours() + 1)

        // Atualizando o registro no banco
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        // 2 - Sendgrid
        const dirTemplate = path.resolve('./src/resources/mail/auth/forgot_password.hbs');
        const templateSource = fs.readFileSync(dirTemplate, 'utf8');
        const template = hbsTemplate.compile(templateSource);

        const data = {
            subject: `Redefinição de Senha ${token}`,
            greeting: `Olá! ${user.name}`,
            message: `Você solicitou a redefinição de senha. Siga o link abaixo para redefinir sua senha. Token: ${token}`
        };

        // Compilar o template com os dados
        const html = template(data);

        const mailOptions = {
            from: 'natanoliveirati@gmail.com',
            to: email,
            subject: data.subject,
            html: html
        };

        mailer.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error('Erro ao enviar e-mail:', err);
                res.status(400).send({ message: 'Cannot send forgot password email' });
            }

            res.status(200).send({ message: 'E-mail enviado com sucesso.' });
        });

        // const dadosEnvio = {
        //     subject: 'Redefinição de Senha',
        //     greeting: `Olá! ${user.name}`,
        //     message: `Você solicitou a redefinição de senha. Siga o link abaixo para redefinir sua senha. Token: ${token}`
        // };

        // const options = {
        //     to: email,
        //     from: mailerConfig.from,
        //     subject: dadosEnvio.subject,
        //     template: 'auth/forgot_password',
        //     context: dadosEnvio
        // }

        // console.log(options)

        // mailer.sendMail(options, function (err, info) {
        //     if (err) {
        //         console.error('Erro ao enviar e-mail:', err);
        //         res.status(400).send({ message: 'Cannot send forgot password email' });
        //     }

        //     res.status(200).send({ message: 'E-mail enviado com sucesso.' });

        // });

    } catch (error) {
        console.log(error)
        res.status().send({ message: "Error on forgot password, try again." })
    }
})

router.post('/reset-password', async (req, res) => {
    const { email, token, password } = req.body

    try {
        const user = await User.findOne({ email: email }).select('+passwordResetToken passwordResetExpires')

        if (!user) {
            return res.status(400).send({ message: "User not found" })
        }


        // Verificar o token enviado com o que há para este usuário
        if (token !== user.passwordResetToken) {
            return res.status(400).send({ message: "Token invalid" })
        }

        const now = new Date()

        // Verificando o tempo do token
        if (now > user.passwordResetExpires) {
            return res.status(400).send({ message: "Token expired, generate a new one" })
        }

        // Atualizando para nova senha e no modelo gerar o hash
        user.password = password

        await user.save()

        return res.status(200).send({ user })


    } catch (error) {
        res.status().send({ message: "Cannot reset password" })
    }
})

// Função para ficar gerando token de acesso
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = app => app.use('/auth', router)
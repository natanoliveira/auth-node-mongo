const path = require('path')
const nodemailer = require('nodemailer')

const mailConfig = require('../config/mail.json')

// Dados para hostgator
const transport = nodemailer.createTransport({
    name: mailConfig.user,
    host: mailConfig.host,
    service: mailConfig.host,
    port: mailConfig.port,
    secure: true,
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    }
})

module.exports = transport
const path = require('path')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const hbsTemplate = require('nodemailer-express-handlebars')

const mailConfig = require('../config/mail.json')

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: mailConfig.sendgrid_api_key
    })
);

// Utlizando template
transport.use('compile', hbsTemplate({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}))

module.exports = transport
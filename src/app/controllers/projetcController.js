const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddeware = require('../middlewares/auth')

const authConfig = require('../../config/auth.json')

const router = express.Router()

router.use(authMiddeware)

router.get('/', async (req, res) => {

    res.send({ message: "ok", user: req.userId })
})

module.exports = app => app.use('/projects', router)
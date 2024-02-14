const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Não deu certo usar antes de executar o save
UserSchema.pre('save', async function (next) {

    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(this.password, salt);

    this.password = hash

    next()
})

// console.log(UserSchema);

const User = mongoose.model('User', UserSchema)

module.exports = User
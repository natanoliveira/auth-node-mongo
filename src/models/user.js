const mongoose = require('../database')

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Não deu certo usar antes de executar o save
// UserSchema.pre('save', async function (next) {

//     console.log('1-', this.password)

//     var salt = await bcrypt.genSaltSync(10);
//     var hash = await bcrypt.hashSync(this.password, salt);

//     console.log('2-', hash)

//     this.password = hash

//     console.log('3-', this.password)

//     next()
// })

// console.log(UserSchema);

const User = mongoose.model('User', UserSchema)

module.exports = User
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/config')

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
})


userScheme.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next();
        })
        .catch(err => console.log(err))
})

module.exports = mongoose.model('User', userScheme)
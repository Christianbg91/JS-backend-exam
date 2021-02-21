const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config')

const register = (username, password, amount) => {
    let user = new User({ username, password, amount: Number(amount) });
    return user.save();
};

const login = async (username, password) => {

    let user = await User.findOne({ username })
    if (!user) {
        throw { message: 'No such user', status: 404 };
    }

    let areEqual = await bcrypt.compare(password, user.password);
    
    if (!areEqual) throw {message: 'Invalid password', status: 404};

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);

    return token;

}

const addAmount = (id, amount) => {
    return User.findOneAndUpdate({_id: id}, {$inc: {'amount': amount}})
}

const getUser = (id) => {
    return User.findById(id).lean()
}

module.exports = {
    register,
    login,
    addAmount,
    getUser
}
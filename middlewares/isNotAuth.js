const { SECRET } = require('../config/config')
const jwt = require('jsonwebtoken')
const { COOKIE_NAME } = require('../config/config')

module.exports = function (req, res, next) {
    let token = req.cookies[COOKIE_NAME];
    if (!token){
        next()
    }
    jwt.verify(token, SECRET, function(err, decoded){
        if (err){
            next()
        }
        return res.redirect('/');
    })
}
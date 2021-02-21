const { SECRET } = require('../config/config')
const jwt = require('jsonwebtoken')
const { COOKIE_NAME } = require('../config/config')

module.exports = function (req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (!token){
        return res.status(401).render('index', {message: 'You are not authorized'})
    }
    jwt.verify(token, SECRET, function(err, decoded){
        if (err){
            return res.status(401).redirect('/auth/login');
        }
        next();
    })

}
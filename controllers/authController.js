const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config')
const isNotAuth = require('../middlewares/isNotAuth')


router.get('/register', function (req, res) {
    res.render('register', {});
})


router.post('/register', (req, res, next) => {
    const { username, password, passwordRepeat, amount } = req.body
    let errors = [];
    if (password !== passwordRepeat) {
        errors.push('Passwords must match');
    }
    if (!username.match(/^[A-Za-z0-9]{4,}$/)) {
        errors.push(`Username must be at least 4 characters long and consist only of english letters and digits`)
    }
    if (!password.match(/^[A-Za-z0-9]{4,}$/)) {
        errors.push('Password must be at least 4 characters long and consist only of english letters and digits')
    }
    if (!amount.match(/^\d*[.]{0,1}\d*$/) || (Number(amount) < 0)) {
        errors.push('Amount must be a non-negative number')
    }
    console.log(errors)
    if (errors.length) {
        return res.render('register', { error: errors })
    }

    authService.register(username, password, amount)
        .then((user) => {
            return authService.login(username, password)
        })
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(err => next(err));
})


router.get('/login', (req, res) => {
    res.render('login', {});
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/expenses');
        })
        .catch(error => {
            if (error.status == 404){
                console.log(error)
                return res.render('login', {error: error.message})
            }
            next()
        })
})

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;
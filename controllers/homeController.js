const router = require('express').Router();

router.get('/', function (req, res) {
    if (!req.user){
        return res.render('home');
    }else{
        return res.redirect('/expenses')
    }
});


module.exports = router;
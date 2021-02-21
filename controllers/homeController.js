const router = require('express').Router();

router.get('/', function (req, res) {
    console.log(req.locals)
    res.render('index');
});


module.exports = router;
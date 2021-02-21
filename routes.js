const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController');
const isAuth = require('./middlewares/isAuth')



//Controllers

router.use('/', homeController);
router.use('/auth',  authController);
router.use('/expenses', isAuth, expenseController);



router.use('*', (req, res, next) => res.render('404', {error: `Please check that the link is full`}))
module.exports = router;
const router = require('express').Router();
const expenseService = require('../services/expenseService')
const authService = require('../services/authService')
const { CATEGORIES } = require('../config/config')

router.route('/')
    .get((req, res, next) => {
        expenseService.getAll(req.user._id)
            .then(expenses => {
                let noExpenses = false;
                if (!expenses.length) noExpenses = true;

                res.render('index', { expenses, noExpenses });
            })
            .catch(next)
    })
    .post((req, res, next) => {
        let amount = req.body.amount;
        let errors = []
        if (!amount.match(/^\d*.?\d*$/) || (Number(amount) < 0)) {
            errors.push('Amount must be a non-negative number')
        }
        if (errors.length) {
            return expenseService.getAll(req.user._id)
                .then(expenses => {
                    let noExpenses = false;
                    if (!expenses.length) noExpenses = true;

                    res.render('index', { expenses, noExpenses, error: errors });
                })
                .catch(next)
        }

        authService.addAmount(req.user._id, req.body.amount)
            .then((result) => {
                res.redirect('/expenses')
            })
    })


router.route('/create')
    .get((req, res) => {
        res.render('create');
    })
    .post((req, res) => {
        let { merchant, total, vault, category, description } = req.body
        let report = req.body.report == 'on'
        let errors = [];
        let user = req.user._id;

        if (merchant.length < 4) {
            errors.push('Merchant must contain at least 4 characters')
        }
        if (!total.match(/^\d*.?\d*$/) || (Number(total) < 0)) {
            errors.push('Total must be a non-negative number')
        }
        if (!CATEGORIES.includes(category)) {
            errors.push(`Category is invalid`)
        }
        if (description.length < 3) {
            errors.push('Description must contain at least 3 characters')
        }
        if (description.length > 30) {
            errors.push('Description must contain at most 30 characters')
        }
        if (errors.length) {
            return res.render('create', { error: errors })
        }
        expenseService.create({ merchant, total, vault, category, description, report, user })
            .then((created) => {
                res.redirect('/expenses');
            })

    })


router.get('/:expenseId/report', (req, res, next) => {
    expenseService.getOne(req.params.expenseId, req.user._id)
        .then(expense => {
            if (!expense) {
                return res.render('404', { message: `Expense is not found` })
            }
            res.render('report', { expense })
        })
        .catch(next)
})


router.get('/:expenseId/delete', (req, res, next) => {
    expenseService.getOne(req.params.expenseId, req.user._id)
        .then(expense => {
            if (!expense) {
                return res.render('404', { message: `Expense is not found` })
            }
            return expense
        })
        .then(expense => {
            return expenseService.deleteOne(expense._id)
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(next)
})

router.get('/account', (req, res, next) => {

    Promise.all([
        expenseService.getExpensesSum(req.user._id),
        expenseService.getUniqueMerches(req.user._id),
        authService.getUser(req.user._id)
    ])
        .then((values) => {
            let [total, merchants, user] = values;
            merchants = merchants.length
            amount = user.amount
            res.render('account-info', { total, merchants, amount })
        })
        .catch(next)
})
module.exports = router;
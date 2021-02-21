const Expense = require('../models/Expense')


const create = (data) => {
    let expense = new Expense(data);
    return expense.save();
}

const getAll = (userId) => {
    return Expense.find({user: userId}).lean()
}

const getOne = (expenseId, userId) => {
    return Expense.findOne({_id: expenseId, user: userId}).lean()
}

const deleteOne = (expenseId) => {
    return Expense.findByIdAndDelete(expenseId)
}

const getExpensesSum = (userId) => {
    return Expense.find({user: userId})
        .lean()
        .then((expenses) => {
            let sum = 0;
            expenses.forEach(el => {
                sum += el.total;
            })
            return sum
        })
}

const getUniqueMerches = (userId) => {
    return Expense.find({user: userId}).distinct('merchant')
}

module.exports = {
    create,
    getAll,
    getOne,
    deleteOne,
    getExpensesSum,
    getUniqueMerches
}
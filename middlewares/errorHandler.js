const errorHandler = (err, req, res, next) => {
    console.log(err);
    let status = err.status || 500;
    let message = err.message || 'Something went wrong';
    res.status(status).render('index', {error: message})

    //TODO
}

module.exports = errorHandler;
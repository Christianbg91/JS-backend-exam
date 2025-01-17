const express = require('express');
const config = require('./config/config')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

require('./config/mongoose')


const app = express();

require('./config/express')(app);

app.use(routes);

app.use(errorHandler);

app.listen( config.PORT, () => { console.log(`Server is running on port ${config.PORT}`)});
const ownerRouter = require('./ownerRouter');
const petRouter = require('./petRouter');
const apiRouter = require('express').Router();

apiRouter
    .use('/owners', ownerRouter)
    .use('/pets', petRouter)

module.exports = apiRouter;
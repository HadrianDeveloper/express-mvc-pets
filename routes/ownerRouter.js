const { getOwnerById } = require('../controllers/owners-controller');
const ownerRouter = require('express').Router();

ownerRouter.get('/:id', getOwnerById)

module.exports = ownerRouter;
const { getOwnerById, getAllOwners } = require('../controllers/owners-controller');
const ownerRouter = require('express').Router();

ownerRouter.get('/:id', getOwnerById)
ownerRouter.get('/', getAllOwners)

module.exports = ownerRouter;
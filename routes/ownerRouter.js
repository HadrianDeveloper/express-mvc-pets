const { getOwnerById, getAllOwners } = require('../controllers/owners-controller');
const { getPetsOfOwner } = require('../controllers/pets-controller');
const ownerRouter = require('express').Router();

ownerRouter.get('/:id', getOwnerById)
ownerRouter.get('/', getAllOwners)
ownerRouter.get('/:id/pets', getPetsOfOwner)

module.exports = ownerRouter;
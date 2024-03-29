const { getOwnerById, getAllOwners, patchOwnerById, addNewOwner, removeOwner } = require('../controllers/owners-controller');
const { getPetsOfOwner, addPet } = require('../controllers/pets-controller');
const ownerRouter = require('express').Router();

ownerRouter.get('/:id', getOwnerById)
ownerRouter.get('/', getAllOwners)
ownerRouter.get('/:id/pets', getPetsOfOwner)
ownerRouter.patch('/:id', patchOwnerById)
ownerRouter.post('/', addNewOwner)
ownerRouter.post('/:id/pets', addPet)
ownerRouter.delete('/:id', removeOwner)

module.exports = ownerRouter;
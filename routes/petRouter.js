const { getAllPets, getPetById, removePet} = require('../controllers/pets-controller');
const petRouter = require('express').Router();

petRouter
    .get('/', getAllPets)
    .get('/:id', getPetById)
    .delete('/:id', removePet)

module.exports = petRouter;
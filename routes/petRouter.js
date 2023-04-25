const { getAllPets, getPetById} = require('../controllers/pets-controller');
const petRouter = require('express').Router();

petRouter
    .get('/', getAllPets)
    .get('/:id', getPetById)


module.exports = petRouter;
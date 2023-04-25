const { selectPetsOfOwner, selectAllPets, selectPetById } = require("../models/pets-model");

exports.getAllPets = (req, res) => {
    const q = Object.keys(req.query).length ? req.query : null;

    selectAllPets(q)
        .then((allPets) => res.status(200).send(allPets))
        .catch((err) => console.log({msg: 'Cannot retrieve at this time'}))
};

exports.getPetsOfOwner = (req, res) => {
    selectPetsOfOwner(req.params.id)
        .then((ownersPets) => res.status(200).send(ownersPets))
        .catch((err) => res.status(404).send({msg: 'Cannot find that owner'}))
};

exports.getPetById = (req, res) => {
    selectPetById(req.params.id)
        .then((pet) => res.status(200).send(pet))
        .catch((err) => res.status(404).send({msg: 'Cannot find that pet'}))
}
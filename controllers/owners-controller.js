const { selectOwnerById, selectAllOwners, updateOwnerById, insertNewOwner } = require("../models/owners-model");

exports.getOwnerById = (req, res) => {
    selectOwnerById(req.params.id)
        .then((owner) => res.status(200).send(owner))
        .catch((err) => res.status(404).send({msg: 'Owner does not exist!'}))
};

exports.getAllOwners = (req, res) => {
    selectAllOwners()
        .then((owners) => res.status(200).send(owners))
        .catch((err) => res.status(500).send({msg: 'Cannot retrieve at this time'}))
};

exports.patchOwnerById = (req, res) => {
    const {params, body} = req;
    updateOwnerById(params.id, body)
        .then((updated) => res.status(201).send({Success: updated}))
        .catch((err) => console.log(err))
};

exports.addNewOwner = (req, res) => {
    insertNewOwner(req.body)
        .then((added) => res.status(201).send({Success: added}))
        .catch((err) => console.log(err))
};

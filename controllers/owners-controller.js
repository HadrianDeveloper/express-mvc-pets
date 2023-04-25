const { selectOwnerById } = require("../models/owners-model");

exports.getOwnerById = (req, res) => {
    selectOwnerById(req.params.id)
        .then((owner) => res.status(200).send(owner))
        .catch((err) => res.status(404).send({msg: 'Owner does not exist!'}))
};
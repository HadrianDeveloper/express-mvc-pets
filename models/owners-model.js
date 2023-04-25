const { readFile } = require("fs/promises");

exports.selectOwnerById = (id) => {
    return readFile(`./data/owners/${id}.json`, 'utf8')
        .then((owner) => JSON.parse(owner))
};
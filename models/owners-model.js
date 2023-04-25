const { readFile, readdir } = require("fs/promises");

exports.selectOwnerById = (id) => {
    return readFile(`./data/owners/${id}.json`, 'utf8')
        .then((owner) => JSON.parse(owner))
};

exports.selectAllOwners = () => {
    return readdir('./data/owners')
        .then((fileList) => {
            const allOwners = fileList.map((file) => {
                return readFile(`./data/owners/${file}`, 'utf8')
                    .then((file) => JSON.parse(file))
            })
            return Promise.all(allOwners)
        })
        .then((allOwners) => allOwners)
};
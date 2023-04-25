const { readFile, readdir } = require("fs/promises");

exports.selectOwnerById = (id) => {
    return readFile(`./data/owners/${id}.json`, 'utf8')
        .then((owner) => JSON.parse(owner))
};


//solution 1 - from scratch
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

//Solution 2 - reusing this.selectOwnerById
exports.selectAllOwners2 = () => {
    return readdir('./data/owners')
        .then((filelist) => {
            const allOwners = filelist.map((file) => {
                return this.selectOwnerById(file.slice(0, -5))
            })
            return Promise.all(allOwners)
        })
        .then((allOwners) => allOwners)
};
const { readFile, readdir, writeFile } = require("fs/promises");

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

exports.updateOwnerById = (id, body) => {
    return readFile(`./data/owners/${id}.json`, 'utf8')
        .then((owner) => {
            const parsed = JSON.parse(owner);
            const updated = Object.assign(parsed, body);
            return Promise.all([
                updated,
                writeFile(`./data/owners/${id}.json`, JSON.stringify(updated))
            ])
        })
        .then(([updated, ]) => updated)
};

function idCreator() {
    return readdir('./data/owners')
        .then((fileList) => {
            const orderedList = fileList.reverse();
            let nums = parseInt(orderedList[0].slice(1, -5));
            return `o${++nums}.json`;
        })
};

exports.insertNewOwner = (body) => {
    return idCreator()
        .then((newName) => {
            const newObj = {id: newName.slice(0, -5), ...body}
            return Promise.all([
                newObj,
                writeFile(`./data/owners/${newName}`, JSON.stringify(newObj, null, 2))
            ])
        })
        .then(([newObj, ]) => newObj)
};
const { readFile, readdir, writeFile, rm } = require("fs/promises");
const { idCreator } = require("../utils");
const { selectAllPets } = require("./pets-model");

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

exports.insertNewOwner = (body) => {
    return idCreator('owners')
        .then((newName) => {
            const newObj = {id: newName.slice(0, -5), ...body}
            return Promise.all([
                newObj,
                writeFile(`./data/owners/${newName}`, JSON.stringify(newObj, null, 2))
            ])
        })
        .then(([newObj, ]) => newObj)
};

exports.deleteOwner = (id) => {
    return selectAllPets()
        .then((petList) => {
            const toDelete = petList.filter((pet) => pet.owner === id)
            for (let x = 0; x < toDelete.length; x++) {
                rm(`./data/pets/${toDelete[x].id}.json`)
            }
        })
        .then(() => rm(`./data/owners/${id}.json`)
        .then(() => null)
        )
};
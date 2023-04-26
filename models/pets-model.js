const { readdir, readFile, writeFile } = require("fs/promises");
const { idCreator } = require("../utils");

exports.selectAllPets = (q) => {
    return readdir('./data/pets')
        .then((fileList) => {
            const allPets = fileList.map((fname) => {
                return readFile(`./data/pets/${fname}`, 'utf8')
                    .then((file) => JSON.parse(file))
            })
            return Promise.all(allPets)
        })
        .then((allpets) => {
            return q 
                ? allpets.filter((pet) => pet.temperament === q.temperament)
                : allpets;
        })
};

exports.selectPetsOfOwner = (id) => {
    return readdir(`./data/pets`)
        .then((fileList) => {
            const allpets = fileList.map((fname) => {
                return readFile(`./data/pets/${fname}`, 'utf8')
                    .then((file) => JSON.parse(file))
            })
            return Promise.all(allpets)
        })
        .then((allpets) => {
            return allpets.filter((pet) => pet.owner === id)
        })
};

exports.selectPetById = (id) => {
    return readFile(`./data/pets/${id}.json`, 'utf8')
        .then((pet) => pet)
};

exports.insertPet = (id, body) => {
    return idCreator('pets')
        .then((newFilename) => {
            const newObj = Object.assign({id: newFilename.slice(0, -5)}, body)
            return Promise.all([
                newObj,
                writeFile(`./data/pets/${newFilename}`, JSON.stringify(newObj))
            ]) 
        })
        .then(([newObj, ]) => newObj)
};
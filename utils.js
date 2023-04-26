const {readdir} = require('fs/promises');

exports.idCreator = (folderName) => {
    const prefix = (folderName === 'owners') ? 'o' : 'p';
    return readdir(`./data/${folderName}`)
        .then((fileList) => {

            let numArr = fileList.map((file) => parseInt(file.slice(1, -5)))
            numArr.sort((a, b) => a - b).reverse();
            return `${prefix}${++numArr[0]}.json`;
        })
};
const {readdir} = require('fs/promises');

exports.idCreator = (folderName) => {
    const prefix = (folderName === 'owners') ? 'o' : 'p';
    return readdir(`./data/${folderName}`)
        .then((fileList) => {
            const orderedList = fileList.reverse();
            let nums = parseInt(orderedList[0].slice(1, -5));
            return `${prefix}${++nums}.json`;
        })
};
const fs = require('fs');

module.exports = (path, content) => {
    writeFile(path,content);
}

const writeFile = (filename, content) => {
    fs.writeFile(filename, content, (err) => {
        if (err) throw err;
        console.log(`Le fichier ${filename} a été créé avec succès.`);
    });
};
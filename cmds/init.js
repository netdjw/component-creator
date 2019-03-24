const createDir = require('../helpers/create-dir');
const createFile = require('../helpers/create-file');
const fs = require('fs');

module.exports = () => {
    const folders = [
        'src',
        'src/assets',
        'src/components',
        'src/shared',
    ];
    const files = [
        'src/main.html',
        'src/main.js',
        'src/main.scss',
        'src/_mixins.scss',
        'src/_variables.scss',
        'src/assets/.gitignore',
        'src/components/.gitignore',
        'src/shared/.gitignore',
    ];

    for (let i = 0; i < folders.length; i++) {
        createDir(folders[i]);
    }

    for (let i = 0; i < files.length; i++) {
        createFile(files[i]);
    }

    // link scss files to main.scss
    fs.appendFileSync('src/main.scss', '@import \'variables\';\n@import \'mixins\';\n\n', function(err) {
        if (err) {
            console.log('Error at appending to src/main.scss: ' + err);
        }
    });
}

const fs = require('fs');

const folders = [
    'src',
    'src/shared',
    'src/assets'
];
const files = [
    'src/main.html',
    'src/main.js',
    'src/main.scss',
    'src/_mixins.scss',
    'src/_variables.scss',
    'src/shared/.gitignore',
    'src/assets/.gitignore'
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


function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(dir + ' directory created');
    }
}

function createFile(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log(file + ' created');
        }); 
    }
}
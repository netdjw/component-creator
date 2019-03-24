const fs = require('fs');

/**
 * Create a directory under a given path and name
 * @param {string} directory directory name
 * @example createDir('path/to/my/scripts-folder')
 */
module.exports = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
        console.log(directory + ' directory created');
    } else {
        console.log(directory + ' directory alredy exists');
    }
}

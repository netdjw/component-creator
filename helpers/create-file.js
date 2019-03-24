const fs = require('fs');

/**
 * Create a file under a given path and name
 * @param {string} file file name
 * @example createFile('path/to/my/script.js')
 */
module.exports = (file) => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '', function(err) {
            if (err) {
                console.log(err);
            }

            console.log(file + ' created');
        }); 
    } else {
        console.warn(file + ' alredy exists');
    }
}

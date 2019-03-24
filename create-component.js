let fs = require('fs');
let path = '';

process.argv.forEach(function (val, index, array) {
    if ( index === 2 ) {
        path = val;
    }
});

if (path.length === 0) {
    console.log('Usage:\n\tnode component.js components/path/to/component');
}

let path_items = path.split('/');

// fix user issues
if (path_items[0] !== 'components') {
    path_items.unshift('components');
}

// set component name
let component_name = path_items[ path_items.length -1 ];
console.log('Component name: ' + component_name);

// create component folders
let new_path = '';
for (let i = 0; i < path_items.length; i++) {
    new_path += path_items[i] + '/';
    createDir( new_path );
    if ( new_path !== 'components/' ) {
        createComponentFiles(new_path, path_items[i], path_items[i - 1]);
    }
}

/**
 * Create component files
 * @param {string} path 
 * @param {string} name 
 * @param {string} parent 
 */
function createComponentFiles(path, name, parent) {
    console.log('\nCreating component files:\n' + name + ' (parent: ' + parent + ')');
    createDir( path + 'img' );
    // new_path = path_items.join('/') + '/';
    createFile(path + name + '.html');
    createFile(path + name + '.js');
    createFile(path + '_' + name + '.scss');

    if (parent !== 'components') {
        let parent_path = path.split('/');
        parent_path.pop();
        parent_path.pop();
        path = parent_path.join('/') + '/';

        // link the js file to the parent's js file
        let jsfile = 'src/' + path + parent + '.js';
        fs.appendFileSync(jsfile, 'import '+ name +' from \'' + name + '/' + name + '.js\';\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + jsfile + ': ' + err);
            }
        });

        // link scss file to the parent's scss file
        let scssfile = 'src/' + path + '_' + parent + '.scss';
        fs.appendFileSync(scssfile, '@import \'' + name + '/' + name + '\';\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + scssfile + ': ' + err);
            }
        });

        // link the html file to the parent's html file
        let htmlfile = 'src/' + path + parent + '.html';
        fs.appendFileSync(htmlfile, '<div id="' + name + '">${require(\'' + name + '/' + name + '.html\')}</div>\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + htmlfile + ': ' + err);
            }
        });

    } else {
        // the parent is the 'main' component
        let jsfile = 'src/main.js';
        fs.appendFileSync(jsfile, 'import '+ name +' from \'components/' + name + '.js\';\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + jsfile + ': ' + err);
            }
        });

        let scssfile = 'src/main.scss';
        fs.appendFileSync(scssfile, '@import \'components/' + name + '\';\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + scssfile + ': ' + err);
            }
        });

        let htmlfile = 'src/main.html';
        fs.appendFileSync(htmlfile, '\n<div id="' + name + '">${require(\'components/' + name + '.html\')}</div>\n', function(err) {
            if (err) {
                console.log('Error at appending to ' + htmlfile + ': ' + err);
            }
        });
    }
}

/**
 * Create a directory in the src/ folder.
 * @param {string} dir 
 */
function createDir(dir) {
    if (!fs.existsSync('src/' + dir)) {
        fs.mkdirSync('src/' + dir);
        console.log('src/' + dir + ' directory created');
    }
}

/**
 * Create a file in the src/ folder.
 * @param {string} file 
 */
function createFile(file) {
    file = 'src/' + file;
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log(file + ' created');
        }); 
    }
}

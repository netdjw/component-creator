const createDir = require('../helpers/create-dir')
const createFile = require('../helpers/create-file')
const fs = require('fs')

module.exports = (args) => {
    path = args._[1]

    if (path.length === 0) {
        console.log(`Usage:
        ccreator create <name>
        or
        ccreator create <path/to/name>`)
    }

    let path_items = path.split('/')

    // set component name
    let component_name = path_items[ path_items.length -1 ]
    console.log('Component name: ' + component_name)

    // create component's folders
    let new_path = ''
    // let parent = ''
    for (let i = 0; i < path_items.length; i++) {
        new_path += path_items[i] + '/'
        createDir( 'src/components/' + new_path )
        if ( new_path !== '' ) {
            let parent
            if ( path_items.length > 1 ) {
                parent = path_items[i - 1]
            }
            if ( parent === undefined ) {
                parent = 'main'
            }
            createComponentFiles(new_path, path_items[i], parent)
        }
    }

}

/**
 * Create component files
 * @param {string} path 
 * @param {string} name 
 * @param {string} parent 
 */
function createComponentFiles(path, name, parent) {
    path = 'src/components/' + path
    console.log('\nCreating component files:\n' + name + ' (parent: ' + parent + ')')
    createDir( path + 'img' )
    createFile(path + name + '.html')
    createFile(path + name + '.js')
    createFile(path + '_' + name + '.scss')

    const data = {
        name: name,
        parent_path: undefined,
        parent_name: parent,
    }

    if (parent !== 'main') {
        let parent_path = path.split('/')
        parent_path.pop()
        parent_path.pop()
        path = parent_path.join('/') + '/'

        data.parent_path = path
        appendToParent(data)

    } else {
        data.parent_path = 'src/'
        data.parent_name = 'main'
        appendToParent(data)
    }
}

/**
 * Append import lines to parent HTML, SCSS and JS files.
 * @param {json} data 
 */
function appendToParent(data) {
    const import_folder = (data.parent_name === 'main' ? 'components/' : '') + data.name + '/'

    const jsfile = data.parent_path + data.parent_name + '.js'
    fs.appendFileSync(jsfile, 'import '+ data.name +' from \'' + import_folder + data.name + '.js\';\n', function(err) {
        if (err) {
            console.error('Error at appending to ' + jsfile + ': ' + err)
        }
    })

    const scssfile = data.parent_path + (data.parent_name === 'main' ? data.parent_name : '_' + data.parent_name) + '.scss'
    fs.appendFileSync(scssfile, '@import \'' + import_folder + data.name + '\';\n', function(err) {
        if (err) {
            console.error('Error at appending to ' + scssfile + ': ' + err)
        }
    })

    const htmlfile = data.parent_path + data.parent_name + '.html'
    fs.appendFileSync(htmlfile, '\n<div id="' + data.name + '">${require(\'' + import_folder + data.name + '.html\')}</div>\n', function(err) {
        if (err) {
            console.error('Error at appending to ' + htmlfile + ': ' + err)
        }
    })
}
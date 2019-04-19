const createDir = require('../helpers/create-dir')
const createFile = require('../helpers/create-file')
const jsFile = require('../helpers/file-javascript')
const sassFile = require('../helpers/file-sass')
const htmlFile = require('../helpers/file-html')
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
        const current_path = new_path.split('/')
        createDir( 'src/components/' + new_path )
        if ( new_path !== '' ) {
            let parent
            if ( path_items.length > 1 ) {
                parent = path_items[i - 1]
            }
            if ( parent === undefined ) {
                parent = 'main'
            }

            if (
                (path_items.length > 1 && parent != 'main') ||
                (current_path.length === 1 && parent === 'main' && !fs.existsSync('src/components' + new_path)) ||
                (path_items.length === 1 && parent === 'main')
            ) {
                if ( !fs.existsSync('src/components' + new_path) ) {
                    createComponentFiles(new_path, path_items[i], parent)
                }
            }
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

    jsFile(import_folder, data)
    sassFile(import_folder, data)
    htmlFile(import_folder, data)
}
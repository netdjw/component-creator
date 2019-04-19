const addImportString = require('./add-import-string')

module.exports = (import_folder, data) => {
    const file = data.parent_path + (data.parent_name === 'main' ? data.parent_name : '_' + data.parent_name) + '.scss'
    const importString = '@import \'./' + import_folder + data.name + '\';'
    const importRegexp = new RegExp(/^\@import /)

    addImportString(file, importString, importRegexp)
}

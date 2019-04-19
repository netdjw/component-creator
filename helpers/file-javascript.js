const addImportString = require('./add-import-string')

module.exports = (import_folder, data) => {
    const file = data.parent_path + data.parent_name + '.js'
    let jsVariableName = data.name.replace(/\-/g, '_')
    const importString = 'import '+ jsVariableName +' from \'./' + import_folder + data.name + '.js\';'
    const importRegexp = new RegExp(/^import /)

    addImportString(file, importString, importRegexp)
}

// const fs = require('fs')
const addImportString = require('./add-import-string')

module.exports = (import_folder, data) => {
    const file = data.parent_path + data.parent_name + '.html'
    const importString = '\n<div id="' + data.name + '">${require(\'./' + import_folder + data.name + '.html\')}</div>\n'
    const importRegexp = new RegExp(/\$\{require\(\'/)
    // if not found match we insert BEFORE this match (if not found we isnert into 2nd line)
    const fallbackImportRegexp = new RegExp(/<\/body>/i)

    addImportString(file, importString, importRegexp, fallbackImportRegexp)
}
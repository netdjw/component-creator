const fs = require('fs')

module.exports = (import_folder, data) => {
    const file = data.parent_path + data.parent_name + '.html'
    const importString = '\n<div id="' + data.name + '">${require(\'./' + import_folder + data.name + '.html\')}</div>\n'

    fs.appendFileSync(file, importString, function(err) {
        if (err) {
            console.error('Error at appending to ' + file + ': ' + err)
        }
    })
}
const fs = require('fs')

module.exports = (file, importString, importRegexp) => {
    let isDuplicate = false

    // read file into an array
    const fileContent = fs.readFileSync(file).toString().split("\n")

    // find last 'import' entry
    let lastImportIndex = 0
    for (let i = 0; i < fileContent.length; i++) {
        // check duplicate
        if ( fileContent[i] === importString ) {
            // this is a duplicate
            isDuplicate = true
            console.error(file, ' duplicate string ', importString)
            break
        }

        if ( fileContent[i].match(importRegexp) ) {
            console.log('match found', i)
            lastImportIndex = i
        }
    }

    if ( !isDuplicate ) {
        console.log('-- not a duplicate', lastImportIndex+1)
        fileContent.splice(lastImportIndex + 1, 0, importString)
        fs.writeFileSync(file, fileContent.join('\n'))
    }

}

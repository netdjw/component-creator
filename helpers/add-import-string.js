const fs = require('fs')

module.exports = (file, importString, importRegexp, fallbackImportRegexp) => {
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
            break
        }

        if ( fileContent[i].match(importRegexp) ) {
            lastImportIndex = i
        }

    }

    // fallback
    if ( lastImportIndex === 0 && fallbackImportRegexp !== undefined ) {
        for (let i = 0; i < fileContent.length; i++) {
            if ( fileContent[i].match(fallbackImportRegexp) ) {
                lastImportIndex = i - 1
            }
        }
    }

    if ( !isDuplicate ) {
        fileContent.splice(lastImportIndex + 1, 0, importString)
        fs.writeFileSync(file, fileContent.join('\n'))
    }

}

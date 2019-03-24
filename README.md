# component-creator
Create components to sitebuild projects working with HTML, JavaScript and SCSS files

## Install

    npm install @djw/component-creator --save-dev

## Usage

### Set up the package.json

In the `package.json` file use this lines in `scripts` part:

        {
            "name": "...",
            "version": "...",
            "scripts": {
                "build": "webpack",
                "watch": "webpack --watch",
                "c:init": "ccreator init",
                "i": "ccreator init",
                "c:create": "ccreator create",
                "c": "ccreator create",
                "cc:help": "ccreator help",
                "cc:version": "ccreator version"
            },
            "private": true,
            "dependencies": {
            },
            "devDependencies": {
                "@djw/component-creator": "^1.1.1",
            }
        }

### Commands

Now you can use these commands:

        # init the project src/ folder
        npm run c:init
        # or
        npm run i

        # create a component
        npm run c:create <name>
        npm run c <name>
        npm run c <name-of/component/in-deep>

        # help
        npm run cc:help

        # version
        npm run cc:version


This will be create these files and directory structure:

    src/
        assets/
            .gitignore
        shared/
            .gitignore
        main.html
        main.js
        main.scss
        _mixins.scss
        _variabes.scss

### Example

    npm run c header
    npm run c footer/navbar

This two commands will create `components` directory in `src/`, and files for the components:

    src/
        components/
            header/
                img/
                header.html
                header.js
                _header.scss
            footer/
                img/
                navbar/
                    img/
                    navbar.html
                    navbar.js
                    _navbar.scss
                footer.html
                footer.js
                _footer.scss

As you see, the second command create two componetns in one command.

It will be create a line of code into the parent component files to link files to eachother.

The entry in the parent's files will be at the end of the file in any case.

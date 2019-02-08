# component-creator
Create components to sitebuild projects working with HTML, JavaScript and SCSS files

## Usage

### Initialize the project directory

    node init-project.js

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

### Create a component

    node create-component.js header
    node create-component.js header/navbar
    node create-component.js header/navbar/logo
    node create-component.js header/navbar/nav

This will create a `components` directory in `src/`, and files for the components:

    src/
        components/
            header/
                header.html
                header.js
                _header.scss

It will be create a line of code into the parent component files to link files to eachother.

The entry in the parent's files will be at the end of the file in any case.
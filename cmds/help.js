const menus = {
    main: `
    ccreator [command] <options>
    
    Commands:
      create <name>       create a new component
      help <command>      show help
      init                initialize the project folder
      version             show actual version
    
    Short commands:
      You can use the first letter of commands as abbreviations. Like this:
      ccreator c <name>`,

    create_component: `
    ccreator create path/to/new/component
    or
    ccreator c path/to/new/component
      
    This will create a new component in the src/components/ folder with these folders and files:
      
        src/components/{name}/img/
        src/components/{name}/{name}.html
        src/components/{name}/{name}.js
        src/components/{name}/_{name}.scss
        
    It will be append to the parent components as an import and in HTML as a $require({name}).`,
  
    init: `
    ccreator init
    or
    ccreator i
      
    This will initialize the project folder.`,

    version: `
    ccreator version
    or
    ccreator v

    Shows the actual version.
    `,

    help: `
    ccreator help
    or
    ccreator h
    
    Shows this help`,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
  
    console.log(menus[subCmd] || menus.create_component);
  }
const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  
  let cmd = args._[0]

  if (args.i || args.init) { cmd = 'init' }
  if (args.c || args.create) { cmd = 'create' }
  if (args.h || args.help) { cmd = 'help' }
  if (args.v || args.version) { cmd = 'version' }

  switch (cmd) {
    case 'init':
      require('./cmds/init')()
      break
    case 'create':
      require('./cmds/create')(args)
      break
    case 'help':
      require('./cmds/help')(args)
      break
    case 'version':
      require('./cmds/version')()
      break
    default:
      if (cmd === undefined) {
        console.log('Usage:\n        ccreator [command] <options>\n        ccreator help')
        break;
      }
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
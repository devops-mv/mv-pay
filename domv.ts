import 'dotenv/config';

const args = process.argv.splice(2);

const commandParams = args[0] ? args[0].split(':') : ['help'];

import(`./commands/${commandParams[0]}`)
  .then(command => command.default(commandParams[1], args.slice(1)))
  .catch(error => {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error(`\nCommand '${commandParams[0]}' does not exist.\n`);
    } else {
      console.log('Unknown error occurred');
      console.error(error);
    }
  });

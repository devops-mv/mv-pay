

export default (subCommand?: string, args?: Array<string>) => {
  console.log('domv');
  console.log('Usage: <command>:<subcommand (optional)> [options]\n');
  console.log('Commands:');
  console.log('  help - show this help');
  console.log('  acl:sync - synchronizes permissions in db with permissions in the routes');
  console.log('\n');
}
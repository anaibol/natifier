import { app } from 'electron'

import { createWindow } from '../lib/main'

import { argv } from 'yargs'

console.log(argv);
console.log(createWindow);
if (argv._) {
  // app.on('ready', () => {
  //   createWindow(argv._)
  // })
}

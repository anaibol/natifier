import app from 'app'
import BrowserWindow from 'browser-window'
import Menu from 'menu'
import Tray from 'tray'

import { argv } from 'yargs'

function createWindow (url) {
  // Create the browser window.
  const win = new BrowserWindow({width: 1900, height: 1080, title: 'Arch Maps', autoHideMenuBar: true})

  win.loadURL(url)
  // win.loadURL('file://' + __dirname + '/index.html')

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  win.on('close', function(e) {
    e.preventDefault()
    this.hide()
  })


  win.on('minimize', () => {
    this.hide()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  const appIcon = new Tray('./icon2.png')

  appIcon.setToolTip('This is my application.')

  // Show window and remove tray when clicked
  appIcon.on('click', () => {
    win.show()
    // this.remove()
  })

  createWindow(argv.url)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // app.quit()
  }
})

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

var shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  // if (myWindow) {
  //   if (myWindow.isMinimized()) myWindow.restore()
  //   myWindow.focus()
  // }
  console.log(commandLine);
  console.log(workingDirectory);

  // createWindow(argv.url)
  // app.quit()
  return false
})

// if (shouldQuit) {
//   app.quit()
//   // return
// }

// import app from 'app'
// import BrowserWindow from 'browser-window'
// import Menu from 'menu'
// import Tray from 'tray'

const electron = require('electron')

const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindoww

const Tray = electron.tray

  // import { app, BrowserWindow, Menu, Tray } from 'electron'
// import  from 'electron'
// import Menu from 'electron'
// import Tray from 'electron'

import configStore from '../config'

let webs = configStore.get('webs')

let createWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// app.on('ready', () => {
  const appIcon = new Tray('./icon2.png')
  let menu = []

  webs.forEach(web => {
    menu.push({label: web.url, type: 'radio'})
  })

  // const contextMenu = Menu.buildFromTemplate(menu)
  // appIcon.setToolTip('This is my application.')
  // appIcon.setContextMenu(contextMenu)

  // Show window and remove tray when clicked
  appIcon.on('click', () => {
    win.show()
    // this.remove()
  })


  createWindow = url => {
    // Create the browser window.

    const win = new BrowserWindow({
      width: 1900,
      height: 1080,
      autoHideMenuBar: true,
      icon: './icon.png',
      title: 'Google Maps'
    })

    if (!webs.filter(web => (web.url === url)).length) {
      webs.push({url: url, title: 'Whatsapp 2'})
      configStore.set('webs', webs)
    }

    win.maximize()
    // win.setFullScreen(true)

    win.loadURL('http://' + url, {userAgent: 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'})
    // win.loadURL('file://' + __dirname + '/index.html')

    // Emitted when the window is closed.
    // win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      // win = null
    // })

    var webContents = win.webContents
    win.setTitle(webContents.getTitle())

    webContents.on('dom-ready', e => {
      // console.log('dom-ready')
      // console.log(e.sender)

      // console.log(e.sender.getTitle())
    })


    webContents.on('page-favicon-updated', e => {
      console.log('page-favicon-updated')
      // console.log(e)
    })
    webContents.on('did-finish-load', e => {
      console.log('did-finish-load')
    })

    win.on('close', e => {
      // e.preventDefault()
      // this.hide()
    })

    win.on('minimize', () => {
      this.hide()
    })
  }

// })

// Quit when all windows are closed.
app.on('window-all-closed', () => {
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

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  // if (myWindow) {
  //   if (myWindow.isMinimized()) myWindow.restore()
  //   myWindow.focus()
  // }
  console.log(commandLine)
  console.log(workingDirectory)

  if (argv.url) {
    createWindow(argv.url)
  }

  // app.quit()
  return false
})

// if (shouldQuit) {
//   app.quit()
//   // return
// }

export default createWindow

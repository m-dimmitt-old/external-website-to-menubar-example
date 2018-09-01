
const { createTray, toggleWindow, createWindow } = require('./windowAndTray.js')
const {app, BrowserWindow, Tray } = require('electron')
const path = require('path')
const rootDir = path.join(__dirname, '..')
console.log('rootDir is: ', rootDir)
const assetsDirectory = path.join(rootDir, 'assets')

let tray = undefined
let window = undefined

// Don't show the app in the doc
app.dock.hide()

app.on('ready', () => {
  window = createWindow(window, BrowserWindow, 263, 544)
  tray   = createTray(Tray, tray, assetsDirectory, window)
  tray.on('right-click', () =>  { toggleWindow(tray, window) })
  tray.on('double-click', () => { toggleWindow(tray, window) })
  tray.on('click', (event) =>   { toggleWindow(tray, window) })
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
})

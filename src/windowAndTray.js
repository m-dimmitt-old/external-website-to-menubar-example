const {Tray } = require('electron')
const path = require('path')
const rootDir = path.join(__dirname, '..')

const createTray = (Tray, tray, assetsDirectory, window) => {
  tray = new Tray(path.join(assetsDirectory, 'iconTemplate.png'))
  return tray
}

// width: 410,
// height: 770,

// this one is really good
// width: 263,
// height: 550,

// width: 263,
// height: 544,
const createWindow = (window, BrowserWindow, width, height) => {
  window = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true
  })
  window.loadURL(`file://${path.join(__dirname, 'index.html')}`)
  // Hide the window when it loses focus
  window.on('blur', () => { window.hide() })
  return window
}

const toggleWindow = (tray, window) => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow(tray, window)
  }
}

const showWindow = (tray, window) => {
  const {x, y} = getWindowPosition(tray, window)
  window.setPosition(x, y, false)
  window.show()
  window.focus()
}

const getWindowPosition = (tray, window) => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
  let x, y = 0
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height * 10)
  }
  return {x: x, y: y}
}

module.exports = { createTray, toggleWindow, createWindow }

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

const electron = require('electron')
const path = require('path')
const url = require('url')

let willQuitApp = false;

// Module to control application life.
const app = electron.app
  // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

const globalShortcut = electron.globalShortcut

const ipcMain = electron.ipcMain;

const nativeImage = electron.nativeImage

let iconApp=nativeImage.createFromPath(path.join(__dirname, '/resources/icons/png/64x64.png'))


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

    app.quit();

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

//  const {BrowserWindow, Tray} = require('electron')
//  const appIcon = new Tray('/home/alex/Documentos/Electron/enciclopedia-animacion/resources/icons/png/64x64.png')

  // Create the browser window.
  mainWindow = new BrowserWindow({
//    width: 1250,
    width: 935,
    height: 1000,
    center: true,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    frame: false,
     icon: iconApp
  });

  testWindow = new BrowserWindow({
//    width: 1250,
    width: 600,
    height: 590,
    center: true,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
     icon: iconApp
  });

  creditosWindow = new BrowserWindow({
//    width: 1250,
    width: 800,
    height: 1000,
    center: true,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
     icon: iconApp
  });

  creditosWindow.hide()
  testWindow.hide()


  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)
  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  testWindow.on('close', (e) => {
    if (willQuitApp) {
      /* the user tried to quit the app */
      windowTest = null;
    } else {
       e.preventDefault();
       testWindow.hide();
       mainWindow.show();
     }
   });

   creditosWindow.on('close', (e) => {
     if (willQuitApp) {
       /* the user tried to quit the app */
       creditosWindow = null;
     } else {
        e.preventDefault();
        creditosWindow.hide();
        mainWindow.show();
      }
    });

   mainWindow.on('close', (e) => {
     willQuitApp = true
     testWindow.close()
     creditosWindow.close()
    });


  globalShortcut.register('esc', function () {
      mainWindow.close()
    })

});

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})


ipcMain.on('index', function (e) {
  mainWindow.setResizable(true)

  mainWindow.setSize(1130,1000)
  mainWindow.center()
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('animacion2d', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/template/nav2d.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('animacion3d', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/template/nav3d.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('morphing', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/template/nav-morph.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('software', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/software.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('ayuda', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/ayuda.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('test', function (e) {

testWindow.show()
  testWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/test.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.hide()
  testWindow.focus()
  testWindow.setResizable(false)

})

ipcMain.on('links', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/links.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('glosario', function (e) {

  mainWindow.setResizable(true)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/glosario.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.setResizable(false)

})

ipcMain.on('creditos', function (e) {

  creditosWindow.show()
    creditosWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/creditos.html'),
      protocol: 'file:',
      slashes: true
    }))
    mainWindow.hide()
    creditosWindow.focus()
    creditosWindow.setResizable(false)

})

ipcMain.on('atras', function (e) {

  mainWindow.setResizable(true)


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

mainWindow.setResizable(false)
})

ipcMain.on('salir', function (e) {
  mainWindow.close()
})

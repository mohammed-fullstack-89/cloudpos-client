const electron = require('electron')
const url = require('url')
const path = require('path')
// const { dialog } = require('electron')
const Menu = electron.Menu
const PrintService = require('./app/services/print.js')
const customContextMenu = require('./app/components/menu/context_menu');
const { app, BrowserWindow } = electron


const print = new PrintService().getInstance()


app.on('ready', function () {
   init().then((ini) => createWindow());
})

app.on('closed', function () {
   app.quit();
});
// app.on('web-contents-created', function (e, contents) {
//    contents.send("windowsPrinter", printobj1)
// })
app.on('window-all-closed', function () {
   app.quit();
});



// Quit when all windows are closed.
app.on('window-all-closed', function () {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
   // On macOS it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      // BrowserWindow.openDevTools();
   }
});


async function init() {
   app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
   // app.allowRendererProcessReuse = false;
}

function createWindow() {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      focusable: true,
      fullscreenWindowTitle: true,
      fullscreenable: true,
      maximizable: true,
      minimizable: true,
      closable: true,
      // simpleFullscreen: true,
      acceptFirstMouse: true,
      fullscreen: true,
      hasShadow: true,
      thickFrame: true,
      parent: true,
      frame: true,
      paintWhenInitiallyHidden: true,
      // contextIsolation: false, //block website loaded to access electron preload script (false)
      // darkTheme: false,
      webPreferences: {
         enableBlinkFeatures: true,
         nativeWindowOpen: false,
         nodeIntegration: false,
         safeDialogs: false,
         preload: path.join(__dirname, 'renderer.js')
      }

   });



   //init menu and context menu

   const customMenu = [
      {
         label: 'File',
         submenu: [
            {
               label: 'Settings',
               click() {
                  createSettingsWindow()
               }
            },
            {
               label: 'Clear cache',
               click() {
                  console.log("clear cache")
                  electron.webContents.webContents.session.clearStorageData(function () {
                     electron.webContents.reload()
                  });
                  //some callback.
               }
            },
            {
               label: 'Quit',
               accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctr+Q',
               click() {
                  app.quit
               }
            },
         ]
      },
      {
         label: 'Edit',
         submenu: [
            {
               role: 'undo'
            },
            {
               role: 'redo'
            },
            {
               type: 'separator'
            },
            {
               role: 'cut'
            },
            {
               role: 'copy'
            },
            {
               role: 'paste'
            }
         ]
      },

      {
         label: 'View',
         submenu: [
            {
               role: 'reload'
            },
            {
               role: 'toggledevtools'
            },
            {
               type: 'separator'
            },
            {
               role: 'resetzoom'
            },
            {
               role: 'zoomin'
            },
            {
               role: 'zoomout'
            },
            {
               type: 'separator'
            },
            {
               role: 'togglefullscreen'
            }
         ]
      },

      {
         role: 'window',
         submenu: [
            {
               role: 'minimize'
            },
            {
               role: 'close'
            }
         ]
      },
      {
         role: 'help',
         submenu: [
            {
               label: 'Learn More',
               click() {
                  shell.openExternal('http://Rubikomm.com')
               }

            }
         ]
      }
   ];

   const menu = Menu.buildFromTemplate(customMenu)
   Menu.setApplicationMenu(menu);
   const ctxmenu = Menu.buildFromTemplate(customContextMenu);


   mainWindow.webContents.on('context-menu', function (e, params) {
      // mainWindow.blurWebView()
      ctxmenu.popup(mainWindow, params.x, params.y)

   });
   mainWindow.webContents.on('did-finish-load', function () {
      // mainWindow.blurWebView()


   });
   // load html in the window.

   mainWindow.loadURL(url.format({
      pathname: 'localhost:4200',
      protocol: 'http',
      slashes: true,
   }));

   // mainWindow.confirm("asd");
   // dialog.showMessageBox("sa")

}

function createSettingsWindow() {
   let win = new BrowserWindow({
      alwaysOnTop: true,
      resizable: false,
      maxHeight: 200,
      maxWidth: 200,
      useContentSize: true,
      title: "Settings",
      webPreferences: {
         javascript: true,
         nodeIntegration: true,

         // preload: path.join(__dirname, 'app/js/settings')
      },
      // backgroundColor: '#2e2c29' 
   });
   win.removeMenu();
   win.menu = null;
   win.loadFile('app/components/settings/settings.html');

}




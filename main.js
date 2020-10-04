const electron = require('electron');
const url = require('url');
// const worker = require('worker_threads');
const path = require('path');
const customContextMenu = require('./app/components/menu/context_menu');
const { app, BrowserWindow } = electron;
const ipc = electron.ipcMain;
const Menu = electron.Menu;
const enviroment = require('./enviroment');
var db = require('./models/index');
var splashWindow;
const dbStore = require('./app/services/service.db')




// ipc.on('setCategories', (event, args) => {
//    dbStore.setCategories(args);
// });

app.on('ready', async function () {
   dbStore.init();
   createSplashWindow();
   await db.setup().then(() => {
      createWindow();

   }).catch((error) => {
      console.log(`error : ${error}`);
   });
});

app.on('closed', function () {
   db.close()
   app.quit();
});

app.on('window-all-closed', function () {
   // db.close()
   app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {

   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {

      // db.close();
      app.quit();
   }
})

app.on('activate', function () {
   // On macOS it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

async function init() {
   app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
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
      acceptFirstMouse: true,
      simpleFullscreen: true,
      hasShadow: true,
      thickFrame: true,
      parent: true,
      frame: true,
      modal: true,
      paintWhenInitiallyHidden: true,


      // contextIsolation: false, //block website loaded to access electron preload script (false)
      webPreferences: {
         enableBlinkFeatures: true,
         nativeWindowOpen: true,
         nodeIntegration: true,
         safeDialogs: false,
         javascript: true,
         // sandbox: true,
         webgl: false,
         webSecurity: false,
         nodeIntegrationInWorker: true,
         preload: path.join(__dirname, 'renderer.js')
      }
   });
   // const dbStore = require('./app/services/service.db');
   // dbStore.getCategories();
   // const dbStore = require('./app/services/service.db');
   // mainWindow.webContents.send('store-data', JSON.stringify(dbStore));


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
               async click() {

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


                  // shell.openExternal('http://Rubikomm.com')
               }

            }
         ]
      }
   ];

   const menu = Menu.buildFromTemplate(customMenu)
   Menu.setApplicationMenu(menu);
   const ctxmenu = Menu.buildFromTemplate(customContextMenu);
   mainWindow.webContents.on('context-menu', function (e, params) {
      ctxmenu.popup(mainWindow, params.x, params.y)
   });
   // mainWindow.webContents.on('did-finish-load', function () {


   // });
   // mainWindow.loadFile(path.join(__dirname, 'app/windows/loading/loading.html'));
   mainWindow.loadURL(url.format({
      pathname: enviroment.development.url,
      protocol: 'http',
      slashes: true,
   }));
   // ipc.once('db-initiating', (event, args) => {
   //    init().then(() => {
   //       // load html in the window.
   //       // console.log("init" + args);
   //       mainWindow.webContents.loadURL(url.format({
   //          pathname: enviroment.development.url,
   //          protocol: 'http',
   //          slashes: true,
   //       }));
   //    }).catch((error) => {
   //       console.log(`error : ${error}`);
   //    });
   // })



   console.log("closing");
   //close splash screen 
   splashWindow.close();
   splashWindow = null;


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
         nodeIntegration: true,
         nodeIntegrationInWorker: true,
         // preload: path.join(__dirname, 'app/components/settings/settings.js')
      },
      // backgroundColor: '#2e2c29' 
   });
   // win.openDevTools();
   win.removeMenu();
   win.menu = null;
   win.loadFile(path.join(__dirname, 'app/windows/settings/settings.html'));

}

function createSplashWindow() {
   splashWindow = new BrowserWindow(
      {
         height: 300,
         width: 300,
         frame: false,

         webPreferences: {
            nodeIntegration: false,
            devTools: false,
            nodeIntegrationInWorker: true,
         }
      }
   );
   // splashWindow.webContents.openDevTools();
   splashWindow.removeMenu();
   splashWindow.menu = null;
   splashWindow.loadFile(path.join(__dirname, 'app/windows/loading/loading.html'));
}




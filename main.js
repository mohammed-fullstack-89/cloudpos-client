const electron = require('electron');
const dialog = electron.dialog;
const path = require('path');
const url = require('url');
const enviroment = require('./enviroment');
const customContextMenu = require('./components/menu/context_menu');
const db = require('./models/index');
const dbStore = require('./services/db.service');
const appStore = require('./services/store.service');

const APP_HELPER = require('./util/appHelper');
const PRINT_HELPER = require('./util/printHelper');
const { crashReporter } = require('electron')

const { app, BrowserWindow } = electron;
const Menu = electron.Menu;


// const usbScanner = require('usb-barcode-scanner');

// console.log(usbScanner.getDevices());


// let scanner = new UsbScanner({
//    vendorId: 1155,
//    productId: 22352
//    /** You could also initialize the scanner by giving entering the path variable:
//     *  path: 'IOService:/AppleACPI etc...'
//    **/
// });

// scanner.on('data', (data) => {
//    console.log(data);
// });

// scanner.startScanning();

var splashWindow;

// APP_HELPER.init();
PRINT_HELPER.init();
appStore.init(electron.app.getPath('userData'));

crashReporter.start({ submitURL: '' })



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
   app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {

   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {

      db.close();
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
                  clearAppDataDialog();
                  console.log("clear cache")
                  // mainWindow.webContents.session.clearCache(function(){console.log('cleared all cookies ');    electron.webContents.reload()});

                  // electron.webContents.webContents.session.clearStorageData(function () {
                  //    electron.webContents.reload()
                  // });
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

   mainWindow.loadURL(url.format({
      pathname: enviroment.development.url,
      protocol: 'http',
      slashes: true,
   }));
   // mainWindow.loadFile(path.join(__dirname, '/windows/main/main.html'));
   mainWindow.webContents.on("before-input-event", (event, input) => {

      console.log(input.code == "Enter" || input.code == "NumpadEnter");
   });



   //close splash screen 
   splashWindow.close();
   splashWindow = null;


}
function clearAppDataDialog() {
   const clearAppDataMessage = 'By clicking proceed you will be removing all added accounts and preferences from Zulip. When the application restarts, it will be as if you are starting Zulip for the first time.';
   const getAppPath = path.join(app.getPath('appData'), app.getName());

   dialog.showMessageBox({
      type: 'warning',
      buttons: ['YES', 'NO'],
      defaultId: 0,
      message: 'Are you sure',
      detail: clearAppDataMessage
   }, response => {
      if (response === 0) {
         fs.remove(getAppPath);
         setTimeout(() => ipcRenderer.send('forward-message', 'hard-reload'), 1000);
      }
   });
}
function createSettingsWindow() {
   let win = new BrowserWindow({
      alwaysOnTop: true,
      resizable: false,
      maxHeight: 200,
      maxWidth: 200,
      modal: false,
      useContentSize: true,
      title: "Settings",
      webPreferences: {
         nodeIntegration: true,
      },
      // backgroundColor: '#2e2c29' 
   });

   win.removeMenu();
   win.menu = null;
   win.loadFile(path.join(__dirname, 'windows/settings/settings.html'));

}

function createSplashWindow() {
   splashWindow = new BrowserWindow(
      {
         height: 300,
         width: 300,
         frame: false,
         paintWhenInitiallyHidden: true,

         webPreferences: {
            nodeIntegration: false,
            devTools: false,
         }
      }
   );
   // splashWindow.webContents.openDevTools();
   splashWindow.removeMenu();
   splashWindow.menu = null;
   splashWindow.loadFile(path.join(__dirname, 'windows/loading/loading.html'));
}

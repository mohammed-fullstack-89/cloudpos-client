const electron = require('electron');
const fs = require('fs')
const dialog = electron.dialog;
const path = require('path');
const url = require('url');
const enviroment = require('./enviroment');
const customContextMenu = require('./components/menu/context_menu');
const db = require('./models/index');
const dbStore = require('./services/db.service');
const appStore = require('./services/store.service');
const PRINT_HELPER = require('./util/printHelper');
const { webContents } = require('electron');
const ipcMain = electron.ipcMain;
const { app, BrowserWindow } = electron;
const Menu = electron.Menu;

var splashWindow;
// appHelper.init();
PRINT_HELPER.init();
appStore.init(electron.app.getPath('userData'));
// crashReporter.start({ submitURL: '' })

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
   db.close();
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
   // dock icon is clicked and there are no other  windows open.
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});


function createWindow() {
   app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
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
                  mainWindow.webContents.executeJavaScript(`obj.searchBarcode(${JSON.stringify(code)}).then((searchedItems)=>{barcode(searchedItems)});`);

                  createSettingsWindow()
               }
            },
            {
               label: 'Clear data',
               click() {
                  const clearAppDataMessage = 'are you sure ?';
                  const getAppPath = path.join(app.getPath('appData'), app.getName());

                  dialog.showMessageBox({
                     type: 'warning',
                     buttons: ['YES', 'NO'],
                     defaultId: 0,
                     message: 'Are you sure',
                     detail: clearAppDataMessage
                  }).then((dialogRes) => {
                     // const getAppPath = path.join(app.getPath('appData'), app.getName());
                     if (dialogRes.response === 0) {
                        // fs.rmSync(getAppPath);
                        mainWindow.webContents.executeJavaScript("localStorage.clear();");
                        mainWindow.webContents.executeJavaScript(" sessionStorage.clear();");
                        mainWindow.webContents.executeJavaScript("window.location.reload()");
                        // setTimeout(() => ipcRenderer.send('forward-message', 'hard-reload'), 1000);
                     }

                  })

               }
            },
            {
               label: 'Quit',
               // accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctr+Q',
               click() {
                  app.quit();
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
      // {
      //    role: 'help',
      //    submenu: [
      //       {
      //          label: 'Learn More',
      //          click() {
      //             shell.openExternal('http://Rubikomm.com')
      //          }

      //       }
      //    ]
      // }
   ];

   const menu = Menu.buildFromTemplate(customMenu)
   Menu.setApplicationMenu(menu);
   const ctxmenu = Menu.buildFromTemplate(customContextMenu);
   mainWindow.webContents.on('context-menu', function (e, params) {
      ctxmenu.popup(mainWindow, params.x, params.y)
   });

   // SSL/TSL: this is the self signed certificate support
   app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
      // On certificate error we disable default behaviour (stop loading the page)
      // and we then say "it is all fine - true" to the callback
      event.preventDefault();
      callback(true);
   });

   // mainWindow.loadURL(url.format({
   //    pathname: enviroment.development.url,
   //    protocol: 'https',
   //    slashes: true,
   // }
   mainWindow.loadURL(enviroment.development.url);

   let code = "";
   let lastKeyTime = Date.now();
   mainWindow.webContents.on("before-input-event", async (event, input) => {

      if (input.type == 'keyDown') {
         const currentTime = Date.now();
         let cal = currentTime - lastKeyTime;
         if (currentTime - lastKeyTime > 500) {
            code = "";
         }
         if (input.code == "ShiftLeft" || input.code == "ShiftRight") {

         } else {

            if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
               if (code.length > 1) {
                  // let items = [];
                  mainWindow.webContents.executeJavaScript(`obj.searchBarcode(${JSON.stringify(code)}).then((searchedItems)=>{barcode(searchedItems)});`);
                  // mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);
                  // const scaleIdentifierCode = code.substr(0, 2);
                  // const scale = await item_service.getScaleFromBarcode(scaleIdentifierCode);
                  // if (scale !== undefined) {
                  //    const scaleObject = JSON.parse(scale);
                  //    end = scaleObject.number_of_digits;
                  //    const trimmedCode = code.substr(0, code.length - end);
                  //    // const item = await item_service.getItemFromScale(JSON.stringify(scale), code);
                  //    mainWindow.webContents.executeJavaScript(`obj.getItemFromScale(${JSON.stringify(scale)},${trimmedCode}).then((item)=>{barcode(item,${code})});`);
                  // } else {
                  // mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);

                  // }

                  code = "";
               }
            } else {
               code += input.key

            }
         }
         lastKeyTime = currentTime;

      }

   });



   //close splash screen 
   splashWindow.close();
   splashWindow = null;


}
// function clearAppDataDialog(webcontent) {
//    const clearAppDataMessage = 'are you sure ?';
//    const getAppPath = path.join(app.getPath('appData'), app.getName());

//    dialog.showMessageBox({
//       type: 'warning',
//       buttons: ['YES', 'NO'],
//       defaultId: 0,
//       message: 'Are you sure',
//       detail: clearAppDataMessage
//    }, response => {
//       if (response === 0) {
//          fs.remove(getAppPath);
//          clearStorage(webcontent);
//          // app.relaunch();
//          // setTimeout(() => ipcRenderer.send('forward-message', 'hard-reload'), 1000);
//       }
//    });
// }

function createSettingsWindow() {

   let win = new BrowserWindow({
      alwaysOnTop: true,
      resizable: false,
      maxHeight: 200,
      maxWidth: 200,
      modal: true,
      useContentSize: true,

      title: "Settings",
      webPreferences: {
         devTools: false,
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
   splashWindow.removeMenu();
   splashWindow.menu = null;
   splashWindow.loadFile(path.join(__dirname, 'windows/loading/loading.html'));
}

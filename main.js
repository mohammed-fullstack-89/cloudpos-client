const electron = require('electron');
const dialog = electron.dialog;
const path = require('path');
const url = require('url');
const enviroment = require('./enviroment');
const customContextMenu = require('./components/menu/context_menu');
const db = require('./models/index');
const dbStore = require('./services/db.service');
const appStore = require('./services/store.service');
const ipc = electron.ipcMain;
const APP_HELPER = require('./util/appHelper');
const PRINT_HELPER = require('./util/printHelper');
const { crashReporter } = require('electron')
const { app, BrowserWindow } = electron;
const Menu = electron.Menu;

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

                  let printWindow = new BrowserWindow({
                     webPreferences: {
                        javascript: false,
                        contextIsolation: true
                     },
                     parent: BrowserWindow.getFocusedWindow(),
                     modal: true,
                     show: true,
                  })

                  //remove menu in the print window
                  printWindow.removeMenu();
                  printWindow.menu = null;
                  console.log("appStore.getValue(jjh)" + appStore.getValue("mainPrinter"));
                  const options = { collate: false, silent: true, deviceName: appStore.getValue("mainPrinter"), copies: 1 }
                  // let buffer = Buffer.from([27, 112, 48, 55, 121]);
                  // let arraybuffer = Uint8Array.from(buffer).buffer;
                  printWindow.webContents.loadFile('./pr.js');
                  printWindow.webContents.print(options, (success, errorType) => {
                     if (!success) {
                        console.log("check printer")
                        console.log(errorType)
                        // printWindow.close()
                     }
                     else {
                        console.log("success")
                        console.log(errorType)
                        // printWindow.close()

                     }
                  }, (failureReason, errorType) => {
                     if (!failureReason == null || failureReason == '') {
                        console.log("fail..unknown reason")
                        console.log("error : " + errorType + " reason : " + failureReason)
                        // printWindow.close()

                     }
                     else {
                        console.log("fail..")
                        console.log(errorType)
                        // printWindow.close()

                     }
                  })

                  // Use default printing options


                  // let printWindow = new BrowserWindow({
                  //    webPreferences: {
                  //       javascript: false,
                  //       contextIsolation: true
                  //    },
                  //    parent: BrowserWindow.getFocusedWindow(),
                  //    modal: true,
                  //    show: false,
                  // });

                  // const options = { printBackground: true, copies: 0, silent: true, deviceName: appStore.getValue("mainPrinter") }

                  // printWindow.loadURL('\x1b\x70\x00\x19\xfa');
                  // printWindow.webContents.print(options, (success, errorType) => {
                  //    if (!success) {
                  //       console.log("check printer")
                  //       console.log(errorType)
                  //       printWindow.close()
                  //    }
                  //    else {
                  //       console.log("success")
                  //       console.log(errorType)
                  //       printWindow.close()

                  //    }
                  // }, (failureReason, errorType) => {
                  //    if (!failureReason == null || failureReason == '') {
                  //       console.log("fail..unknown reason")
                  //       console.log("error : " + errorType + " reason : " + failureReason)
                  //       printWindow.close()

                  //    }
                  //    else {
                  //       console.log("fail..")
                  //       console.log(errorType)
                  //       printWindow.close()

                  //    }
                  // })


                  // const { PosPrinter } = require("electron-pos-printer");
                  // const path = require("path");

                  // const options = {

                  //    // Preview in window or print
                  //    width: '170px',               //  width of content body
                  //    margin: '0 0 0 0',            // margin of content body
                  //    copies: 1,                    // Number of copies to print
                  //    printerName: 'XPc2',        // printerName: string, check with webContent.getPrinters()
                  //    timeOutPerLine: 400,

                  // }

                  // const data = [
                  //    {
                  //       type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                  //       value: '\\x1b\\x70\\x00\\x19\\xfa',

                  //    }
                  // ]

                  // PosPrinter.print(data, options)
                  //    .then(() => {
                  //       console.log("data " + data);
                  //    })
                  //    .catch((error) => {
                  //       console.error(error);
                  //    });


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

   let code = "";
   let lastKeyTime = Date.now();
   mainWindow.webContents.on("before-input-event", (event, input) => {

      if (input.type == 'keyDown') {
         const currentTime = Date.now();
         let cal = currentTime - lastKeyTime;
         if (currentTime - lastKeyTime > 500) {
            code = "";
         }
         if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
            if (code.length > 1) {
               let items = [];

               mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);

               code = "";
            }
         } else {
            code += input.key

         }
         lastKeyTime = currentTime;

      }

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
   // const ipc = require('./services/print.serviceprin').ipcMain;
   // ipc.emit("openPrintersSettings");

   let win = new BrowserWindow({
      alwaysOnTop: true,
      resizable: false,
      maxHeight: 200,
      maxWidth: 200,
      modal: true,
      useContentSize: true,

      title: "Settings",
      webPreferences: {
         devTools: true,
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

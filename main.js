const electron = require('electron');
const url = require('url');
const path = require('path');
const customContextMenu = require('./app/components/menu/context_menu');
const { app, BrowserWindow } = electron;
const Menu = electron.Menu;
const enviroment = require('./enviroment');
require('./app/db/services/category.service')
const db = require('./app/db/db.manager');


app.on('ready', async function () {
   init().then((ini) => createWindow());
   db.setup();

   // var categoryTable = db.model("categories");
   // console.log("wddwd44 " + categoryTable);
})

app.on('closed', function () {
   db.close()
   app.quit();
});

app.on('window-all-closed', function () {
   db.close()
   app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {

   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') { db.close(); app.quit(); }
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
      paintWhenInitiallyHidden: true,
      // contextIsolation: false, //block website loaded to access electron preload script (false)
      webPreferences: {
         enableBlinkFeatures: true,
         nativeWindowOpen: false,
         nodeIntegration: true,
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
               async click() {
                  var customerTable = db.model('customers');
                  console.log("customers " + JSON.stringify(await customerTable.findAll({ include: { all: true, nested: true }})));
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
                  try {
                     var customersTable = db.model("customers");
                     customersTable.create({
                        name: "hamza",
                        nick_name: "alfawaer",
                        phone_number_1: "1111111111",
                        phone_number_2: "1111111111",
                        email: "hammza.alfawaer@rubikomm.com",
                        customer_type: "individual",
                        allow_discount: 0,
                        discount_value: null,
                        discount_type: null,
                        ban_customer: 0,
                        ban_customer_reasons: null,
                        allow_tax_exemption: 0,
                        tax_exemption_number: null,
                        debit_limit: null,
                        upload_file: null,
                        note: null,
                        get_customer_entity: [{
                           allow_discount: 0,
                           allow_tax_exemption: 0,
                           discount_type: "undefined",
                           discount_value: 0,
                           name_ar: "asdasd",
                           name_en: "asdasd",
                           tax_exemption_value: 0
                        }, {
                           allow_discount: 0,
                           allow_tax_exemption: 0,
                           discount_type: "undefined",
                           discount_value: 0,
                           name_ar: "asdasd",
                           name_en: "asdasd",
                           tax_exemption_value: 0
                        }],
                        get_customer_address: [
                           {

                              address: null,
                              governorate: null,
                              zone: null,
                              street: null,
                              building: null,
                              floor: null,
                              office_flat_number: null,
                              longitude: "خط الطول",
                              latitude: "خط العرض",


                           },
                           {

                              address: null,
                              governorate: null,
                              zone: null,
                              street: null,
                              building: null,
                              floor: null,
                              office_flat_number: null,
                              longitude: "خط الطول",
                              latitude: "خط العرض",


                           }
                        ],
                        get_customer_tier: {

                           name_ar: "cccc",
                           name_en: "cccc",
                           allow_discount: 0,
                           discount_value: 0,
                           discount_type: "undefined",
                        }
                     }, {
                        include: [
                           { association: customersTable.customer_tiers },
                           { association: customersTable.customer_addresses },
                           {
                              association: customersTable.customer_entities,
                              include: customersTable.customer_addresses
                           }]
                     });
                  } catch (error) {
                     console.log(error);
                  }
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
   mainWindow.webContents.on('did-finish-load', function () {


   });

   // load html in the window.
   mainWindow.loadURL(url.format({
      pathname: enviroment.development.url,
      protocol: 'http',
      slashes: true,
   }));

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
         contextIsolation: false,
         // preload: path.join(__dirname, 'app/components/settings/settings.js')
      },
      // backgroundColor: '#2e2c29' 
   });
   // win.openDevTools();
   win.removeMenu();
   win.menu = null;
   win.loadFile(path.join(__dirname, 'app/components/settings/settings.html'));

}




const db = require('./models/index');
const windowManager = require('./services/window-manager-service');
const notificationService = require('./services/notification-service');
const { app, BrowserWindow, Tray } = require('electron');
const { APPNAME } = require('./commons');
const path = require('path'); // import path module


let tray;
app.disableHardwareAcceleration();
app.whenReady().then(() => require('./services/index'));

app.on('ready', async _ => {
   app.setAppUserModelId(APPNAME);
   windowManager.showSplash();
   notificationService.showNotification('App Initiating', 'app is loading important data ...');
   await db.setup().then(() => {
      tray = new Tray(path.join(__dirname, 'assets', 'logo', 'iisal_logo.png'));
      windowManager.initTray(tray);
      windowManager.createAppWindow();
      notificationService.showNotification('App is ready', 'app has successfully initiated');
   }).catch((error) => {
      notificationService.showNotification('Error', 'Something went wrong initiating,please contact the support team. ');
      console.log(`error: ${error}`);
   });
});

app.on('closed', () => {
   db.close();
   app.quit();
});

app.on('window-all-closed', () => {
   app.quit();
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      db.close();
      app.quit();
   }
});

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      windowManager.createWindow();
   }
});
const db = require('./models/index');
const windowManager = require('./services/window-manager-service')
const notificationService = require('./services/notification-service');
const { app, BrowserWindow } = require('electron');
const { APPNAME } = require('./commons');
const logRocket = require('logrocket');

app.disableHardwareAcceleration();
app.whenReady().then(() => require('./services/index'));

logRocket.init('windows/poswindows');

app.on('ready', async () => {
   app.setAppUserModelId(APPNAME);
   windowManager.showSplash();
   notificationService.showNotification('App Initiating', 'app is loading important data ...');
   await db.setup().then(() => {
      // autoUpdater.checkForUpdates();
      windowManager.createAppWindow();
      // windowManager.initTray(tray);
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
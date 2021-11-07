require('./services/index');
const db = require('./models/index');
const windowManager = require('./services/window-manager-service');
const notificationService = require('./services/notification-service');
const { app, BrowserWindow } = require('electron');
const { APPNAME } = require('./commons');
const logger = require('electron-timber');

let tray = null;
app.disableHardwareAcceleration();
app.whenReady().then(() => {
   require('./services/index');
});

app.on('ready', async () => {
   const os = require('os');
   const computerName = os.hostname();
   const userInfo = os.userInfo();
   logger.log(computerName);
   logger.log(userInfo);

   app.setAppUserModelId(APPNAME);
   windowManager.showSplash();
   notificationService.showNotification('App Initiating', 'app is loading important data ...');
   await db.setup().then(() => {
      windowManager.createAppWindow();
      notificationService.showNotification('App is ready', 'app has successfully initiated');
   }).catch((error) => {
      notificationService.showNotification('Error', 'Something went wrong initiating,please contact the support team. ');
      console.log(`error : ${error}`);
      logger.error(error);
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


app.on('error',(error) => {
   alert(JSON.stringify(error));
   notificationService.showNotification('Error occurd while loading CloudPOS', error);
   console.error('Error occurd while loading CloudPOS',error);
   logger.error('Error occurd while loading CloudPOS',error);
});
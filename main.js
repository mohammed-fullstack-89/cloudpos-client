require('./services/index');
const db = require('./models/index');
const windowManager = require('./services/window-manager-service')
const notificationService = require('./services/notification-service');
const { app, BrowserWindow, Tray, autoUpdater, dialog } = require('electron');
const commons = require('./commons');

let tray = null;

// autoUpdater.on('update-downloaded', (info) => {
// notificationService.showNotification(commons.APPNAME, 'an update has been downloaded');
//    const updateDialog = {
//       type: 'info',
//       buttons: ['Restart', 'Update'],
//       title: 'Application update',
//       details: 'A new version has been release restart the applicaion to apply the update .'
//    }
//    dialog.showMessageBox(updateDialog, (response) => {
//       if (response == 0) {
//          autoUpdater.quitAndInstall();
//       }
//    })
// })
// autoUpdater.on('update-available', () => {
//    notificationService.showNotification(commons.APPNAME, 'New update available');
// })
app.whenReady().then(() => {
   require('./services/index');
})
app.on('ready', async () => {
   tray = new Tray(__dirname + '/assets/icons/app.ico')
   windowManager.showSplash();
   notificationService.showNotification(commons.APPNAME, 'initiating ...');
   await db.setup().then(() => {
      // autoUpdater.checkForUpdates();
      windowManager.createAppWindow();
      windowManager.initTray(tray);
      notificationService.showNotification(commons.APPNAME, 'app is ready :)');
   }).catch((error) => {
      notificationService.showNotification(commons.APPNAME, 'Something went wrong initiating ...');
      console.log(`error : ${error}`);
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
})

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      windowManager.createWindow();
   }
});
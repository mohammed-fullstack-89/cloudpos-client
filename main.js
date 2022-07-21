const db = require('./models/index');
const windowManager = require('./services/window-manager-service');
const notificationService = require('./services/notification-service');
const { app, BrowserWindow, Tray, shell } = require('electron');
const { APP_NAME, APP_VERSION } = require('./commons');
const path = require('path'); // import path module
const { fetchUrl } = require('fetch');
const fs = require('fs');
const http = require('http');
const enviroment = require('./enviroment');


let tray;
app.disableHardwareAcceleration();
app.whenReady().then(() => require('./services/index'));



const checkForUpdate = async () => {
   return new Promise((resolve, reject) => {
      try {
         fetchUrl(enviroment.stagging.update_url, (error, meta, body) => {
            const response = JSON.parse(body.toString());
            if (response.name > APP_VERSION) {
               resolve(response.url);
            } else {
               resolve(false);
            }
         });
      } catch (err) {
         reject(err);
      }
   });

};

const downloadFile = async (url, fileFullPath) => {
   console.info('downloading file from url: ' + url);
   return new Promise((resolve, reject) => {
      http.get(url, (resp) => {

         // chunk received from the server
         resp.on('data', (chunk) => {
            // console.log(chunk);
            fs.appendFileSync(fileFullPath, chunk);
         });

         // last chunk received, we are done
         resp.on('end', () => {
            resolve('File downloaded and stored at: ' + fileFullPath);
            shell.openPath(fileFullPath);
         });

      }).on("error", (err) => {
         reject(new Error(err.message));
      });
   });
};

app.on('ready', async _ => {
   app.setAppUserModelId(APP_NAME);

   windowManager.showSplash();

   notificationService.showNotification('Check for update', 'Checkking for new update.....');

   const updateAvailable = await checkForUpdate();

   if (updateAvailable) {
      windowManager.showUpdater();
      notificationService.showNotification('New update available', 'downloading new update.....');
      await downloadFile(updateAvailable,'update.exe');
      app.hideSplash();
   }

   notificationService.showNotification('App Initiating', 'app is loading important data ...');
   db.setup().then(() => {
      notificationService.showNotification('App is ready', 'app has successfully initiated');
      tray = new Tray(path.join(__dirname, 'assets', 'logo', 'rubikomm.png'));
      windowManager.initTray(tray);
      windowManager.createAppWindow();
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

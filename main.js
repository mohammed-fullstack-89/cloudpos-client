require('./services/index');
const db = require('./models/index');
const windowManager = require('./window-manager-service')
const { app, BrowserWindow } = require('electron');

app.on('ready', async () => {
   // dbStore.init();
   windowManager.showSplash();
   await db.setup().then(() => {
      windowManager.createAppWindow();
   }).catch((error) => {
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
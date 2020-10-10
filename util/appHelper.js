const electron = require('electron');
const path = require('path');
const fs = require('fs');
const ipc = electron.ipcMain;
class AppHelper {


    init() {
        ipc.on('getAppPath', (event, ...args) => {
            console.log("dwwwwwwwww");
            const path = electron.app.getPath('userData');
            console.log("dwwwwwwwww11" + path);
            event.returnValue = path;
        });

        ipc.on('getPrinters', (event, ...args) => {
            event.returnValue = electron.webContents.getFocusedWebContents().getPrinters();
        })
    }



}
AppHelper.instance = null;
AppHelper.getInstance = function () {
    if (AppHelper.instance == null) {
        AppHelper.instance = new AppHelper();
    }
    return AppHelper.instance;
}

module.exports = AppHelper.getInstance();
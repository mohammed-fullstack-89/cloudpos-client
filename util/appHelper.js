const electron = require('electron');
const path = require('path');
const fs = require('fs');
const ipc = electron.ipcMain;
const { BrowserWindow } = electron;
const appStore = require('../services/store.service');
class AppHelper {


    // init() {
    //     appStore.init(electron.app.getPath('userData'));
    //     // ipc.on('getAppPath', (event, ...args) => {
    //     //     const path = electron.app.getPath('userData');
    //     //     event.returnValue = path;
    //     // });



    // }



}
AppHelper.instance = null;
AppHelper.getInstance = function () {
    if (AppHelper.instance == null) {
        AppHelper.instance = new AppHelper();
    }
    return AppHelper.instance;
}

module.exports = AppHelper.getInstance();
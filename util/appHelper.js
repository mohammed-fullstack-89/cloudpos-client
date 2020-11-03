const electron = require('electron');
const path = require('path');
const fs = require('fs');
const ipc = electron.ipcMain;
const { BrowserWindow } = electron;
const appStore = require('../services/store.service');
class AppHelper {

    // init() {
    //     ipc.handle('playSound', (event, ...args) => {
    //         var audio = new Audio('../assets/sound/item.mp3');
    //         audio.play();
    //     });
    // }
    // init() {
    //     appStore.init(electron.app.getPath('userData'));




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
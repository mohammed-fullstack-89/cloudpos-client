const electron = require("electron");
const { ipcMain, BrowserWindow } = electron;
const path = require('path');

class UtilityService {

    constructor() {
        this.code = "";
        this.lastKeyTime = Date.now();
        ipcMain.handle('playSound', (event, args) => this.playSound(args));
        ipcMain.handle('connectToLogger', (event, args) => this.connectToLogger(args));
        this.item_service = require('../repositories/item-repo');
    }

    connectToLogger(args) {
        const identifier = JSON.parse(args);
        if (identifier && identifier.code) {
            const os = require('os');
            const computerName = os.hostname();
            const userInfo = os.userInfo();
        }
    }

    playSound(type) {
        const dir = `file://${path.dirname(__dirname).replace(/\\/g, "/")}/assets/audio/${type}.mp3`;
        BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(`new Audio('${dir}').play();`);
    }

    async barcode(event, input) {
        if (input.type == 'keyDown') {
            const currentTime = Date.now();
            let cal = currentTime - this.lastKeyTime;
            if (currentTime - this.lastKeyTime > 500) {
                this.code = "";
            }
            if (input.code == "ShiftLeft" || input.code == "ShiftRight") {

            } else {
                if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
                    if (this.code.length > 1) {

                        const scaleIdentifierCode = this.code.substr(0, 2);
                        const scale = await (this.item_service.getScaleFromBarcode(scaleIdentifierCode));
                        const scaleObject = JSON.parse(scale);
                        if (scaleObject) {
                            const end = scaleObject.number_of_digit;
                            const codeWithoutStart = this.code.replace(`${scaleObject.start}`, '');
                            const trimmedCode = codeWithoutStart.slice(0, codeWithoutStart.length - end);
                            BrowserWindow.getFocusedWindow().webContents.executeJavaScript(`obj.getItemFromScale(${JSON.stringify(scale)}, ${JSON.stringify(trimmedCode)}).then((item) => { barcode(item, ${JSON.stringify(this.code)}) }); `);
                        } else {
                            BrowserWindow.getFocusedWindow().webContents.executeJavaScript(`obj.searchItems('barcode+serial', ${JSON.stringify(this.code)}).then((searchedItems) => { barcode(searchedItems,${JSON.stringify(this.code)}) }); `);
                        }
                        this.code = "";
                    }
                } else {
                    this.code += input.key;
                }
            }
            this.lastKeyTime = currentTime;
        }
    }
}

UtilityService._instance = null;
UtilityService.getInstance = () => {
    if (UtilityService._instance == null) {
        UtilityService._instance = new UtilityService();
    }
    return UtilityService._instance;
};
module.exports = UtilityService.getInstance();

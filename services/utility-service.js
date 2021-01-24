const electron = require("electron");
const { ipcMain, app, BrowserWindow } = electron;
const path = require('path');

class UtilityService {

    constructor() {
        this.code = "";
        this.lastKeyTime = Date.now();
        ipcMain.handle('playSound', (event, args) => {
            this.playSound(args)
        })
    }

    playSound(type) {
        const dir = `file://${path.dirname(__dirname).replace(/\\/g, "/")}/assets/audio/${type}.mp3`;
        BrowserWindow.getFocusedWindow().webContents.executeJavaScript(`new Audio('${dir}').play();`);
    }

    barcode(event, input) {
        if (input.type == 'keyDown') {
            const currentTime = Date.now();
            let cal = currentTime - this.lastKeyTime;
            if (currentTime - this.lastKeyTime > 500) {
                this.code = "";
            }
            if (input.code == "ShiftLeft" || input.code == "ShiftRight") {

            } else {
                if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
                    console.log("ddss"+this.code);
                    if (this.code.length > 1) {
                        // let items = [];
                        BrowserWindow.getFocusedWindow().webContents.executeJavaScript(`obj.searchBarcode(${JSON.stringify(this.code)}).then((searchedItems) => { barcode(searchedItems) }); `);
                        // this.mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${ JSON.stringify(code) }).then((searchedItems) => { barcode(searchedItems) }); `);
                        // const scaleIdentifierCode = code.substr(0, 2);
                        // const scale = await item_service.getScaleFromBarcode(scaleIdentifierCode);
                        // if (scale !== undefined) {
                        //    const scaleObject = JSON.parse(scale);
                        //    end = scaleObject.number_of_digits;
                        //    const trimmedCode = code.substr(0, code.length - end);
                        //    // const item = await item_service.getItemFromScale(JSON.stringify(scale), code);
                        //    this.mainWindow.webContents.executeJavaScript(`obj.getItemFromScale(${ JSON.stringify(scale) }, ${ trimmedCode }).then((item) => { barcode(item, ${ code }) }); `);
                        // } else {
                        // this.mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${ JSON.stringify(code) }).then((searchedItems) => { barcode(searchedItems) }); `);

                        // }
                        this.code = "";
                    }
                } else {
                    this.code += input.key
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
}
module.exports = UtilityService.getInstance();
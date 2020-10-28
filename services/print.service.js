const store = require('./store.service')
const electron = require('electron')
const ipc = electron.ipcRenderer;


class PrintService {

    constructor() {
        console.log("print created .....");
        ipc.on("closeSettingsWindow", (event, ...args) => {
            if (this.win != undefined && this.win != null) {
                this.win.close;
                this.win = null;
            }
        });
    }

    printHtmlDocument(html, copies) {
        console.log("printing");
        console.log(html);
        ipc.send("printHtmlDocument", html, copies);
    }

    openDrawer() {
        ipc.send("openDrawer");
    }


    printersSettings() {
        this.win = ipc.send("openPrintersSettings");

    }

}

PrintService.instance = null;

PrintService.getInstance = function () {
    if (PrintService.instance === null) {
        PrintService.instance = new PrintService();
    }
    return PrintService.instance;
}


module.exports = PrintService.getInstance();

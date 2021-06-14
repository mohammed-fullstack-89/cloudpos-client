const electron = require('electron')
const ipc = electron.ipcRenderer;


class PrintMiddleware {
    constructor() {
        ipc.on("closeSettingsWindow", (event, ...args) => {
            if (this.win != undefined && this.win != null) {
                this.win.close;
                this.win = null;
            }
        });
    }

    printHtmlDocument(html, copies) {
        ipc.send("printHtmlDocument", html, copies);
    }

    openDrawer() {
        ipc.send("openDrawer");
    }


    printersSettings() {
        this.win = ipc.send("openPrintersSettings");
    }

}

PrintMiddleware.instance = null;

PrintMiddleware.getInstance = function () {
    if (PrintMiddleware.instance === null) {
        PrintMiddleware.instance = new PrintMiddleware();
    }
    return PrintMiddleware.instance;
};


module.exports = PrintMiddleware.getInstance();

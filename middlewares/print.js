const electron = require('electron');
const ipc = electron.ipcRenderer;

class PrintMiddleware {
    constructor() {
    }

    printHtmlDocument(html, copies) {
        ipc.send("printHtmlDocument", html, copies);
    }

    openDrawer() {
        ipc.send("openDrawer");
    }

    printersSettings() {
        ipc.send("openPrintersSettings");
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

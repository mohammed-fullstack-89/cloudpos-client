const electron = require('electron');
const ipc = electron.ipcRenderer;

class PrintMiddleware {

    printHtmlDocument(html, copies) {
        ipc.send("printHtmlDocument", html, copies);
    }

    printKitchenReceipt(html, json, printer_id, copies) {
        ipc.send("printOrderReceipt", html, printer_id, copies);
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

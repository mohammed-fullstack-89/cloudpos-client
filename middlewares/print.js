const electron = require('electron');
const ipc = electron.ipcRenderer;

class PrintMiddleware {

    printHtmlDocument(html, copies) {
        ipc.invoke("printHtmlDocument", html, copies);
    }

    printKitchenReceipt(html, json_str, printer_id, copies) {
        ipc.invoke("printOrderReceipt", html, json_str, printer_id, copies);
    }

    openDrawer() {
        ipc.invoke("openDrawer");
    }

    printersSettings() {
        ipc.invoke("openPrintersSettings");
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

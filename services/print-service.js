const electron = require('electron');
const { ipcMain, BrowserWindow } = electron;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
const notificationService = require('./notification-service');
const printer = require('@thiagoelg/node-printer');

class PrintHelper {

    constructor() {
        ipcMain.on('printHtmlDocument', (event, ...args) => this.printReceiptHtml(args[0], args[1]));

        ipcMain.on('getPrinters', (event, ...args) => event.returnValue = printer.getPrinters());

        ipcMain.on('openPrintersSettings', (event, ...args) => windowManager.createSettingsWindow());

        ipcMain.on('openDrawer', (event, ...args) => this.openDrawer());
    }

    printReceiptHtml(html, copies) {
        const mainPrinter = appStore.getValue("mainPrinter");

        if (mainPrinter === "--choose Printer--") {
            return;
        }

        let printWindow = new BrowserWindow({
            autoHideMenuBar: true,
            center: true,
            closable: true,
            enableLargerThanScreen: true,
            focusable: false,
            fullscreen: true,
            fullscreenable: true,
            hasShadow: false,
            kiosk: true,
            maximizable: false,
            minimizable: false,
            modal: true,
            movable: false,
            opacity: 1.0,
            resizable: false,
            show: true,
            simpleFullscreen: true,
            frame: false,
            thickFrame: false,
            zoomToPageWidth: false
        });
        printWindow.loadURL("data:text/html;charset=utf-8," + html);

        printWindow.webContents.on("did-finish-load", () => {
            try {
                printWindow.webContents.print({
                    collate: false,
                    silent: true,
                    deviceName: mainPrinter,
                    copies: copies,
                    show: false,
                    margins: { marginType: 'custom', top: 0, right: 0, left: 0, bottom: 0 },
                    duplexMode:'simplex'
                }, (success, failureReason) => {
                    if (!success) {
                        notificationService.showNotification('Printing Error: ', failureReason);
                        console.log(failureReason);
                    } else {
                        console.log(success);
                    }
                });
            } catch (error) {
                console.log(`Error :  ${error}`);
            }
        });
    }


    openDrawer() {
        console.log('opening cash drawer ...');
        const mainPrinter = appStore.getValue("mainPrinter");

        if (mainPrinter === '--choose Printer--') {
            return;
        }

        printer.printDirect({
            data: '\x10\x14\x01\x00\x05',
            printer: mainPrinter, // printer name, if missing then will print to default printer
            type: 'RAW', // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            success: function (jobID) {
                console.log("sent to printer with ID: " + jobID);
            },
            error: function (err) {
                notificationService.showNotification('cash drawer', 'Failed opening cash drawer . please check if the cash drawer is connected to the printer .');
                console.log(err);
            }
        });

    }
}

PrintHelper.instance = null;
PrintHelper.getInstance = () => {
    if (PrintHelper.instance == null) {
        PrintHelper.instance = new PrintHelper();
    }
    return PrintHelper.instance;
};
module.exports = PrintHelper.getInstance();

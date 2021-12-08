const electron = require('electron');
const { ipcMain } = electron;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
const notificationService = require('./notification-service');
const printer = require('@thiagoelg/node-printer');
const { PosPrinter } = require('electron-pos-printer');

class PrintHelper {

    constructor() {
        ipcMain.on('printHtmlDocument', (event, ...args) => this.printReceiptHtml(args[0], args[1]));

        ipcMain.on('getPrinters', (event, ...args) => event.returnValue = electron.webContents.getFocusedWebContents().getPrinters());

        ipcMain.on('openPrintersSettings', (event, ...args) => windowManager.createSettingsWindow());

        ipcMain.on('openDrawer', (event, ...args) => this.openDrawer());
    }

    printReceiptHtml(html, copies) {
        try {
            const mainPrinter = appStore.getValue("mainPrinter");

            if (mainPrinter === '--choose Printer--') {
                return;
            }

            PosPrinter.print(
                [
                    {
                        type: 'text',
                        value: html,
                        style: 'direction:rtl;'
                    }
                ],
                {
                    preview: false,
                    silent: true,
                    width: '100%',
                    margin: '0 0 0 0',
                    copies: copies,
                    printerName: mainPrinter,
                    timeOutPerLine: 200
                }
            ).then(data => notificationService.showNotification('Printing', `using ${mainPrinter}`)).catch(error => console.error(error));
        } catch (error) {
            console.log(`error : ${err}`);
        }
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

const electron = require('electron');
const { ipcMain, BrowserWindow } = electron;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
const notificationService = require('./notification-service');
const printer = require('@thiagoelg/node-printer');

class PrintHelper {

    constructor() {
        ipcMain.on('printHtmlDocument', (event, ...args) => this.printHtmlDocument(args[0], args[1]));

        ipcMain.on('getPrinters', (event, ...args) => event.returnValue = electron.webContents.getFocusedWebContents().getPrinters());

        ipcMain.on('openDrawer', (event, ...args) => this.openDrawer());

        ipcMain.on('openPrintersSettings', (event, ...args) => {
            return windowManager.createSettingsWindow();
        });
    }

    printHtmlDocument(html, copies) {
        const mainPrinter = appStore.getValue("mainPrinter");
        const paperType = appStore.getValue("paperType");

        if (mainPrinter === "--choose Printer--") {
            notificationService.showNotification('Main printer not set yet !!!', 'main printer not selected, please make sure you set the main printer from settings window.')
            return;
        }

        if (paperType === 'receipt') {
            this.printPOSReceipt(html, copies, mainPrinter);
        } else if (paperType === 'normal') {
            this.printNormalPage(html, copies, mainPrinter);
        } else {
            notificationService.showNotification('Paper size not set yet !!!', 'paper size not selected, please make sure you set the paper size from settings window.');
        }
    }


    printPOSReceipt(html, copies, printerName) {
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
            show: false,
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
                    deviceName: printerName,
                    copies: copies,
                    show: false,
                    margins: { marginType: 'custom', top: 0, right: 0, left: 0, bottom: 0 },
                    duplexMode: 'simplex'
                }, (success, failureReason) => {
                    if (!success) {
                        notificationService.showNotification('Printing Error:', failureReason);
                    } else {
                        notificationService.showNotification('Printing:', success);
                    }
                });
            } catch (error) {
                console.log(`printPOSReceipt Error :  ${error}`);
            }
        });
    }

    printNormalPage(html, copies, printerName) {
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
            show: false,
            simpleFullscreen: true,
            frame: false,
            thickFrame: false,
            zoomToPageWidth: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        printWindow.loadURL("data:text/html;charset=utf-8," + html);

        printWindow.webContents.on("did-finish-load", () => {
            try {
                printWindow.webContents.print({
                    silent: false,
                    printBackground: true,
                    color: false,
                    margin: {
                        marginType: 'printableArea'
                    },
                    landscape: false,
                    pagesPerSheet: 1,
                    collate: false,
                    copies: copies
                }, (success, failureReason) => {
                    if (!success) {
                        notificationService.showNotification('Printing Error:', failureReason);
                    } else {
                        notificationService.showNotification('Printing:', success);
                    }
                });
            } catch (error) {
                console.log(`prinNormalPage Error :  ${error}`);
            }
        });
    }

    // printNormalPage(html, copies, printerName) {
    //     try {

    //         const posPrinterData = {
    //             type: 'text',
    //             value: html
    //         };

    //         const posPrinterOptions = {
    //             copies: copies,
    //             printerName: printerName,
    //             margin: '0 0 0 0',
    //             preview: false,
    //             silent: true,
    //             width: '100%',
    //             timeOutPerLine: 400000
    //         };

    //         PosPrinter.print(
    //             [posPrinterData],
    //             posPrinterOptions
    //         ).then(result => notificationService.showNotification('Printing:', result)
    //         ).catch(error => notificationService.showNotification('Printing Error:', error));
    //     } catch (error) {
    //         console.log(`printNormalPage Error :  ${error}`);
    //     }
    // }


    openDrawer() {
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
                notificationService.showNotification('Cash drawer', 'Failed opening cash drawer. please check if the cash drawer is connected to the printer.');
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

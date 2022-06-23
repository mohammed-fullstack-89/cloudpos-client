const electron = require('electron');
const { ipcMain, BrowserWindow } = electron;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
const notificationService = require('./notification-service');
const printer = require('@thiagoelg/node-printer');
const { PosPrinter } = require('electron-pos-printer');

class PrintHelper {

    constructor() {
        ipcMain.handle('printHtmlDocument', (event, ...args) => this.printHtmlDocument(args[0], args[1]));

        ipcMain.handle('printOrderReceipt', (event, ...args) => this.printOrderHtml(args[0], args[1], args[2], args[3]));

        ipcMain.on('getPrinters', (event, ...args) => electron.webContents.getFocusedWebContents().getPrintersAsync().then(printers => event.returnValue = printers));

        ipcMain.handle('openDrawer', (event, ...args) => this.openDrawer());

        ipcMain.handle('openPrintersSettings', (event, ...args) => {
            return windowManager.createSettingsWindow();
        });
    }

    printHtmlDocument(html, copies) {
        const mainPrinter = appStore.getValue("mainPrinter");
        const paperType = appStore.getValue("paperType");

        if (mainPrinter === "--choose printer--") {
            notificationService.showNotification('Main printer not set yet !!!', 'main printer not selected, please make sure you set the main printer from settings window.');
            return;
        }

        if (paperType === 'receipt') {
            this.printWebContentHTML(html, copies, mainPrinter);
        } else if (paperType === 'normal') {
            this.printPosPrinterHTML(html, copies, mainPrinter);
        } else {
            notificationService.showNotification('Paper size not set yet !!!', 'paper size not selected, please make sure you set the paper size from settings window.');
        }
    }

    printOrderHtml(html, json_str, printerId, copies) {
        const orderPrinter = appStore.getValue(`orderPrinter${printerId}`);
        if (orderPrinter === "--choose printer--") {
            notificationService.showNotification(`order printer not set yet !!!', 'order printer not selected, please make sure you selected order printer from settings window.`);
            return;
        }
        this.printPosPrinter(html, json_str, copies, orderPrinter);
    }

    printWebContentHTML(html, copies, printerName) {
        const printWindow = new BrowserWindow({
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
                    margins: { marginType: 'custom', top: 0, right: 0, left: 0, bottom: 0 }
                }, (success, failureReason) => {
                    if (!success) {
                        notificationService.showNotification('printWebContentHTML error :', failureReason);
                    } else {
                        notificationService.showNotification('printWebContentHTML printing :', success);
                    }
                });
            } catch (error) {
                console.log(`printWebContentHTML error:  ${error}`);
            }
        });
    }

    printPosPrinterHTML(html, copies, printerName) {
        try {
            const posPrinterData = {
                type: 'text',
                value: html
            };

            const posPrinterOptions = {
                copies: copies,
                printerName: printerName,
                margin: '0 0 0 0',
                preview: false,
                silent: true,
                width: '100%',
                timeOutPerLine: 400000
            };

            PosPrinter.print([posPrinterData], posPrinterOptions).then(result => notificationService.showNotification('printPosPrinterHTML printing:', result)
            ).catch(error => notificationService.showNotification('printPosPrinterHTML error:', error));
        } catch (error) {
            console.log(`printPosPrinterHTML error:  ${error}`);
        }
    }

    printPosPrinter(html, json_str, copies, printerName) {
        try {
            const posPrinterData = [
                {
                    type: 'text',
                    value: html,
                    css: { "font-weight": "normal", "font-size": "13px", "padding": "0", "margin": "0" }
                }
            ];

            const posPrinterOptions = {
                copies: copies,
                printerName: printerName,
                margin: '0 0 0 0',
                preview: false,
                silent: true,
                width: '100%',
                timeOutPerLine: 400000
            };

            PosPrinter.print(posPrinterData, posPrinterOptions).then(result => notificationService.showNotification('printPosPrinter printing:', result)
            ).catch(error => notificationService.showNotification('printPosPrinter error:', error));
        } catch (error) {
            console.log(`printPosPrinter error:  ${error}`);
        }
    }

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

const electron = require('electron');
const { BrowserWindow, ipcMain } = electron;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
const notificationService = require('./notification-service');
const printer = require('@thiagoelg/node-printer');
const { PosPrinter } = require("electron-pos-printer");
const DataForSendToPrinterTSC = require('./DataForSendToPrinterTSC');
class PrintHelper {
    constructor() {

        ipcMain.on('printHtmlDocument', (event, ...args) => {
            const html = args[0];
            const copies = args[1];
            this.printBarcodeHtmlAsImage(html, copies);
        });

        ipcMain.on('getPrinters', (event, ...args) => {
            event.returnValue = electron.webContents.getFocusedWebContents().getPrinters();
        });

        ipcMain.on('openPrintersSettings', (event, ...args) => {
            return windowManager.createSettingsWindow();
        });

        ipcMain.on('openDrawer', (event, ...args) => {
            this.openDrawer();
        })

    }
    async printBarcodeHtmlAsImage(html, copies) {
        let fullscreen = true;
        try {
            const mainPrinter = appStore.getValue("mainPrinter");
            for (let i = copies; i > 0; i--) {
                if (mainPrinter !== "--choose Printer--") {

                    var fs = require('fs');
                    try {
                        const labelWindow = new BrowserWindow({
                            show: false,
                            backgroundColor: '#ffffff',
                            width: 800,
                            fullscreen: fullscreen,
                            webPreferences: {
                                offscreen: false,
                                nodeIntegration: false, // is default value after Electron v5
                                contextIsolation: true, // protect against prototype pollution
                                enableRemoteModule: false,
                            },
                        });

                        const printBarcode = () => {

                            const options = {
                                preview: false,
                                //  width of content body
                                silent: true,
                                width: '400px',
                                margin: '0 0 0 0',            // margin of content body
                                copies: 1,                    // Number of copies to print
                                printerName: appStore.getValue("mainPrinter"),        // printerName: string, check with webContent.getPrinters()
                                timeOutPerLine: 4000000,
                                pageSize: { height: 301000, width: 71000 }  // page size
                            }
                            const path = require("path");
                            const data = [
                                {
                                    type: 'text',
                                    value: html,
                                    width: '100px',
                                    style: 'direction:rtl;text-align:center',

                                },
                            ]
                            PosPrinter.print(data, options)
                                .then(() => { })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                        printBarcode();

                        labelWindow.loadURL("data:text/html;charset=utf-8," + html);
                    } catch (err) {
                        console.log(`error : ${err}`);
                    }

                }

            }

        } catch (error) {
            console.log("error : " + error);
        }
    }
    printDocument(html, copies) {
        const mainPrinter = appStore.getValue("mainPrinter");
        notificationService.showNotification('Printing', `using ${mainPrinter}`);
        if (mainPrinter !== "--choose Printer--") {
            for (let i = 1; i <= copies; i++) {
                let printWindow = new BrowserWindow({
                    webPreferences: {
                        javascript: false,
                        contextIsolation: true,
                        devTools: false

                    },
                    parent: BrowserWindow.getFocusedWindow(),
                    modal: false,
                    show: false,
                });
                printWindow.removeMenu();
                printWindow.menu = null;
                printWindow.loadURL("data:text/html;charset=utf-8," + html);
                const options = {
                    collate: false, silent: true, deviceName: mainPrinter, copies: 1, show: false, margins: { marginType: 'custom', top: 0, right: 0, left: 0, bottom: 0 }
                }
                printWindow.webContents.on("did-finish-load", () => {
                    try {
                        printWindow.webContents.print(options, (success, errorType) => {
                            if (!success) {
                                console.log("check printer");
                                console.log(errorType);
                                printWindow.close();
                                notificationService.showNotification('Printing Error : ', errorType);

                            } else {
                                console.log("success");
                                console.log(errorType);
                                printWindow.close();

                            }
                        }, (failureReason, errorType) => {
                            if (!failureReason == null || !failureReason == '') {
                                notificationService.showNotification('Printing Error: ', failureReason)
                            }
                            else {
                                console.log(errorType)
                            }
                        })
                    } catch (error) {
                        console.log("Error : " + error);
                    } finally {

                    }
                })
            }
        }
    }
    openDrawer() {
        console.log('opening cash drawer ...');
        const mainPrinter = appStore.getValue("mainPrinter");
        if (mainPrinter !== "--choose Printer--") {
            printer.printDirect({
                data: '\x10\x14\x01\x00\x05'
                , printer: appStore.getValue("mainPrinter") // printer name, if missing then will print to default printer
                , type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
                , success: function (jobID) {
                    console.log("sent to printer with ID: " + jobID);
                }
                , error: function (err) { notificationService.showNotification('cash drawer', 'Failed opening cash drawer . please check if the cash drawer is connected to the printer .'); console.log(err); }
            });

        }
    }
}
PrintHelper.instance = null;
PrintHelper.getInstance = () => {
    if (PrintHelper.instance == null) {
        PrintHelper.instance = new PrintHelper();
    }
    return PrintHelper.instance;
}

module.exports = PrintHelper.getInstance();
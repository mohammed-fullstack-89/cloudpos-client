const path = require('path');
const { BrowserWindow, ipcMain } = require('electron');
const rootPath = require('electron-root-path').rootPath;
const appStore = require('./store-service');
const windowManager = require('./window-manager-service');
class PrintHelper {
    constructor() {

        ipcMain.on('printHtmlDocument', (event, ...args) => {
            const html = args[0];
            const copies = args[1];
            this.printDocument(html, copies);
        });

        ipcMain.on('getPrinters', (event, ...args) => {
            event.returnValue = electron.webContents.getFocusedWebContents().getPrinters();
        });

        ipcMain.on('openPrintersSettings', (event, ...args) => {
            windowManager.createSettingsWindow();
        });

        ipcMain.on('openDrawer', (event, ...args) => {
            this.openDrawer();
        })

    }

    printDocument(html, copies) {
        for (let i = 1; i <= copies; i++) {
            let printWindow = new BrowserWindow({
                webPreferences: {
                    javascript: false,
                    contextIsolation: true,
                },
                parent: BrowserWindow.getFocusedWindow(),
                modal: false,
                show: false,
            });

            printWindow.removeMenu();
            printWindow.menu = null;
            printWindow.loadURL("data:text/html;charset=utf-8," + html);

            const options = { collate: false, silent: true, deviceName: appStore.getValue("mainPrinter"), copies: 1 }
            printWindow.webContents.on("did-finish-load", () => {
                try {
                    printWindow.webContents.print(options, (success, errorType) => {
                        if (!success) {
                            console.log("check printer");
                            console.log(errorType);
                            // printWindow.close()
                        }
                        else {
                            console.log("success");
                            console.log(errorType);
                            // printWindow.close()

                        }
                    }, (failureReason, errorType) => {
                        if (!failureReason == null || failureReason == '') {
                            console.log("fail..unknown reason")
                            console.log("error : " + errorType + " reason : " + failureReason)
                        }
                        else {
                            console.log("fail..")
                            console.log(errorType)
                        }
                    })
                } catch (error) {
                    console.log("error : " + error);
                } finally {
                    printWindow.close()
                }
            })
        }
    }
    openDrawer() {
        const printer = require('@thiagoelg/node-printer');
        printer.printDirect({
            data: '\x10\x14\x01\x00\x05'
            , printer: appStore.getValue("mainPrinter") // printer name, if missing then will print to default printer
            , type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            , success: function (jobID) {
                console.log("sent to printer with ID: " + jobID);
            }
            , error: function (err) { console.log(err); }
        });

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
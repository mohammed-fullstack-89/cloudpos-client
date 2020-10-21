const electron = require('electron');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');
const ipc = electron.ipcMain;
const { BrowserWindow } = electron;


// Import ES5 way
const rootPath = require('electron-root-path').rootPath;
// const APP_HELPER = require('../util/appHelper')
const appStore = require('../services/store.service');

class PrintHelper {

    init() {
        ipc.on('printHtmlDocument', (event, ...args) => {
            const html = args[0];
            const copies = args[1];
            console.log("html " + html);
            for (let i = 1; i <= copies; i++) {
                let printWindow = new BrowserWindow({
                    webPreferences: {
                        javascript: false,
                        contextIsolation: true
                    },
                    parent: BrowserWindow.getFocusedWindow(),
                    modal: true,
                    show: true,

                })
                // printWindow.webContents.openDevTools();
                //remove menu in the print window
                printWindow.removeMenu();
                printWindow.menu = null;

                //load html in the print window
                // printWindow.loadURL('data:text/html;charset=utf-8,' + "<body dir=\"rtl\" style=\"margin:0; padding:0;\"><div style=\"text-align: center; padding: 0; margin: 0;\"><img style=\"width: 250px;\" src=\"/assets/images/receipt-logo-mono.png\"/></p><p style=\"text-align: center;\">رقم الطلب: 1956<p style=\"text-align: center;\">رقم الطاولة: 2<p style=\"text-align: center; padding: 0; margin: 0;\">اسم الموظف: adminالوقت: 2018/9/27 12:45:42</p><table style=\"width: 100%; margin:0; padding:0; float:right;\"><tr><th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> الاسم </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> الكمية </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> السعر </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> المجموع </th></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">وجبة شاورما لحم عادي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">3.00 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">3.00 </td></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">ديناميت شاورما دجاج ايطالي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.00 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.00 </td></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">ديناميت شاورما لحمة ايطالي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.25 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.25 </td></tr><tr><td></td><td style=\"text-align: right; margin:0; padding:0;\"></td></tr><tr><td><b>المجموع: 3عنصر</b></td><td style=\"text-align: right; margin:0; padding:0;\"><b>11.25 </b></td></tr><tr><td>طريقة الدفع:</td><td style=\"text-align: right; margin:0; padding:0;\">كاش</td></tr><tr><td>المبلغ المدفوع: </td><td style=\"text-align: right; margin:0; padding:0;\">11.25 </td></tr><tr><td>الباقي: </td><td style=\"text-align: right; margin:0; padding:0;\">0.00 </td></tr></table></body>")
                printWindow.loadURL("data:text/html;charset=utf-8," + html);

                const options = { collate: false, silent: true, deviceName: appStore.getValue("mainPrinter"), copies: 1 }
                printWindow.webContents.on("did-finish-load", function () {

                    printWindow.webContents.print(options, (success, errorType) => {
                        if (!success) {
                            console.log("check printer")
                            console.log(errorType)
                            // printWindow.close()
                        }
                        else {
                            console.log("success")
                            console.log(errorType)
                            // printWindow.close()

                        }
                    }, (failureReason, errorType) => {
                        if (!failureReason == null || failureReason == '') {
                            console.log("fail..unknown reason")
                            console.log("error : " + errorType + " reason : " + failureReason)
                            // printWindow.close()

                        }
                        else {
                            console.log("fail..")
                            console.log(errorType)
                            // printWindow.close()

                        }
                    })

                    // Use default printing options

                })
            }
        });

        ipc.on('getPrinters', (event, ...args) => {
            event.returnValue = electron.webContents.getFocusedWebContents().getPrinters();
        });

        ipc.on('openPrintersSettings', (event, ...args) => {

            let win = new BrowserWindow({
                alwaysOnTop: true,
                resizable: false,
                maxHeight: 200,
                maxWidth: 200,
                modal: false,
                useContentSize: true,

                title: "Settings",
                webPreferences: {
                    devTools: true,
                    nodeIntegration: true,
                },
                // backgroundColor: '#2e2c29' 
            });

            win.removeMenu();
            win.menu = null;
            win.loadFile(path.join(rootPath, 'windows/settings/settings.html'));
            event.returnValue = win;

        });

        ipc.on('openDrawer', (event, ...args) => {
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
            // let printWindow = new BrowserWindow({
            //     webPreferences: {
            //         javascript: false,
            //         contextIsolation: true
            //     },
            //     parent: BrowserWindow.getFocusedWindow(),
            //     modal: true,
            //     show: false,
            // })

            // //remove menu in the print window
            // printWindow.removeMenu();
            // printWindow.menu = null;

            // const options = { collate: false, silent: true, deviceName: appStore.getValue("mainPrinter"), copies: 1 }

            // printWindow.webContents.on("did-finish-load", function () {
            //     printWindow.webContents.insertText("27, 112, 48, 55, 121");
            //     printWindow.webContents.print(options, (success, errorType) => {
            //         if (!success) {
            //             console.log("check printer")
            //             console.log(errorType)
            //             // printWindow.close()
            //         }
            //         else {
            //             console.log("success")
            //             console.log(errorType)
            //             // printWindow.close()

            //         }
            //     }, (failureReason, errorType) => {
            //         if (!failureReason == null || failureReason == '') {
            //             console.log("fail..unknown reason")
            //             console.log("error : " + errorType + " reason : " + failureReason)
            //             // printWindow.close()

            //         }
            //         else {
            //             console.log("fail..")
            //             console.log(errorType)
            //             // printWindow.close()

            //         }
            //     })

            //     // Use default printing options

            // })
            // }
            // const { PosPrinter } = require("electron-pos-printer");
            // const path = require("path");

            // const options = {
            //     preview: true,
            //     silent: true,           // Preview in window or print
            //     width: '170px',               //  width of content body
            //     margin: '0 0 0 0',            // margin of content body
            //     copies: 1,                    // Number of copies to print
            //     printerName: 'XPc2',        // printerName: string, check with webContent.getPrinters()
            //     timeOutPerLine: 400,
            //     pageSize: { height: 301000, width: 71000 }  // page size
            // }

            // const data = [
            //     {
            //         type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            //         value: '27, 112, 48, 55, 121',

            //     }
            // ]

            // PosPrinter.print(data, options)
            //     .then(() => { })
            //     .catch((error) => {
            //         console.error(error);
            //     });
            // let printWindow = new BrowserWindow({
            //     webPreferences: {
            //         javascript: false,
            //         contextIsolation: true
            //     },
            //     parent: BrowserWindow.getFocusedWindow(),
            //     modal: true,
            //     show: false,
            // });


            // printWindow.loadURL('\x1b\x70\x00\x19\xfa');
            //     printWindow.webContents.print(options, (success, errorType) => {
            //         if (!success) {
            //             console.log("check printer")
            //             console.log(errorType)
            //             printWindow.close()
            //         }
            //         else {
            //             console.log("success")
            //             console.log(errorType)
            //             printWindow.close()

            //         }
            //     }, (failureReason, errorType) => {
            //         if (!failureReason == null || failureReason == '') {
            //             console.log("fail..unknown reason")
            //             console.log("error : " + errorType + " reason : " + failureReason)
            //             printWindow.close()

            //         }
            //         else {
            //             console.log("fail..")
            //             console.log(errorType)
            //             printWindow.close()

            //         }
            //     })

        })



    }



}
PrintHelper.instance = null;
PrintHelper.getInstance = function () {
    if (PrintHelper.instance == null) {
        PrintHelper.instance = new PrintHelper();
    }
    return PrintHelper.instance;
}

module.exports = PrintHelper.getInstance();
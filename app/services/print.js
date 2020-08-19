const Store = require('./store')
const electron = require('electron')
const remote = electron.remote;

var store = new Store(
    {
        configName: 'user-preferences',
        defaults: {
            mainPrinter: "--choose Printer--",
            KitchenPrinter1: "--choose Printer--",
            KitchenPrinter2: "--choose Printer--",
            KitchenPrinter3: "--choose Printer--",
            KitchenPrinter4: "--choose Printer--",
            InnerPrinter: "--choose Printer--",

        }
    }).getInstance();

class PrintService {

    constructor() {
        console.log("print created .....");

    }

    browserPrintHtml(html) {
        console.log("printing")
        console.log(html)
        let printWindow = new remote.BrowserWindow({
            webPreferences: {
                javascript: false,
                contextIsolation: true
            },
            parent: remote.getCurrentWindow(),
            modal: true,
            show: false,

        })


        //remove menu in the print window
        printWindow.removeMenu();
        printWindow.menu = null;
        //load html in the print window
        printWindow.loadURL('data:text/html;charset=utf-8,' + html)
        const options = { silent: true, deviceName: store.get("mainPrinter") }
        printWindow.webContents.print(options, (success, errorType) => {
            if (!success) {
                console.log("check printer")
                console.log(errorType)
                printWindow.close()

            }
            else {
                console.log("success")
                console.log(errorType)
                printWindow.close()

            }
        }, (failureReason, errorType) => {
            if (!failureReason == null || failureReason == '') {
                console.log("fail..unknown reason")
                console.log(errorType)
                printWindow.close()

            }
            else {
                console.log("fail..")
                console.log(errorType)
                printWindow.close()

            }
        })

    }
    printAndroidOrder(html, pchtml) {
        console.log(pchtml)
        console.log(html)
        let printWindow = new remote.BrowserWindow({
            webPreferences: {
                javascript: false,
                contextIsolation: true,

            },
            parent: remote.getCurrentWindow(),
            modal: true,
            show: false,

        })


        //remove menu in the print window
        printWindow.removeMenu();
        printWindow.menu = null;
        //load html in the print window
        printWindow.loadURL('data:text/html;charset=utf-8,' + pchtml)
        // printWindow.setSize(0, 0)
        const options = { silent: true, deviceName: store.get("mainPrinter") }
        printWindow.webContents.print(options, (success, errorType) => {
            if (!success) {
                console.log("check printer")
                console.log(errorType)
                printWindow.close()

            }
            else {
                console.log("success")
                console.log(errorType)
                printWindow.close()

            }
        }, (failureReason, errorType) => {
            if (!failureReason == null || failureReason == '') {
                console.log("fail..unknown reason")
                console.log(errorType)
                printWindow.close()

            }
            else {
                console.log("fail..")
                console.log(errorType)
                printWindow.close()

            }
        })


    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new PrintService();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

module.exports = Singleton;

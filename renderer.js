
const electron = require('electron')
const remote = electron.remote;
const Print = require('./app/services/print.js')

var print = new Print().getInstance();


window.obj1 = {
    browserPrintHtml(html) {
        print.browserPrintHtml(html)
        console.log("object --> windowsPrinter : browserPrintHtml")
    },
    printAndroidOrder(html, pchtml) {
        print.printAndroidOrder(html, pchtml)

        console.log("object --> windowsPrinter : printAndroidOrder")
    }
}

window.windowsPrinter = {
    browserPrintHtml(html) {
        print.browserPrintHtml(html)
        console.log("object --> windowsPrinter : browserPrintHtml")
    },
    printAndroidOrder(html, pchtml) {
        print.printAndroidOrder(html, pchtml)
        console.log("object --> windowsPrinter : printAndroidOrder")

    }

}

window.addEventListener('focus', () => remote.webContents.focus())
// window.addEventListener('focus', () => theWebViewElement.focus())


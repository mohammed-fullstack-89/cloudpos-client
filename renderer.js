const communicator = require('./services/communicator.service');

// const barcodeScanListener = require('./util/barcode')


// const removeScanListener = barcodeScanListener.onScan({
//     barcodePrefix: 'L%',
//     barcodeValueTest: /^123$/,
//     finishScanOnMatch: true,
//     scanDuration: 500
// }, function (barcode) {
//     console.log("sadasd");
// });

window.obj = communicator;
// window.jQuery = require('jquery');
// window.$ = window.jQuery = require('jquery');
// const dbStore = require('./services/service.db');

// db.setup().then(() => {
//     window.obj = dbStore;
//     console.log("db-initiating : Done ");
//     ipc.sendSync('db-initiating', "done");

// }).catch((error) => {
//     console.log("db-initiating : fail " + error);
//     ipc.sendSync('db-initiating', 'fail');
// });



const print = require('./services/print.service');
// const dbStore = require('./services/service.db');
// window.obj = dbStore;
// // window.windowsPrinter = print;


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

// // {
// //     browserPrintHtml(html) {
// //         print.browserPrintHtml(html)
// //         console.log("object --> windowsPrinter : browserPrintHtml")
// //     },
// //     printAndroidOrder(html, pchtml) {
// //         print.printAndroidOrder(html, pchtml)
// //         console.log("object --> windowsPrinter : printAndroidOrder")

// //     }

// // }

// // window.addEventListener('focus', () => remote.webContents.focus())
// // window.addEventListener('focus', () => theWebViewElement.focus())


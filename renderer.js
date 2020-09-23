
// const print = require('./app/services/service.print')
const dbStore = require('./app/services/service.db');
const db = require('./app/db/db.manager');

db.setup();

window.obj = dbStore;
// window.windowsPrinter = print;


// window.obj1 = {
//     browserPrintHtml(html) {
//         print.browserPrintHtml(html)
//         console.log("object --> windowsPrinter : browserPrintHtml")
//     },
//     printAndroidOrder(html, pchtml) {
//         print.printAndroidOrder(html, pchtml)
//         console.log("object --> windowsPrinter : printAndroidOrder")
//     }
// }

// {
//     browserPrintHtml(html) {
//         print.browserPrintHtml(html)
//         console.log("object --> windowsPrinter : browserPrintHtml")
//     },
//     printAndroidOrder(html, pchtml) {
//         print.printAndroidOrder(html, pchtml)
//         console.log("object --> windowsPrinter : printAndroidOrder")

//     }

// }

// window.addEventListener('focus', () => remote.webContents.focus())
// window.addEventListener('focus', () => theWebViewElement.focus())


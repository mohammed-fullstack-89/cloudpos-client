const store = require('./store.service')
const electron = require('electron')
const remote = electron.remote;


class PrintService {

    constructor() {
        console.log("print created .....");
    }


    browserPrintHtml(html) {
        console.log("printing");
        console.log(html);
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
        // printWindow.loadURL('data:text/html;charset=utf-8,' + "<body dir=\"rtl\" style=\"margin:0; padding:0;\"><div style=\"text-align: center; padding: 0; margin: 0;\"><img style=\"width: 250px;\" src=\"/assets/images/receipt-logo-mono.png\"/></p><p style=\"text-align: center;\">رقم الطلب: 1956<p style=\"text-align: center;\">رقم الطاولة: 2<p style=\"text-align: center; padding: 0; margin: 0;\">اسم الموظف: adminالوقت: 2018/9/27 12:45:42</p><table style=\"width: 100%; margin:0; padding:0; float:right;\"><tr><th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> الاسم </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> الكمية </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> السعر </th> <th style=\"text-align:right; border:1px solid black; margin:0; padding:0;\"> المجموع </th></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">وجبة شاورما لحم عادي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">3.00 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">3.00 </td></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">ديناميت شاورما دجاج ايطالي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.00 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.00 </td></tr><tr><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">ديناميت شاورما لحمة ايطالي</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">1</td> <td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.25 </td><td style=\"text-align:right; margin:0; padding:0; border:1px solid black;\">4.25 </td></tr><tr><td></td><td style=\"text-align: right; margin:0; padding:0;\"></td></tr><tr><td><b>المجموع: 3عنصر</b></td><td style=\"text-align: right; margin:0; padding:0;\"><b>11.25 </b></td></tr><tr><td>طريقة الدفع:</td><td style=\"text-align: right; margin:0; padding:0;\">كاش</td></tr><tr><td>المبلغ المدفوع: </td><td style=\"text-align: right; margin:0; padding:0;\">11.25 </td></tr><tr><td>الباقي: </td><td style=\"text-align: right; margin:0; padding:0;\">0.00 </td></tr></table></body>")
        printWindow.loadURL('data:text/html;charset=utf-8,' + html)
        const options = { silent: true, deviceName: store.get("mainPrinter") }
        printWindow.webContents.on("did-finish-load", function () {
            // Use default printing options
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
                    console.log("error : " + errorType + " reason : " + failureReason)
                    printWindow.close()

                }
                else {
                    console.log("fail..")
                    console.log(errorType)
                    printWindow.close()

                }
            })
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
                console.log("error : " + errorType + " reason : " + failureReason)
                printWindow.close()

            }
            else {
                console.log("fail..")
                console.log(errorType)
                printWindow.close()

            }
        })


    }
    //     if(printService.caller != printService.getInstance) {
    //     throw new Error("This object cannot be instanciated");
    // }
}

PrintService.instance = null;

PrintService.getInstance = function () {
    if (PrintService.instance === null) {
        PrintService.instance = new PrintService();
    }
    return PrintService.instance;
}


module.exports = PrintService.getInstance();

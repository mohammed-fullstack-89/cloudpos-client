
const { ipcRenderer } = require('electron');
const printers = ipcRenderer.sendSync("getPrinters");

$(document).ready(() => {
    console.log("ready");
    init();
});

function init() {
    getPrinters();
}

function savePreferances() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");

    localSettings.mainPrinter = (document.getElementById('main') == null || document.getElementById('main').value == null || document.getElementById('main').value == undefined || document.getElementById('main').value == 'undefined' || document.getElementById('main').value == '' ? '--choose Printer--' : document.getElementById('main').value);
    // localSettings.KitchenPrinter1 = (document.getElementById('k1') == null || document.getElementById('k1').value == null || document.getElementById('k1').value == undefined || document.getElementById('k1').value == 'undefined' || document.getElementById('k1').value == '' ? '--choose Printer--' : document.getElementById('k1').value);
    // localSettings.KitchenPrinter2 = (document.getElementById('k2') == null || document.getElementById('k2').value == null || document.getElementById('k2').value == undefined || document.getElementById('k2').value == 'undefined' || document.getElementById('k2').value == '' ? '--choose Printer--' : document.getElementById('k2').value);
    // localSettings.KitchenPrinter3 = (document.getElementById('k3') == null || document.getElementById('k3').value == null || document.getElementById('k3').value == undefined || document.getElementById('k3').value == 'undefined' || document.getElementById('k3').value == '' ? '--choose Printer--' : document.getElementById('k3').value);
    // localSettings.KitchenPrinter4 = (document.getElementById('k4') == null || document.getElementById('k4').value == null || document.getElementById('k4').value == undefined || document.getElementById('k4').value == 'undefined' || document.getElementById('k4').value == '' ? '--choose Printer--' : document.getElementById('k4').value);
    // localSettings.InnerPrinter = (document.getElementById('inner') == null || document.getElementById('inner').value == null || document.getElementById('inner').value == undefined || document.getElementById('inner').value == 'undefined' || document.getElementById('inner').value == '' ? '--choose Printer--' : document.getElementById('inner').value);
    // currentWindow.close();

    Object.keys(localSettings).forEach((setting) => ipcRenderer.send('setlocalSettings', setting, localSettings[setting]));
}
// function cancel() {
//     currentWindow.close();
// }
function setSelectedPrinters() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");
    document.getElementById('main').value = localSettings.mainPrinter;
    // sel.value = store.getValue('mainPrinter');
}

function getPrinters() {
    let sel = document.getElementById('main');
    // let k1 = document.getElementById('k1');
    // let k2 = document.getElementById('k2');
    // let k3 = document.getElementById('k3');
    // let k4 = document.getElementById('k4');
    // let inner = document.getElementById('inner');
    let defaultopt = document.createElement('option');
    defaultopt.appendChild(document.createTextNode("--choose Printer--"));
    defaultopt.value = "--choose Printer--";
    sel.appendChild(defaultopt);
    printers.forEach((p) => {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(p.name));
        opt.value = p.name;
        sel.appendChild(opt);
    })
    // k1.innerHTML = sel.innerHTML;
    // k2.innerHTML = sel.innerHTML;
    // k3.innerHTML = sel.innerHTML;
    // k4.innerHTML = sel.innerHTML;
    // inner.innerHTML = sel.innerHTML;
    setSelectedPrinters();
}

save = () => {
    console.log("saving");
    savePreferances();
    ipcRenderer.send('closeSettingsWindow');
}
// function hideDialog() {
//     cancel();
// }
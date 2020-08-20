
const electron = require('electron')
const { remote } = electron
const Store = require('../app/js/store/store.js')



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

const currentWindow = remote.getCurrentWindow();
const printers = currentWindow.webContents.getPrinters();


init();
function init() {

    getPrinters();

}

function savePreferances() {

    store.set('mainPrinter', document.getElementById('main') == null || document.getElementById('main').value == null || document.getElementById('main').value == undefined || document.getElementById('main').value == 'undefined' || document.getElementById('main').value == '' ? '--choose Printer--' : document.getElementById('main').value);
    store.set('KitchenPrinter1', document.getElementById('k1') == null || document.getElementById('k1').value == null || document.getElementById('k1').value == undefined || document.getElementById('k1').value == 'undefined' || document.getElementById('k1').value == '' ? '--choose Printer--' : document.getElementById('k1').value);
    store.set('KitchenPrinter2', document.getElementById('k2') == null || document.getElementById('k2').value == null || document.getElementById('k2').value == undefined || document.getElementById('k2').value == 'undefined' || document.getElementById('k2').value == '' ? '--choose Printer--' : document.getElementById('k2').value);
    store.set('KitchenPrinter3', document.getElementById('k3') == null || document.getElementById('k3').value == null || document.getElementById('k3').value == undefined || document.getElementById('k3').value == 'undefined' || document.getElementById('k3').value == '' ? '--choose Printer--' : document.getElementById('k3').value);
    store.set('KitchenPrinter4', document.getElementById('k4') == null || document.getElementById('k4').value == null || document.getElementById('k4').value == undefined || document.getElementById('k4').value == 'undefined' || document.getElementById('k4').value == '' ? '--choose Printer--' : document.getElementById('k4').value);
    store.set('InnerPrinter', document.getElementById('inner') == null || document.getElementById('inner').value == null || document.getElementById('inner').value == undefined || document.getElementById('inner').value == 'undefined' || document.getElementById('inner').value == '' ? '--choose Printer--' : document.getElementById('inner').value);
    currentWindow.close();
}
function cancel() {
    currentWindow.close();
}
function setSelectedPrinters() {
    var sel = document.getElementById('main');
    sel.value = store.get('mainPrinter');
}
function getPrinters() {
    var sel = document.getElementById('main');
    var k1 = document.getElementById('k1');
    var k2 = document.getElementById('k2');
    var k3 = document.getElementById('k3');
    var k4 = document.getElementById('k4');
    var inner = document.getElementById('inner');
    var defaultopt = document.createElement('option');
    defaultopt.appendChild(document.createTextNode("--choose Printer--"));
    defaultopt.value = "--choose Printer--";
    sel.appendChild(defaultopt);
    printers.forEach((p) => {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(p.name));
        opt.value = p.name;
        sel.appendChild(opt);
    })
    k1.innerHTML = sel.innerHTML;
    k2.innerHTML = sel.innerHTML;
    k3.innerHTML = sel.innerHTML;
    k4.innerHTML = sel.innerHTML;
    inner.innerHTML = sel.innerHTML;

    setSelectedPrinters();

    document.getElementById('save').onclick = function () {
        savePreferances();
    }

    document.getElementById('cancel').onclick = function () {
        cancel();
    }


}

const ipcRenderer = require('electron').ipcRenderer;
const printers = ipcRenderer.sendSync("getPrinters");

let activeMenuItemElement = null;
let activeContentContainerElement = null;

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
    activeMenuItemElement = document.getElementsByClassName('active')[0];
    getPrinters('main-printer');
    getPrinters('printer1');
    getPrinters('printer2');
    getPrinters('printer3');
    getPrinters('printer4');
    getPrinters('printer5');
    getPrinters('printer6');
    loadSelectedSettings();
}

function showContentRelated(element, contentToShow) {
    if (activeMenuItemElement != element) {
        activeMenuItemElement.classList.remove('active');
        element.classList.add('active');
        activeMenuItemElement = element;

        activeContentContainerElement.style.display = 'none';
        const active_content = document.getElementsByClassName(contentToShow)[0];
        active_content.style.display = 'flex';
        activeContentContainerElement = active_content;
    }
}

function savePreferances() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");
    localSettings.mainPrinter = (document.getElementById('main-printer') == null || document.getElementById('main-printer').value == null || document.getElementById('main-printer').value == undefined || document.getElementById('main-printer').value == 'undefined' || document.getElementById('main-printer').value == '' ? '--choose Printer--' : document.getElementById('main-printer').value);
    localSettings.orderPrinter1 = document.getElementById('printer1').value;
    localSettings.orderPrinter2 = document.getElementById('printer2').value;
    localSettings.orderPrinter3 = document.getElementById('printer3').value;
    localSettings.orderPrinter4 = document.getElementById('printer4').value;
    localSettings.orderPrinter5 = document.getElementById('printer5').value;
    localSettings.orderPrinter6 = document.getElementById('printer6').value;
    localSettings.paperType = document.getElementById('paper-type').value;
    Object.keys(localSettings).forEach(setting => ipcRenderer.send('setlocalSettings', setting, localSettings[setting]));
}

function loadSelectedSettings() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");
    document.getElementById('main-printer').value = localSettings.mainPrinter;
    document.getElementById('paper-type').value = localSettings.paperType;
    document.getElementById('printer1').value = localSettings.orderPrinter1;
    document.getElementById('printer2').value = localSettings.orderPrinter2;
    document.getElementById('printer3').value = localSettings.orderPrinter3;
    document.getElementById('printer4').value = localSettings.orderPrinter4;
    document.getElementById('printer5').value = localSettings.orderPrinter5;
    document.getElementById('printer6').value = localSettings.orderPrinter6;
}

function getPrinters(selectName) {
    const sel = document.getElementById(selectName);
    const defaultopt = document.createElement('option');
    defaultopt.appendChild(document.createTextNode("--choose printer--"));
    defaultopt.value = "--choose printer--";
    sel.appendChild(defaultopt);
    printers.forEach(p => {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(p.name));
        opt.value = p.name;
        sel.appendChild(opt);
    });
}

function save() {
    savePreferances();
    ipcRenderer.send('closeSettingsWindow');
}
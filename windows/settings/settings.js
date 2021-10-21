
const ipcRenderer = require('electron').ipcRenderer;
const printers = ipcRenderer.sendSync("getPrinters");

let activeMenuItemElement = null;
let activeContentContainerElement = null;

document.addEventListener("DOMContentLoaded", function () {
    console.log("ready");
    init();
});

function init() {
    activeMenuItemElement = document.getElementsByClassName('active')[0];
    Array.prototype.forEach.call(document.getElementsByClassName('container'), element => element.style.display = 'none');
    activeContentContainerElement = document.getElementsByClassName('container')[0];
    activeContentContainerElement.style.display = 'flex';
    getPrinters();
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
    localSettings.mainPrinter = (document.getElementById('main') == null || document.getElementById('main').value == null || document.getElementById('main').value == undefined || document.getElementById('main').value == 'undefined' || document.getElementById('main').value == '' ? '--choose Printer--' : document.getElementById('main').value);
    Object.keys(localSettings).forEach(setting => ipcRenderer.send('setlocalSettings', setting, localSettings[setting]));
}

function setSelectedPrinters() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");
    document.getElementById('main').value = localSettings.mainPrinter;
}

function getPrinters() {
    const sel = document.getElementById('main');
    const defaultopt = document.createElement('option');
    defaultopt.appendChild(document.createTextNode("--choose Printer--"));
    defaultopt.value = "--choose Printer--";
    sel.appendChild(defaultopt);
    printers.forEach(p => {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(p.name));
        opt.value = p.name;
        sel.appendChild(opt);
    });
    setSelectedPrinters();
}

function save() {
    savePreferances();
    ipcRenderer.send('closeSettingsWindow');
}

const ipcRenderer = require('electron').ipcRenderer;
const printers = ipcRenderer.sendSync("getPrinters");

let activeMenuItemElement = null;
let activeContentContainerElement = null;

document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
    activeMenuItemElement = document.getElementsByClassName('active')[0];
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
    localSettings.mainPrinter = (document.getElementById('main-printer') == null || document.getElementById('main-printer').value == null || document.getElementById('main-printer').value == undefined || document.getElementById('main-printer').value == 'undefined' || document.getElementById('main-printer').value == '' ? '--choose Printer--' : document.getElementById('main-printer').value);
    localSettings.paperType = document.getElementById('paper-type').value;
    Object.keys(localSettings).forEach(setting => ipcRenderer.send('setlocalSettings', setting, localSettings[setting]));
}

function loadSelectedSettings() {
    const localSettings = ipcRenderer.sendSync("getlocalSettings");
    document.getElementById('main-printer').value = localSettings.mainPrinter;
    document.getElementById('paper-type').value = localSettings.paperType;
}

function getPrinters() {
    const sel = document.getElementById('main-printer');
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
    loadSelectedSettings();
}

function save() {
    savePreferances();
    ipcRenderer.send('closeSettingsWindow');
}
const windowsConfig = require('../config/windowsConfig');
const fs = require('fs');
const path = require('path');
const enviroment = require('../enviroment');
const customContextMenu = require('../components/menu/context_menu');
const { app, BrowserWindow, Menu, dialog } = require('electron');
class InitializerService {

    constructor() {
        this.splash = null;
    }
    createAppWindow() {
        app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
        const mainWindow = new BrowserWindow(windowsConfig.mainWindowConfig);
        mainWindow.webContents.setAudioMuted(false);
        const customMenu = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Settings',
                        click: () => this.createSettingsWindow()
                    },
                    {
                        label: 'Clear data',
                        click: () => {
                            const clearAppDataMessage = 'are you sure ?';
                            dialog.showMessageBox({
                                type: 'warning',
                                buttons: ['YES', 'NO'],
                                defaultId: 0,
                                message: 'Are you sure',
                                detail: clearAppDataMessage
                            }).then((dialogRes) => {
                                const getAppPath = path.join(app.getPath('appData'), app.getName());
                                if (dialogRes.response === 0) {
                                    mainWindow.webContents.executeJavaScript("localStorage.clear();");
                                    mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                                    mainWindow.webContents.executeJavaScript("window.location.reload()");
                                    fs.unlinkSync(getAppPath, () => {
                                        fs.rmdir(getAppPath, {
                                            recursive: true,
                                        }, (error) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            else {
                                                console.log("Non Recursive: Directories Deleted!");
                                            }
                                        });
                                    });

                                    // setTimeout(() => ipcRenderer.send('forward-message', 'hard-reload'), 1000);
                                }

                            })

                        }
                    },
                    {
                        label: 'Quit',
                        // accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctr+Q',
                        click: () => app.quit()
                    },
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    {
                        role: 'undo'
                    },
                    {
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'cut'
                    },
                    {
                        role: 'copy'
                    },
                    {
                        role: 'paste'
                    }
                ]
            },

            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'resetzoom'
                    },
                    {
                        role: 'zoomin'
                    },
                    {
                        role: 'zoomout'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'togglefullscreen'
                    }
                ]
            },

            {
                role: 'window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            // const p = encodeURI(path.win32.normalize(path.join(__dirname, '/assets/audio')));
                            // console.log(p);
                            // shell.openExternal('http://Rubikomm.com')
                            // mainWindow.webContents.executeJavaScript(`obj.playSound('${p}', 'error')`);

                        }

                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(customMenu)
        Menu.setApplicationMenu(menu);
        const ctxmenu = Menu.buildFromTemplate(customContextMenu);
        mainWindow.webContents.on('context-menu', function (e, params) {
            ctxmenu.popup(mainWindow, params.x, params.y)
        });

        // SSL/TSL: this is the self signed certificate support
        app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
            event.preventDefault();
            callback(true);
        });

        // mainWindow.loadURL(url.format({
        //    hostname: enviroment.maestro.hostname,
        //    protocol: 'https',
        //    slashes: true,
        //    pathname: enviroment.maestro.pathname
        // }))
        mainWindow.loadURL(enviroment.cloudPos.url);
        // mainWindow.webContents.executeJavaScript(`let sound = new Audio('file: //' + './assets/audio/error.mp3');
        // sound.play();`);
        var code = "";
        let lastKeyTime = Date.now();
        mainWindow.webContents.on("before-input-event", async (event, input) => {

            if (input.type == 'keyDown') {
                const currentTime = Date.now();
                let cal = currentTime - lastKeyTime;
                if (currentTime - lastKeyTime > 500) {
                    code = "";
                }
                if (input.code == "ShiftLeft" || input.code == "ShiftRight") {

                } else {

                    if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
                        if (code.length > 1) {
                            // let items = [];
                            mainWindow.webContents.executeJavaScript(`obj.searchBarcode(${JSON.stringify(code)}).then((searchedItems)=>{barcode(searchedItems)});`);
                            // mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);
                            // const scaleIdentifierCode = code.substr(0, 2);
                            // const scale = await item_service.getScaleFromBarcode(scaleIdentifierCode);
                            // if (scale !== undefined) {
                            //    const scaleObject = JSON.parse(scale);
                            //    end = scaleObject.number_of_digits;
                            //    const trimmedCode = code.substr(0, code.length - end);
                            //    // const item = await item_service.getItemFromScale(JSON.stringify(scale), code);
                            //    mainWindow.webContents.executeJavaScript(`obj.getItemFromScale(${JSON.stringify(scale)},${trimmedCode}).then((item)=>{barcode(item,${code})});`);
                            // } else {
                            // mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);

                            // }

                            code = "";
                        }
                    } else {
                        code += input.key

                    }
                }
                lastKeyTime = currentTime;

            }

        });
        this.hideSplash();
    }
    createSettingsWindow() {
        let win = new BrowserWindow({
            alwaysOnTop: true,
            resizable: false,
            maxHeight: 200,
            maxWidth: 200,
            modal: true,
            useContentSize: true,
            title: "Settings",
            webPreferences: {
                devTools: false,
                nodeIntegration: true,
            },
            // backgroundColor: '#2e2c29' 
        });

        win.removeMenu();
        win.menu = null;
        win.loadFile(path.join(__dirname, 'windows/settings/settings.html'));
        // win.loadFile(path.join(rootPath, 'windows/settings/settings.html'));

    }

    hideSplash() {
        if (this.splash != null && this.splash.isVisible()) {
            this.splash.close();
            this.splash = null;
        }
    }
    showSplash() {
        this.splash = new BrowserWindow(
            {
                height: 300,
                width: 300,
                frame: false,
                paintWhenInitiallyHidden: true,

                webPreferences: {
                    nodeIntegration: false,
                    devTools: false,
                }
            }
        );
        this.splash.removeMenu();
        this.splash.menu = null;
        this.splash.loadFile(path.join(__dirname, 'windows/loading/loading.html'));
    }
}
InitializerService._instance = null;
InitializerService.getInstance = () => {
    if (InitializerService._instance === null) {
        InitializerService._instance = new InitializerService();
    }
    return InitializerService._instance
}
module.exports = InitializerService.getInstance();
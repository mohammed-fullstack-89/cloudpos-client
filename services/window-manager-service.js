const windowsConfig = require('../config/windowsConfig');
const fs = require('fs');
const path = require('path');
const enviroment = require('../enviroment');
const customContextMenu = require('../components/menu/context_menu');
const { app, BrowserWindow, Menu, dialog } = require('electron');
const utility = require('./utility-service');
const { electron } = require('process');
class InitializerService {

    constructor() {
        this.splash = null;
        this.mainWindow = null;
    }
    initTray(tray) {
        const trayMenu = [
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
                        // const getAppPath = path.join(app.getPath('appData'), app.getName());
                        // console.log("getAppPath " + getAppPath);
                        if (dialogRes.response === 0) {

                            this.this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                            this.this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                            this.this.mainWindow.webContents.executeJavaScript("window.location.reload()");

                            // app.relaunch();
                            // app.exit()
                            // fs.unlinkSync(getAppPath, () => {
                            //     fs.rmdir(getAppPath, {
                            //         recursive: false,
                            //     }, (error) => {
                            //         if (error) {
                            //             console.log(error);
                            //         }
                            //         else {
                            //             console.log("Non Recursive: Directories Deleted!");
                            //         }
                            //     });
                            // });
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


        const contextMenu = Menu.buildFromTemplate(trayMenu);
        tray.setToolTip('Maestro');
        tray.setContextMenu(contextMenu);
    }
    createAppWindow() {
        app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
        this.mainWindow = new BrowserWindow(windowsConfig.mainWindowConfig);
        this.mainWindow.webContents.setAudioMuted(false);

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
                                    this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                                    this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                                    this.mainWindow.webContents.executeJavaScript("window.location.reload()");
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
                            // this.mainWindow.webContents.executeJavaScript(`obj.playSound('${p}', 'error')`);

                        }

                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(customMenu)
        Menu.setApplicationMenu(menu);
        const ctxmenu = Menu.buildFromTemplate(customContextMenu);
        this.mainWindow.webContents.on('context-menu', function (e, params) {
            ctxmenu.popup(this.mainWindow, params.x, params.y)
        });

        // SSL/TSL: this is the self signed certificate support
        app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
            event.preventDefault();
            callback(true);
        });

        // this.mainWindow.loadURL(url.format({
        //    hostname: enviroment.maestro.hostname,
        //    protocol: 'https',
        //    slashes: true,
        //    pathname: enviroment.maestro.pathname
        // }))
        this.mainWindow.loadURL(enviroment.remoteZug.url);
        // this.mainWindow.webContents.executeJavaScript(`let sound = new Audio('file: //' + './assets/audio/error.mp3');
        // sound.play();`);

        this.mainWindow.webContents.on("before-input-event", async (event, input) => {
            utility.barcode(event, input);
            // if (input.type == 'keyDown') {
            //     const currentTime = Date.now();
            //     let cal = currentTime - lastKeyTime;
            //     if (currentTime - lastKeyTime > 500) {
            //         code = "";
            //     }
            //     if (input.code == "ShiftLeft" || input.code == "ShiftRight") {

            //     } else {

            //         if ((input.code == "Enter" || input.code == "NumpadEnter") && (cal <= 30)) {
            //             if (code.length > 1) {
            //                 // let items = [];
            //                 this.mainWindow.webContents.executeJavaScript(`obj.searchBarcode(${JSON.stringify(code)}).then((searchedItems)=>{barcode(searchedItems)});`);
            //                 // this.mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);
            //                 // const scaleIdentifierCode = code.substr(0, 2);
            //                 // const scale = await item_service.getScaleFromBarcode(scaleIdentifierCode);
            //                 // if (scale !== undefined) {
            //                 //    const scaleObject = JSON.parse(scale);
            //                 //    end = scaleObject.number_of_digits;
            //                 //    const trimmedCode = code.substr(0, code.length - end);
            //                 //    // const item = await item_service.getItemFromScale(JSON.stringify(scale), code);
            //                 //    this.mainWindow.webContents.executeJavaScript(`obj.getItemFromScale(${JSON.stringify(scale)},${trimmedCode}).then((item)=>{barcode(item,${code})});`);
            //                 // } else {
            //                 // this.mainWindow.webContents.executeJavaScript(`obj.searchItems('barcode', ${JSON.stringify(code)} ).then((searchedItems)=>{barcode(searchedItems)});`);

            //                 // }

            //                 code = "";
            //             }
            //         } else {
            //             code += input.key

            //         }
            //     }
            //     lastKeyTime = currentTime;

            // }

        });
        this.hideSplash();
    }
    createSettingsWindow() {
        let settingsWindow = null;
        if (settingsWindow !== null) {
            settingsWindow.close();
            settingsWindow = null;
        }
        settingsWindow = new BrowserWindow({
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

        settingsWindow.removeMenu();
        settingsWindow.menu = null;
        settingsWindow.loadFile(path.dirname(__dirname) + '/windows/settings/settings.html');
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
        this.splash.loadFile(path.dirname(__dirname) + '/windows/loading/loading.html');
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
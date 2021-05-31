const windowsConfig = require('../config/windowsConfig');
const fs = require('fs');
const path = require('path');
const enviroment = require('../enviroment');
const customContextMenu = require('../components/menu/context_menu');
const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const utility = require('./utility-service');
const { APPNAME } = require('../commons');
class InitializerService {

    constructor() {
        this.splash = null;
        this.mainWindow = null;
        app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

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
                    const clearAppDataMessage = 'Are you sure ?';
                    dialog.showMessageBox({
                        type: 'warning',
                        buttons: ['YES', 'NO'],
                        defaultId: 0,
                        message: 'Clear data',
                        detail: clearAppDataMessage
                    }).then((dialogRes) => {

                        if (dialogRes.response === 0) {

                            this.this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                            this.this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                            this.this.mainWindow.webContents.executeJavaScript("window.location.reload()");

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
        tray.setToolTip('StaggingPos');
        tray.setContextMenu(contextMenu);
    }
    createAppWindow() {

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
                            const clearAppDataMessage = 'Are you sure ?';
                            dialog.showMessageBox({
                                type: 'warning',
                                buttons: ['YES', 'NO'],
                                defaultId: 0,
                                message: 'Clear Data',
                                detail: clearAppDataMessage
                            }).then((dialogRes) => {
                                const getAppPath = path.join(app.getPath('appData'), app.getName());
                                if (dialogRes.response === 0) {
                                    this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                                    this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                                    this.mainWindow.webContents.executeJavaScript("window.location.reload()");
                                    // fs.unlinkSync(getAppPath, () => {
                                    //     fs.rmdir(getAppPath, {
                                    //         recursive: true,
                                    //     }, (error) => {
                                    //         if (error) {
                                    //             console.log(error);
                                    //         }
                                    //         else {
                                    //             console.log("Non Recursive: Directories Deleted!");
                                    //         }
                                    //     });
                                    // });

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
                        label: 'Remote Assistance',
                        click() {

                            shell.openExternal('https://download.anydesk.com/AnyDesk.exe')

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
        this.mainWindow.webContents.on("did-finish-load", () => {
            // const dir = `file://${path.dirname(__dirname).replace(/\\/g, "/")}/assets/audio/.mp3`;
            // BrowserWindow.getFocusedWindow().webContents.executeJavaScript(`var audioManager=new Audio('${dir}').play();`);
        });
        this.mainWindow.loadURL(enviroment.stagging.url);
        this.mainWindow.webContents.on("before-input-event", async (event, input) => {
            utility.barcode(event, input);
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
                devTools: true,
                nodeIntegration: true,
            },

        });

        settingsWindow.removeMenu();
        settingsWindow.menu = null;
        settingsWindow.loadFile(path.dirname(__dirname) + '/windows/settings/settings.html');
        return settingsWindow;
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
const windowsConfig = require('../config/windowsConfig');
const path = require('path');
const enviroment = require('../enviroment');
const customContextMenu = require('../components/menu/context_menu');
const { app, BrowserWindow, Menu, dialog, shell, ipcMain } = require('electron');
const utility = require('./utility-service');
const app_info = require('../commons');

class InitializerService {

    constructor() {
        this.splash = null;
        this.mainWindow = null;
        this.settingsWindow = null;
        app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
        ipcMain.on('closeSettingsWindow', (event, ...args) => this.closeSettingsWindow());
    }



    initTray(tray) {
        const trayMenu = [
            {
                label: 'Settings',
                click: () => this.createSettingsWindow()
            },
            {
                label: 'Clear local data',
                click: () => {
                    const clearAppDataMessage = 'Are you sure ?';
                    dialog.showMessageBox({
                        type: 'warning',
                        buttons: ['YES', 'NO'],
                        defaultId: 0,
                        message: 'Clear data',
                        detail: clearAppDataMessage
                    }).then(dialogRes => {
                        if (dialogRes.response === 0) {
                            this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                            this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                            this.mainWindow.webContents.session.clearCache().then(() => {
                                app.relaunch();
                                app.exit();
                            });
                        }
                    });
                }
            },
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ];

        const contextMenu = Menu.buildFromTemplate(trayMenu);
        tray.setToolTip(app_info.APP_NAME);
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
                        label: 'Clear local data',
                        click: () => {
                            const clearAppDataMessage = 'Are you sure ?';
                            dialog.showMessageBox({
                                type: 'warning',
                                buttons: ['YES', 'NO'],
                                defaultId: 0,
                                message: 'Clear Data',
                                detail: clearAppDataMessage
                            }).then(dialogRes => {
                                if (dialogRes.response === 0) {
                                    this.mainWindow.webContents.executeJavaScript("localStorage.clear();");
                                    this.mainWindow.webContents.executeJavaScript("sessionStorage.clear();");
                                    this.mainWindow.webContents.session.clearCache().then(() => {
                                        app.relaunch();
                                        app.exit();
                                    });
                                }
                            });
                        }
                    },
                    {
                        label: 'Quit',
                        click: () => app.quit()
                    }
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
                    },
                    {
                        role: 'toggledevtools'
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
                label: 'Help',
                submenu: [
                    {
                        label: 'Remote Assistance',
                        click: () => shell.openExternal('https://download.anydesk.com/AnyDesk.exe')
                    }
                ]
            },
            {
                role: 'about',
                submenu: [{
                    label: `${app_info.APP_NAME} v${app_info.APP_VERSION}`
                }]
            }
        ];

        const menu = Menu.buildFromTemplate(customMenu);
        Menu.setApplicationMenu(menu);
        const ctxmenu = Menu.buildFromTemplate(customContextMenu);

        this.mainWindow.webContents.on('context-menu', function (e, params) {
            ctxmenu.popup(this.mainWindow, params.x, params.y);
        });

        // SSL/TSL: this is the self signed certificate support
        app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
            event.preventDefault();
            callback(true);
        });

        this.mainWindow.webContents.on("did-finish-load", () => { });
        this.mainWindow.webContents.on("before-input-event", async (event, input) => {
            utility.barcode(event, input);
        });
        this.mainWindow.loadURL(enviroment.stagging.url);
        this.hideSplash();
    }

    createSettingsWindow() {
        if (this.settingsWindow) {
            this.settingsWindow.show();
        }

        this.settingsWindow = new BrowserWindow({
            alwaysOnTop: false,
            resizable: false,
            maxHeight: 200,
            maxWidth: 200,
            modal: true,
            useContentSize: true,
            center: true,
            title: "Settings",
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        this.settingsWindow.removeMenu();
        this.settingsWindow.menu = null;
        this.settingsWindow.loadFile(path.dirname(__dirname) + '/windows/settings/settings.html');

        this.settingsWindow.on('close', () => this.settingsWindow = null);
        this.settingsWindow.on('closed', () => this.settingsWindow = null);
    }

    closeSettingsWindow() {
        if (this.settingsWindow) {
            this.settingsWindow.close();
        }
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
                height: 350,
                width: 350,
                frame: false,
                paintWhenInitiallyHidden: true,
                webPreferences: {
                    nodeIntegration: false,
                    devTools: true
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
    return InitializerService._instance;
};
module.exports = InitializerService.getInstance();
module.exports = {
    mainWindowConfig: {
        focusable: true,
        fullscreenWindowTitle: false,
        fullscreenable: true,
        maximizable: true,
        minimizable: true,
        closable: true,
        acceptFirstMouse: true,
        simpleFullscreen: true,
        hasShadow: true,
        thickFrame: true,
        parent: true,
        frame: true,
        modal: true,
        paintWhenInitiallyHidden: true,
        webPreferences: {
            enableBlinkFeatures: true,
            nativeWindowOpen: true,
            nodeIntegration: true,
            safeDialogs: false,
            javascript: true,
            devTools: false,
            webgl: true,
            webSecurity: false,
            nodeIntegrationInWorker: true,
            preload: __dirname + '/../renderer.js'
        }
    }
}
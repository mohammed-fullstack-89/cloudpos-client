const path = require('path');

module.exports = {
    mainWindowConfig: {
        focusable: true,
        fullscreenWindowTitle: true,
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
        // contextIsolation: false, //block website loaded to access electron preload script (false)
        webPreferences: {
            enableBlinkFeatures: true,
            nativeWindowOpen: true,
            nodeIntegration: true,
            safeDialogs: false,
            javascript: true,
            devTools: true,
            // sandbox: true,
            webgl: false,
            webSecurity: false,
            nodeIntegrationInWorker: true,
            preload: `${path.relative}/renderer.js`
        }
    }
}
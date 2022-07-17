const packager = require('electron-packager');
const rebuild = require('electron-rebuild');
const app_info = require('./commons');

packager({
    buildPath: __dirname,
    electronVersion: '11.5.0',
    version: '1.1.0',
    buildVersion: '16',
    dir: __dirname,
    overwrite: true,
    asar: true,
    platform: 'win32',
    arch: 'ia32',
    icon: app_info.APP_ICON_PATH,
    prune: true,
    appVersion: app_info.APP_VERSION,
    win32metadata: {
        CompanyName: "Rubikomm",
        ProductName: app_info.APP_NAME
    },
    afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
        rebuild.rebuild({ buildPath, electronVersion, arch })
            .then(() => callback())
            .catch((error) => callback(error));
    }]
});

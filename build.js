const packager = require('electron-packager');
const rebuild = require('electron-rebuild');

packager({
    buildPath: __dirname,
    electronVersion: '10.1.3',
    version: '1.1.0',
    buildVersion: '13',
    dir: __dirname,
    overwrite: true,
    asar: true,
    platform: 'win32',
    arch: 'ia32',
    icon: 'assets/icons/maestro.ico',
    prune: true,
    appVersion: "1.1.13",
    win32metadata: {
        CompanyName: "Rubikomm",
        ProductName: "MaestroPOS"
    },
    afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
        rebuild.rebuild({ buildPath, electronVersion, arch })
            .then(() => callback())
            .catch((error) => callback(error));
    }]
});

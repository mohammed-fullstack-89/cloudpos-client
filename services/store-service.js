const path = require('path');
const fs = require('fs');
const { app, ipcMain } = require('electron');

class appStore {
    constructor(opts) {
        this.opts = opts;
        app.getPath('userData');
        this.userDataPath = app.getPath('userData');
        this.path = path.join(this.userDataPath, this.opts.configName + '.json');
        this.data = this.parseDataFile(this.path, this.opts.defaults);

        ipcMain.on('getlocalSettings', (event, ...args) => {
            event.returnValue = this.data;
        });

        ipcMain.on('setlocalSettings', (event, ...args) => {
            this.setValue(args[0], args[1]);
        });
    }

    getValue(key) {
        return this.data[key];
    }

    setValue(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }


    parseDataFile(filePath, defaults) {
        try {
            return JSON.parse(fs.readFileSync(filePath));
        } catch (error) {
            return defaults;
        }
    }
}

appStore.instance = null;
appStore.getInstance = () => {
    if (appStore.instance == null) {
        const selectLabel = '--choose printer--';
        const configObject = {
            configName: 'user-preferences',
            defaults: {
                mainPrinter: selectLabel,
                orderPrinter1: selectLabel,
                orderPrinter2: selectLabel,
                orderPrinter3: selectLabel,
                orderPrinter4: selectLabel,
                orderPrinter5: selectLabel,
                orderPrinter6: selectLabel,
                paperType: 'receipt'
            }
        };
        appStore.instance = new appStore(configObject);
    }
    return appStore.instance;
};
module.exports = appStore.getInstance();

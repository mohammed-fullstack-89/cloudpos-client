const path = require('path');
const fs = require('fs');

const ipc = require('electron').ipcMain;

class appStore {


    constructor(opts) {
        this.opts = opts;
    }

    init(userPath) {
        this.userDataPath = userPath;
        this.path = path.join(this.userDataPath, this.opts.configName + '.json');
        this.data = this.parseDataFile(this.path, this.opts.defaults);
        
        ipc.on('getlocalSettings', (event, ...args) => {
            event.returnValue = this.data;
        });

        ipc.on('setlocalSettings', (event, ...args) => {
            this.setValue(args[0], args[1]);
        })
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

// if (appStore.caller != appStore.getValueInstance) {
//     throw new Error("This object cannot be instanciated");
// }

appStore.instance = null;

appStore.getInstance = () => {
    if (appStore.instance == null) {
        appStore.instance = new appStore({
            configName: 'user-preferences',
            defaults: {
                mainPrinter: "--choose Printer--",
                KitchenPrinter1: "--choose Printer--",
                KitchenPrinter2: "--choose Printer--",
                KitchenPrinter3: "--choose Printer--",
                KitchenPrinter4: "--choose Printer--",
                InnerPrinter: "--choose Printer--",


            }
        });
    }
    return appStore.instance;
}



module.exports = appStore.getInstance();

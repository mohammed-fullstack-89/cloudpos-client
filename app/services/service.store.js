const electron = require('electron');
const path = require('path');
const fs = require('fs');

var appStore = function appStore(opts) {
    console.log(opts)
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');

    this.data = parseDataFile(this.path, opts.defaults);


    this.get = function (key) {
        return this.data[key];
    }

    this.set = function (key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }


    function parseDataFile(filePath, defaults) {
        try {
            return JSON.parse(fs.readFileSync(filePath));
        } catch (error) {
            return defaults;
        }
    }
    if (appStore.caller != appStore.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
}
appStore.instance = null;

appStore.getInstance = function () {
    if (this.instance === null) {
        this.instance = new appStore({
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
    return this.instance;
}



module.exports = appStore.getInstance();

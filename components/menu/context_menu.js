const electron = require('electron')

const MenuItem = electron.MenuItem

const context_menu_template = [
    new MenuItem({
        label: "Copy",
        role: "copy"
    }),
    new MenuItem({
        label: "Paste",
        role: "paste"
    }),
    new MenuItem({
        label: "Undo",
        role: "undo"
    }),
    new MenuItem({
        label: "Redo",
        role: "redo"
    }),
    new MenuItem({
        label: "Cut",
        role: "cut"
    }),

]
module.exports = context_menu_template

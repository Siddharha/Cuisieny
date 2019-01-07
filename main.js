const electron = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, addItemWindow;
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        frame: process.platform == 'darwin'
    });


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // Menu.setApplicationMenu(mainMenu);
    mainWindow.setMenu(mainMenu)

    mainWindow.on('closed', function () {
        app.quit();
    });

});

function showAddItemWindow() {
    addItemWindow = new BrowserWindow({
        width: 500,
        height: 300,
        resizable: false,
        maximizable: false,
        minimizable: false,
        titleBarStyle: 'hidden',
        parent: mainWindow,
        modal: true,
        frame: process.platform == 'darwin'

    });

    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window/add_window/add_item.html'),
        protocol: 'file:',
        slashes: true
    }));

    // addItemWindow.webContents.openDevTools({
    //     mode: 'undocked'
    // });

    const addItemMenu = Menu.buildFromTemplate(addMenuTemplate);
    // Menu.setApplicationMenu(mainMenu);
    addItemWindow.setMenu(addItemMenu)
}

const addMenuTemplate = [
    {
        label: 'Tools',
        submenu: [{
            label: 'Toggle Dev. tool',
            accelerator: process.platform == 'darwin' ? 'Command + Shift + D' : 'Ctrl + Shift + D',
            click() {
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        }]
    }
];
const menuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Add Cuisine',
        accelerator: process.platform == 'darwin' ? 'Command + Shift + A' : 'Ctrl + Shift + A',
        click() {
            showAddItemWindow();
        }
    },
    {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'Command + Shift + X' : 'Ctrl + Shift + X',
        click() {
            app.exit();
        }
    }
    ]
},
{
    label: 'Tools',
    submenu: [{
        label: 'Toggle Dev. tool',
        accelerator: process.platform == 'darwin' ? 'Command + Shift + D' : 'Ctrl + Shift + D',
        click() {
            BrowserWindow.getFocusedWindow().toggleDevTools();
        }
    }]
}
]

if (process.platform == 'darwin') {
    menuTemplate.unshift({
        label: "Cuisieny"
    });
}

ipcMain.on('mnu:control', function (e, mnuChoice) {
    var theWindow = BrowserWindow.getFocusedWindow();
    switch (mnuChoice) {
        case 0:

            theWindow.close();

            if (theWindow == addItemWindow) {
                addItemWindow == null;
                console.log("closed add menu!");

            }
            break;
        case 1:

            if (theWindow.isMaximized()) { theWindow.unmaximize(); } else { theWindow.maximize(); }

            break;
        case 2:

            theWindow.minimize();
            break;
        case 3:
            showAddItemWindow();
            break;
        default:
            break;
    }
});
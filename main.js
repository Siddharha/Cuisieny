const electron = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, addItemWindow;
const {
    app,
    BrowserWindow,
    Menu
} = electron;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

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
        modal: false

    });

    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window/add_window/add_item.html'),
        protocol: 'file:',
        slashes: true
    }));

    addItemWindow.webContents.openDevTools({
        mode: 'undocked'
    });
}

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
    label:'Tools',
    submenu: [{
        label:'Toggle Dev. tool',
        click(){
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
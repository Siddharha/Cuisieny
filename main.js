const electron = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
const {app,BrowserWindow} = electron;

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        width:600,
        height:500,
        titleBarStyle: 'hidden'
    });

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'./main_window/index.html'),
        protocol:'file:',
        slashes: true
    }));
});

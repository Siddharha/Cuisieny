const electron = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
const {app,BrowserWindow, Menu} = electron;

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

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
    mainWindow.on('closed',function(){
        app.quit();
    });
});

const menuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Cuisine',
                accelerator: process.platform == 'darwin'? 'Command + Shift + A': 'Ctrl + Shift + A',
                click(){
                    console.log('Not Implemented yet!'); 
                }
},
{
    label:'Exit',
    accelerator: process.platform == 'darwin'? 'Command + Shift + X': 'Ctrl + Shift + X',
    click(){
        app.exit();
    }
}
]
    }
]

if(process.platform == 'darwin'){
    menuTemplate.unshift({
        label:"Cuisieny"
    });
}

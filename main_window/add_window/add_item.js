const electron = require('electron');
const {ipcRenderer} = electron;

$(function () {
    
});
function clkAddItem(){
    
    var title_str = $('#etTitle').val();
    console.log(title_str);
    
}

function clkCancel(){
    ipcRenderer.send('mnu:control',0);
}



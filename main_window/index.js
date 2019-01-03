const electron = require('electron');
const {ipcRenderer} = electron;

 
var isResizing = false,
    lastDownX = 0;

  

$(function () {

    if(process.platform =='darwin'){
        let main_custom_control = document.querySelector("#title-bar-btns");
        main_custom_control.style.visibility = 'hidden';
    }

    var container = $('#main_body'),
        left = $('#list_section'),
        right = $('#list_details'),
        handle = $('#drag');

    handle.on('mousedown', function (e) {
        isResizing = true;
        lastDownX = e.clientX;
    });

    $(document).on('mousemove', function (e) {
        // we don't want to do anything if we aren't resizing.
        if (!isResizing) 
            return;

        var offsetRight = container.width() - (e.clientX - container.offset().left);

        left.css('right', offsetRight);
        right.css('width', offsetRight);
    }).on('mouseup', function (e) {
        // stop resizing
        isResizing = false;
    });
});



function loadListItem(){
    
     const itmTable = document.querySelector('ul');
     itmTable.className = 'collection with-header';
     const itemLi = document.createElement('li');
     itemLi.className = 'collection-item';
     itemLi.appendChild(document.createTextNode('hi this is item'))
     itmTable.appendChild(itemLi);

    //console.log("hi");
    

    
}

function mnuAction(mnuChoice){
    console.log("kjhkj");
    
    ipcRenderer.send('mnu:control',mnuChoice);
}

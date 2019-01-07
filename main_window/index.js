const electron = require('electron');
const {ipcRenderer} = electron;

 
var isResizing = false,
    lastDownX = 0;

  

$(function () {

    if(process.platform =='darwin'){
        let main_custom_control = document.querySelector("#title-bar-btns");
        let main_custom_menu = document.querySelector("#title-menu");
        
        main_custom_control.style.visibility = 'hidden';
        main_custom_menu.style.visibility = 'hidden';
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
        if((offsetRight >=200) &&(offsetRight+100 <=container.width())){
            left.css('right', offsetRight);
            right.css('width', offsetRight);
        }else{
            offsetRight = offsetRight;
        }
       
    }).on('mouseup', function (e) {
        // stop resizing
        isResizing = false;
    });
});



function loadListItem(){
    
     const itmTable = document.querySelector('#left-menu-list');
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

function addItemPopup(){
    ipcRenderer.send('mnu:control',3);
    $('.dropdown-content').style.display = "none";
}

var isResizing = false,
    lastDownX = 0;

$(function () {
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

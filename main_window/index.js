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
    const ul = document.getElementsByName('ul');
    ul.className = 'collection with-header';
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode('hi this is item'))
    ul.appendChild(li);

    
}

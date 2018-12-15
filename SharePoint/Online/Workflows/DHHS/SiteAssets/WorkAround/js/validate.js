'use strict';

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    let returnValue = removeAllItemsFromLocalStorage();

    jQuery("#deletelocalstoragestatus").text("localstorage has been delete successfully.");

});
'use strict';

var PageContextGlobalID = null;
var currentComments = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }        

    loadingLocalStorageData("Initiation Form");
    
    let RecordID = getUrlParameter('RecordID');    
    
    if ( RecordID )
    {        
        loadingRecordViewMode(RecordID);                
    }           
});
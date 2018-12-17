'use strict';

var PageContextRevisionID = null;
var WorkAroudTypeId = 0;
var urlQuery = "";
var currentComments = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }        
    
    loadingLocalStorageData("EEMS Workaround View Form");

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var DisplayRejection = getUrlParameter('DisplayRejection');

    if ( DisplayRejection )
        document.getElementById("ReasonForRejectionDiv").style.display = "flex";

    
    if ( WorkAroundId )
    {
        loadindWorkaroundViewMode(WorkAroundId, currentComments);                
    }           
});
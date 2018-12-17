'use strict';

var PageContextRevisionID = null;
var WorkAroudTypeId = 0;
var WorkaroundType = "";
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

function SubmitForm()
{    
    let listName = "Workaround";
    let itemType = GetItemTypeForListName(listName);

    jQuery.confirm({        
        title: false,
        content: '<div style="font-size: large;font-style: italic;">Are you sure you want to submit this Workaround for O&M Initial Review?</div>',
        columnClass: 'large',
        buttons: {            
            Ok: {
                text: 'Yes',
                btnClass: 'btn-default btn-md',
                action: function(){    
                    
                    let WorkaroundId = getUrlParameter('WorkaroundId');
                    let page = "/Pages/feedback.aspx";

                    if ( WorkaroundId ) {

                        let commentsVal = getComments($("#field-comments").val(), currentComments);

                        var metadata = {
                            "__metadata": { "type": itemType },
                            "Comments": commentsVal,
                            "O_x0026_MBusinessAnalystStatus": "In Progress",    
                            "O_x0026_MTestingAnalystStatus": "In Progress", 
                            "O_x0026_MManagerStatus": "In Progress", 
                            "WorkaroundWorkflowStatus": "O&M Initial Approval (Pending)",            
                        };                        

                        let results = updateSharePointListItem(WorkaroundId, metadata, listName);
                        results.done(function (data) {

                            jQuery.alert({        
                                title: false,
                                content: '<div style="font-size: large;font-style: italic;">Your Workaround Process form has been submitted for O&M Initial Review.</div>',
                                columnClass: 'medium',
                                buttons: {            
                                    Ok: {
                                        text: 'Ok',
                                        btnClass: 'btn-default btn-md',
                                        action: function(){
                                            let page = "/Pages/feedback.aspx";
                                            window.location = _spPageContextInfo.webAbsoluteUrl + page;                                         
                                        }
                                    }
                                }
                            });

                        });
                        results.fail(function (error) {
                            alert('Error has occurred: ' + error.responseText);
                        });
                    }                                                                                         
                }
            },
            Cancel: {
                text: 'No',
                btnClass: 'btn-default btn-md',
                action: function(){
                    
                }
            }
        }
    });
}
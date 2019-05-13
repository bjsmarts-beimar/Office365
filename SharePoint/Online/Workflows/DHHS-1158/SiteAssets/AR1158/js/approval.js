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

function Approve()
{
    jQuery.confirm({        
        title: false,
        content: '<div style="font-size: large;font-style: italic;">Are you sure you want to Approve this TPC?</div>',
        columnClass: 'large',
        buttons: {            
            Ok: {
                text: 'Yes',
                btnClass: 'btn-default btn-md',
                action: function(){

                    let listName = "AR1158Form";                    
                    let RecordID = getUrlParameter('RecordID');
                    let page = "/Pages/feedback.aspx";

                    let utc = new Date().toLocaleString(); 
                    let signature = "Wrote on " + utc;
                    let comments = "";
                        
                    if ( currentComments !== null ) {
                        comments = currentComments + '<br>' + $("#approval-comments").val() + '<br>' + signature + '<br>';
                    }
                    else {
                        if ( $("#approval-comments").val().length > 0  )
                        {
                            comments = $("#approval-comments").val() + '<br>' + signature;
                        }
                    }

                    let metadata = getWorkaroundMetaData("Approved", listName, comments, "");
        
                    let results = updateSharePointListItem(RecordID, metadata, listName);
                    results.done(function (data) {
    
                        window.location = _spPageContextInfo.webAbsoluteUrl + page;
        
                    });
                    results.fail(function (error) {
                        alert('Error has occurred: ' + error.responseText); 
                    });


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

function Reject()
{
    if ( isFormValid() )
    {   
        jQuery.confirm({        
            title: false,
            content: '<div style="font-size: large;font-style: italic;">Are you sure you want to Reject this TPC?</div>',
            columnClass: 'medium',
            buttons: {            
                Ok: {
                    text: 'Yes',
                    btnClass: 'btn-default btn-md',
                    action: function() {

                        let listName = "AR1158Form";                        
                        let RecordID = getUrlParameter('RecordID');
                        let page = "/Pages/feedback.aspx";

                        let utc = new Date().toLocaleString(); 
                        let signature = "Wrote on " + utc;
                        let comments = "";
                        let ReasonForRejection = "";

                        if ( currentComments !== null ) {
                            comments = currentComments + '<br>' + $("#approval-comments").val() + '<br>' + signature + '<br>';
                            ReasonForRejection = $("#approval-comments").val();
                        }
                        else {
                            if ( $("#approval-comments").val().length > 0  )
                            {
                                comments = $("#approval-comments").val() + '<br>' + signature;
                                ReasonForRejection = $("#approval-comments").val();
                            }
                        }

                        let metadata = getWorkaroundMetaData("Rejected", listName, comments, ReasonForRejection);
            
                        let results = updateSharePointListItem(RecordID, metadata, listName);
                        results.done(function (data) {
        
                            window.location = _spPageContextInfo.webAbsoluteUrl + page;
            
                        });
                        results.fail(function (error) {
                            alert('Error has occurred: ' + error.responseText); 
                        });

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
}

function isFormValid()
{
    var comment = jQuery('#approval-comments').val();

    if ( comment.length > 0 )
    {
        jQuery("#error-approval-comments").hide();
        return true;
    }

    jQuery("#error-approval-comments").show();
    return false;
}

function getWorkaroundMetaData(Decision, listName, commentsVal, ReasonForRejectionVal,)
{
    let ApprovalType = getUrlParameter('ApprovalType');
    let itemType = GetItemTypeForListName(listName);

    if ( ApprovalType )
    {
        if ( ApprovalType == 1)
        {
            if ( Decision != "Rejected")
            {
                let metadata = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "WorkflowStatus": "Initial Approval (Approved)"
                };

                return metadata;
            }
            else {

                let metadata = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "WorkflowStatus": "Rejected"
                };

                return metadata;

            }
        }

        if ( ApprovalType == 2)
        {
            if ( Decision != "Rejected")
            {
                let metadata = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "WorkflowStatus": "Final Approval (Approved)"
                };

                return metadata;
            }
            else {

                let metadata = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "WorkflowStatus": "Rejected"
                };

                return metadata;
            }
        }
        
    }
    else {
        return null;
    }

    

}
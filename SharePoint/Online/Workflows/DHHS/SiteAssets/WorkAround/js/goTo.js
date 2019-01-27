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
        
        let query = getWorkAround(WorkAroundId);
        query.done(function(workAroundItem) {

                validatingStatusUserSecurity(workAroundItem.WorkaroundWorkflowStatus, workAroundItem.AuthorId);

        });
        query.fail(function(error) {
                  alert(error);
        });
    }         
                                 
});

function SubmitForm()
{    
    let listName = "Workaround";
    let itemType = GetItemTypeForListName(listName);

    jQuery.confirm({        
        title: false,
        content: '<div style="font-size: large;font-style: italic;">Are you sure you want to submit this TPC for O&M Initial Review?</div>',
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

                            let page = "/Pages/feedback.aspx";
                            window.location = _spPageContextInfo.webAbsoluteUrl + page;  

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

function getWorkAround(WorkAroundId)
{   
    var deferred = jQuery.Deferred();

    let item = null;

    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items?$filter=ID eq " + WorkAroundId,  
        type: "GET",  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": null  
        },  
        cache: false,  
        success: function(data)   
        {              
            console.log(data);
            if ( data.d.results.length > 0 )
            {
                item = data.d.results[0];                  
                deferred.resolve(item);
            }  
        },  
        error: function(err)  
        {  
            alert(data.responseText);
            deferred.reject(err);    
        }  
    });

    return deferred.promise();
}

function validatingStatusUserSecurity(workaroundStatus, workaroundUserId) 
{
    let onError = false;

    if ( workaroundStatus !== "Initial Approval (Approved)" )
    {
        jQuery("#error-status").show();
        onError = true;
    }
    else {
        jQuery("#error-status").hide();
    }

    if ( workaroundUserId !== _spPageContextInfo.userId )
    {
        jQuery("#error-user").show();
        onError = true;
    }
    else {
        jQuery("#error-user").hide();
    }   

    if ( onError ) {
        jQuery("#SubmitBtn").hide();
    }
    else {
        jQuery("#SubmitBtn").show();
    }
}
'use strict';

var PageContextRevisionID = null;
var currentComments = null;
var assignTo = null;

jQuery(document).ready(function () {
    
    var RevisionID = getUrlParameter('RevisionId');
    retrieveRevisionItem(RevisionID);       
});

function retrieveRevisionItem(RevisionID)  
{  
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('revisions')/items?$select=ID,Title,Link,HasExceptionForm&$filter=Revision_x0020_Id eq " + RevisionID,  
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
            retrieveTaskItem(RevisionID);
            console.log(data);
            if ( data.d.results.length > 0 )
            {
                var item = data.d.results[0];  
                
                PageContextRevisionID = item.ID;
                jQuery("#RevisionName").text(item.Title);
                jQuery("#DocumentLink").replaceWith(jQuery('<a>').attr('href', item.Link).text(item.Link));   

                var url = 'exception.aspx?RevisionId=' + RevisionID;
                
                if ( item.HasExceptionForm !== "No") {
                    url = url + "&Create=No&Source=reprocess.aspx";
                    jQuery("#ExceptionForm").replaceWith(jQuery('<a>').attr('href', url).text('Link to Exception Form'));    
                }
                else {
                    url = url + "&Create=Yes&Source=reprocess.aspx";
                    jQuery("#ExceptionForm").replaceWith(jQuery('<a>').attr('href', url).text('Create Exception Form'));
                }
            }  
        },  
        error: function(data)  
        {  
            alert(data.responseText);  
        }  
    });  
}

function retrieveTaskItem(RevisionID)  
{  
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Tasks')/items?$filter=Revision_x0020_Id eq " + RevisionID,  
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
                var item = data.d.results[0];
                currentComments = item.Comments;       
                assignTo = item.AssignTo;           
            }  
        },  
        error: function(data)  
        {  
            alert(data.responseText);  
        }  
    });  
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function Reprocess()
{
    if ( isFormValid() )
    {
        if (confirm('Are you sure you want to resubmit this New/Revised Spec?')) {

            var RevisionId = getUrlParameter('RevisionId')
            UpdateRejectTasks(RevisionId);                        
                        
        } else {
            // Do nothing!
        }
    }
}

function UpdateRejectTasks(RevisionId)
{
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('tasks')/items?$select=ID,Title,Specification,Issue&$filter=Revision_x0020_Id eq " + RevisionId + " and Task_x0020_Status eq 'Reject'",  
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
                for(var x=0; x<data.d.results.length; x++)
                {
                    var taskId = data.d.results[x].ID;
                    var newTitle = data.d.results[x].Specification + " - " + data.d.results[x].Issue;
                    UpdateTaskItem(taskId, newTitle);
                }
            }
            
            UpdateRevision(PageContextRevisionID);
        },  
        error: function(data)  
        {  
            alert(data.responseText);  
        }  
    });
}

function UpdateTaskItem(taskId, newTitle)
{

    var utc = new Date().toLocaleString(); 
    var signature = "Wrote on " + utc;
    var commentsVal = "";
    
    if ( currentComments !== null ) {
         commentsVal = currentComments + '<br>' + $("#field-comments").val() + '<br>' + signature + '<br>';
    }
    else {
        if ( $("#field-comments").val().length > 0  )
        {
           commentsVal = $("#field-comments").val() + '<br>' + signature;
        }
    }

    var itemType = GetItemTypeForListName("Tasks");
    var data = {
        "__metadata": { "type": itemType },        
        "Task_x0020_Status": "Pending",
        "Title": newTitle,
        "IsReprocess": "Yes",
        "Comments": commentsVal,
    };

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Tasks')/items(" + taskId + ")", // list item ID  
        type: "POST",  
        data: JSON.stringify(data),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {  
            console.log(data);                         
            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
            window.location = serverUrl + "/SitePages/dashboard.aspx";
        },  
        error: function(xhr, status, error)  
        {  
            alert(data.responseText);  
        }  
    });
}

function Back()
{
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
    window.location = serverUrl + "/SitePages/rejection.aspx";
}

function isFormValid()
{
    var comment = jQuery('#field-comments').val();

    if ( comment.length > 0 )
    {
        jQuery("#error-comments").hide();
        return true;
    }

    jQuery("#error-comments").show();
    return false;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function UpdateRevision(RevisionId)
{
    var itemType = GetItemTypeForListName("Revisions");
    var data = {
        "__metadata": { "type": itemType },        
        "Revision_x0020_Status": "In Revision"
    };

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Revisions')/items(" + RevisionId + ")", // list item ID  
        type: "POST",  
        data: JSON.stringify(data),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {  
            console.log(data);            
            window.location = _spPageContextInfo.webAbsoluteUrl;                           
        },  
        error: function(xhr, status, error)  
        {  
            alert(data.responseText);  
        }  
    });
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
'use strict';

var PageContextRevisionID = null;
var PageContextImplID = null;

jQuery(document).ready(function () {
    
    var RevisionID = getUrlParameter('RevisionId');
    retrieveRevisionItem(RevisionID);
    retrieveImplementationItem(RevisionID);                
});

function retrieveImplementationItem(RevisionID)  
{  
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Implementations')/items?$select=ID&$filter=Revision_x0020_Id eq " + RevisionID,  
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
                
                PageContextImplID = item.ID;                
            }  
        },  
        error: function(data)  
        {  
            alert(data.responseText);  
        }  
    });  
}

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
            console.log(data);
            if ( data.d.results.length > 0 )
            {
                var item = data.d.results[0];  
                
                PageContextRevisionID = item.ID;
                jQuery("#RevisionName").text(item.Title);
                jQuery("#DocumentLink").replaceWith(jQuery('<a>').attr('href', item.Link).text(item.Link));   

                var url = 'exception.aspx?RevisionId=' + RevisionID;
                
                if ( item.HasExceptionForm !== "No") {
                    url = url + "&Create=No&Source=process.aspx";
                    jQuery("#ExceptionForm").replaceWith(jQuery('<a>').attr('href', url).text('Link to Exception Form'));    
                }
                else {
                    url = url + "&Create=Yes&Source=process.aspx";
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

function Process()
{
    if ( isFormValid() )
    {
        if (confirm('Are you sure you want to implement this New/Revised Spec?')) {
            ImplementRevision(PageContextImplID);
            CompleteRevision(PageContextRevisionID);            
        } else {
            // Do nothing!
        }
    }
}

function Back()
{
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
    window.location = serverUrl + "/SitePages/implementation.aspx";
}

function CompleteRevision(RevisionId)
{
    var commentsVal = $("#field-comments").val();
    var itemType = GetItemTypeForListName("Revisions");
    var data = {
        "__metadata": { "type": itemType },
        "Comments": commentsVal,        
        "Revision_x0020_Status": "Complete"
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

function ImplementRevision(RevisionId)
{
    var commentsVal = $("#field-comments").val();
    
    var itemType = GetItemTypeForListName("Implementations");

    var data = {
        "__metadata": { "type": itemType },
        "Comments": commentsVal,
        "Implemented": "Yes"
    };

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Implementations')/items(" + RevisionId + ")", // list item ID  
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

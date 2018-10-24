'use strict';

var PageContextRevisionID = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    var WorkAroundId = getUrlParameter('WorkaroundId');
    retrieveWorkAroundItem(WorkAroundId);     
                        
});

function retrieveWorkAroundItem(WorkAroundId)
{   
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items?$select=ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title&$expand=Training_x0020_Developer,IBM_x0020_BA&$filter=ID eq " + WorkAroundId,  
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
                jQuery("#title").val(item.Title);
                jQuery("#WorkaroundNumber").text(item.Workaround_x0020_Number);
                jQuery("#DateSubmitted").text(item.Created);
                jQuery("#release").val(item.Release_x0020_Number);
                jQuery("#trigger").val(item.Workaround_x0020_Trigger);
                jQuery("#issue").val(item.Issue);
                jQuery("#defectCR").val(item.DefectCRNumber);   
                jQuery("#steps").text(stripHtml(item.Workaround_x0020_Steps));    
                jQuery("#ibmba").val(item.IBM_x0020_BA.Title);    
                jQuery("#developer").val(item.Training_x0020_Developer.Title); 
                

                let ImpactedAudiences = item.Impacted_x0020_Audience.results;
                                
                ImpactedAudiences.forEach(function(item){
                    let fieldId = item.replace(/ /g,'');
                    jQuery("#" +  fieldId).prop( "checked", true );
                });
                

                $("#typeWorkaround option").each(function (a, b) {
                    if ($(this).html() == item.WorkaroundType ) $(this).attr("selected", "selected");
                });
                
                $("#timeUsage option").each(function (a, b) {
                    if ($(this).html() == item.WorkaroundUsage ) $(this).attr("selected", "selected");
                });                

                $("#golive option").each(function (a, b) {
                    if ($(this).html() == item.WorkaroundGoLive ) $(this).attr("selected", "selected");
                });                

                $("#testCase option").each(function (a, b) {
                    if ($(this).html() == item.Test_x0020_Case ) $(this).attr("selected", "selected");
                });
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

function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

function Approve()
{    
    jQuery.confirm({        
        title: false,
        content: '<div style="font-size: large;font-style: italic;">Are you sure you want to Approve this Workaround?</div>',
        columnClass: 'large',
        buttons: {            
            Ok: {
                text: 'Yes',
                btnClass: 'btn-default btn-md',
                action: function(){

                    var WorkaroundId = getUrlParameter('WorkaroundId');
                    //updateWorkAround('Approved', WorkaroundId);         
                    
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
            content: '<div style="font-size: large;font-style: italic;">Are you sure you want to Reject this Workaround?</div>',
            columnClass: 'medium',
            buttons: {            
                Ok: {
                    text: 'Yes',
                    btnClass: 'btn-default btn-md',
                    action: function(){
    
                        var WorkaroundId = getUrlParameter('WorkaroundId');
                        //updateWorkAround('Reject', WorkaroundId);         
                        
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
    var comment = jQuery('#field-comments').val();

    if ( comment.length > 0 )
    {
        jQuery("#error-comments").hide();
        return true;
    }

    jQuery("#error-comments").show();
    return false;
}

function updateWorkAround(Decision, WorkaroundId)  
{  

    var utc = new Date().toLocaleString(); 
    //var signature = "Wrote on " + utc;
    // var commentsVal = "";

    // if ( currentComments !== null ) {
    //     commentsVal = currentComments + '<br>' + $("#field-comments").val() + '<br>' + signature + '<br>';
    // }
    // else {
    //     if ( $("#field-comments").val().length > 0  )
    //     {
    //         commentsVal = $("#field-comments").val() + '<br>' + signature;
    //     }
    // }
        
    var itemType = GetItemTypeForListName("Workaround");

    var data = {
        "__metadata": { "type": itemType },
        //"Comments": commentsVal,
        "Task_x0020_Status": Decision,
        //"Title": NewTitle,
    };

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items(" + WorkaroundId + ")", // list item ID  
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
            //var serverUrl = _spPageContextInfo.webAbsoluteUrl;
            //window.location = serverUrl + "/SitePages/Feedback.aspx";
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

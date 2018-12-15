'use strict';

var PageContextRevisionID = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var ApprovalType = getUrlParameter('ApprovalType');

    if ( WorkAroundId )
    {
        retrieveWorkAroundItem(WorkAroundId);
    }
                                 
});

function retrieveWorkAroundItem(WorkAroundId)
{   
    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items?$select=ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,Author&$filter=ID eq " + WorkAroundId,  
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
                jQuery("#tester").val(item.Testing_x0020_Team.Title); 
                jQuery("#analyst").val(item.State_x0020_BA_x0020_Lead.Title);
                jQuery("#manager").val(item.MMRP_x0020_State_x0020_Project_x.Title);
                jQuery("#submitter").val(item.Author.Title);

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

function YesAction()
{    
    jQuery.confirm({        
        title: false,
        content: '<div style="font-size: large;font-style: italic;">Are you sure you want to the Training Team Approval?</div>',
        columnClass: 'large',
        buttons: {            
            Ok: {
                text: 'Yes',
                btnClass: 'btn-default btn-md',
                action: function(){                    
                    
                    let WorkaroundId = getUrlParameter('WorkaroundId');
                    let page = "/Pages/feedback.aspx";

                    if ( WorkaroundId )
                    {
                        let comments = "";
                        let data = getWorkaroundMetaData("Team Training (Pending)", comments);
                            
                        if ( data ) {
                            
                            var results = updateWorkAround(WorkaroundId, data);
                                results.done(function (data) {

                                    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                    window.location = serverUrl + page;
                                
                                query.fail(function(error) {
                                    alert(error);
                                });
                            });
                            results.fail(function(error) {
                                alert(error);
                            });    
                        }
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

function NoAction()
{
    if ( isFormValid() )
    {        
        jQuery.confirm({        
            title: false,
            content: '<div style="font-size: large;font-style: italic;">Are you sure you do not want the Training Team Approval?</div>',
            columnClass: 'medium',
            buttons: {            
                Ok: {
                    text: 'Yes',
                    btnClass: 'btn-default btn-md',
                    action: function(){
    
                        let WorkaroundId = getUrlParameter('WorkaroundId');
                        let page = "/Pages/feedback.aspx";

                        if ( WorkaroundId )
                        {
                            let comments = "";
                            let data = getWorkaroundMetaData("Completed", comments);
                            
                            if ( data ) {

                                var results = updateWorkAround(WorkaroundId, data);
                                results.done(function (data) {
                                    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                    window.location = serverUrl + page;

                                });
                                results.fail(function(error) {
                                    alert(error);
                                });    
                            }
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
}

function isFormValid()
{
    var reason = jQuery('#field-reason').val();

    if ( reason.length > 0 )
    {
        jQuery("#error-reason").hide();
        return true;
    }

    jQuery("#error-reason").show();
    return false;
}

function getWorkaroundMetaData(Decision, commentsVal)
{
    var ApprovalType = getUrlParameter('ApprovalType');

    var itemType = GetItemTypeForListName("Workaround");   
    
    var data = {
        "__metadata": { "type": itemType },
        "Comments": commentsVal,
        "WorkaroundWorkflowStatus": Decision,                
    };
    
    return data;    
}   



function updateWorkAround(WorkaroundId, data)  
{   
    var deferred = jQuery.Deferred();

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
            deferred.resolve(data);
        },  
        error: function(err, status, error)  
        {  
            deferred.reject(err);  
        }  
    });  

    return deferred.promise();
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

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

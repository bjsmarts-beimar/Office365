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

    getDataFromlocalStorage();
    setTitleFromLocalStorage("EEMS Workaround Approval Form");
    setLabelsFromLocalStorage("1");
    setLabelsFromLocalStorage("2");
    setLabelsFromLocalStorage("3");
    setLabelsFromLocalStorage("4");
    setLabelsFromLocalStorage("5");
    setLabelsFromLocalStorage("6");
    setLabelsFromLocalStorage("7");
    setLabelsFromLocalStorage("8");
    setLabelsFromLocalStorage("9");
    setLabelsFromLocalStorage("10");
    setLabelsFromLocalStorage("11");
    setLabelsFromLocalStorage("12");  
    setLabelsFromLocalStorage("13");    
    setLabelsFromLocalStorage("14");    
    setLabelsFromLocalStorage("15");    
    setLabelsFromLocalStorage("16");    
    setLabelsFromLocalStorage("17");    
    setLabelsFromLocalStorage("18");    
    setLabelsFromLocalStorage("19");
    setLabelsFromLocalStorage("20");    

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var ApprovalType = getUrlParameter('ApprovalType');

    if ( WorkAroundId )
    {

        urlQuery = "?$select=Comments,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author&$filter=ID eq " + WorkAroundId;
        
        let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

        results.done(function (data) {

                var item = data.d.results[0];  

                WorkaroundType = item.WorkaroundType;
                currentComments = item.Comments; 
                
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
                jQuery("#tester").val(item.Testing_x0020_Team.Title); 
                jQuery("#analyst").val(item.State_x0020_BA_x0020_Lead.Title);
                jQuery("#manager").val(item.MMRP_x0020_State_x0020_Project_x.Title);
                jQuery("omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);
                jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

                if ( item.WorkaroundType === "O&M")
                {
                    WorkAroudTypeId = 3;
                }                

                if ( WorkAroudTypeId === 3)
                {
                    document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
                    document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
                    document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
                    document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
                    document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";

                    jQuery("#omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);                    
                    jQuery("#omTestingAnalyst").val(item.State_x0020_MMRP_x0020_Testing_x.Title);                    
                    jQuery("#omManager").val(item.State_x0020_MMRP_x0020_O_x0026_M.Title);
                    jQuery("#omDirector").val(item.State_x0020_MMRP_x0020_Program_x.Title);
                }

                if ( item.ImpactedAudiences )
                {
                    let ImpactedAudiences = item.Impacted_x0020_Audience.results;
                                
                    ImpactedAudiences.forEach(function(item){
                        let fieldId = item.replace(/ /g,'');
                        jQuery("#" +  fieldId).prop( "checked", true );
                    });
                }

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

                if ( item.Test_x0020_Case === "Yes") {
                    document.getElementById("passTestCaseDiv").style.display = "flex";
                    document.getElementById("failTestCaseDiv").style.display = "flex";
                    document.getElementById("attachmentTestCaseDiv").style.display = "flex";

                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                else {
                    document.getElementById("passTestCaseDiv").style.display = "none";
                    document.getElementById("failTestCaseDiv").style.display = "none";
                    document.getElementById("attachmentTestCaseDiv").style.display = "none";

                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }


                urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'No'" ;

                let results = retrieveSharePointListItemsByListName("Links", urlQuery);
                results.done(function (data) {
                       console.log('links', data); 

                       //let arrayBucket = data;
                       let arrayBucket = data.d.results;

                       document.getElementById("attachmentsDiv").style.display = "flex";  

                       let startDiv = "<div style='text-align: right;'>";

                        let full_list = startDiv;
                        for(var i=0; i<arrayBucket.length; ++i){                        
                            full_list = full_list + "<a href='" + arrayBucket[i].Link + "' target='_blank'>" +  arrayBucket[i].Title+ "</a><br>";
                        } 

                        full_list = full_list + "</div>";

                        $("#" + "attachmentsDiv").html(full_list);

                        urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'Yes'" ;
                        let results2 = retrieveSharePointListItemsByListName("Links", urlQuery);

                        results2.done(function(data) {
                            
                            console.log('links2', data); 

                            //let arrayBucket2 = data;
                            let arrayBucket2 = data.d.results;

                            document.getElementById("attachmentsTestCaseDiv").style.display = "flex";  

                            let startDiv = "<div style='text-align: right;'>";

                            let full_list = startDiv;
                            for(var i=0; i<arrayBucket2.length; ++i){                        
                                full_list = full_list + "<a href='" + arrayBucket2[i].Link + "' target='_blank'>" +  arrayBucket2[i].Title+ "</a><br>";
                            } 

                            full_list = full_list + "</div>";

                            $("#" + "attachmentsTestCaseDiv").html(full_list);
                        });
                        results2.fail(function(err) {
                            alert(err.responseText);
                        });
                });
                results.fail(function(err) {
                    alert(err.responseText);
                });
            
        });
        results.fail(function(err) {
            alert(err.responseText);
        });
        
    }
                                 
});

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
                    
                    let WorkaroundId = getUrlParameter('WorkaroundId');
                    let page = "/Pages/feedback.aspx";

                    if ( WorkaroundId )
                    {
                        let utc = new Date().toLocaleString(); 
                        let signature = "Wrote on " + utc;
                        let comments = "";
                        
                        if ( currentComments !== null ) {
                                comments = currentComments + '<br>' + $("#field-comments").val() + '<br>' + signature + '<br>';
                        }
                        else {
                                if ( $("#field-comments").val().length > 0  )
                                {
                                    comments = $("#field-comments").val() + '<br>' + signature;
                                }
                        }

                        let data = getWorkaroundMetaData("Approved", comments, "", WorkaroundType);
                            
                        if ( data ) {
                            
                            var results = updateWorkAround(WorkaroundId, data);
                            results.done(function (data) {

                                var query = getWorkAround(WorkaroundId);
                                query.done(function(workAroundItem) {

                                    if ( workAroundItem.ProjectManagerStatus == "Not Started")
                                    {
                                        if ( workAroundItem.IBMBAStatus == "Approved" && workAroundItem.TestingTeamStatus == "Approved" && workAroundItem.StateBaLeadStatus == "Approved" && workAroundItem.ProjectManagerStatus != "Approved" )
                                        {
                                            var itemType = GetItemTypeForListName("Workaround");  

                                            var data = {
                                                "__metadata": { "type": itemType },
                                                "ProjectManagerStatus": "In Progress",                                                            
                                            };

                                            var assignWorkAroundToProjectManager = updateWorkAround(WorkaroundId, data);
                                            assignWorkAroundToProjectManager.done(function(data) {

                                                var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                                window.location = serverUrl + page;

                                            });
                                            assignWorkAroundToProjectManager.fail(function(error) {
                                                alert(error);
                                            });
                                        }
                                        else {
                                            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                            window.location = serverUrl + page;
                                        }
                                    }
                                    else if ( workAroundItem.O_x0026_MDirectorStatus == "Not Started")
                                    {
                                        if ( workAroundItem.O_x0026_MBusinessAnalystStatus == "Approved" && workAroundItem.O_x0026_MTestingAnalystStatus == "Approved" && workAroundItem.O_x0026_MManagerStatus == "Approved") {
                                            
                                            var itemType = GetItemTypeForListName("Workaround");  

                                            var data = {
                                                "__metadata": { "type": itemType },
                                                "O_x0026_MDirectorStatus": "In Progress",                                                            
                                            };

                                            var results = updateWorkAround(WorkaroundId, data);
                                            results.done(function(data) {

                                                var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                                window.location = serverUrl + page;

                                            });
                                            results.fail(function(error) {
                                                alert(error);
                                            });
                                        }
                                        else {
                                            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                            window.location = serverUrl + page;
                                        }
                                    }
                                    else {
                                        var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                        window.location = serverUrl + page;
                                    }
                                });
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
    
                        let WorkaroundId = getUrlParameter('WorkaroundId');
                        let page = "/Pages/feedback.aspx";

                        if ( WorkaroundId )
                        {

                            let utc = new Date().toLocaleString(); 
                            let signature = "Wrote on " + utc;
                            let comments = "";
                            let ReasonForRejection = "";

                            if ( currentComments !== null ) {
                                comments = currentComments + '<br>' + $("#field-comments").val() + '<br>' + signature + '<br>';
                            }
                            else {
                                if ( $("#field-comments").val().length > 0  )
                                {
                                    comments = $("#field-comments").val() + '<br>' + signature;
                                    ReasonForRejection = $("#field-comments").val();
                                }
                            }

                            let data = getWorkaroundMetaData("Rejected", comments, ReasonForRejection, WorkaroundType);
                            
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
    var comment = jQuery('#field-comments').val();

    if ( comment.length > 0 )
    {
        jQuery("#error-comments").hide();
        return true;
    }

    jQuery("#error-comments").show();
    return false;
}

function getWorkaroundMetaData(Decision, commentsVal, ReasonForRejectionVal, WorkaroundTypeVal)
{
    var ApprovalType = getUrlParameter('ApprovalType');

    var itemType = GetItemTypeForListName("Workaround");    

    if ( ApprovalType )
    {
        if ( ApprovalType == 1)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "IBMBAStatus": Decision,           
                    "IBMBAStatusDate": new Date() //.toLocaleString();      
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }            
        }
        else if ( ApprovalType == 2)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "TestingTeamStatus": Decision, 
                    "TestingTeamStatusDate": new Date() //.toLocaleString();               
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "ReasonForRejection": ReasonForRejectionVal, 
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        }
        else if ( ApprovalType == 3)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "StateBaLeadStatus": Decision, 
                    "StateBaLeadStatusDate": new Date() //.toLocaleString();               
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        }
        else if (ApprovalType == 4)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ProjectManagerStatus": Decision,   
                    "ProjectManagerStatusDate": new Date(), //.toLocaleString(); 
                    "WorkaroundWorkflowStatus": "Initial Approval (Approved)",            
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "ProjectManagerStatus": Decision,     
                    "ProjectManagerStatusDate": new Date(), //.toLocaleString();
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        }
        else if ( ApprovalType == 5 )
        {
            
            if ( WorkaroundTypeVal === "O&M" )
            {
                if ( Decision != "Rejected")
                {
                    var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "O_x0026_MBusinessAnalystStatus": "In Progress",    
                        "O_x0026_MTestingAnalystStatus": "In Progress", 
                        "O_x0026_MManagerStatus": "In Progress", 
                        "WorkaroundWorkflowStatus": "O&M Initial Approval (Pending)",            
                    };
                    
                    return data;
                }
                else {
                    var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "ReasonForRejection": ReasonForRejectionVal,
                        "WorkaroundWorkflowStatus": Decision,               
                    };
                    
                    return data;
                }

            }
            else {

                if ( Decision != "Rejected" )
                {
                    var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "finalApproverStatusDate": new Date(), //.toLocaleString();
                        "finalApproverStatus": "Approved",
                        "WorkaroundWorkflowStatus": "Completed",            
                    };
                    
                    return data;

                }
                else {
                    var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "finalApproverStatusDate": new Date(), //.toLocaleString();
                        "ReasonForRejection": ReasonForRejectionVal,
                        "WorkaroundWorkflowStatus": Decision,            
                    };
                    
                    return data;

                }
            }            
        }       
        if ( ApprovalType == 6)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "O_x0026_MBusinessAnalystStatus": Decision,       
                    "O_x0026_MBAStatusDate": new Date() //.toLocaleString();          
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "O_x0026_MBusinessAnalystStatus": Decision,
                    "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();     
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }            
        }
        else if ( ApprovalType == 7)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "O_x0026_MTestingAnalystStatus": Decision,       
                    "O_x0026_MTAStatusDate": new Date() //.toLocaleString();         
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "O_x0026_MTestingAnalystStatus": Decision,   
                    "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();    
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        }
        else if ( ApprovalType == 8)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "O_x0026_MManagerStatus": Decision,       
                    "O_x0026_MManagerStatusDate": new Date() //.toLocaleString();           
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "O_x0026_MManagerStatus": Decision,     
                    "O_x0026_MManagerStatusDate": new Date(), //.toLocaleString();  
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        }
        else if (ApprovalType == 9)
        {
            if ( Decision != "Rejected")
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "O_x0026_MDirectorStatus": Decision,    
                    "O_x0026_MDirectorStatusDate": new Date(), //.toLocaleString();   
                    "WorkaroundWorkflowStatus": "O&M Initial Approval (Approved)",            
                };
                
                return data;
            }
            else {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "O_x0026_MDirectorStatus": Decision,   
                    "O_x0026_MDirectorStatusDate": new Date(), //.toLocaleString();  
                    "WorkaroundWorkflowStatus": Decision,            
                };
                
                return data;
            }
        } 
        else if ( ApprovalType == 10 )
        {
                        
            if ( Decision != "Rejected" )
            {
                    var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "finalApproverStatusDate": new Date(), //.toLocaleString();
                        "finalApproverStatus": "Approved",
                        "WorkaroundWorkflowStatus": "Completed",            
                    };
                    
                    return data;

            }
            else {
                var data = {
                        "__metadata": { "type": itemType },
                        "Comments": commentsVal,
                        "ReasonForRejection": ReasonForRejectionVal,
                        "finalApproverStatusDate": new Date(), //.toLocaleString();
                        "WorkaroundWorkflowStatus": Decision,            
                };
                    
                return data;
            }                        
        }
        
        else {
            return null;
        }
    }
    else {
        return null;
    }

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

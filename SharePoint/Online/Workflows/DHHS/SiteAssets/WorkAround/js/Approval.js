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
    
    loadingLocalStorageData("EEMS Workaround Approval Form");

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var DisplayRejection = getUrlParameter('DisplayRejection');

    if ( DisplayRejection )
        document.getElementById("ReasonForRejectionDiv").style.display = "flex";

    
    if ( WorkAroundId )
    {
        loadindWorkaroundViewMode(WorkAroundId, currentComments);                

        let ApprovalType = getUrlParameter('ApprovalType');

        if ( ApprovalType ) 
        {

            let query = getWorkAround(WorkAroundId);
            query.done(function(workAroundItem) {
                

                if ( ApprovalType == 1 ) {

                    validatingStatusUserSecurity(workAroundItem.IBMBAStatus, "In Progress", workAroundItem.IBM_x0020_BAId);
                }
                else if ( ApprovalType == 2 ) {
                    
                    validatingStatusUserSecurity(workAroundItem.TestingTeamStatus, "In Progress", workAroundItem.Testing_x0020_TeamId);
                }
                else if ( ApprovalType == 3) {

                    validatingStatusUserSecurity(workAroundItem.StateBaLeadStatus, "In Progress", workAroundItem.State_x0020_BA_x0020_LeadId);
                }
                else if ( ApprovalType == 4) {
                    
                    validatingStatusUserSecurity(workAroundItem.ProjectManagerStatus, "In Progress", workAroundItem.MMRP_x0020_State_x0020_Project_xId);
                }
                else if ( ApprovalType == 6) {

                    validatingStatusUserSecurity(workAroundItem.O_x0026_MBusinessAnalystStatus, "In Progress", workAroundItem.State_x0020_MMRP_x0020_O_x0026_M0Id);
                }
                else if ( ApprovalType == 7) {

                    validatingStatusUserSecurity(workAroundItem.O_x0026_MTestingAnalystStatus, "In Progress", workAroundItem.State_x0020_MMRP_x0020_Testing_xId);
                }
                else if ( ApprovalType == 8) {

                    validatingStatusUserSecurity(workAroundItem.O_x0026_MManagerStatus, "In Progress", workAroundItem.State_x0020_MMRP_x0020_O_x0026_MId);
                }
                else if ( ApprovalType == 9) {

                    validatingStatusUserSecurity(workAroundItem.O_x0026_MDirectorStatus, "In Progress", workAroundItem.State_x0020_MMRP_x0020_Program_xId);
                }
                else if ( ApprovalType == 10 ) {
                    
                    validatingStatusUserSecurity(workAroundItem.WorkaroundWorkflowStatus, "Final Approval (Pending)", workAroundItem.finalApproverId);
                }
                else if ( ApprovalType == 11 ) {
                    validatingStatusUserSecurity(workAroundItem.RetiredApprovalStatus, "In Progress", workAroundItem.RetiredApproverId);
                }

            });
            query.fail(function(error) {
                  alert(error);
            });
        }
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
            content: '<div style="font-size: large;font-style: italic;">Are you sure you want to Reject this TPC?</div>',
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
    let ApprovalType = getUrlParameter('ApprovalType');

    let itemType = GetItemTypeForListName("Workaround");    

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
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
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
                    "ReasonForRejection": ReasonForRejectionVal, 
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
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
                        "finalApproverStatus": Decision,
                        "WorkaroundWorkflowStatus": "Completed",            
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
                        "TestingTeamStatus": Decision,    
                        "TestingTeamStatusDate": new Date(), //.toLocaleString();
                        "StateBaLeadStatus": Decision,     
                        "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                        "ProjectManagerStatus": Decision,     
                        "ProjectManagerStatusDate": new Date(), //.toLocaleString();                        
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MBusinessAnalystStatus": Decision,
                    "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MTestingAnalystStatus": Decision,   
                    "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();  
                    "O_x0026_MManagerStatus": Decision,     
                    "O_x0026_MManagerStatusDate": new Date(), //.toLocaleString();   
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MBusinessAnalystStatus": Decision,
                    "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MTestingAnalystStatus": Decision,   
                    "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();  
                    "O_x0026_MManagerStatus": Decision,     
                    "O_x0026_MManagerStatusDate": new Date(), //.toLocaleString();   
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MBusinessAnalystStatus": Decision,
                    "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MTestingAnalystStatus": Decision,   
                    "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();  
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
                    "IBMBAStatus": Decision,     
                    "IBMBAStatusDate": new Date(), //.toLocaleString();
                    "TestingTeamStatus": Decision,    
                    "TestingTeamStatusDate": new Date(), //.toLocaleString();
                    "StateBaLeadStatus": Decision,     
                    "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MBusinessAnalystStatus": Decision,
                    "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();
                    "O_x0026_MTestingAnalystStatus": Decision,   
                    "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();  
                    "O_x0026_MManagerStatus": Decision,     
                    "O_x0026_MManagerStatusDate": new Date(), //.toLocaleString();   
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
                        "IBMBAStatus": Decision,     
                        "IBMBAStatusDate": new Date(), //.toLocaleString();
                        "TestingTeamStatus": Decision,    
                        "TestingTeamStatusDate": new Date(), //.toLocaleString();
                        "StateBaLeadStatus": Decision,     
                        "StateBaLeadStatusDate": new Date(), //.toLocaleString();
                        "O_x0026_MBusinessAnalystStatus": Decision,
                        "O_x0026_MBAStatusDate": new Date(), //.toLocaleString();
                        "O_x0026_MTestingAnalystStatus": Decision,   
                        "O_x0026_MTAStatusDate": new Date(), //.toLocaleString();  
                        "O_x0026_MManagerStatus": Decision,     
                        "O_x0026_MManagerStatusDate": new Date(), //.toLocaleString();   
                        "O_x0026_MDirectorStatus": Decision,   
                        "O_x0026_MDirectorStatusDate": new Date(), //.toLocaleString();  
                        "finalApproverStatusDate": new Date(), //.toLocaleString();
                        "WorkaroundWorkflowStatus": Decision,            
                };
                    
                return data;
            }                        
        }
        else if ( ApprovalType == 11)
        {
            if ( Decision != Reject )
            {
                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "RetiredApprovalStatusDate": new Date(), //.toLocaleString();
                    "RetiredApprovalStatus": Decision                                
                };
                
                return data;
            }
            else {

                var data = {
                    "__metadata": { "type": itemType },
                    "Comments": commentsVal,
                    "ReasonForRejection": ReasonForRejectionVal,
                    "RetiredApprovalStatusDate": new Date(), //.toLocaleString();
                    "RetiredApprovalStatus": Decision,            
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
        beforeSend : function() {
            $.blockUI({ 
                message: '<h4>Wait ... Processing your request</h4>',
                css: { 
                border: 'none', 
                padding: '15px',                          
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
            } }); 
        }, 
        complete: function () {
            $.unblockUI();                    
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

function validatingStatusUserSecurity(workaroundStatus, currentStatus, workaroundUserId) 
{
    let onError = false;

    if ( workaroundStatus !== currentStatus )
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
        jQuery("#ApproveBtn").hide();
        jQuery("#RejectBtn").hide();
    }
    else {
        jQuery("#ApproveBtn").show();
        jQuery("#RejectBtn").show();
    }
}

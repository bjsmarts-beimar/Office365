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

    //$("#finalApprover").append('<option value=1>My option</option>');

    getDataFromlocalStorage();
    setTitleFromLocalStorage("EEMS Workaround Final Form");
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

    setfinalApproversfromLocalStorage("finalApprover");

    var WorkAroundId = getUrlParameter('WorkaroundId');

    if ( WorkAroundId )
    {
        loadindWorkaroundViewMode(WorkAroundId, currentComments);     

        let query = getWorkAround(WorkAroundId);
        query.done(function(workAroundItem) {

            validatingStatusUserSecurity(workAroundItem.WorkaroundWorkflowStatus, workAroundItem.AuthorId, workAroundItem.WorkaroundType);
            
        });
        query.fail(function(error) {
                  alert(error);
        });
    }
    
    // if ( WorkAroundId )
    // {

    //     urlQuery = "?$select=Comments,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author&$filter=ID eq " + WorkAroundId;
        
    //     let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

    //     results.done(function (data) {

    //             var item = data.d.results[0];  
                
    //             PageContextRevisionID = item.ID;
    //             currentComments = item.Comments; 
    //             jQuery("#title").val(item.Title);
    //             jQuery("#WorkaroundNumber").text(item.Workaround_x0020_Number);
    //             jQuery("#DateSubmitted").text(item.Created);
    //             jQuery("#release").val(item.Release_x0020_Number);
    //             jQuery("#trigger").val(item.Workaround_x0020_Trigger);
    //             jQuery("#issue").val(item.Issue);
    //             jQuery("#defectCR").val(item.DefectCRNumber);   
    //             jQuery("#steps").text(stripHtml(item.Workaround_x0020_Steps));    
    //             jQuery("#ibmba").val(item.IBM_x0020_BA.Title);    
    //             jQuery("#tester").val(item.Testing_x0020_Team.Title); 
    //             jQuery("#analyst").val(item.State_x0020_BA_x0020_Lead.Title);
    //             jQuery("#manager").val(item.MMRP_x0020_State_x0020_Project_x.Title);
    //             jQuery("omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);
    //             jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

    //             if ( item.WorkaroundType === "O&M")
    //             {
    //                 WorkAroudTypeId = 3;
    //             }                

    //             if ( WorkAroudTypeId === 3)
    //             {
    //                 document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
    //                 document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
    //                 document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
    //                 document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
    //                 document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";

    //                 jQuery("#omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);                    
    //                 jQuery("#omTestingAnalyst").val(item.State_x0020_MMRP_x0020_Testing_x.Title);                    
    //                 jQuery("#omManager").val(item.State_x0020_MMRP_x0020_O_x0026_M.Title);
    //                 jQuery("#omDirector").val(item.State_x0020_MMRP_x0020_Program_x.Title);
    //             }

    //             if ( item.ImpactedAudiences ) {
                
    //                 let ImpactedAudiences = item.Impacted_x0020_Audience.results;
                                
    //                 ImpactedAudiences.forEach(function(item){
    //                     let fieldId = item.replace(/ /g,'');
    //                     jQuery("#" +  fieldId).prop( "checked", true );
    //                 });
    //             }                
                

    //             $("#typeWorkaround option").each(function (a, b) {
    //                 if ($(this).html() == item.WorkaroundType ) $(this).attr("selected", "selected");
    //             });
                
    //             $("#timeUsage option").each(function (a, b) {
    //                 if ($(this).html() == item.WorkaroundUsage ) $(this).attr("selected", "selected");
    //             });                

    //             $("#golive option").each(function (a, b) {
    //                 if ($(this).html() == item.WorkaroundGoLive ) $(this).attr("selected", "selected");
    //             });                

    //             $("#testCase option").each(function (a, b) {
    //                 if ($(this).html() == item.Test_x0020_Case ) $(this).attr("selected", "selected");
    //             });

    //             if ( item.Test_x0020_Case === "Yes") {
    //                 document.getElementById("passTestCaseDiv").style.display = "flex";
    //                 document.getElementById("failTestCaseDiv").style.display = "flex";
    //                 document.getElementById("attachmentTestCaseDiv").style.display = "flex";

    //                 $('input:radio[name=testcaseGroup]')[0].checked = true;
    //             }
    //             else {
    //                 document.getElementById("passTestCaseDiv").style.display = "none";
    //                 document.getElementById("failTestCaseDiv").style.display = "none";
    //                 document.getElementById("attachmentTestCaseDiv").style.display = "none";

    //                 $('input:radio[name=testcaseGroup]')[1].checked = true;
    //             }


    //             urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'No'" ;

    //             let results = retrieveSharePointListItemsByListName("Links", urlQuery);
    //             results.done(function (data) {
    //                    console.log('links', data); 

    //                    //let arrayBucket = data;
    //                    let arrayBucket = data.d.results;

    //                    document.getElementById("attachmentsDiv").style.display = "flex";  

    //                    let startDiv = "<div style='text-align: right;'>";

    //                     let full_list = startDiv;
    //                     for(var i=0; i<arrayBucket.length; ++i){                        
    //                         full_list = full_list + "<a href='" + arrayBucket[i].Link + "' target='_blank'>" +  arrayBucket[i].Title+ "</a><br>";
    //                     } 

    //                     full_list = full_list + "</div>";

    //                     $("#" + "attachmentsDiv").html(full_list);

    //                     urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'Yes'" ;
    //                     let results2 = retrieveSharePointListItemsByListName("Links", urlQuery);

    //                     results2.done(function(data) {
                            
    //                         console.log('links2', data); 

    //                         //let arrayBucket2 = data;
    //                         let arrayBucket2 = data.d.results;

    //                         document.getElementById("attachmentsTestCaseDiv").style.display = "flex";  

    //                         let startDiv = "<div style='text-align: right;'>";

    //                         let full_list = startDiv;
    //                         for(var i=0; i<arrayBucket2.length; ++i){                        
    //                             full_list = full_list + "<a href='" + arrayBucket2[i].Link + "' target='_blank'>" +  arrayBucket2[i].Title+ "</a><br>";
    //                         } 

    //                         full_list = full_list + "</div>";

    //                         $("#" + "attachmentsTestCaseDiv").html(full_list);
    //                     });
    //                     results2.fail(function(err) {
    //                         alert(err.responseText);
    //                     });
    //             });
    //             results.fail(function(err) {
    //                 alert(err.responseText);
    //             });
            
    //     });
    //     results.fail(function(err) {
    //         alert(err.responseText);
    //     });
        
    // }

                                 
});

function SubmitFormWithValidation()
{    

    let IsFormValid = true;

    if ( !IsThisComboFieldValid("finalApprover")) {
        IsFormValid = false;    
    }
    

    if ( IsFormValid) 
    {
        jQuery.confirm({        
            title: false,
            content: '<div style="font-size: large;font-style: italic;">Are you sure you want to submit this TPC for final Approval?</div>',
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
                            var logonName = document.getElementById("finalApprover").value;                            

                            var account = getAccountId(logonName);
                                account.done(function (data) {

                                let finalApproverId = data;
                                
                                let comments = "";
                                
                                let metaData = getWorkaroundMetaData("Final Approval (Pending)", finalApproverId, comments);
                                
                                if ( metaData ) 
                                {
                                    var results = updateWorkAround(WorkaroundId, metaData);
                                        results.done(function (data) {
                                            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                            window.location = serverUrl + page;
                                        });
                                            results.fail(function(error) {
                                                alert(error);
                                        });
                                }    

                            });
                                account.fail(function(error) {
                                    alert(error);
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
}

function getAccountId(logonName) {

    var deferred = jQuery.Deferred();

    var item = {  
        'logonName': logonName  
    };  

    jQuery.ajax({  
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/ensureuser",  
        type: "POST",  
        //async: false,  
        contentType: "application/json;odata=verbose",  
        data: JSON.stringify(item),  
        headers: {  
            "Accept": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val()  
        },  
        success:function(data){
            deferred.resolve(data.d.Id);
        },
        error:function(err){
            deferred.reject(err);
        }
    });  
    
    return deferred.promise();
}

function getWorkaroundMetaData(Decision, finalApproverId, commentsVal)
{    
    var itemType = GetItemTypeForListName("Workaround");    

    var data = {
        "__metadata": { "type": itemType },
        "Comments": commentsVal,        
        "WorkaroundWorkflowStatus": "Final Approval (Pending)",     
        "finalApproverId": finalApproverId       
    };
    
    return data;    

}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
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

function IsThisComboFieldValid(fieldName)
{
    let field = document.getElementById(fieldName);
    let errorField = document.getElementById("error-" + fieldName);

    if ( field.value == 0 )
    {
        errorField.style.display = "inline";
        return false;
    }
    else {

        errorField.style.display = "none";
        return true;
    }

    return false;
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

function validatingStatusUserSecurity(workaroundStatus, workaroundUserId, workaroundType) 
{
    let onError = false;

    if ( workaroundType === "OM" ) {
        if ( workaroundStatus !== "OM Initial Approval (Approved)" )
        {
            jQuery("#error-status").show();
            onError = true;
        }
        else {
            jQuery("#error-status").hide();
        }
    }
    else {
        if ( workaroundStatus !== "Initial Approval (Approved)" )
        {
            jQuery("#error-status").show();
            onError = true;
        }
        else {
            jQuery("#error-status").hide();
        }
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

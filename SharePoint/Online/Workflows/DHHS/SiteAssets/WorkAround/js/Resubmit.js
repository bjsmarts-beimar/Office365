'use strict';

var PageContextRevisionID = null;
//var user, Titles, Labels, Emails;
var WorkAroudTypeId = 0;
var _attachments = new Array();
var _testCaseAttachments = new Array();
var urlQuery = "";
var WorkaroundItem = null;
var currentComments = null;


// jQuery(document).ready(function () {

//     // Check for FileReader API (HTML5) support.
//     if (!window.FileReader) {
//         alert('This browser does not support the FileReader API.');
//     }  
    
//     initializePeoplePicker('peoplePickerDiv');  
//     initializePeoplePicker('testersPeoplePickerDiv');
//     initializePeoplePicker('BALeadPeoplePickerDiv');
//     initializePeoplePicker('projectManagerPeoplePickerDiv');

//     initializePeoplePicker('businesAnalystPeoplePickerDiv');
//     initializePeoplePicker('analystPeoplePickerDiv');
//     initializePeoplePicker('managerPeoplePickerDiv');
//     initializePeoplePicker('directorPeoplePickerDiv');

//     var WorkAroundId = getUrlParameter('WorkaroundId');
    
//     if ( WorkAroundId )
//     {
//         retrieveWorkAroundItem(WorkAroundId);
        
//         document.getElementById("ibmbaPeoplePickerDiv").style.display = "flex";
//         document.getElementById("testingTeamPeoplePickerDiv").style.display = "flex";
//         document.getElementById("sblTeamPeoplePickerDiv").style.display = "flex";
//         document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "flex";

//         if ( WorkAroudTypeId === 3)
//         {
//             document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
//             document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
//             document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
//             document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
//             document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";
//         }
//     }    

//     getDataFromlocalStorage();
//     setTitleFromLocalStorage("EEMS Workaround Resubmit Form");
//     setLabelsFromLocalStorage("1");
//     setLabelsFromLocalStorage("2");
//     setLabelsFromLocalStorage("3");
//     setLabelsFromLocalStorage("4");
//     setLabelsFromLocalStorage("5");
//     setLabelsFromLocalStorage("6");
//     setLabelsFromLocalStorage("7");
//     setLabelsFromLocalStorage("8");
//     setLabelsFromLocalStorage("9");
//     setLabelsFromLocalStorage("10");
//     setLabelsFromLocalStorage("11");
//     setLabelsFromLocalStorage("12");        
//     setLabelsFromLocalStorage("13");    
//     setLabelsFromLocalStorage("14");    
//     setLabelsFromLocalStorage("15");    
//     setLabelsFromLocalStorage("16");    
//     setLabelsFromLocalStorage("17");    
//     setLabelsFromLocalStorage("18");    
//     setLabelsFromLocalStorage("19");
//     setLabelsFromLocalStorage("20");      

                                 
// });

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    loadingLocalStorageData("EEMS Workaround Resubmit Form");

    initializePeoplePicker('peoplePickerDiv');  
    initializePeoplePicker('testersPeoplePickerDiv');
    initializePeoplePicker('BALeadPeoplePickerDiv');
    initializePeoplePicker('projectManagerPeoplePickerDiv');

    initializePeoplePicker('businesAnalystPeoplePickerDiv');
    initializePeoplePicker('analystPeoplePickerDiv');
    initializePeoplePicker('managerPeoplePickerDiv');
    initializePeoplePicker('directorPeoplePickerDiv');

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var DisplayRejection = getUrlParameter('DisplayRejection');

    if ( DisplayRejection )
        document.getElementById("ReasonForRejectionDiv").style.display = "flex";
    
    if ( WorkAroundId )
    {
        loadindWorkaroundEditMode(WorkAroundId, WorkaroundItem, currentComments);
    }           
});

function ReSubmitFormWithValidation()
{    
    if ( IsFormValid() )
    {
        if ( WorkAroudTypeId != 3 )
        {
            UpdateWorkAroundRecord();
        }
        else {
            UpdateOMWorkAroundRecord();
        }        
    }
}

function UpdateWorkAroundRecord()
{
    let listName = "Workaround";
    let itemType = GetItemTypeForListName(listName); 
    
    let title = jQuery('#title').val();
    let releaseNumber = jQuery('#release').val();    
    let trigger = jQuery('#trigger').val();    
    let issue = jQuery('#issue').val();
    let steps = jQuery('#steps').val();
    let explanationText = jQuery('#explanationText').val();
    let defectCR = jQuery('#defectCR').val();
    let WorkaroundNumber = document.getElementById('WorkaroundNumber').innerText;
    let goLive = getSelectedTextFromField("golive");
    let typeWorkaround = getSelectedTextFromField("typeWorkaround");    
    let testCase = getSelectedTextFromField("testCase");
    let timeUsage = getSelectedTextFromField("timeUsage");
    let testcaseOption = jQuery('input[name=testcaseGroup]:checked').val();
    let testcasePass = testcaseOption == 1? "Yes": "No";
    let testcaseFail = testcaseOption == 2? "Yes": "No";

    

    var businessanalyst = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    businessanalyst.done(function (data) {

        let businessanalystId = data;

        var tester = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan);
            tester.done(function(data) {

                let testerId = data;

                var analystLead = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan);
                analystLead.done(function(data) {

                    let analystId = data;

                    var projectManager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan);
                    projectManager.done(function(data) {

                        let projectManagerId = data;
                        let iaIds = getImpactedAudiencesIds();                          
                        console.log('Current WorkaroundItem: ', WorkaroundItem);
                        
                        let fieldComments = getComments($("#field-comments").val(), currentComments);


                        let metadata = {
                            "__metadata": { "type": itemType },
                            "Title": title, 
                            "Comments": fieldComments,
                            "Release_x0020_Number": releaseNumber,
                            "Workaround_x0020_Trigger": trigger,
                            "Issue": issue,
                            "Workaround_x0020_Steps": steps,
                            "DefectCRNumber": defectCR,
                            "WorkaroundGoLive": goLive,
                            "WorkaroundType": typeWorkaround,
                            "Test_x0020_Case": testCase,
                            "WorkaroundUsage": timeUsage,
                            "Impacted_x0020_Audience": {"results": iaIds},
                            "GoLiveComments": explanationText,
                            "Test_x0020_Case_x0020_Pass": testcasePass,
                            "Test_x0020_Case_x0020_Fail": testcaseFail,
                            "IBM_x0020_BAId": businessanalystId,
                            "Testing_x0020_TeamId": testerId,
                            "State_x0020_BA_x0020_LeadId": analystId,
                            "MMRP_x0020_State_x0020_Project_xId": projectManagerId,
                            "IsInitialEmailSendOut": "No",
                            "IBMBAStatus": WorkaroundItem.IBMBAStatus === "Approved" ? WorkaroundItem.IBMBAStatus : "In Progress",
                            "TestingTeamStatus": WorkaroundItem.TestingTeamStatus === "Approved" ? WorkaroundItem.IBMBAStatus : "In Progress",
                            "StateBaLeadStatus": WorkaroundItem.StateBaLeadStatus === "Approved" ? WorkaroundItem.StateBaLeadStatus : "In Progress",
                            "ProjectManagerStatus": WorkaroundItem.ProjectManagerStatus === "Not Started" ? WorkaroundItem.ProjectManagerStatus : "In Progress",
                            "WorkaroundWorkflowStatus": "Initial Approval (Pending)"
                        };
                
                        let results = updateSharePointListItem(PageContextRevisionID, metadata, listName);
                
                        results.done(function (data) {

                                                                
                                    let WorkaroundID = WorkaroundItem.ID;

                                    // for(var i=0; i<_attachments.length; ++i){   
                                                                                                
                                    //     let name = _attachments[i][0];
                                    //     let serverRelativeURL = _attachments[i][1]; 
                                        
                                    //     var listName = "Links";
                                    //     var itemType = GetItemTypeForListName(listName);
                                        
                                    //     var item = {
                                    //         "__metadata": { "type": itemType },
                                    //         "Title": name,
                                    //         "Link": serverRelativeURL,
                                    //         "WorkAroundID": WorkaroundID,
                                    //         "IsTestCaseAttachment": "No"
                                    //     };

                                    //     let attachment = addItemToSharePointList(item, listName);
                                    //     attachment.done(function(data) {
                                    //         console.log(data);
                                    //     });
                                    //     attachment.fail(function(error) {
                                    //         alert(error);
                                    //     });
                                    // }

                                    // for(var i=0; i<_testCaseAttachments.length; ++i){   
                                                                            
                                    //     let name = _testCaseAttachments[i][0];
                                    //     let serverRelativeURL = _testCaseAttachments[i][1];  
                                        
                                    //     var listName = "Links";
                                    //     var itemType = GetItemTypeForListName(listName);
                                        
                                    //     var item = {
                                    //         "__metadata": { "type": itemType },
                                    //         "Title": name,
                                    //         "Link": serverRelativeURL,
                                    //         "WorkAroundID": WorkaroundID,
                                    //         "IsTestCaseAttachment": "Yes"
                                    //     };

                                    //     let attachment = addItemToSharePointList(item, listName);
                                    //     attachment.done(function(data) {
                                    //         console.log(data);
                                    //     });
                                    //     attachment.fail(function(error) {
                                    //         alert(error);
                                    //     });
                                    // }

                                    jQuery.alert({        
                                        title: false,
                                        content: '<div style="font-size: large;font-style: italic;">Your Workaround Process form has been resubmitted for Review.</div>',
                                        columnClass: 'medium',
                                        buttons: {            
                                            Ok: {
                                                text: 'Ok',
                                                btnClass: 'btn-default btn-md',
                                                action: function(){
                                                    window.location = _spPageContextInfo.webAbsoluteUrl;                                            
                                                }
                                            }
                                        }
                                    });                            
                            
                
                        });
                        results.fail(function (error) {
                            alert(err.responseText);
                        });

                    });
                    projectManager.fail(function(error) {
                        alert(error);
                    });

                });
                analystLead.fail(function(error) {
                    alert(error);
                });

        });
        tester.fail(function(error) {
            alert(error);
        });    

    });
    businessanalyst.fail(function(error) {
        alert(error.responseText);
    });    
}   

function UpdateOMWorkAroundRecord()
{
    let listName = "Workaround";
    let itemType = GetItemTypeForListName(listName); 
    
    let title = jQuery('#title').val();
    let releaseNumber = jQuery('#release').val();    
    let trigger = jQuery('#trigger').val();    
    let issue = jQuery('#issue').val();
    let steps = jQuery('#steps').val();
    let explanationText = jQuery('#explanationText').val();
    let defectCR = jQuery('#defectCR').val();
    let WorkaroundNumber = document.getElementById('WorkaroundNumber').innerText;
    let goLive = getSelectedTextFromField("golive");
    let typeWorkaround = getSelectedTextFromField("typeWorkaround");    
    let testCase = getSelectedTextFromField("testCase");
    let timeUsage = getSelectedTextFromField("timeUsage");
    let testcaseOption = jQuery('input[name=testcaseGroup]:checked').val();
    let testcasePass = testcaseOption == 1? "Yes": "No";
    let testcaseFail = testcaseOption == 2? "Yes": "No";

    let businessanalyst = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    businessanalyst.done(function (data) {

        let analystId = data;

        let tester = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan);
            tester.done(function(data) {

                let testerId = data;

                let analystLead = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan);
                analystLead.done(function(data) {

                    let analystLeadId = data;

                    let projectManager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan);
                    projectManager.done(function(data) {

                        let projectManagerId = data;

                        var director = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.directorPeoplePickerDiv_TopSpan);
                        director.done(function(data) {

                            let directorId = data;

                            var analyst2 = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.analystPeoplePickerDiv_TopSpan);
                            analyst2.done( function(data) {

                                let analyst2Id = data;

                                var manager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.managerPeoplePickerDiv_TopSpan);
                                manager.done( function(data) {

                                    let managerId = data;

                                    var businessAnalyst = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.businesAnalystPeoplePickerDiv_TopSpan);
                                    businessAnalyst.done( function(data) {

                                        let businessAnalystId = data;

                                        let iaIds = getImpactedAudiencesIds();   
                                        
                                        let fieldComments = getComments($("#field-comments").val(), currentComments);                                        

                                        let metadata = {
                                            "__metadata": { "type": itemType },
                                            "Title": title,
                                            "Comments": fieldComments,
                                            "Release_x0020_Number": releaseNumber,
                                            "Workaround_x0020_Trigger": trigger,
                                            "Issue": issue,
                                            "Workaround_x0020_Steps": steps,
                                            "DefectCRNumber": defectCR,
                                            "WorkaroundGoLive": goLive,
                                            "WorkaroundType": typeWorkaround,
                                            "Test_x0020_Case": testCase,
                                            "WorkaroundUsage": timeUsage,
                                            "Impacted_x0020_Audience": {"results": iaIds},
                                            "GoLiveComments": explanationText,
                                            "Test_x0020_Case_x0020_Pass": testcasePass,
                                            "Test_x0020_Case_x0020_Fail": testcaseFail,
                                            "IBM_x0020_BAId": analystId,
                                            "Testing_x0020_TeamId": testerId,
                                            "State_x0020_BA_x0020_LeadId": analystLeadId,
                                            "MMRP_x0020_State_x0020_Project_xId": projectManagerId,
                                            "State_x0020_MMRP_x0020_Program_xId": directorId,
                                            "State_x0020_MMRP_x0020_Testing_xId": analyst2Id,
                                            "State_x0020_MMRP_x0020_O_x0026_MId": managerId,
                                            "State_x0020_MMRP_x0020_O_x0026_M0Id": businessAnalystId,
                                            "IsInitialEmailSendOut": "No",
                                            "IBMBAStatus": WorkaroundItem.IBMBAStatus === "Approved" ? WorkaroundItem.IBMBAStatus : "In Progress",
                                            "TestingTeamStatus": WorkaroundItem.TestingTeamStatus === "Approved" ? WorkaroundItem.IBMBAStatus : "In Progress",
                                            "StateBaLeadStatus": WorkaroundItem.StateBaLeadStatus === "Approved" ? WorkaroundItem.StateBaLeadStatus : "In Progress",
                                            "ProjectManagerStatus": WorkaroundItem.ProjectManagerStatus === "Not Started" ? WorkaroundItem.ProjectManagerStatus : "In Progress",
                                            "WorkaroundWorkflowStatus": "Initial Approval (Pending)"                     
                                        };
                                
                                        let results = updateSharePointListItem(PageContextRevisionID, metadata, listName);
                                
                                        results.done(function (data) {

                                            for(var i=0; i<_attachments.length; ++i){   
                                                                                                        
                                                let name = _attachments[i][0];
                                                let serverRelativeURL = _attachments[i][1]; 
                                                
                                                var listName = "Links";
                                                var itemType = GetItemTypeForListName(listName);
                                                
                                                var item = {
                                                    "__metadata": { "type": itemType },
                                                    "Title": name,
                                                    "Link": serverRelativeURL,
                                                    "WorkAroundID": WorkaroundID,
                                                    "IsTestCaseAttachment": "No"
                                                };

                                                let attachment = addItemToSharePointList(item, listName);
                                                attachment.done(function(data) {
                                                    console.log(data);
                                                });
                                                attachment.fail(function(error) {
                                                    alert(error);
                                                });
                                            }

                                            for(var i=0; i<_testCaseAttachments.length; ++i){   
                                                                                    
                                                let name = _testCaseAttachments[i][0];
                                                let serverRelativeURL = _testCaseAttachments[i][1];  
                                                
                                                var listName = "Links";
                                                var itemType = GetItemTypeForListName(listName);
                                                
                                                var item = {
                                                    "__metadata": { "type": itemType },
                                                    "Title": name,
                                                    "Link": serverRelativeURL,
                                                    "WorkAroundID": WorkaroundID,
                                                    "IsTestCaseAttachment": "Yes"
                                                };

                                                let attachment = addItemToSharePointList(item, listName);
                                                attachment.done(function(data) {
                                                    console.log(data);
                                                });
                                                attachment.fail(function(error) {
                                                    alert(error);
                                                });
                                            }

                                            jQuery.alert({        
                                                title: false,
                                                content: '<div style="font-size: large;font-style: italic;">Your Workaround Process form has been resubmitted for Review.</div>',
                                                columnClass: 'medium',
                                                buttons: {            
                                                    Ok: {
                                                        text: 'Ok',
                                                        btnClass: 'btn-default btn-md',
                                                        action: function(){
                                                            window.location = _spPageContextInfo.webAbsoluteUrl;                                            
                                                        }
                                                    }
                                                }
                                            });

                                        });
                                        results.fail(function (error) {
                                            alert(data.responseText); 
                                        });

                                        
                                    });
                                    businessAnalyst.fail( function(error) {
                                        alert(data.responseText); 
                                    });                                        

                                });
                                manager.fail( function(error) {
                                    alert(data.responseText); 
                                });

                            });
                            analyst2.fail( function(error) {
                                alert(data.responseText); 
                            });
                                
                        });
                        director.fail(function(error) {
                            alert(data.responseText); 
                        });

                    });
                    projectManager.fail(function(error) {
                        alert(data.responseText); 
                    });

                });
                analystLead.fail(function(error) {
                    alert(data.responseText); 
                });

        });
        tester.fail(function(error) {
            alert(data.responseText); 
        });    

    });
    businessanalyst.fail(function(error) {
        alert(error.responseText);
    });
}

function getImpactedAudiencesIds() 
{
    var results = [];

    if(jQuery('#ia1').is(':checked')) {
        results.push(jQuery('#ia1').val());
    }

    if(jQuery('#ia2').is(':checked')) {
        results.push(jQuery('#ia2').val());
    }

    if(jQuery('#ia3').is(':checked')) {
        results.push(jQuery('#ia3').val());
    }

    if(jQuery('#ia4').is(':checked')) {
        results.push(jQuery('#ia4').val());
    }

    if(jQuery('#ia5').is(':checked')) {
        results.push(jQuery('#ia5').val());
    }

    return results;
}

function IsFormValid()
{
    let IsValid = true;

    if ( !IsThisTextFieldValid("title") )
    {
        IsValid = false;        
    }

    if ( !IsThisComboFieldValid("testCase")) {
        IsValid = false;    
    }
    else {

        let field = document.getElementById("testCase");
    
        if ( field.value != 2 )
        {
            if ( !jQuery('input[name=testcaseGroup]:checked').val() ) 
            {        
                let errorField = document.getElementById("error-testcaseGroup");
                errorField.style.display = "inline";
                IsValid = false;
            }
            else {
                let errorField = document.getElementById("error-testcaseGroup");
                errorField.style.display = "none";
            }
        }        
    }

    if ( !IsThisComboFieldValid("golive")) {
        IsValid = false;    
    }

    if ( !IsThisComboFieldValid("timeUsage")) {
        IsValid = false;    
    }

    if ( !IsThisTextFieldValid("release") )
    {
        IsValid = false;        
    }

    if ( !IsThisTextFieldValid("trigger") )
    {
        IsValid = false;        
    }

    if ( !IsThisTextFieldValid("issue") )
    {
        IsValid = false;        
    }

    if ( !IsThisTextFieldValid("defectCR") )
    {
        IsValid = false;        
    }

    if ( !IsThisTextFieldValid("steps") )
    {
        IsValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, "peoplePickerDiv") )
    {
        IsValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan, "testersPeoplePickerDiv") )
    {
        IsValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan, "BALeadPeoplePickerDiv") )
    {
        IsValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan, "projectManagerPeoplePickerDiv") )
    {
        IsValid = false;        
    }

    return IsValid; 
}

function retrieveWorkAroundItem(WorkAroundId)
{   
    jQuery.ajax  
    ({  
        //url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items?$select=ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,Author&$filter=ID eq " + WorkAroundId,  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items?$select=ReasonForRejection,Comments,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBMBAStatus,IBM_x0020_BA/EMail,TestingTeamStatus,Testing_x0020_Team/EMail,StateBaLeadStatus,State_x0020_BA_x0020_Lead/EMail,ProjectManagerStatus,MMRP_x0020_State_x0020_Project_x/EMail,State_x0020_MMRP_x0020_O_x0026_M0/EMail,State_x0020_MMRP_x0020_Testing_x/EMail,State_x0020_MMRP_x0020_O_x0026_M/EMail,State_x0020_MMRP_x0020_Program_x/EMail,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA/Id,Testing_x0020_Team/Id,State_x0020_BA_x0020_Lead/Id,MMRP_x0020_State_x0020_Project_x/Id,State_x0020_MMRP_x0020_O_x0026_M0/Id,State_x0020_MMRP_x0020_Testing_x/Id,State_x0020_MMRP_x0020_O_x0026_M/Id,State_x0020_MMRP_x0020_Program_x/Id,Author&$filter=ID eq " + WorkAroundId,  
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
                WorkaroundItem = data.d.results[0];
                console.log('loading the workarounditem:', WorkaroundItem);
                
                PageContextRevisionID = item.ID;
                currentComments = WorkaroundItem.Comments;
                jQuery("#ReasonForRejection").text(stripHtml(item.ReasonForRejection));
                jQuery("#title").val(item.Title);
                jQuery("#WorkaroundNumber").text(item.Workaround_x0020_Number);
                jQuery("#DateSubmitted").text(item.Created);
                jQuery("#release").val(item.Release_x0020_Number);
                jQuery("#trigger").val(item.Workaround_x0020_Trigger);
                jQuery("#issue").val(item.Issue);
                jQuery("#defectCR").val(item.DefectCRNumber);   
                jQuery("#steps").text(stripHtml(item.Workaround_x0020_Steps));    
                                                    
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, item.IBM_x0020_BA.EMail);
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan, item.Testing_x0020_Team.EMail);    
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan, item.State_x0020_BA_x0020_Lead.EMail);
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan, item.MMRP_x0020_State_x0020_Project_x.EMail);                            

                if ( item.WorkaroundType === "O&M")
                {
                    WorkAroudTypeId = 3;
                    setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.businesAnalystPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_O_x0026_M0.EMail);   
                    setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.analystPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_Testing_x.EMail);   
                    setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.managerPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_O_x0026_M.EMail);   
                    setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.directorPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_Program_x.EMail);   
                }
                
                jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

                if ( item.ImpactedAudiences != null ) {
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

                if ( item.Test_x0020_Case === "Yes")
                {
                    document.getElementById("passTestCaseDiv").style.display = "flex";
                    document.getElementById("failTestCaseDiv").style.display = "flex";
                    document.getElementById("attachmentTestCaseDiv").style.display = "flex";
                    document.getElementById("attachmentsTestCaseDiv").style.display = "flex";

                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                else {
                    document.getElementById("passTestCaseDiv").style.display = "none";
                    document.getElementById("failTestCaseDiv").style.display = "none";
                    document.getElementById("attachmentTestCaseDiv").style.display = "none";
                    document.getElementById("attachmentsTestCaseDiv").style.display = "none";

                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }

                urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'No'" ;

                let results = retrieveSharePointListItemsByListName("Links", urlQuery);
                results.done(function (data) {

                        for ( var i=0; i<data.d.results.length; i++)
                        {
                            let newItem = [data.d.results[i].Title, data.d.results[i].Link];
                            _attachments.push(newItem);
                        }                                                

                        document.getElementById("attachmentsDiv").style.display = "flex";  

                        //let startDiv = "<div style='text-align: right;'>";
                        let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";

                        let full_list = startDiv;
                        for(var i=0; i<_attachments.length; ++i){                        
                            full_list = full_list + "<a href='" + _attachments[i][1] + "' target='_blank'>" +  _attachments[i][0]+ "</a>" + "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + false + ")'>Delete</a></span><br>";
                        } 

                        full_list = full_list + "</div>";

                        $("#" + "attachmentsDiv").html(full_list);

                        urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'Yes'" ;
                        let results2 = retrieveSharePointListItemsByListName("Links", urlQuery);

                        results2.done(function(data) {

                            for ( var i=0; i<data.d.results.length; i++)
                            {
                                let newItem = [data.d.results[i].Title, data.d.results[i].Link];
                                _testCaseAttachments.push(newItem);
                            }                                                                

                            document.getElementById("attachmentsTestCaseDiv").style.display = "flex";  

                            //let startDiv = "<div style='text-align: right;'>";
                            let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";

                            let full_list = startDiv;
                            for(var i=0; i<_testCaseAttachments.length; ++i){                        
                                full_list = full_list + "<a href='" + _testCaseAttachments[i][1] + "' target='_blank'>" +  _testCaseAttachments[i][0]+ "</a>" + "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + true + ")'>Delete</a></span><br>";
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
            }  
        },  
        error: function(data)  
        {  
            alert(data.responseText);  
        }  
    });
}

function uploadTestCaseAttachment()
{
    let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";
    addAttachment("getTestCaseFile", "error-test-case-revision-file", _testCaseAttachments, "attachmentsTestCaseDiv", startDiv, true);
}

function uploadAttachment()
{
    let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";
    addAttachment("getFile", "error-revision-file", _attachments, "attachmentsDiv", startDiv, false);
}

function addAttachment(fileInputName, fileInputErrorName, arrayBucket, divBucket, startDiv, IsTestCaseAttachment)
{
    var fileInput = jQuery('#' + fileInputName);

    if ( fileInput[0].files.length > 0 )
    {
        jQuery("#" + fileInputErrorName).hide();

        var serverRelativeUrlToFolder = '/sites/SBH/wp/data/Attachments/';
        var serverUrl = _spPageContextInfo.webAbsoluteUrl;
        
        // Initiate method calls using jQuery promises.
        // Get the local file as an array buffer.
        var getFile = getFileBuffer(fileInput);
        getFile.done(function (arrayBuffer) {
        
        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer, fileInput, serverUrl, serverRelativeUrlToFolder);
            addFile.done(function (file, status, xhr) {

                //CreateLink(file.d.Name, file.d.ServerRelativeUrl);
                console.log(file);
                    
                // Reset the input control
                fileInput.val("");

                // Add new file 
                let newItem = [file.d.Name, file.d.ServerRelativeUrl];
                arrayBucket.push(newItem);

                document.getElementById(divBucket).style.display = "flex";  

                let full_list = startDiv;
                for(var i=0; i<arrayBucket.length; ++i){                        
                    full_list = full_list + arrayBucket[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + IsTestCaseAttachment + ")'>Delete</a></span><br>";
                } 

                full_list = full_list + "</div>";

                $("#" + divBucket).html(full_list);

            });
            addFile.fail(onError);        
        });
        getFile.fail(onError);
    }
    else {
        jQuery("#" + fileInputErrorName).show();
    }
}

function deleteAttachment(Index, IsTestCaseAttachment)
{    
    if (confirm('Are you sure you want to remove this attachment?')) {  
        
        if ( !IsTestCaseAttachment )
        {
            let ServerRelativeUrl = _attachments[Index][1];
            let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";
            DeleteAttachment(ServerRelativeUrl, Index, "attachmentsDiv", startDiv, false);
        }
        else {
            let ServerRelativeUrl = _testCaseAttachments[Index][1];
            let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";
            DeleteTestCaseAttachment(ServerRelativeUrl, Index, "attachmentsTestCaseDiv", startDiv, true);
        }
        
    }
}

function DeleteAttachment(ServerRelativeUrl, Index, divBucket, startDiv, IsTestCaseAttachment)
{
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    
    var fullUrl = siteUrl + "/data/_api/web/GetFileByServerRelativeUrl('" + ServerRelativeUrl +"')";
    
    $.ajax({        
        url: fullUrl,    
        method: "POST",    
        headers: {    
            "accept": "application/json;odata=verbose",    
            "content-type": "application/json;odata=verbose",    
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),    
            "IF-MATCH": "*",    
            "X-HTTP-Method": "DELETE"    
        },    
        success: function(data) {    
            
            console.log(data);

            document.getElementById(divBucket).style.display = "flex";  
            
            let newAttachmentArray = new Array();
                       
            for(var i=0; i<_attachments.length; ++i){         
                
                if ( i !== Index )
                {                    
                    newAttachmentArray.push(_attachments[i]);
                }                
            } 

            _attachments = newAttachmentArray;

            let full_list = startDiv;
            for(var i=0; i<_attachments.length; ++i){                        
                full_list = full_list + _attachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + IsTestCaseAttachment + ")'>Delete</a></span><br>";
            } 

            full_list = full_list + "</div>";
            
            $("#" + divBucket).html(full_list);
        },    
        error: function(error) {    
            alert(JSON.stringify(error));        
        }        
    })      
}

function DeleteTestCaseAttachment(ServerRelativeUrl, Index, divBucket, startDiv, IsTestCaseAttachment)
{
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    
    var fullUrl = siteUrl + "/data/_api/web/GetFileByServerRelativeUrl('" + ServerRelativeUrl +"')";
    
    $.ajax({        
        url: fullUrl,    
        method: "POST",    
        headers: {    
            "accept": "application/json;odata=verbose",    
            "content-type": "application/json;odata=verbose",    
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),    
            "IF-MATCH": "*",    
            "X-HTTP-Method": "DELETE"    
        },    
        success: function(data) {    
            
            console.log(data);

            document.getElementById(divBucket).style.display = "flex";  
            
            let newAttachmentArray = new Array();
                       
            for(var i=0; i<_testCaseAttachments.length; ++i){         
                
                if ( i !== Index )
                {                    
                    newAttachmentArray.push(_testCaseAttachments[i]);
                }                
            } 

            _testCaseAttachments = newAttachmentArray;

            let full_list = startDiv;
            for(var i=0; i<_testCaseAttachments.length; ++i){                        
                full_list = full_list + _testCaseAttachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + IsTestCaseAttachment + ")'>Delete</a></span><br>";
            } 

            full_list = full_list + "</div>";
            
            $("#" + divBucket).html(full_list);
        },    
        error: function(error) {    
            alert(JSON.stringify(error));        
        }        
    })      
}

// Get the local file as an array buffer.
function getFileBuffer(fileInput) {
    var deferred = jQuery.Deferred();
    var reader = new FileReader();
    reader.onloadend = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(fileInput[0].files[0]);
    return deferred.promise();
}

// Add the file to the file collection in the Shared Documents folder.
function addFileToFolder(arrayBuffer, fileInput, serverUrl, serverRelativeUrlToFolder) {
    
    // Get the file name from the file input control on the page.
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];

    // Construct the endpoint.
    var fileCollectionEndpoint = String.format(
           "{0}/data/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
           "/add(overwrite=true, url='{2}')",
           serverUrl, serverRelativeUrlToFolder, fileName);

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return jQuery.ajax({
        url: fileCollectionEndpoint,
        type: "POST",            
        data: arrayBuffer,
        processData: false,
        beforeSend : function() {
            // $.blockUI({ 
            //     message: '<h4>Uploading Document ...</h4>',
            //     css: { 
            //     border: 'none', 
            //     padding: '15px',                          
            //     backgroundColor: '#000', 
            //     '-webkit-border-radius': '10px', 
            //     '-moz-border-radius': '10px', 
            //     opacity: .5, 
            //     color: '#fff' 
            // } }); 
        }, 
        complete: function () {
            // $.unblockUI();                    
        },
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
            "content-length": arrayBuffer.byteLength
        }
    });
}

// Display error messages. 
function onError(error) {    
    alert(error.responseText);
    //console.log(error.responseText);
    //alert('Error has occurred. Please try to upload the revision file again.');
}

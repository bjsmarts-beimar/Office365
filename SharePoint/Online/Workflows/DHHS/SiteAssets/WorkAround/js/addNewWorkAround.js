'use strict';

let user, Titles, Labels, Emails;
let WorkAroudTypeId = 0;
let _attachments = new Array();
let _testCaseAttachments = new Array();

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    let dateSubmitted = moment().format("DD MMMM, YYYY");
    let workaroundNumber = moment().format();  
    jQuery('#DateSubmitted').text(dateSubmitted);
    jQuery('#WorkaroundNumber').text(workaroundNumber);
    
    initializePeoplePicker('peoplePickerDiv');  
    initializePeoplePicker('testersPeoplePickerDiv');
    initializePeoplePicker('BALeadPeoplePickerDiv');
    initializePeoplePicker('projectManagerPeoplePickerDiv');
    initializePeoplePicker('directorPeoplePickerDiv');
    initializePeoplePicker('analystPeoplePickerDiv');
    initializePeoplePicker('managerPeoplePickerDiv');
    initializePeoplePicker('businesAnalystPeoplePickerDiv');
    // initializePeoplePicker('peoplePickerDivDeveloper');                          
    
    getDataFromlocalStorage();
    setTitleFromLocalStorage();
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

});

function getDataFromlocalStorage()
{
    if ( localStorage )
    {
        let _Titles = localStorage.getItem("Titles");

        if ( _Titles )            
        {
            console.log('localStorage Titles: ', JSON.parse(_Titles));            
            Titles = JSON.parse(_Titles);

            let _Emails = localStorage.getItem("Emails");

            if ( _Emails )
            {
                console.log('localStorage Emails: ', JSON.parse(_Emails));
                let Emails = JSON.parse(_Emails);

                let _Labels = localStorage.getItem("Labels");

                if ( _Labels )
                {
                    console.log('localStorage Labels: ', JSON.parse(_Labels));
                    Labels = JSON.parse(_Labels);
                    return;
                }
                else {

                    let urlQuery = "?$select=LabelID,Title";

                    let resultsLabels = retrieveListItems("Labels", urlQuery);
                    resultsLabels.done(function (data) {
                        localStorage.setItem("Labels", JSON.stringify(data));                        
                        getDataFromlocalStorage();
                    });
                    resultsLabels.fail(function(err) {
                        alert(err.responseText);
                    });

                }                    
            }
            else {

                let urlQuery = "?$select=EmailID,Title,EmailBody";

                let resultsEmails = retrieveListItems("Emails", urlQuery);
                    resultsEmails.done(function (data) {
                        localStorage.setItem("Emails", JSON.stringify(data));                        
                        getDataFromlocalStorage();
                    });
                    resultsEmails.fail(function(err) {
                        alert(err.responseText);
                    });   
            }
        }
        else {

            let urlQuery = "?$select=TitleID,Title,titleForm";

            let results = retrieveListItems("Titles", urlQuery);
            results.done(function (data) {
                localStorage.setItem("Titles", JSON.stringify(data));                
                getDataFromlocalStorage();
            });
            results.fail(function(err) {
                alert(err.responseText);
            });             
        }               
    }

}

function setTitleFromLocalStorage()
{      
    let _title = Titles.find(function(title) {
        return title.Title === "EEMS Workaround Initiation Form"
    });

    jQuery("#label_form_title").text(_title.titleForm);  
}

function setLabelsFromLocalStorage(labelIndex)
{

    let _label  = Labels.find(function(title) {
        return title.LabelID === labelIndex
    });

    name = "label" + labelIndex;

    jQuery("#" + name).text(_label.Title);  
}

function SubmitFormWithValidation()
{           
    let IsFormValid = true;
    
    if ( !IsThisComboFieldValid("typeWorkaround")) {
        IsFormValid = false;    
    }

    if ( !IsThisComboFieldValid("testCase")) {
        IsFormValid = false;    
    }
    else {

        let field = document.getElementById("testCase");
    
        if ( field.value != 2 )
        {
            if ( !jQuery('input[name=testcaseGroup]:checked').val() ) 
            {        
                let errorField = document.getElementById("error-testcaseGroup");
                errorField.style.display = "inline";
                IsFormValid = false;
            }
            else {
                let errorField = document.getElementById("error-testcaseGroup");
                errorField.style.display = "none";
            }
        }        
    }

    if ( !IsThisComboFieldValid("golive")) {
        IsFormValid = false;    
    }

    if ( !IsThisComboFieldValid("timeUsage")) {
        IsFormValid = false;    
    }

    if ( !IsThisTextFieldValid("title") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("release") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("trigger") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("issue") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("defectCR") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("steps") )
    {
        IsFormValid = false;        
    }

    // if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDivDeveloper_TopSpan, "peoplePickerDivDeveloper") )
    // {
    //     IsFormValid = false;        
    // }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, "peoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan, "testersPeoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan, "BALeadPeoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan, "projectManagerPeoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    if ( WorkAroudTypeId == 3 )
    {
        if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.directorPeoplePickerDiv_TopSpan, "directorPeoplePickerDiv") )
        {
            IsFormValid = false;        
        }

        if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.analystPeoplePickerDiv_TopSpan, "analystPeoplePickerDiv") )
        {
            IsFormValid = false;        
        }

        if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.managerPeoplePickerDiv_TopSpan, "managerPeoplePickerDiv") )
        {
            IsFormValid = false;        
        }
        if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.businesAnalystPeoplePickerDiv_TopSpan, "businesAnalystPeoplePickerDiv") )
        {
            IsFormValid = false;        
        }

    }        
    
    if ( IsFormValid )
    {
        if ( WorkAroudTypeId != 3 )
        {
            CreateWorkAroundRecord();
        }
        else {
            CreateOMWorkAroundRecord();
        }
        
    }
}



function IsPeoplePickerFieldValid(fieldName_TopSpan, fieldName)
{
    let errorField = document.getElementById("error-" + fieldName);

    if ( fieldName_TopSpan.TotalUserCount > 0 )
    {
        errorField.style.display = "none";
        return true;
    }
    else {
        errorField.style.display = "inline";
        return false;
    }    
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

function IsThisTextFieldValid(fieldName)
{    
    let field = document.getElementById(fieldName);
    let errorField = document.getElementById("error-" + fieldName);
    
    if ( field.value.length > 0 )
    {
        errorField.style.display = "none";
        return true;
    }
    else {

        errorField.style.display = "inline";
        return false;
    }    
}

function hasBeenSelected()
{
    WorkAroudTypeId = document.getElementById("typeWorkaround").value;    

    if ( WorkAroudTypeId == 3 )
    {
        document.getElementById("DDIWorkAroundReviewersDiv").style.display = "flex";
        document.getElementById("ibmbaPeoplePickerDiv").style.display = "flex";
        document.getElementById("testingTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("sblTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
        document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";           
        document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";        
        document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";        
        document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
             
    }
    else if ( WorkAroudTypeId != 0 )
    {
        document.getElementById("DDIWorkAroundReviewersDiv").style.display = "flex";
        document.getElementById("ibmbaPeoplePickerDiv").style.display = "flex";
        document.getElementById("testingTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("sblTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "none";
        document.getElementById("programDirectorPeoplePickerDiv").style.display = "none";  
        document.getElementById("testingAnalystPeoplePickerDiv").style.display = "none";
        document.getElementById("stateManagerPeoplePickerDiv").style.display = "none";
        document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "none";
        
    }    
    else {
        document.getElementById("DDIWorkAroundReviewersDiv").style.display = "none";
        document.getElementById("ibmbaPeoplePickerDiv").style.display = "none";
        document.getElementById("testingTeamPeoplePickerDiv").style.display = "none";
        document.getElementById("sblTeamPeoplePickerDiv").style.display = "none";
        document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "none";
        document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "none";
        document.getElementById("programDirectorPeoplePickerDiv").style.display = "none";   
        document.getElementById("testingAnalystPeoplePickerDiv").style.display = "none";
        document.getElementById("stateManagerPeoplePickerDiv").style.display = "none";
        document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "none";
    }     
}

function goLiveSelected()
{
    var valueSelected = document.getElementById("golive").value;    

    if ( valueSelected == 2 )
    {
        document.getElementById("ExplainLabelDiv").style.display = "flex";
        document.getElementById("ExplainDiv").style.display = "flex";
    }
    else {
        document.getElementById("ExplainLabelDiv").style.display = "none";
        document.getElementById("ExplainDiv").style.display = "none";
    }
}

function testCaseSelected() 
{
    var valueSelected = document.getElementById("testCase").value;    

    if ( valueSelected == 1 )
    {
        document.getElementById("passTestCaseDiv").style.display = "flex";
        document.getElementById("failTestCaseDiv").style.display = "flex";
        document.getElementById("attachmentTestCaseDiv").style.display = "flex";
    }
    else {
        document.getElementById("passTestCaseDiv").style.display = "none";
        document.getElementById("failTestCaseDiv").style.display = "none";
        document.getElementById("attachmentTestCaseDiv").style.display = "none";
    }
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

function CreateOMWorkAroundRecord()
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
    
    var account = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    account.done(function (data) {
        
        let IBMBAPeoplePickerId = data;
        
            var tester = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan);
            tester.done(function(data) {

                let testerPeoplePickerId = data;

                var analystLead = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan);
                analystLead.done(function(data) {

                    let analystPeoplePickerId = data;

                    var projectManager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan);
                    projectManager.done(function(data) {

                        let managerPeoplePickerId = data;

                        var director = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.directorPeoplePickerDiv_TopSpan);
                        director.done(function(data) {

                            let directorPeoplePickerId = data;

                            var analyst = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.analystPeoplePickerDiv_TopSpan);
                            analyst.done( function(data) {

                                let analystPeoplePickerId = data;

                                var manager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.managerPeoplePickerDiv_TopSpan);
                                manager.done( function(data) {

                                    let managerPeoplePickerId = data;

                                    var businesAnalyst = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.businesAnalystPeoplePickerDiv_TopSpan);
                                    businesAnalyst.done( function(data) {

                                        let businesAnalystPeoplePickerId = data;

                                        let iaIds = getImpactedAudiencesIds();            

                                        let item = {
                                            "__metadata": { "type": itemType },
                                            "Title": title,
                                            "Workaround_x0020_Number": WorkaroundNumber,
                                            "Release_x0020_Number": releaseNumber,
                                            "Workaround_x0020_Trigger": trigger,
                                            "Issue": issue,
                                            "Workaround_x0020_Steps": steps,
                                            "DefectCRNumber": defectCR,
                                            "WorkaroundGoLive": goLive,
                                            "WorkaroundType": typeWorkaround,
                                            "Test_x0020_Case": testCase,
                                            "WorkaroundUsage": timeUsage,
                                            "IBM_x0020_BAId": IBMBAPeoplePickerId,
                                            "Testing_x0020_TeamId": testerPeoplePickerId,
                                            "State_x0020_BA_x0020_LeadId": analystPeoplePickerId,
                                            "MMRP_x0020_State_x0020_Project_xId": managerPeoplePickerId,
                                            "State_x0020_MMRP_x0020_Program_xId": directorPeoplePickerId,
                                            "State_x0020_MMRP_x0020_Testing_xId": analystPeoplePickerId,
                                            "State_x0020_MMRP_x0020_O_x0026_MId": managerPeoplePickerId,
                                            "State_x0020_MMRP_x0020_O_x0026_M0Id": businesAnalystPeoplePickerId,
                                            "Impacted_x0020_Audience": {"results": iaIds},
                                            "GoLiveComments": explanationText,
                                            "Test_x0020_Case_x0020_Pass": testcasePass,
                                            "Test_x0020_Case_x0020_Fail": testcaseFail
                                        };
                                    
                                        $.ajax({
                                            url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/getbytitle('" + listName + "')/items",
                                            type: "POST",
                                            contentType: "application/json;odata=verbose",
                                            data: JSON.stringify(item),
                                            headers: {
                                                "Accept": "application/json;odata=verbose",
                                                "X-RequestDigest": $("#__REQUESTDIGEST").val()
                                            },
                                            success: function (data) {
                                                
                                                console.log(data);      
                                                                    
                                                jQuery.alert({        
                                                    title: false,
                                                    content: '<div style="font-size: large;font-style: italic;">Your Workaround Process form has been submitted for Initial Review.</div>',
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
                                                    
                                            },
                                            error: function (data) {
                                                alert(data);
                                            }
                                        });

                                    });
                                    businesAnalyst.fail( function(error) {

                                    });                                        

                                });
                                manager.fail( function(error) {
                                    alert(error);
                                });


                            });
                            analyst.fail( function(error) {
                                alert(error);
                            });

                                

                        });
                        director.fail(function(error) {
                            alert(error);
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
    account.fail(function(error) {
        alert(error);
    });
}

function CreateWorkAroundRecord()
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
    
    var account = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    account.done(function (data) {
        
        let IBMBAPeoplePickerId = data;

        // var developer = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDivDeveloper_TopSpan);
        // developer.done(function(data) {

            // let DeveloperPeoplePickerId = data;

            var tester = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan);
            tester.done(function(data) {

                let testerPeoplePickerId = data;

                var analystLead = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan);
                analystLead.done(function(data) {

                    let analystPeoplePickerId = data;

                    var projectManager = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan);
                    projectManager.done(function(data) {

                        let managerPeoplePickerId = data;
                        
                        let iaIds = getImpactedAudiencesIds();            

                        let item = {
                            "__metadata": { "type": itemType },
                            "Title": title,
                            "Workaround_x0020_Number": WorkaroundNumber,
                            "Release_x0020_Number": releaseNumber,
                            "Workaround_x0020_Trigger": trigger,
                            "Issue": issue,
                            "Workaround_x0020_Steps": steps,
                            "DefectCRNumber": defectCR,
                            "WorkaroundGoLive": goLive,
                            "WorkaroundType": typeWorkaround,
                            "Test_x0020_Case": testCase,
                            "WorkaroundUsage": timeUsage,
                            "IBM_x0020_BAId": IBMBAPeoplePickerId,
                            // "Training_x0020_DeveloperId": DeveloperPeoplePickerId,
                            "Testing_x0020_TeamId": testerPeoplePickerId,
                            "State_x0020_BA_x0020_LeadId": analystPeoplePickerId,
                            "MMRP_x0020_State_x0020_Project_xId": managerPeoplePickerId,
                            "Impacted_x0020_Audience": {"results": iaIds},
                            "GoLiveComments": explanationText,
                            "Test_x0020_Case_x0020_Pass": testcasePass,
                            "Test_x0020_Case_x0020_Fail": testcaseFail
                        };
                    
                        $.ajax({
                            url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/getbytitle('" + listName + "')/items",
                            type: "POST",
                            contentType: "application/json;odata=verbose",
                            data: JSON.stringify(item),
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "X-RequestDigest": $("#__REQUESTDIGEST").val()
                            },
                            success: function (data) {
                                
                                console.log(data); 
                                
                                let workaroundID = data.d.ID;

                                for(var i=0; i<_attachments.length; ++i){   
                                                                        
                                    let name = _attachments[i][0];
                                    let serverRelativeURL = _attachments[i][1];                              

                                    let attachment = CreateLink(name, serverRelativeURL, workaroundID, "No");
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

                                    let attachment = CreateLink(name, serverRelativeURL, workaroundID, "Yes");
                                    attachment.done(function(data) {
                                        console.log(data);
                                    });
                                    attachment.fail(function(error) {
                                        alert(error);
                                    });
                                }
                                                    
                                jQuery.alert({        
                                    title: false,
                                    content: '<div style="font-size: large;font-style: italic;">Your Workaround Process form has been submitted for Initial Review.</div>',
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
                                    
                            },
                            error: function (data) {
                                alert(data);
                            }
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

        // });
        // developer.fail(function(data) {
        //     alert(error);
        // });                

    });
    account.fail(function(error) {
        alert(error);
    });               
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

function getSelectedTextFromField(name)
{
    let selectedValue = jQuery( "#" + name + " option:selected" ).val();
    let selectedText = "";

    if ( selectedValue != 0 )
    {
        selectedText = jQuery( "#" + name + " option:selected" ).text();
    }    

    return selectedText;
}

// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '400px';

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    //this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getAccountId(peoplePickerDiv_TopSpan) {

    var deferred = jQuery.Deferred();

    // Get the people picker object from the page.
    //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
    var peoplePicker = peoplePickerDiv_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) { 
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }

    // Get the first user's ID by using the login name.
    var logonName = users[0].Key;

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

function retrieveListItems(listName, urlQuery)  
{  
    var deferred = jQuery.Deferred();

    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('" + listName + "')/items" + urlQuery,  
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
            deferred.resolve(data.d.results);            
        },  
        error: function(data)  
        {  
            deferred.reject(err);              
        }  
    });  

    return deferred.promise();
}

function uploadTestCaseAttachment()
{
    let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";
    addAttachment("getTestCaseFile", "error-test-case-revision-file", _testCaseAttachments, "attachmentsTestCaseDiv", startDiv, true);
}

function uploadAttachment2()
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
            DeleteAttachment2(ServerRelativeUrl, Index, "attachmentsDiv", startDiv, false);
        }
        else {
            let ServerRelativeUrl = _testCaseAttachments[Index][1];
            let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";
            DeleteTestCaseAttachment(ServerRelativeUrl, Index, "attachmentsTestCaseDiv", startDiv, true);
        }
        
    }
}

function DeleteAttachment2(ServerRelativeUrl, Index, divBucket, startDiv, IsTestCaseAttachment)
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

function uploadAttachment()
{
    var fileInput = jQuery('#getFile');

    if ( fileInput[0].files.length > 0 )
    {
        jQuery("#error-revision-file").hide();

        var serverRelativeUrlToFolder = '/sites/SBH/wp/data/Attachments/';
        
        // Get test values from the file input and text input page controls.
        //var fileInput = jQuery('#getFile');
        //newName = jQuery('#displayName').val();
        
        // Get the server URL.
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
                    _attachments.push(newItem);

                    document.getElementById("attachmentsDiv").style.display = "flex";                    
                       
                    let full_list = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";
                    for(var i=0; i<_attachments.length; ++i){                        
                        full_list = full_list + _attachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ")'>Delete</a></span><br>";
                    } 

                    full_list = full_list + "</div>";

                    $("#attachmentsDiv").html(full_list);
        
            });
            addFile.fail(onError);        
        });
        getFile.fail(onError);
        
    }
    else {
        jQuery("#error-revision-file").show();
    }    
}

function DeleteAttachment(ServerRelativeUrl, Index)
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

            document.getElementById("attachmentsDiv").style.display = "flex";  
            
            let newAttachmentArray = new Array();
                       
            for(var i=0; i<_attachments.length; ++i){         
                
                if ( i !== Index )
                {                    
                    newAttachmentArray.push(_attachments[i]);
                }                
            } 

            _attachments = newAttachmentArray;

            let full_list = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";
            for(var i=0; i<_attachments.length; ++i){                        
                full_list = full_list + _attachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ")'>Delete</a></span><br>";
            } 

            full_list = full_list + "</div>";
            
            $("#attachmentsDiv").html(full_list);
        },    
        error: function(error) {    
            alert(JSON.stringify(error));        
        }        
    })      
}

function CreateLink(Name, Link, WorkaroundID, IsTestCaseAttachment)
{

    var deferred = jQuery.Deferred();

    var listName = "Links";
    var itemType = GetItemTypeForListName(listName);
    
    var item = {
        "__metadata": { "type": itemType },
        "Title": Name,
        "Link": Link,
        "WorkAroundID": WorkaroundID,
        "IsTestCaseAttachment": IsTestCaseAttachment
    };

    $.ajax({
        //url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/getbytitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },  
        success: function (data) {
            console.log(data);  
            deferred.resolve(data);  
            
        },
        error: function(err) {
            alert(data);
            deferred.reject(err);
        }
    });

    return deferred.promise();
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



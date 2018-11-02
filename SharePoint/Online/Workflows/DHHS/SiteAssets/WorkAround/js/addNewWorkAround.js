'use strict';

var user;

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
    initializePeoplePicker('peoplePickerDivDeveloper');                          
    
});

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

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDivDeveloper_TopSpan, "peoplePickerDivDeveloper") )
    {
        IsFormValid = false;        
    }

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

    
    
    if ( IsFormValid )
    {
        CreateWorkAroundRecord();
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
    var valueSelected = document.getElementById("typeWorkaround").value;    

    if ( valueSelected != 0 )
    {
        document.getElementById("DDIWorkAroundReviewersDiv").style.display = "flex";
        document.getElementById("ibmbaPeoplePickerDiv").style.display = "flex";
        document.getElementById("testingTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("sblTeamPeoplePickerDiv").style.display = "flex";
        document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "flex";
        
    }
    else {
        document.getElementById("DDIWorkAroundReviewersDiv").style.display = "none";
        document.getElementById("ibmbaPeoplePickerDiv").style.display = "none";
        document.getElementById("testingTeamPeoplePickerDiv").style.display = "none";
        document.getElementById("sblTeamPeoplePickerDiv").style.display = "none";
        document.getElementById("projectManagerTeamPeoplePickerDiv").style.display = "none";
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
    }
    else {
        document.getElementById("passTestCaseDiv").style.display = "none";
        document.getElementById("failTestCaseDiv").style.display = "none";
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

        var developer = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDivDeveloper_TopSpan);
        developer.done(function(data) {

            let DeveloperPeoplePickerId = data;

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
                            "Training_x0020_DeveloperId": DeveloperPeoplePickerId,
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
                    projectManager.fail(function(data) {
                        alert(error);
                    });

                });
                analystLead.fail(function(data) {
                    alert(error);
                });

            });
            tester.fail(function(data) {
                alert(error);
            });              

        });
        developer.fail(function(data) {
            alert(error);
        });                

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



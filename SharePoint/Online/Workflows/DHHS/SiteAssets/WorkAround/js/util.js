'use strict';

function setPeoplePickerField(peoplePicker, EMail)
{
    var usrObj = { 'Key': EMail };
    peoplePicker.AddUnresolvedUser(usrObj,true);    
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

function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
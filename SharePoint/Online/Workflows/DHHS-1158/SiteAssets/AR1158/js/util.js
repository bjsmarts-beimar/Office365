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
    schema['Width'] = '792px';

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

function IsThisDateInThePast(fieldName) 
{
    let field = document.getElementById(fieldName);
    let errorField = document.getElementById("error-" + fieldName);
    
    if ( field.value.length == 0 ) 
    {
        errorField.style.display = "none";
        return true;
    }
    else {        

        if ( isValidDate(field.value) ) {

            let dueDate = new Date(field.value);
            let today = new Date();
            let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

            if ( yesterday < dueDate ) {
                errorField.style.display = "none";
                return true;
            }
            else {
                errorField.style.display = "inline";
                return false;
            }

            return true;
        }
    }

}

function isValidDate(s) {
    var separators = ['\\.', '\\-', '\\/'];
    var bits = s.split(new RegExp(separators.join('|'), 'g'));
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    return d.getFullYear() == bits[2] && d.getMonth() + 1 == bits[1];
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
    //return temporalDivElement.innerHTML || temporalDivElement.innerText || "";
}

function strippedHtml(html){
    
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

function getComments(comments, currentComments)
{

    let utc = new Date().toLocaleString(); 
    let signature = "Wrote on " + utc;
    let returnVal = "";
                        
    if ( currentComments !== null ) {
        //comments = currentComments + '<br>' + $("#field-comments").val() + '<br>' + signature + '<br>';
        returnVal = currentComments + '<br>' + comments + '<br>' + signature + '<br>';
    }
    else {
        if ( $("#field-comments").val().length > 0  )
        {
            returnVal = comments + '<br>' + signature;
        }
    }

    return returnVal
}

function getRowBackgroundColor(created)
{    
    var IsGood = Alerts[0].Days;
    var isOk = Alerts[1].Days;
    var isBad = Alerts[2].Days;

    var color = "lightgreen";

    //DATE ROW WAS CREATED
    var dateCreated = moment(created);
    
    //TODAYS DATE
    var dateToday = moment(new Date());
    
    //CALCULATE THE DIFFERENCE IN MINUTES
    var days = dateToday.diff(dateCreated, 'days');
    

    if ( days <= IsGood )
        color = "lightgreen";

    else if ( days > IsGood && days <= isOk )
        color = "yellow";

    else if ( days >= isBad )
        color = "red";
    
    return color;
}

function getRowColor(created)
{
        var color = "black";

        var IsGood = Alerts[0].Days;
        var isOk = Alerts[1].Days;
        var isBad = Alerts[2].Days;
    
        //DATE ROW WAS CREATED
        var dateCreated = moment(created);
        
        //TODAYS DATE
        var dateToday = moment(new Date());
        
        //CALCULATE THE DIFFERENCE IN MINUTES
        var days = dateToday.diff(dateCreated, 'days');
    
        if ( days <= IsGood )
            color = "black";
    
        else if ( days > IsGood && days <= isOk )
            color = "black";
    
        else if ( days >= isBad )
            color = "white";
        
        return color;
}

function handleDateField(item, fieldObj, fieldValue)
{
    let validFieldValue = "";    
    
    if ( isValidDate(fieldValue) ) {
        validFieldValue = fieldValue;        
    }
    
    if ( validFieldValue.length > 0 )
    {
        Object.assign(item, fieldObj);
    }
}

function getfewComments(comments, limit)
{
    if ( comments )
    {
        if ( comments.length < limit )
        {
            return comments;
        }
        else {
            return comments.substring(0, limit) + " ... ";
        }
    }
    else {
        return "";
    }
}

function isValidDate(dateString)
{
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;

      // Parse the date parts to integers
      var parts = dateString.split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
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

// Display error messages
function onError(error) {    
    //alert(error.responseText);
    alert(JSON.stringify(error));
}
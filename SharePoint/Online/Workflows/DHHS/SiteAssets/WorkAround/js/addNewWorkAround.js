'use strict';

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    //2018-10-18T10:40:53
    let dateSubmitted = moment().format("DD MMMM, YYYY");
    let workaroundNumber = moment().format();  
    jQuery('#DateSubmitted').text(dateSubmitted);
    jQuery('#WorkaroundNumber').text(workaroundNumber);
                        
});

function SubmitFormWithValidation()
{    
    let title = jQuery('#title').val();

    if ( title.length > 0 )
    {
        jQuery("#error-Title").hide();
        SubmitForm();
    }
    else {
        jQuery("#error-Title").show();
    }        
}

function SubmitForm()
{
    CreateWorkAroundRecord();
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
    let defectCR = jQuery('#defectCR').val();
    let WorkaroundNumber = document.getElementById('WorkaroundNumber').innerText;
    let goLive = getSelectedTextFromField("golive");
    let typeWorkaround = getSelectedTextFromField("typeWorkaround");    
    let testCase = getSelectedTextFromField("testCase");
    let timeUsage = getSelectedTextFromField("timeUsage");
    

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
        "WorkaroundUsage": timeUsage
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
        },
        error: function (data) {
            alert(data);
        }
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

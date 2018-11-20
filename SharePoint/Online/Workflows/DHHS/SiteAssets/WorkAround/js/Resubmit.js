'use strict';

var PageContextRevisionID = null;
var user, Titles, Labels, Emails;


jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

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

    var WorkAroundId = getUrlParameter('WorkaroundId');
    
    if ( WorkAroundId )
    {
        retrieveWorkAroundItem(WorkAroundId);
    }
                                 
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
        return title.Title === "EEMS Workaround Resubmit Form"
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
                //jQuery("#developer").val(item.Training_x0020_Developer.Title); 
                jQuery("#tester").val(item.Testing_x0020_Team.Title); 
                jQuery("#analyst").val(item.State_x0020_BA_x0020_Lead.Title);
                jQuery("#manager").val(item.MMRP_x0020_State_x0020_Project_x.Title);
                //jQuery("#submitter").val(item.Author.Title);
                jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

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
        error: function(err)  
        {  
            deferred.reject(err);              
        }  
    });  

    return deferred.promise();
}

function ReSubmitFormWithValidation()
{

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
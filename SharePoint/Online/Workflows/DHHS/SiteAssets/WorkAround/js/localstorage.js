'use strict';

var user, Titles, Labels, Emails, Alerts, Approvers;

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
                Emails = JSON.parse(_Emails);

                let _Labels = localStorage.getItem("Labels");

                if ( _Labels )
                {
                    console.log('localStorage Labels: ', JSON.parse(_Labels));
                    Labels = JSON.parse(_Labels);

                    let _Alerts = localStorage.getItem("Alerts");

                    if ( _Alerts )
                    {
                        console.log('localstorage Alerts: ', JSON.parse(_Alerts));
                        Alerts = JSON.parse(_Alerts);

                        let _Approvers = localStorage.getItem("Approvers");

                        if ( _Approvers )
                        {
                            console.log('localstorage Approvers: ', JSON.parse(_Approvers));
                            Approvers = JSON.parse(_Approvers);
                            return;
                        } 
                        else {
                            let urlQuery = "?$select=ApproversId,Title,ADAccount";                        

                            let resultsApprovers = retrieveSharePointListItemsByListName("Approvers", urlQuery);
                            resultsApprovers.done(function (data) {
                                localStorage.setItem("Approvers", JSON.stringify(data.d.results));                        
                                getDataFromlocalStorage();
                            });
                            resultsApprovers.fail(function(err) {
                                alert(err.responseText);
                            });                            
                        }                        
                    }
                    else {
                        let urlQuery = "?$select=AlertID,Title,Days";                        

                        let resultsAlerts = retrieveSharePointListItemsByListName("Alerts", urlQuery);
                        resultsAlerts.done(function (data) {
                            localStorage.setItem("Alerts", JSON.stringify(data.d.results));                        
                            getDataFromlocalStorage();
                        });
                        resultsAlerts.fail(function(err) {
                            alert(err.responseText);
                        });
                    }
                    
                }
                else {

                    let urlQuery = "?$select=LabelID,Title";

                    let resultsLabels = retrieveSharePointListItemsByListName("Labels", urlQuery);
                    resultsLabels.done(function (data) {
                        localStorage.setItem("Labels", JSON.stringify(data.d.results));                        
                        getDataFromlocalStorage();
                    });
                    resultsLabels.fail(function(err) {
                        alert(err.responseText);
                    });
                }                    
            }
            else {

                let urlQuery = "?$select=EmailID,Title,EmailSubject,EmailBody";

                let resultsEmails = retrieveSharePointListItemsByListName("Emails", urlQuery);
                    resultsEmails.done(function (data) {
                        localStorage.setItem("Emails", JSON.stringify(data.d.results));                        
                        getDataFromlocalStorage();
                    });
                    resultsEmails.fail(function(err) {
                        alert(err.responseText);
                    });   
            }
        }
        else {

            let urlQuery = "?$select=TitleID,Title,titleForm";

            let results = retrieveSharePointListItemsByListName("Titles", urlQuery);
            results.done(function (data) {
                localStorage.setItem("Titles", JSON.stringify(data.d.results));                
                getDataFromlocalStorage();
            });
            results.fail(function(err) {
                alert(err.responseText);
            });             
        }               
    }
}

function removeAllItemsFromLocalStorage()
{
    if ( localStorage )
    {
        if ( localStorage.getItem("Titles") ) 
        {
            localStorage.removeItem("Titles");
        }
        
        if ( localStorage.getItem("Emails") )
        {
            localStorage.removeItem("Emails");
        }

        if ( localStorage.getItem("Labels") )
        {
            localStorage.removeItem("Labels")
        }

        if ( localStorage.getItem("Alerts") )
        {
            localStorage.removeItem("Alerts")
        }

        if ( localStorage.getItem("Approvers") )
        {
            localStorage.removeItem("Approvers")
        }
    }

    return true;
}

function setTitleFromLocalStorage(TitleKey)
{          
    for (var i=0; i<Titles.length; i++) {

        if ( Titles[i].Title === TitleKey )
        {
            jQuery("#label_form_title").text(Titles[i].titleForm);
        }

    }          
}

function setLabelsFromLocalStorage(labelIndex)
{    
    for(var i=0; i<Labels.length; i++ )
    {
        if ( Labels[i].LabelID === labelIndex )
        {
            var name = "label" + labelIndex;
            jQuery("#" + name).text(Labels[i].Title);  
        }
    }
}

function getEmailVerbagefromLocalStorage(EmailKey)
{
    for(var i=0; i<Emails.length; i++)
    {
        if ( Emails[i].Title === EmailKey )
        {
            return Emails[i];
        }
    } 
    
    return null;
}

function setfinalApproversfromLocalStorage(selectName)
{
    for ( var i=0; i<Approvers.length; i++)
    {
        $("#" + selectName).append('<option value=' + Approvers[i].ADAccount + '>' + Approvers[i].Title + '</option>');
    }    
}
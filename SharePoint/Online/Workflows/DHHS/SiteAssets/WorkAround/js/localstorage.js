'use strict';

var user, Titles, Labels, Emails, Alerts;

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
                        return;
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
        if ( Labels[i].LabelID == labelIndex )
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
        if ( Emails[i].Title = EmailKey )
        {
            return Emails[i];
        }
    } 
    
    return null;
}
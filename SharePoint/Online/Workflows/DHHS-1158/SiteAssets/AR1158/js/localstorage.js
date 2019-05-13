'use strict';

var user, Titles, Labels, Emails, Alerts, Counties, Programs, Ledgers, CCenters, FAreas;

function getDataFromlocalStorage()
{
    if ( localStorage )
    {
        let _Titles = localStorage.getItem("arTitles");

        if ( _Titles )            
        {
            console.log('localStorage Titles: ', JSON.parse(_Titles));            
            Titles = JSON.parse(_Titles);

            let _Emails = localStorage.getItem("arEmails");            
            if ( _Emails )
            {
                console.log('localStorage Emails: ', JSON.parse(_Emails));
                Emails = JSON.parse(_Emails);

                let _Labels = localStorage.getItem("arLabels");

                if ( _Labels )
                {
                    console.log('localStorage Labels: ', JSON.parse(_Labels));
                    Labels = JSON.parse(_Labels);

                    let _Alerts = localStorage.getItem("arAlerts");

                    if ( _Alerts )
                    {
                        console.log('localstorage Alerts: ', JSON.parse(_Alerts));
                        Alerts = JSON.parse(_Alerts);

                        let _Counties = localStorage.getItem("arCounties");

                        if ( _Counties )
                        {
                            console.log('localstorage Counties: ', JSON.parse(_Counties));
                            Counties = JSON.parse(_Counties);
                            
                            let _Programs = localStorage.getItem("arPrograms");

                            if ( _Programs) {

                                console.log('localstorage Programs: ', JSON.parse(_Programs));
                                Programs = JSON.parse(_Programs);

                                let _Ledgers = localStorage.getItem("arLedgers");

                                if ( _Ledgers) {
                                    console.log('localstorage Ledgers: ', JSON.parse(_Ledgers));
                                    Ledgers = JSON.parse(_Ledgers);
                                    
                                    let _CCenters = localStorage.getItem("arCostCenter");

                                    if ( _CCenters) {
                                        console.log('localstorage Cost Centers: ', JSON.parse(_CCenters));
                                        CCenters = JSON.parse(_CCenters);
                                        
                                        let _FAreas = localStorage.getItem("arFunctionalAreas");

                                        if ( _FAreas ){

                                            console.log('localstorage Functional Areas: ', JSON.parse(_FAreas));
                                            FAreas = JSON.parse(_FAreas);
                                            return;
                                        }
                                        else {

                                            let urlQuery = "?$select=ID,Title";                        

                                            let resultsFA = retrieveSharePointListItemsByListName("FunctionalAreas", urlQuery);
                                            resultsFA.done(function (data) {
                                                localStorage.setItem("arFunctionalAreas", JSON.stringify(data.d.results));                        
                                                getDataFromlocalStorage();
                                            });
                                            resultsFA.fail(function(err) {
                                                alert(err.responseText);
                                            });   

                                        }
                                    }
                                    else {
                                        let urlQuery = "?$select=ID,Title";                        

                                        let resultsCC = retrieveSharePointListItemsByListName("CostCenter", urlQuery);
                                        resultsCC.done(function (data) {
                                            localStorage.setItem("arCostCenter", JSON.stringify(data.d.results));                        
                                            getDataFromlocalStorage();
                                        });
                                        resultsCC.fail(function(err) {
                                            alert(err.responseText);
                                        });   
                                    }
                                }
                                else {
                                    let urlQuery = "?$select=ID,Title";                        

                                    let resultsLedgers = retrieveSharePointListItemsByListName("Ledgers", urlQuery);
                                    resultsLedgers.done(function (data) {
                                        localStorage.setItem("arLedgers", JSON.stringify(data.d.results));                        
                                        getDataFromlocalStorage();
                                    });
                                    resultsLedgers.fail(function(err) {
                                        alert(err.responseText);
                                    });   
                                }                                
                            }
                            else {

                                let urlQuery = "?$select=ID,Title";                        

                                let resultsPrograms = retrieveSharePointListItemsByListName("Programs", urlQuery);
                                resultsPrograms.done(function (data) {
                                    localStorage.setItem("arPrograms", JSON.stringify(data.d.results));                        
                                    getDataFromlocalStorage();
                                });
                                resultsPrograms.fail(function(err) {
                                    alert(err.responseText);
                                });   

                            }                            
                        } 
                        else {
                            let urlQuery = "?$select=ID,Title";                        

                            let resultsCounties = retrieveSharePointListItemsByListName("Counties", urlQuery);
                            resultsCounties.done(function (data) {
                                localStorage.setItem("arCounties", JSON.stringify(data.d.results));                        
                                getDataFromlocalStorage();
                            });
                            resultsCounties.fail(function(err) {
                                alert(err.responseText);
                            });                            
                        }                        
                    }
                    else {
                        let urlQuery = "?$select=AlertID,Title,Days";                        

                        let resultsAlerts = retrieveSharePointListItemsByListName("Alerts", urlQuery);
                        resultsAlerts.done(function (data) {
                            localStorage.setItem("arAlerts", JSON.stringify(data.d.results));                        
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
                        localStorage.setItem("arLabels", JSON.stringify(data.d.results));                        
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
                        localStorage.setItem("arEmails", JSON.stringify(data.d.results));                        
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
                localStorage.setItem("arTitles", JSON.stringify(data.d.results));                
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
        if ( localStorage.getItem("arTitles") ) 
        {
            localStorage.removeItem("arTitles");
        }
        
        if ( localStorage.getItem("arEmails") )
        {
            localStorage.removeItem("arEmails");
        }

        if ( localStorage.getItem("arLabels") )
        {
            localStorage.removeItem("arLabels")
        }

        if ( localStorage.getItem("arAlerts") )
        {
            localStorage.removeItem("arAlerts")
        }

        if ( localStorage.getItem("arCounties") )
        {
            localStorage.removeItem("arCounties")
        }

        if ( localStorage.getItem("arPrograms") )
        {
            localStorage.removeItem("arPrograms")
        }

        if ( localStorage.getItem("arLedgers") )
        {
            localStorage.removeItem("arLedgers")
        }

        if ( localStorage.getItem("arCostCenter") )
        {
            localStorage.removeItem("arCostCenter")
        }

        if ( localStorage.getItem("arFunctionalAreas") )
        {
            localStorage.removeItem("arFunctionalAreas")
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

function getCountiesFromLocalStorage(selectName)
{
    for( var i=0; i<Counties.length; i++)
    {
        $("#" + selectName).append('<option value=' + Counties[i].ID + '>' + Counties[i].Title + '</option>');
    }
}

Programs, Ledgers, CCenters, FAreas

function getProgramsFromLocalStorage(selectName)
{
    for( var i=0; i<Programs.length; i++)
    {
        $("#" + selectName).append('<option value=' + Programs[i].ID + '>' + Programs[i].Title + '</option>');
    }
}

function getLedgersFromLocalStorage(selectName)
{
    for( var i=0; i<Ledgers.length; i++)
    {
        $("#" + selectName).append('<option value=' + Ledgers[i].ID + '>' + Ledgers[i].Title + '</option>');
    }
}

function getCostCenterFromLocalStorage(selectName)
{
    for( var i=0; i<CCenters.length; i++)
    {
        $("#" + selectName).append('<option value=' + CCenters[i].ID + '>' + CCenters[i].Title + '</option>');
    }
}

function getFunctionalAreasFromLocalStorage(selectName)
{
    for( var i=0; i<FAreas.length; i++)
    {
        $("#" + selectName).append('<option value=' + FAreas[i].ID + '>' + FAreas[i].Title + '</option>');
    }
}
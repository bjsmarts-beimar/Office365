'use strict';

var PageContextRevisionID = null;
var WorkAroudTypeId = 0;
var urlQuery = "";

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    getDataFromlocalStorage();
    setTitleFromLocalStorage("EEMS Workaround View Form");
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

        urlQuery = "?$select=ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author&$filter=ID eq " + WorkAroundId;
        
        let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

        results.done(function (data) {

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
                jQuery("#tester").val(item.Testing_x0020_Team.Title); 
                jQuery("#analyst").val(item.State_x0020_BA_x0020_Lead.Title);
                jQuery("#manager").val(item.MMRP_x0020_State_x0020_Project_x.Title);
                jQuery("omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);
                jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

                if ( item.WorkaroundType === "O&M")
                {
                    WorkAroudTypeId = 3;
                }                

                if ( WorkAroudTypeId === 3)
                {
                    document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
                    document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
                    document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
                    document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
                    document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";

                    jQuery("#omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);                    
                    jQuery("#omTestingAnalyst").val(item.State_x0020_MMRP_x0020_Testing_x.Title);                    
                    jQuery("#omManager").val(item.State_x0020_MMRP_x0020_O_x0026_M.Title);
                    jQuery("#omDirector").val(item.State_x0020_MMRP_x0020_Program_x.Title);
                }


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

                if ( item.Test_x0020_Case === "Yes") {
                    document.getElementById("passTestCaseDiv").style.display = "flex";
                    document.getElementById("failTestCaseDiv").style.display = "flex";
                    document.getElementById("attachmentTestCaseDiv").style.display = "flex";

                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                else {
                    document.getElementById("passTestCaseDiv").style.display = "none";
                    document.getElementById("failTestCaseDiv").style.display = "none";
                    document.getElementById("attachmentTestCaseDiv").style.display = "none";

                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }


                urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'No'" ;

                let results = retrieveSharePointListItemsByListName("Links", urlQuery);
                results.done(function (data) {
                       console.log('links', data); 

                       //let arrayBucket = data;
                       let arrayBucket = data.d.results;

                       document.getElementById("attachmentsDiv").style.display = "flex";  

                       let startDiv = "<div style='text-align: right;'>";

                        let full_list = startDiv;
                        for(var i=0; i<arrayBucket.length; ++i){                        
                            full_list = full_list + "<a href='" + arrayBucket[i].Link + "' target='_blank'>" +  arrayBucket[i].Title+ "</a><br>";
                        } 

                        full_list = full_list + "</div>";

                        $("#" + "attachmentsDiv").html(full_list);

                        urlQuery = "?$select=Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'Yes'" ;
                        let results2 = retrieveSharePointListItemsByListName("Links", urlQuery);

                        results2.done(function(data) {
                            
                            console.log('links2', data); 

                            //let arrayBucket2 = data;
                            let arrayBucket2 = data.d.results;

                            document.getElementById("attachmentsTestCaseDiv").style.display = "flex";  

                            let startDiv = "<div style='text-align: right;'>";

                            let full_list = startDiv;
                            for(var i=0; i<arrayBucket2.length; ++i){                        
                                full_list = full_list + "<a href='" + arrayBucket2[i].Link + "' target='_blank'>" +  arrayBucket2[i].Title+ "</a><br>";
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
            
        });
        results.fail(function(err) {
            alert(err.responseText);
        });
        
    }           
});
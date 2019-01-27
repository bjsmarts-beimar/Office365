var WorkaroundItem = null;
var currentComments = null;

function loadingLocalStorageData(formTitle)
{
    getDataFromlocalStorage();
    setTitleFromLocalStorage(formTitle);
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
    setLabelsFromLocalStorage("13");    
    setLabelsFromLocalStorage("14");    
    setLabelsFromLocalStorage("15");    
    setLabelsFromLocalStorage("16");    
    setLabelsFromLocalStorage("17");    
    setLabelsFromLocalStorage("18");    
    setLabelsFromLocalStorage("19");
    setLabelsFromLocalStorage("20"); 
}

function loadindWorkaroundViewMode(WorkAroundId, currentComments)
{
    //urlQuery = "?$select=WorkaroundWorkflowStatus,ReasonForRejection,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author&$filter=ID eq " + WorkAroundId;
    //let urlQuery = "?$select=finalApproverStatus,finalApproverStatusDate,ProjectManagerStatus,ProjectManagerStatusDate,StateBaLeadStatus,StateBaLeadStatusDate,TestingTeamStatus,TestingTeamStatusDate,IBMBAStatus,IBMBAStatusDate,WorkaroundWorkflowStatus,ReasonForRejection,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title,finalApprover/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author,finalApprover&$filter=ID eq " + WorkAroundId;
    let urlQuery = "?$select=GoLiveComments,Test_x0020_Case_x0020_Pass,Test_x0020_Case_x0020_Fail,Impacted_x0020_Audience,finalApproverStatus,finalApproverStatusDate,O_x0026_MBusinessAnalystStatus,O_x0026_MBAStatusDate,O_x0026_MTestingAnalystStatus,O_x0026_MTAStatusDate,O_x0026_MManagerStatus,O_x0026_MManagerStatusDate,O_x0026_MDirectorStatus,O_x0026_MDirectorStatusDate,ProjectManagerStatus,ProjectManagerStatusDate,StateBaLeadStatus,StateBaLeadStatusDate,TestingTeamStatus,TestingTeamStatusDate,IBMBAStatus,IBMBAStatusDate,WorkaroundWorkflowStatus,ReasonForRejection,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title,finalApprover/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author,finalApprover&$filter=ID eq " + WorkAroundId;
        
    let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

    results.done(function (data) {

            var item = data.d.results[0];  
            WorkaroundItem = item;            
            
            PageContextRevisionID = item.ID;
            currentComments = item.Comments;
            
            jQuery("#title").val(item.Title);
            jQuery("#ReasonForRejection").text(stripHtml(item.ReasonForRejection));
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
                document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
                document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
                document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
                document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
                document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";

                jQuery("#omBusinessAnalyst").val(item.State_x0020_MMRP_x0020_O_x0026_M0.Title);                    
                jQuery("#omTestingAnalyst").val(item.State_x0020_MMRP_x0020_Testing_x.Title);                    
                jQuery("#omManager").val(item.State_x0020_MMRP_x0020_O_x0026_M.Title);
                jQuery("#omDirector").val(item.State_x0020_MMRP_x0020_Program_x.Title);

                $("#typeWorkaround option").each(function (a, b) {
                    if ($(this).val() == 3 ) $(this).attr("selected", "selected");
                });
            }
            else {

                $("#typeWorkaround option").each(function (a, b) {
                    if ($(this).html() == item.WorkaroundType ) $(this).attr("selected", "selected");
                });

            }

            if ( item.Impacted_x0020_Audience )
            {
                let ImpactedAudiences = item.Impacted_x0020_Audience.results;
                            
                ImpactedAudiences.forEach(function(item){
                    let fieldId = item.replace(/ /g,'');
                    jQuery("#" +  fieldId).prop( "checked", true );
                });
            }
                        
            $("#timeUsage option").each(function (a, b) {
                if ($(this).html() == item.WorkaroundUsage ) $(this).attr("selected", "selected");
            });                

            $("#golive option").each(function (a, b) {
                if ($(this).html() == item.WorkaroundGoLive ) $(this).attr("selected", "selected");
            });    
            
            
            let valueSelected = document.getElementById("golive").value;    

            if ( valueSelected == 2 )
            {
                document.getElementById("ExplainLabelDiv").style.display = "flex";
                document.getElementById("ExplainDiv").style.display = "flex";
                jQuery("#explanationText").text(stripHtml(item.GoLiveComments)); 
            }
            else {
                document.getElementById("ExplainLabelDiv").style.display = "none";
                document.getElementById("ExplainDiv").style.display = "none";
            }
            

            $("#testCase option").each(function (a, b) {
                if ($(this).html() == item.Test_x0020_Case ) $(this).attr("selected", "selected");
            });

            if ( item.Test_x0020_Case === "Yes") {
                document.getElementById("passTestCaseDiv").style.display = "flex";
                document.getElementById("failTestCaseDiv").style.display = "flex";
                document.getElementById("attachmentTestCaseDiv").style.display = "flex";

                if ( item.Test_x0020_Case_x0020_Pass === "Yes") {
                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                if ( item.Test_x0020_Case_x0020_Fail === "Yes") {
                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }
            }
            else {
                document.getElementById("passTestCaseDiv").style.display = "none";
                document.getElementById("failTestCaseDiv").style.display = "none";
                document.getElementById("attachmentTestCaseDiv").style.display = "none";

                if ( item.Test_x0020_Case_x0020_Pass === "Yes") {
                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                if ( item.Test_x0020_Case_x0020_Fail === "Yes") {
                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }
            }

            if ( item.WorkaroundWorkflowStatus === "Completed")
            {
                document.getElementById("finalApproverPeoplePickerDiv").style.display = "flex";
                 
                jQuery("#IBMBAStatus").text(item.IBMBAStatus);
                jQuery("#IBMBAStatusDate").text(moment(item.IBMBAStatusDate).format('MM/DD/YYYY h:mm:ss a'));

                jQuery("#IBMTAStatus").text(item.TestingTeamStatus);
                jQuery("#IBMTAStatusDate").text(moment(item.TestingTeamStatusDate).format('MM/DD/YYYY h:mm:ss a'));

                jQuery("#IBMLeadStatus").text(item.StateBaLeadStatus);
                jQuery("#IBMLeadStatusDate").text(moment(item.StateBaLeadStatusDate).format('MM/DD/YYYY h:mm:ss a'));

                jQuery("#managerStatus").text(item.ProjectManagerStatus);
                jQuery("#managerStatusDate").text(moment(item.ProjectManagerStatusDate).format('MM/DD/YYYY h:mm:ss a'));

                jQuery("#finalApproverStatus").text(item.finalApproverStatus);
                jQuery("#finalApproverStatusDate").text(moment(item.finalApproverStatusDate).format('MM/DD/YYYY h:mm:ss a'));

                jQuery("#finalAprover").val(item.finalApprover.Title);

                if ( item.WorkaroundType === "O&M" )
                {
                    jQuery("#omBAStatus").text(item.O_x0026_MBusinessAnalystStatus);
                    jQuery("#omBAStatusDate").text(moment(item.O_x0026_MBAStatusDate).format('MM/DD/YYYY h:mm:ss a'));   

                    jQuery("#omTAStatus").text(item.O_x0026_MTestingAnalystStatus);
                    jQuery("#omTAStatusDate").text(moment(item.O_x0026_MTAStatusDate).format('MM/DD/YYYY h:mm:ss a'));   

                    jQuery("#omManagerStatus").text(item.O_x0026_MManagerStatus);
                    jQuery("#omManagerStatusDate").text(moment(item.O_x0026_MManagerStatusDate).format('MM/DD/YYYY h:mm:ss a'));   

                    jQuery("#omDirectorStatus").text(item.O_x0026_MDirectorStatus);
                    jQuery("#omDirectorStatusDate").text(moment(item.O_x0026_MDirectorStatusDate).format('MM/DD/YYYY h:mm:ss a'));   
                }
            }
            else {
                if (document.getElementById("finalApproverPeoplePickerDiv"))
                {
                    document.getElementById("finalApproverPeoplePickerDiv").style.display = "none";
                }                
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

function loadindWorkaroundEditMode(WorkAroundId)
{
    //urlQuery = "?$select=WorkaroundWorkflowStatus,ReasonForRejection,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author&$filter=ID eq " + WorkAroundId;
    //urlQuery = "?$select=finalApproverStatus,finalApproverStatusDate,ProjectManagerStatus,ProjectManagerStatusDate,StateBaLeadStatus,StateBaLeadStatusDate,TestingTeamStatus,TestingTeamStatusDate,IBMBAStatus,IBMBAStatusDate,WorkaroundWorkflowStatus,ReasonForRejection,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBM_x0020_BA/Title,Testing_x0020_Team/Title,State_x0020_BA_x0020_Lead/Title,MMRP_x0020_State_x0020_Project_x/Title,State_x0020_MMRP_x0020_O_x0026_M0/Title,State_x0020_MMRP_x0020_Testing_x/Title,State_x0020_MMRP_x0020_O_x0026_M/Title,State_x0020_MMRP_x0020_Program_x/Title,Author/Title,finalApprover/Title&$expand=Training_x0020_Developer,IBM_x0020_BA,Testing_x0020_Team,State_x0020_BA_x0020_Lead,MMRP_x0020_State_x0020_Project_x,State_x0020_MMRP_x0020_O_x0026_M0,State_x0020_MMRP_x0020_Testing_x,State_x0020_MMRP_x0020_O_x0026_M,State_x0020_MMRP_x0020_Program_x,Author,finalApprover&$filter=ID eq " + WorkAroundId;
    let urlQuery =  "?$select=GoLiveComments,O_x0026_MDirectorStatus,O_x0026_MManagerStatus,O_x0026_MTestingAnalystStatus,O_x0026_MBusinessAnalystStatus,Test_x0020_Case_x0020_Pass,Test_x0020_Case_x0020_Fail,IBMBAStatus,TestingTeamStatus,StateBaLeadStatus,ProjectManagerStatus,ReasonForRejection,Comments,ID,Title,Release_x0020_Number,Workaround_x0020_Trigger,Issue,DefectCRNumber,Workaround_x0020_Number,Created,WorkaroundType,WorkaroundUsage,WorkaroundGoLive,Test_x0020_Case,Impacted_x0020_Audience,Training_x0020_Developer/Title,Workaround_x0020_Steps,IBMBAStatus,IBM_x0020_BA/EMail,TestingTeamStatus,Testing_x0020_Team/EMail,StateBaLeadStatus,State_x0020_BA_x0020_Lead/EMail,ProjectManagerStatus,MMRP_x0020_State_x0020_Project_x/EMail,State_x0020_MMRP_x0020_O_x0026_M0/EMail,State_x0020_MMRP_x0020_Testing_x/EMail,State_x0020_MMRP_x0020_O_x0026_M/EMail,State_x0020_MMRP_x0020_Program_x/EMail,Author/Title&$expand=Training_x0020_Developer,IBM_x0020_BA/Id,Testing_x0020_Team/Id,State_x0020_BA_x0020_Lead/Id,MMRP_x0020_State_x0020_Project_x/Id,State_x0020_MMRP_x0020_O_x0026_M0/Id,State_x0020_MMRP_x0020_Testing_x/Id,State_x0020_MMRP_x0020_O_x0026_M/Id,State_x0020_MMRP_x0020_Program_x/Id,Author&$filter=ID eq " + WorkAroundId;        
        
    let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

    results.done(function (data) {

            var item = data.d.results[0];  

            PageContextRevisionID = item.ID;
            WorkaroundItem = item;
            currentComments = item.Comments;

            jQuery("#title").val(item.Title);
            jQuery("#ReasonForRejection").text(stripHtml(item.ReasonForRejection));
            jQuery("#WorkaroundNumber").text(item.Workaround_x0020_Number);
            jQuery("#DateSubmitted").text(item.Created);
            jQuery("#release").val(item.Release_x0020_Number);
            jQuery("#trigger").val(item.Workaround_x0020_Trigger);
            jQuery("#issue").val(item.Issue);
            jQuery("#defectCR").val(item.DefectCRNumber);   
            jQuery("#steps").text(stripHtml(item.Workaround_x0020_Steps));                
            jQuery("#submitter").text("Created at " + moment(item.Created).format('MM/DD/YYYY h:mm:ss a') + " by " + item.Author.Title);

            setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, item.IBM_x0020_BA.EMail);
            setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.testersPeoplePickerDiv_TopSpan, item.Testing_x0020_Team.EMail);    
            setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.BALeadPeoplePickerDiv_TopSpan, item.State_x0020_BA_x0020_Lead.EMail);
            setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.projectManagerPeoplePickerDiv_TopSpan, item.MMRP_x0020_State_x0020_Project_x.EMail); 

            if ( item.WorkaroundType === "O&M")
            {
                document.getElementById("OMRelatedWorkAroundApproversDiv").style.display = "flex";
                document.getElementById("stateBusinessAnalystPeoplePickerDiv").style.display = "flex";
                document.getElementById("testingAnalystPeoplePickerDiv").style.display = "flex";
                document.getElementById("stateManagerPeoplePickerDiv").style.display = "flex";
                document.getElementById("programDirectorPeoplePickerDiv").style.display = "flex";
                
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.businesAnalystPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_O_x0026_M0.EMail);   
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.analystPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_Testing_x.EMail);   
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.managerPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_O_x0026_M.EMail);   
                setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.directorPeoplePickerDiv_TopSpan, item.State_x0020_MMRP_x0020_Program_x.EMail);

                $("#typeWorkaround option").each(function (a, b) {
                    if ($(this).val() == 3 ) $(this).attr("selected", "selected");
                });
            }
            else {

                $("#typeWorkaround option").each(function (a, b) {
                    if ($(this).html() == item.WorkaroundType ) $(this).attr("selected", "selected");
                });
            }
            
            if ( item.Impacted_x0020_Audience != null ) {
                let ImpactedAudiences = item.Impacted_x0020_Audience.results;                                
                ImpactedAudiences.forEach(function(item){
                    let fieldId = item.replace(/ /g,'');
                    jQuery("#" +  fieldId).prop( "checked", true );
                });    
            }                  
                                                            
            $("#timeUsage option").each(function (a, b) {
                if ($(this).html() == item.WorkaroundUsage ) $(this).attr("selected", "selected");
            });                

            $("#golive option").each(function (a, b) {
                if ($(this).html() == item.WorkaroundGoLive ) $(this).attr("selected", "selected");
            });         
            
            let valueSelected = document.getElementById("golive").value;    

            if ( valueSelected == 2 )
            {
                document.getElementById("ExplainLabelDiv").style.display = "flex";
                document.getElementById("ExplainDiv").style.display = "flex";
                jQuery("#explanationText").text(stripHtml(item.GoLiveComments)); 
            }
            else {
                document.getElementById("ExplainLabelDiv").style.display = "none";
                document.getElementById("ExplainDiv").style.display = "none";
            }

            $("#testCase option").each(function (a, b) {
                if ($(this).html() == item.Test_x0020_Case ) $(this).attr("selected", "selected");
            });

            if ( item.Test_x0020_Case === "Yes")
            {
                document.getElementById("passTestCaseDiv").style.display = "flex";
                document.getElementById("failTestCaseDiv").style.display = "flex";
                document.getElementById("attachmentTestCaseDiv").style.display = "flex";
                document.getElementById("attachmentsTestCaseDiv").style.display = "flex";

                if ( item.Test_x0020_Case_x0020_Pass === "Yes") {
                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                if ( item.Test_x0020_Case_x0020_Fail === "Yes") {
                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }
            }
            else {
                document.getElementById("passTestCaseDiv").style.display = "none";
                document.getElementById("failTestCaseDiv").style.display = "none";
                document.getElementById("attachmentTestCaseDiv").style.display = "none";
                document.getElementById("attachmentsTestCaseDiv").style.display = "none";

                if ( item.Test_x0020_Case_x0020_Pass === "Yes") {
                    $('input:radio[name=testcaseGroup]')[0].checked = true;
                }
                if ( item.Test_x0020_Case_x0020_Fail === "Yes") {
                    $('input:radio[name=testcaseGroup]')[1].checked = true;
                }
            }

            urlQuery = "?$select=ID,Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'No'" ;

            let results = retrieveSharePointListItemsByListName("Links", urlQuery);
            results.done(function (data) {

                    for ( var i=0; i<data.d.results.length; i++)
                    {
                            let newItem = [data.d.results[i].Title, data.d.results[i].Link, data.d.results[i].ID];
                            _attachments.push(newItem);
                    }                                                

                    document.getElementById("attachmentsDiv").style.display = "flex";  

                    //let startDiv = "<div style='text-align: right;'>";
                    let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";

                    let full_list = startDiv;
                    for(var i=0; i<_attachments.length; ++i) {                        
                        full_list = full_list + "<a href='" + _attachments[i][1] + "' target='_blank'>" +  _attachments[i][0]+ "</a>" + "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + false + ", " + _attachments[i][2] + ")'>Delete</a></span><br>";
                    } 

                    full_list = full_list + "</div>";

                    $("#" + "attachmentsDiv").html(full_list);

                    urlQuery = "?$select=ID,Title,Link&$filter=WorkAroundID eq " + PageContextRevisionID + " and IsTestCaseAttachment eq 'Yes'" ;
                    let results2 = retrieveSharePointListItemsByListName("Links", urlQuery);

                    results2.done(function(data) {

                            for ( var i=0; i<data.d.results.length; i++)
                            {
                                let newItem = [data.d.results[i].Title, data.d.results[i].Link, data.d.results[i].ID];
                                _testCaseAttachments.push(newItem);
                            }                                                                

                            document.getElementById("attachmentsTestCaseDiv").style.display = "flex";  

                            //let startDiv = "<div style='text-align: right;'>";
                            let startDiv = "<div class='col-3' style='text-align: right;'></div><div class='col-9'>";

                            let full_list = startDiv;
                            for(var i=0; i<_testCaseAttachments.length; ++i){                        
                                full_list = full_list + "<a href='" + _testCaseAttachments[i][1] + "' target='_blank'>" +  _testCaseAttachments[i][0]+ "</a>" + "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + i + ", " + true + ", " + _testCaseAttachments[i][2] + ")'>Delete</a></span><br>";
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

'use strict';

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
    setLabelsFromLocalStorage("21"); 
    setLabelsFromLocalStorage("22"); 
    setLabelsFromLocalStorage("23"); 
    setLabelsFromLocalStorage("24"); 
    setLabelsFromLocalStorage("25"); 
    setLabelsFromLocalStorage("26"); 
    setLabelsFromLocalStorage("27"); 
    setLabelsFromLocalStorage("28"); 

    getCountiesFromLocalStorage("countyName");    
    getProgramsFromLocalStorage("programInvolved");
    getLedgersFromLocalStorage("generalLedger");
    getCostCenterFromLocalStorage("costCenter");
    getFunctionalAreasFromLocalStorage("functionalArea");
}

function loadingRecordViewMode(RecordID)
{
    let urlQuery =  "?$select=ID,Comments,RequestorSignature,RequestorTitle,CountyDivision,Payment,Other,FundSource,ServiceType,AmountDue,DueDate,Federal,StateSource,ToDate,FromDate,Title,CertificationAction,DebtClassification,Address,City,State,ZipCode,ProviderCaseNumber,Author/Title,County/Title,Program/Title,GeneralLedger/Title,CostCenter/Title,FunctionalAreas/Title,Supervisor/Title,Supervisor/EMail&$expand=Author,County,Program,GeneralLedger,CostCenter,FunctionalAreas,Supervisor&$filter=ID eq " + RecordID;

    let results = retrieveSharePointListItemsByListName("AR1158Form", urlQuery);

    results.done(function (data) {

        var item = data.d.results[0];  

        loadingRecord(item);    

        currentComments = item.Comments;

        jQuery("#supervisor").val(item.Supervisor.Title);

        urlQuery = "?$select=Title,Link&$filter=RecordID eq " + item.ID;

        let results = retrieveSharePointListItemsByListName("Links", urlQuery);
        results.done(function (data) {
                   
            console.log('links', data); 

            let arrayBucket = data.d.results;

            document.getElementById("attachmentsDiv").style.display = "flex";  

            let startDiv = "<div style='text-align: right;'>";

            let full_list = startDiv;

            for(var i=0; i<arrayBucket.length; ++i){                        

                full_list = full_list + "<a href='" + arrayBucket[i].Link + "' target='_blank'>" +  arrayBucket[i].Title+ "</a><br>";
            } 

            full_list = full_list + "</div>";
            $("#" + "attachmentsDiv").html(full_list);

        });
        results.fail(function(err) {
                alert(err.responseText);
        });

    });
    results.fail(function(err) {
        alert(err.responseText);
    });
}

function loadingRecordEditMode(RecordID)
{
    let urlQuery =  "?$select=ID,ReasonForRejection,Comments,RequestorSignature,RequestorTitle,CountyDivision,Payment,Other,FundSource,ServiceType,AmountDue,DueDate,Federal,StateSource,ToDate,FromDate,Title,CertificationAction,DebtClassification,Address,City,State,ZipCode,ProviderCaseNumber,Author/Title,County/Title,Program/Title,GeneralLedger/Title,CostCenter/Title,FunctionalAreas/Title,Supervisor/Title,Supervisor/EMail&$expand=Author,County,Program,GeneralLedger,CostCenter,FunctionalAreas,Supervisor&$filter=ID eq " + RecordID;

    let results = retrieveSharePointListItemsByListName("AR1158Form", urlQuery);

    results.done(function (data) {

        var item = data.d.results[0]; 
        
        PageContextGlobalID = item.ID;

        loadingRecord(item);

        currentComments = item.Comments;

        setPeoplePickerField(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, item.Supervisor.EMail);   
        
        urlQuery = "?$select=ID,Title,Link&$filter=RecordID eq " + item.ID;

        let results = retrieveSharePointListItemsByListName("Links", urlQuery);
        results.done(function (data) {            

            for ( var i=0; i<data.d.results.length; i++)
            {
                let newItem = [data.d.results[i].Title, data.d.results[i].Link, data.d.results[i].ID];
                _attachments.push(newItem);
            }                                                

            document.getElementById("attachmentsDiv").style.display = "flex";  

            let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";

            let full_list = startDiv;
        
            for(var i=0; i<_attachments.length; ++i){                        
                full_list = full_list + "<a href='" + _attachments[i][1] + "' target='_blank'>" +  _attachments[i][0]+ "</a>" + "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + _attachments[0][2] + ", " + i + ")'>Delete</a></span><br>";
            } 

            full_list = full_list + "</div>";

            $("#" + "attachmentsDiv").html(full_list);                        

        });
        results.fail(function(err) {
            alert(err.responseText);
        });

    });
    results.fail(function(err) {
        alert(err.responseText);
    });

}

function loadingRecord(item)
{
        jQuery("#ReasonForRejection").text(strippedHtml(item.ReasonForRejection));
        jQuery("#title").val(item.Title);
        jQuery("#address").val(item.Address);
        jQuery("#city").val(item.City);
        jQuery("#state").val(item.State);
        jQuery("#zipcode").val(item.ZipCode);
        jQuery("#provider").val(item.ProviderCaseNumber);
        jQuery("#field-comments").val(item.Comments);

        $("#certificationAction option").each(function (a, b) {
            if ($(this).html() == item.CertificationAction ) $(this).attr("selected", "selected");
        });
        
        $("#debtClassification option").each(function (a, b) {
            if ($(this).html() == item.DebtClassification ) $(this).attr("selected", "selected");
        });
        
        $("#countyName option").each(function (a, b) {
            if ($(this).html() == item.County.Title ) $(this).attr("selected", "selected");
        });

        if ( item.ToDate ) {

            jQuery("#to").val(moment(item.ToDate).format('MM/DD/YYYY'));
        }

        if ( item.FromDate ) {

            jQuery("#from").val(moment(item.FromDate).format('MM/DD/YYYY'));
        }                

        $("#programInvolved option").each(function (a, b) {
            if ($(this).html() == item.Program.Title ) $(this).attr("selected", "selected");
        });

        jQuery("#typeofService").val(item.ServiceType);
        jQuery("#amountDue").val(item.AmountDue);

        if ( item.DueDate ) {

            jQuery("#dueDate").val(moment(item.DueDate).format('MM/DD/YYYY'));
        }
        
        jQuery("#federal").val(item.Federal);
        jQuery("#stateSource").val(item.StateSource);
        jQuery("#other").val(item.Other);
        jQuery("#otherFund").val(item.FundSource);

        $("#generalLedger option").each(function (a, b) {
            if ($(this).html() == item.GeneralLedger.Title ) $(this).attr("selected", "selected");
        });

        $("#costCenter option").each(function (a, b) {
            if ($(this).html() == item.CostCenter.Title ) $(this).attr("selected", "selected");
        });

        $("#functionalArea option").each(function (a, b) {
            if ($(this).html() == item.FunctionalAreas.Title ) $(this).attr("selected", "selected");
        });

        $("#paymentInformation option").each(function (a, b) {
            if ($(this).html() == item.Payment ) $(this).attr("selected", "selected");
        });

        jQuery("#requestorSignature").val(item.RequestorSignature);
        jQuery("#requestorTitle").val(item.RequestorTitle);
        jQuery("#countyDivision").val(item.CountyDivision);   
}


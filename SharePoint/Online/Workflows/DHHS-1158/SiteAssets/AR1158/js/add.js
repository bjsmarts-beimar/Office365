'use strict';

var _attachments = new Array();

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    
    
    getDataFromlocalStorage();
    setTitleFromLocalStorage("Initiation Form");
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

    initializePeoplePicker('peoplePickerDiv');  

    var currencyMask = new IMask(
        document.getElementById('amountDue'),
        {
          mask: '$num',
          blocks: {
            num: {
              // nested masks are available!
              mask: Number,
              thousandsSeparator: ','
            }
          }
        });

    let datefromMask = new IMask(
        document.getElementById('from'),
            {
              mask: '00/00/0000'              
            });

    let datetoMask = new IMask(
        document.getElementById('to'),
            {
              mask: '00/00/0000'              
            });

    let dueDateMask = new IMask(
        document.getElementById('dueDate'),
          {
            mask: '00/00/0000'              
          });
     
});

function SubmitFormWithValidation() {

    let IsFormValid = true;

    if ( !IsThisTextFieldValid("title") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("address") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("state") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("city") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("zipcode") )
    {
        IsFormValid = false;        
    }

    if ( !IsThisTextFieldValid("provider"))
    {
        IsFormValid = false;
    }

    if ( !IsThisComboFieldValid("certificationAction")) {
        IsFormValid = false;    
    }

    if ( !IsThisComboFieldValid("programInvolved")) {
        IsFormValid = false;
    }

    if ( !IsThisComboFieldValid("generalLedger")) {
        IsFormValid = false;
    }

    if ( !IsThisTextFieldValid("amountDue")) {
        IsFormValid = false;
    }

    if ( !IsThisComboFieldValid("costCenter")) {
        IsFormValid = false;
    }

    if ( !IsThisComboFieldValid("paymentInformation")) {
        IsFormValid = false;
    }

    if ( !IsThisTextFieldValid("requestorSignature")) {
        IsFormValid = false; 
    }

    if ( !IsThisTextFieldValid("requestorTitle")) {
        IsFormValid = false;
    }

    if ( !IsThisTextFieldValid("countyDivision")) {
        IsFormValid = false;
    }

    if ( !IsThisDateInThePast("dueDate") ) {
        IsFormValid = false;
    }

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, "peoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    if ( IsFormValid )
    {
        jQuery("#" + "error-overall").hide();
        create1158Record();
    }
    else {        
        jQuery("#" + "error-overall").show();
    }
}

function OnCancel() {
    
    let page = "/Pages/default.aspx";
    window.location = _spPageContextInfo.webAbsoluteUrl + page;
}

function create1158Record()
{
    let listName = "AR1158Form";
    let itemType = GetItemTypeForListName(listName);

    let title = jQuery('#title').val();
    let cA = document.getElementById("certificationAction").value;
    let dC = document.getElementById("debtClassification").value;
    let cN = document.getElementById("countyName").value;
    let address = jQuery('#address').val();
    let state = jQuery('#state').val();
    let city = jQuery('#city').val();
    let zipcode = jQuery('#zipcode').val();
    let provider = jQuery('#provider').val();        
    let programId = document.getElementById("programInvolved").value;
    let service = jQuery('#typeofService').val();        
    let amountDue = jQuery('#amountDue').val();

    let federal = jQuery('#federal').val();
    let stateSource = jQuery('#stateSource').val();
    let other = jQuery('#other').val();
    let otherFund = jQuery('#otherFund').val();

    let generalLedgerId = document.getElementById("generalLedger").value;
    let costCenterId = document.getElementById("costCenter").value;
    let functionalAreaId = document.getElementById("functionalArea").value;
    let payment = document.getElementById("paymentInformation").value;

    let utc = new Date().toLocaleString(); 
    let sign = "Wrote on " + utc;
    let comments = $("#field-comments").val() + '<br>' + sign + '<br>';

    let signature = jQuery('#requestorSignature').val();   
    let requestorTitle  = jQuery('#requestorTitle').val();
    let countyDivision = jQuery('#countyDivision').val(); 

    let account = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    account.done(function (data) {

        let SupervisorPeoplePickerId = data.Id;
        let SupervisorName = data.Title;

        let item = {
            "__metadata": { "type": itemType },        
            "Title": title,
            "CertificationAction": cA,
            "DebtClassification": dC,
            "CountyId": cN,
            "Address": address,
            "State": state,
            "City": city,
            "ZipCode": zipcode,
            "ProviderCaseNumber": provider,        
            "ProgramId": programId,
            "ServiceType": service,
            "AmountDue": amountDue,   
            "Federal": federal,
            "StateSource": stateSource,
            "Other": other,
            "FundSource": otherFund,    
            "GeneralLedgerId": generalLedgerId,
            "CostCenterId": costCenterId,
            "FunctionalAreasId": functionalAreaId,
            "Payment": payment,
            "SupervisorId": SupervisorPeoplePickerId,
            "RequestorSignature": signature,       
            "RequestorTitle": requestorTitle,
            "CountyDivision": countyDivision, 
            "Comments": comments
        };
    
        handleDateField(item, { DueDate: jQuery('#dueDate').val() }, jQuery('#dueDate').val());
        handleDateField(item, { FromDate: jQuery('#from').val() }, jQuery('#from').val());
        handleDateField(item, { ToDate: jQuery('#to').val() }, jQuery('#to').val());
    
        let record = addItemToSharePointList(item, listName);
        record.done(function(data) {
            
            let recordID = data.d.ID;

            for(var i=0; i<_attachments.length; ++i){   
                                                                        
                let name = _attachments[i][0];
                let serverRelativeURL = _attachments[i][1];  

                let linksListName = "Links";
                let linksItemType = GetItemTypeForListName(linksListName);
                                                    
                let linksItem = {
                    "__metadata": { "type": linksItemType },
                    "Title": name,
                    "Link": serverRelativeURL,
                    "RecordID": recordID
                };

                let attachment = addItemToSharePointList(linksItem, linksListName);                                                                
                attachment.done(function(data) {
                    console.log('link was added: ', data);
                });
                attachment.fail(function(error) {
                    alert(error.responseText);
                });
            }            
            
            let ine = getEmailVerbagefromLocalStorage("Initial Notification Email");
            let isne = getEmailVerbagefromLocalStorage("Initial Supervisor Notification Email");
            let iae = getEmailVerbagefromLocalStorage("Initial Approval Email");
            let igae = getEmailVerbagefromLocalStorage("Initial Group Approval Email");
            let re = getEmailVerbagefromLocalStorage("Rejection Email");                
            let rse = getEmailVerbagefromLocalStorage("Resubmit Email");                
            let rsse = getEmailVerbagefromLocalStorage("Resubmit Supervisor Email");            
            let fnae = getEmailVerbagefromLocalStorage("Final Notification Approval Email");

            let ineTitle = ine.EmailSubject.replace('{Title}', data.d.Title);
            let ineBody = stripHtml(ine.EmailBody);
            ineBody = ineBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{Supervisor}', SupervisorName);

            let isneTitle = isne.EmailSubject.replace('{Title}', data.d.Title);
            let isneBody = stripHtml(isne.EmailBody);
            isneBody = isneBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{TypeID}', '1');;

            let iaeTitle = iae.EmailSubject.replace('{Title}', data.d.Title);
            let iaeBody = stripHtml(iae.EmailBody);
            iaeBody = iaeBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{Supervisor}', SupervisorName).replace('{Supervisor Signature}', signature);

            let igaeTitle = igae.EmailSubject.replace('{Title}', data.d.Title);
            let igaeBody = stripHtml(igae.EmailBody);
            igaeBody = igaeBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{TypeID}', '2').replace('{Supervisor}', SupervisorName).replace('{Supervisor Signature}', signature);

            let reTitle = re.EmailSubject.replace('{Title}', data.d.Title);
            let reBody = stripHtml(re.EmailBody);
            reBody = reBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID);

            let rseTitle = rse.EmailSubject.replace('{Title}', data.d.Title);
            let rseBody = stripHtml(rse.EmailBody);
            rseBody = rseBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID);

            let rsseTitle = rsse.EmailSubject.replace('{Title}', data.d.Title);
            let rsseBody = stripHtml(rsse.EmailBody);
            rsseBody = rsseBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{TypeID}', '1');

            let fnaeTitle = fnae.EmailSubject.replace('{Title}', data.d.Title);
            let fnaeBody = stripHtml(fnae.EmailBody);
            fnaeBody = fnaeBody.replace('{Title}', data.d.Title).replace('{ID}', data.d.ID).replace('{TypeID}', '1');
            
            let metadata = {
                "__metadata": { "type": itemType },
                "InitialNotificationEmailTitle": ineTitle,
                "InitialNotificationEmailBody": ineBody.trim(),   
                "InitialSupervisorEmailTitle": isneTitle,
                "InitialSupervisorEmailBody": isneBody.trim(),
                "ApprovalNotificationEmailTitle": iaeTitle,
                "ApprovalNotificationEmailBody": iaeBody.trim(),
                "ApprovalGroupEmailTitle": igaeTitle,
                "ApprovalGroupEmailBody": igaeBody.trim(),
                "RejectionNotificationEmailTitle": reTitle,
                "RejectionNotificationEmailBody": reBody.trim(),
                "ResubmitNotificationEmailTitle": rseTitle,
                "ResubmitNotificationEmailBody": rseBody.trim(),
                "ResubmitSupervisorEmailTitle": rsseTitle,
                "ResubmitSupervisorEmailBody": rsseBody.trim(),
                "FinalEmailTitle": fnaeTitle,
                "FinalEmailBody": fnaeBody.trim(),
                "WorkflowStatus": "Initial Approval (Pending)"
            };

            let results = updateSharePointListItem(recordID, metadata, listName);
            results.done(function (data) {

                console.log('1158 form details info was update successfully: ', data);                
                
                jQuery.alert({        
                    title: false,
                    content: '<div style="font-size: large;font-style: italic;">Your 1158 form has been submitted for Initial Review.</div>',
                    columnClass: 'medium',
                    buttons: {            
                        Ok: {
                            text: 'Ok',
                            btnClass: 'btn-default btn-md',
                            action: function(){
                                let page = "/Pages/MyAR.aspx";
                                window.location = _spPageContextInfo.webAbsoluteUrl + page;
                            }
                        }
                    }
                });

            });
            results.fail(function (error) {
                alert('Error has occurred: ' + error.responseText); 
            });

        });
        record.fail(function(error) {
            alert(error);
        });

    });
    account.fail(function(error) {
        alert(error.responseText);
    });
}

function deleteAttachment(LinkID, Index)
{    
    if (confirm('Are you sure you want to remove this attachment?')) {  
                
        let ServerRelativeUrl = _attachments[Index][1];            
        deletefile(ServerRelativeUrl, LinkID, Index, "attachmentsDiv");
                        
    }
}

function addAttachment()
{    
    let serverRelativeUrlToFolder = '/sites/SBH/ar/data/Attachments/';
    jQuery('#addFileButton').attr("disabled", true);
    uploadfile("getFile", "error-revision-file", "attachmentsDiv", serverRelativeUrlToFolder);

}








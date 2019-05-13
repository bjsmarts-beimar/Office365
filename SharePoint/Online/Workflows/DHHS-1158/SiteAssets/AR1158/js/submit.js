'use strict';

var _attachments = new Array();
var PageContextGlobalID = null;
var currentComments = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }        

    loadingLocalStorageData("Initiation Form");        
    initializePeoplePicker('peoplePickerDiv'); 

    let currencyMask = new IMask(
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

    let RecordID = getUrlParameter('RecordID');    
    
    if ( RecordID )
    {
        loadingRecordEditMode(RecordID);                
    }           
});

function SaveFormWithValidation() 
{
    if ( IsFormValid() ) {

        jQuery("#" + "error-overall").hide();
        update1158Record();        
    }
    else {
        jQuery("#" + "error-overall").show();
    }
}

function update1158Record() 
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

    let comments = jQuery("#field-comments").val();    

    let signature = jQuery('#requestorSignature').val();   
    let requestorTitle  = jQuery('#requestorTitle').val();
    let countyDivision = jQuery('#countyDivision').val();

    let account = getAccountId(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan);
    account.done(function (data) {

      let SupervisorPeoplePickerId = data.Id;

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
            "WorkflowStatus": "Initial Approval (Pending)",
            "Comments": comments
        };
    
        handleDateField(item, { DueDate: jQuery('#dueDate').val() }, jQuery('#dueDate').val());
        handleDateField(item, { FromDate: jQuery('#from').val() }, jQuery('#from').val());
        handleDateField(item, { ToDate: jQuery('#to').val() }, jQuery('#to').val());

        let results = updateSharePointListItem(PageContextGlobalID, item, listName);                
        results.done(function (data) {

            let urlQuery = "?$select=ID,Title,Link&$filter=RecordID eq " + PageContextGlobalID;

            let results = retrieveSharePointListItemsByListName("Links", urlQuery);
            results.done(function (data) {

                for ( var i=0; i<data.d.results.length; i++)
                {
                    returnAction = deleteItem(data.d.results[i].ID, "Links");
                    returnAction.done(function (data) {
                        console.log('link record has been deleted', data.d.results[i].ID);
                    });
                    returnAction.fail(function (error) {
                        alert(error.responseText);
                    });
                }

            });
            results.fail(function(err) {
                alert(err.responseText);
            });

            for ( var i=0; i<_attachments.length; ++i) {0
                                                        
                 addLink("Links", i, _attachments, PageContextGlobalID);                
            }

            let page = "/Pages/MyAR.aspx";
            window.location = _spPageContextInfo.webAbsoluteUrl + page;

        });
        results.fail(function (error) {
                alert(error.responseText);
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
    uploadfile("getFile", "error-revision-file", "attachmentsDiv", serverRelativeUrlToFolder);
}

function addLink(listName, index, arrayBucket, RecordID )
{
    let itemType = GetItemTypeForListName(listName);

    let name = arrayBucket[index][0];
    let serverRelativeURL = arrayBucket[index][1]; 
                                                    
    var item = {
        "__metadata": { "type": itemType },
        "Title": name,
        "Link": serverRelativeURL,
        "RecordID": RecordID
    };

    let link = addItemToSharePointList(item, listName);
    link.done(function(data) {
        console.log(data);
    });
    link.fail(function(error) {
        alert(error);
    });
}

function IsFormValid()
{
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

    if ( !IsPeoplePickerFieldValid(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan, "peoplePickerDiv") )
    {
        IsFormValid = false;        
    }

    return IsFormValid;
}
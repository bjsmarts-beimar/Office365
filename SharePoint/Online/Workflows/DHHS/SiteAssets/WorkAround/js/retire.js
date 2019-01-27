'use strict';

var PageContextRevisionID = null;
var WorkAroudTypeId = 0;
var WorkaroundType = "";
var urlQuery = "";
var currentComments = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }        
    
    loadingLocalStorageData("EEMS Workaround View Form");

    var WorkAroundId = getUrlParameter('WorkaroundId');
    var DisplayRejection = getUrlParameter('DisplayRejection');

    if ( DisplayRejection )
        document.getElementById("ReasonForRejectionDiv").style.display = "flex";

    setfinalApproversfromLocalStorage("finalApprover");
    
    if ( WorkAroundId )
    {
        loadindWorkaroundViewMode(WorkAroundId, currentComments);                
    }           
                                 
});

function SubmitFormWithValidation()
{    
    if ( isFormValid() )
    {
        jQuery.confirm({        
            title: false,
            content: '<div style="font-size: large;font-style: italic;">Are you sure you want to retire this TPC?</div>',
            columnClass: 'large',
            buttons: {            
                Ok: {
                    text: 'Yes',
                    btnClass: 'btn-default btn-md',
                    action: function(){    
                        
                        let WorkaroundId = getUrlParameter('WorkaroundId');
                        let page = "/Pages/feedback.aspx";

                        if ( WorkaroundId )
                        {   
                            var logonName = document.getElementById("finalApprover").value;                            

                            var account = getAccountId(logonName);
                                account.done(function (data) {

                                let RetiredApproverId = data;
                                
                                let commentsVal = getComments($("#field-comments").val(), currentComments);
                                
                                let metaData = getWorkaroundMetaData("Yes", RetiredApproverId, commentsVal);
                                
                                if ( metaData ) 
                                {
                                    var results = updateWorkAround(WorkaroundId, metaData);
                                        results.done(function (data) {
                                            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
                                            window.location = serverUrl + page;
                                        });
                                            results.fail(function(error) {                                                
                                                alert(error);
                                        });
                                }    

                            });
                                account.fail(function(error) {                                    
                                    alert(error);
                            });                                  
                            
                        }         
                                                
                        
                    }
                },
                Cancel: {
                    text: 'No',
                    btnClass: 'btn-default btn-md',
                    action: function(){
                        
                    }
                }
            }
        });
    }
}

function getAccountId(logonName) {

    var deferred = jQuery.Deferred();

    var item = {  
        'logonName': logonName  
    };  

    jQuery.ajax({  
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/ensureuser",  
        type: "POST",  
        //async: false,  
        contentType: "application/json;odata=verbose",  
        data: JSON.stringify(item),  
        headers: {  
            "Accept": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val()  
        },  
        success:function(data){
            deferred.resolve(data.d.Id);
        },
        error:function(err){
            deferred.reject(err);
        }
    });  
    
    return deferred.promise();
}


function getWorkaroundMetaData(Decision, RetiredApproverId, commentsVal)
{    
    var itemType = GetItemTypeForListName("Workaround");    

    var data = {
        "__metadata": { "type": itemType },
        "Comments": commentsVal,        
        "WorkaroundIsRetired": Decision,     
        "WorkaroundRetiredDate": new Date(), //.toLocaleString();   
        "RetiredApprovalStatus": "In Progress",
        "RetiredApproverId": RetiredApproverId       
    };
    
    return data;    

}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

function updateWorkAround(WorkaroundId, data)  
{   
    var deferred = jQuery.Deferred();

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('Workaround')/items(" + WorkaroundId + ")", // list item ID  
        type: "POST",  
        data: JSON.stringify(data),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {  
            console.log(data);            
            deferred.resolve(data);
        },  
        error: function(err, status, error)  
        {  
            deferred.reject(err);  
        }  
    });  

    return deferred.promise();
}

function isFormValid()
{

    let IsFormValid = true;

    var comment = jQuery('#field-comments').val();

    if ( comment.length > 0 )
    {
        jQuery("#error-comments").hide();
        IsFormValid = true;
    }
    else {
        jQuery("#error-comments").show();
        IsFormValid = false;

    }

    if ( !IsThisComboFieldValid("finalApprover")) {
        IsFormValid = false;    
    }
    
    return IsFormValid;
}

function IsThisComboFieldValid(fieldName)
{
    let field = document.getElementById(fieldName);
    let errorField = document.getElementById("error-" + fieldName);

    if ( field.value == 0 )
    {
        errorField.style.display = "inline";
        return false;
    }
    else {

        errorField.style.display = "none";
        return true;
    }

    return false;
}
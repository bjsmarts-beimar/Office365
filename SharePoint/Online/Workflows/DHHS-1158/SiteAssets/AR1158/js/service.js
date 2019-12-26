'use strict';

function retrieveSharePointListItemsByListName(listName, urlQuery)  
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
            deferred.resolve(data);            
        },  
        error: function(err)  
        {  
            deferred.reject(err);              
        }  
    });  

    return deferred.promise();
}

function addItemToSharePointList(item, listName)
{

    var deferred = jQuery.Deferred();    

    $.ajax({
        //url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/getbytitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },  
        beforeSend : function() {
            $.blockUI({ 
                message: '<h4>Wait ... Processing your request</h4>',
                css: { 
                border: 'none', 
                padding: '15px',                          
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
            } }); 
        }, 
        complete: function () {
            $.unblockUI();                    
        },
        success: function (data) {
            console.log(data);  
            deferred.resolve(data);  
            
        },
        error: function(err) {            
            $.unblockUI();
            deferred.reject(err.responseText);
        }
    });

    return deferred.promise();
}

function updateSharePointListItem(WorkaroundId, data, listName)  
{   
    var deferred = jQuery.Deferred();

    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('" + listName + "')/items(" + WorkaroundId + ")", // list item ID  
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
        beforeSend : function() {
            $.blockUI({ 
                message: '<h4>Wait ... Processing your request</h4>',
                css: { 
                border: 'none', 
                padding: '15px',                          
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
            } }); 
        }, 
        complete: function () {
            $.unblockUI();                    
        },
        success: function(data, status, xhr)  
        {                          
            deferred.resolve(data);
        },  
        error: function(err, status, error)  
        {  
            deferred.reject(err);  
        }  
    });  

    return deferred.promise();
}

function getAccountTitle(peoplePickerDiv_TopSpan) {

    var deferred = jQuery.Deferred();

    // Get the people picker object from the page.
    //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
    var peoplePicker = peoplePickerDiv_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) { 
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }
    
    let requestorJobTitle = "";

    if ( users.length > 0 )
    {
        if ( users[0] && users[0].EntityData )
        {
            requestorJobTitle = users[0].EntityData.Title;
            deferred.resolve(requestorJobTitle);
        }
        else {
            deferred.reject('Error has occurred.');
        }
    }
    else {
        deferred.resolve(requestorJobTitle);
    }            
    
    return deferred.promise();

}

function getAccountId(peoplePickerDiv_TopSpan) {

    var deferred = jQuery.Deferred();

    // Get the people picker object from the page.
    //var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
    var peoplePicker = peoplePickerDiv_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) { 
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }

    // Get the first user's ID by using the login name.
    var logonName = users[0].Key;

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
            deferred.resolve(data.d);
        },
        error:function(err){
            deferred.reject(err);
        }
    });  
    
    return deferred.promise();
}

// Add the file to the file collection in the Shared Documents folder.
function addFileToFolder(arrayBuffer, fileInput, serverUrl, serverRelativeUrlToFolder) {
    
    // Get the file name from the file input control on the page.
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];

    // Construct the endpoint.
    var fileCollectionEndpoint = String.format(
           "{0}/data/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
           "/add(overwrite=true, url='{2}')",
           serverUrl, serverRelativeUrlToFolder, fileName);

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return jQuery.ajax({
        url: fileCollectionEndpoint,
        type: "POST",            
        data: arrayBuffer,
        processData: false,        
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
            "content-length": arrayBuffer.byteLength
        }
    });
}

function deleteFilefromFolder(fullUrl)
{
    var deferred = jQuery.Deferred();

    $.ajax({        
        url: fullUrl,    
        method: "POST",    
        headers: {    
            "accept": "application/json;odata=verbose",    
            "content-type": "application/json;odata=verbose",    
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),    
            "IF-MATCH": "*",    
            "X-HTTP-Method": "DELETE"    
        },    
        success: function(data) {    

            deferred.resolve(data);
            
            
        },    
        error: function(err) {    
            deferred.reject(err);                    
        }        
    })      

    return deferred.promise();
}

function deleteItem(RecordID, listName)
{
    var deferred = jQuery.Deferred();    
    
    $.ajax({        
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/GetByTitle('" +  listName + "')/items(" + RecordID + ")",    
        method: "POST",    
        headers: {    
            "accept": "application/json;odata=verbose",    
            "content-type": "application/json;odata=verbose",    
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),    
            "IF-MATCH": "*",    
            "X-HTTP-Method": "DELETE"    
        },    
        success: function(data) {    
            deferred.resolve(data);            
        },    
        error: function(error) {    
            deferred.reject(error);             
        }        
    })    
    
    return deferred.promise();
}
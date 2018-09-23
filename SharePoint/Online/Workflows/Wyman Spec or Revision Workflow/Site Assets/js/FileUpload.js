'use strict';

var selectedUsers = [];
var SpecName = '';
var newName = '';
var issueName = '';
var _fileListItemUri = '';

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    
                    
});

function getApprovals() {

    var results = "";
    
    if ( selectedUsers.length > 0) {

        var results = "[";        
        
        for( var i=0; i<selectedUsers.length; i++)
        {

            // if ( selectedUsers[i].indexOf('@') < 0 )
            // {
            //     results = results + "'" + selectedUsers[i] + "',";
            // }
            
            if ( selectedUsers[i].indexOf('@') < 0 )
            {
                results = results + "'" + selectedUsers[i] + "',";
            }
            else {
                let externalUser = selectedUsers[i].split('|');
                results = results + "'" + externalUser[0] + "',";
            }
            
        }

        results = results.substring(0, results.length-1);
        results = results + "]";                
    }   
    
    return "{ 'results': " + results + " }";
}

function getExternalApprovals() {

    var results = "";

    if ( selectedUsers.length > 0 ) {

        for( var i=0; i<selectedUsers.length; i++)
        {
            if ( selectedUsers[i].indexOf('@') > 0 )
            {
                let externalUser = selectedUsers[i].split('|');
                results += externalUser[2] + ";";
            }
        }

        results = results.substring(0, results.length-1); 
    }

    return results;
}

function getArrayIds() {

    var results = [];
    
    if ( selectedUsers.length > 0) {
        
        for( var i=0; i<selectedUsers.length; i++)
        {
            if ( selectedUsers[i].indexOf('@') < 0 )
            {
                results.push(selectedUsers[i]);
            }            
            else {
                let externalUser = selectedUsers[i].split('|');
                //results = results + "'" + externalUser[0] + "',";
                results.push(externalUser[0]);
            }
        }
    }   
    
    return results;
}

function getExternalArrayIds() {

    var results = "";
    
    if ( selectedUsers.length > 0) {
        
        for( var i=0; i<selectedUsers.length; i++)
        {
            if ( selectedUsers[i].indexOf('@') > 0 )
            {
                //results += selectedUsers[i] + ";";
                let externalUser = selectedUsers[i].split('|');
                results += externalUser[2] + ";";
            }            
        }

        results = results.substring(0, results.length-1);
    }   
    
    return results;
}

function uploadFileV2WithValidation()
{    
    newName = jQuery('#displayName').val();
    issueName = jQuery('#displayIssue').val();
    var fileInput = jQuery('#getFile');

    SpecName = newName + '-' + issueName;    

    if ( selectedUsers.length > 0) {

        jQuery("#error-checkboxes").hide();

        if ( newName.length > 0 )
        {
            jQuery("#error-revision-name").hide();

            if ( issueName.length > 0 )
            {
                jQuery("#error-issue-name").hide();

                if ( fileInput[0].files.length > 0 )
                {
                    jQuery("#error-revision-file").hide();

                    var result = checkIfDocumentExist();
                    result.done(function (value) {
                        jQuery("#error-revision-file2").show();
                    });
                    result.fail(function(value) {
                        jQuery("#error-revision-file2").hide();
                        uploadFileV2();
                    });                    
                }
                else {
                    jQuery("#error-revision-file").show();
                }

            }
            else {
                jQuery("#error-issue-name").show();
            }            
        }
        else {
            jQuery("#error-revision-name").show();
        }
    }
    else {
        
        jQuery("#error-checkboxes").show();
    }   
}

function checkIfDocumentExist(){

    // Get the file name from the file input control on the page.
    var fileInput = jQuery('#getFile');
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];

    // Get the document URL
    var documentLibraryUrl = "/sites/wyman/houston/qa/srqw/data/Spec and Revision Library/";
    var documentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + documentLibraryUrl + fileName + "')";

    var deferred = jQuery.Deferred();
        jQuery.ajax({
            url: documentURL, 
            method:'GET',
            headers:{Accept:'application/json; odata=verbose'},
            success:function(data){
                deferred.resolve(data);
            },
            error:function(err){
                deferred.reject(err);
            }
        });
    return deferred.promise();
}

function uploadFileWithValidation()
{
    newName = jQuery('#displayName').val();
    issueName = jQuery('#displayIssue').val();
    var fileInput = jQuery('#getFile');

    SpecName = newName + '-' + issueName;    

    if ( selectedUsers.length > 0) {

        jQuery("#error-checkboxes").hide();

        if ( newName.length > 0 )
        {
            jQuery("#error-revision-name").hide();

            if ( issueName.length > 0 )
            {
                jQuery("#error-issue-name").hide();

                if ( fileInput[0].files.length > 0 )
                {
                    jQuery("#error-revision-file").hide();
                    uploadFile();
                }
                else {
                    jQuery("#error-revision-file").show();
                }

            }
            else {
                jQuery("#error-issue-name").show();
            }            
        }
        else {
            jQuery("#error-revision-name").show();
        }
    }
    else {
        
        jQuery("#error-checkboxes").show();
    }

    
}

function uploadFileV2() {

    // Define the folder path for this example.
    //var serverRelativeUrlToFolder = '/sites/flows/shared documents';
    //var serverRelativeUrlToFolder = '/sites/engineering/Spec and Revision Library/';
    //var dashboardPageUrl = 'https://bjsmarts001.sharepoint.com/sites/engineering/SitePages/Dashboard.aspx';

    var serverRelativeUrlToFolder = '/sites/wyman/houston/qa/srqw/data/Spec and Revision Library/';
    var dashboardPageUrl = '/sites/wyman/houston/qa/srqw/SitePages/Home.aspx';


    // Get test values from the file input and text input page controls.
    var fileInput = jQuery('#getFile');
    newName = jQuery('#displayName').val();

    // Get the server URL.
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;

    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {

            // Get the list item that corresponds to the uploaded file.    
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            getItem.done(function (listItem, status, xhr) {
                var item = listItem.d;
                console.log('Specification Id: ', item.Id);
                console.log('file:', item);        
                var RevisionID = item.Id;                
                CreateRevision(RevisionID);
            });
            getItem.fail(onError); 
                        
        });
        addFile.fail(onError);        
    });
    getFile.fail(onError);

    // Get the local file as an array buffer.
    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {
        
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
            beforeSend : function() {
                $.blockUI({ 
                    message: '<h4>Uploading Document ...</h4>',
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
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": arrayBuffer.byteLength
            }
        });
    }

    function getListItem(fileListItemUri) {
                
        // Send the request and return the response.
        return jQuery.ajax({
                url: fileListItemUri,
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" }
            });
    }

}

function CreateRevision(RevisionID)
{
    var dashboardPageUrl = '/sites/wyman/houston/qa/srqw/SitePages/Home.aspx';
    var listName = "Revisions";
    var commentsVal = $("#field-comments").val();
    var itemType = GetItemTypeForListName(listName);

    var sp = jQuery('#displayName').val();
    var is = jQuery('#displayIssue').val();
    var nm = sp + " - " + is;

    var fileInput = jQuery('#getFile');
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];
    var documentLibraryUrl = "/sites/wyman/houston/qa/srqw/data/Spec and Revision Library/";

    //var user = "8";
    //var users = "{ 'results': ['55'] }";
    var Ids = getArrayIds();
    var ExtIds = getExternalArrayIds();

    var item = {
        "__metadata": { "type": itemType },
        "Title": nm,
        "Revision_x0020_Id": RevisionID,
        "Specification": sp,
        "Issue": is,
        "Revision_x0020_Status": "In Revision",
        "Link": documentLibraryUrl + fileName,
        "Initiator": _spPageContextInfo.userDisplayName,
        "InitiatorEmail": _spPageContextInfo.userEmail,
        "ExtApprovers": ExtIds,
        "ApproversId": {"results": Ids}
    };

    $.ajax({
        //url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
        url: _spPageContextInfo.webAbsoluteUrl + "/data/_api/web/lists/getbytitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        beforeSend : function() {
            $.blockUI({ 
                message: '<h4>Your spec has been submitted to internal/external reviewers.</h4>',
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
            setTimeout($.unblockUI, 3000);                    
        },
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log(data);         
            //alert('Your spec has been submitted to internal/external reviewers');
            window.location = _spPageContextInfo.webAbsoluteUrl;              
        },
        error: function (data) {
            alert(data);
        }
    });
}

// Get List Item Type metadata
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFile() {

    // Define the folder path for this example.
    //var serverRelativeUrlToFolder = '/sites/flows/shared documents';
    //var serverRelativeUrlToFolder = '/sites/engineering/Spec and Revision Library/';
    //var dashboardPageUrl = 'https://bjsmarts001.sharepoint.com/sites/engineering/SitePages/Dashboard.aspx';

    var serverRelativeUrlToFolder = '/sites/wyman/eswa/data/Spec and Revision Library/';
    var dashboardPageUrl = '/sites/wyman/eswa/';


    // Get test values from the file input and text input page controls.
    var fileInput = jQuery('#getFile');
    newName = jQuery('#displayName').val();

    // Get the server URL.
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;

    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {

            // Get the list item that corresponds to the uploaded file.    
            _fileListItemUri = file.d.ListItemAllFields.__deferred.uri;        
            var getItem = getListItem(_fileListItemUri);
            getItem.done(function (listItem, status, xhr) {
                
                // Change the display name and title of the list item.
                var changeItem = updateListItem(listItem.d.__metadata);
                changeItem.done(function (data, status, xhr) {
                    alert('Your spec has been submitted to internal/external reviewers');                                        
                    window.location = dashboardPageUrl;
                });
                changeItem.fail(onChangeItemError);                          
            });
            getItem.fail(onError);            
        });
        addFile.fail(onError);        
    });
    getFile.fail(onError);
    

    // Get the local file as an array buffer.
    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {

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
            beforeSend : function() {
                $.blockUI({ 
                    message: '<h4>Uploading Document ...</h4>',
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
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": arrayBuffer.byteLength
            }
        });
    }

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {

        // Send the request and return the response.
        return jQuery.ajax({
            url: fileListItemUri,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {

        // Define the list item changes. Use the FileLeafRef property to change the display name. 
        // For simplicity, also use the name as the title. 
        // The example gets the list item type from the item's metadata, but you can also get it from the
        // ListItemEntityTypeFullName property of the list.

        //var user = "8";
        //var users = "{ 'results': ['8', '13'] }";
        var users = getApprovals();
        
        //var extUsers = "john.smith@tech.com";
        var extUsers = getExternalApprovals();

        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','ApproversId':{3},'Specification':'{4}','Issue':'{5}','ExtApprovers':'{6}'}}",
            itemMetadata.type, SpecName, SpecName, users, newName, issueName, extUsers );
        
        // var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','ApproversId':{3},'Specification':'{4}','Issue':'{5}'}}",
        //     itemMetadata.type, SpecName, SpecName, users, newName, issueName );

        //var body = String.format("{{'__metadata':{{'type':'{0}'}},'Title':'{1}','ApproversId':{2}}}",
        //itemMetadata.type, newName, users );
        
        // Send the request and return the promise.
        // This call does not return response content from the server.
        return jQuery.ajax({
            url: itemMetadata.uri,
            type: "POST",
            data: body,
            beforeSend : function() {
                $.blockUI({ 
                    message: '<h4>Updating Document Properties ...</h4>',
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
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "content-length": body.length,
                "IF-MATCH": itemMetadata.etag,
                //"IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            }
        });
    }
}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

function onChangeItemError(error) {

    console.log('onChangeItemError has occurred:', error);

    var getItem = getListItem(_fileListItemUri);
    getItem.done(function (listItem, status, xhr) {
        
        // Change the display name and title of the list item.
        var changeItem = updateListItem(listItem.d.__metadata);
        changeItem.done(function (data, status, xhr) {
            alert('Your spec has been submitted to internal/external reviewers');                                        
            window.location = dashboardPageUrl;
        });
        changeItem.fail(onError); 
    });

    function getListItem(fileListItemUri) {
        
                // Send the request and return the response.
                return jQuery.ajax({
                    url: fileListItemUri,
                    type: "GET",
                    headers: { "accept": "application/json;odata=verbose" }
                });
            }
        
            // Change the display name and title of the list item.
            function updateListItem(itemMetadata) {
        
                // Define the list item changes. Use the FileLeafRef property to change the display name. 
                // For simplicity, also use the name as the title. 
                // The example gets the list item type from the item's metadata, but you can also get it from the
                // ListItemEntityTypeFullName property of the list.
        
                //var user = "8";
                //var users = "{ 'results': ['8', '13'] }";
                var users = getApprovals();
                
                var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','ApproversId':{3},'Specification':'{4}','Issue':'{5}'}}",
                    itemMetadata.type, SpecName, SpecName, users, newName, issueName );
        
                //var body = String.format("{{'__metadata':{{'type':'{0}'}},'Title':'{1}','ApproversId':{2}}}",
                //itemMetadata.type, newName, users );
                
                // Send the request and return the promise.
                // This call does not return response content from the server.
                return jQuery.ajax({
                    url: itemMetadata.uri,
                    type: "POST",
                    data: body,
                    beforeSend : function() {
                        $.blockUI({ 
                            message: '<h4>Updating Document Properties ...</h4>',
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
                    headers: {
                        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                        "content-type": "application/json;odata=verbose",
                        "content-length": body.length,
                        "IF-MATCH": itemMetadata.etag,
                        //"IF-MATCH": "*",
                        "X-HTTP-Method": "MERGE"
                    }
                });
            }
            
}

// Display error messages. 
function onError(error) {    
    
    console.log('onError has occurred:', error);    
    alert('Error has occurred. Please try to upload the revision file again.');
    
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;
    window.location = serverUrl + "/SitePages/add.aspx";
}
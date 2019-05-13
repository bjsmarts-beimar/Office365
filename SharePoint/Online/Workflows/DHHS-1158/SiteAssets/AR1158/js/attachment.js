'use strict';

function deletefile(ServerRelativeUrl, LinkID, Index, divBucket)
{
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    
    var fullUrl = siteUrl + "/data/_api/web/GetFileByServerRelativeUrl('" + ServerRelativeUrl +"')";

    var results = deleteFilefromFolder(fullUrl);
    results.done(function (data) {

            console.log('file got deleted successfully: ', fullUrl);

            document.getElementById(divBucket).style.display = "flex";  
            
            let newAttachmentArray = new Array();
                       
            for(var i=0; i<_attachments.length; ++i){         
                
                if ( i !== Index )
                {                    
                    newAttachmentArray.push(_attachments[i]);
                }       
                else {
                    if ( LinkID >= 0 ) {

                        let deleteAction = deleteItem(LinkID, "Links");
                        deleteAction.done( function(data) {
                            console.log('link id: ' + LinkID + ' has been deleted successfully.');
                        });
                        deleteAction.fail( function(error) {
                            alert(JSON.stringify(error));
                        });
                    }
                }                         
            } 

            _attachments = newAttachmentArray;

            let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";

            let full_list = startDiv;
            for(var i=0; i<_attachments.length; ++i){                        
                full_list = full_list + _attachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + _attachments[i][2] + ", " + i + ")'>Delete</a></span><br>";
            } 

            full_list = full_list + "</div>";
            
            $("#" + divBucket).html(full_list);

    });
    results.fail(function(error) {        
        alert(JSON.stringify(error));
    });            
}

function uploadfile(fileInputName, fileInputErrorName, divBucket, serverRelativeUrlToFolder)
{
    var fileInput = jQuery('#' + fileInputName);

    if ( fileInput[0].files.length > 0 )
    {
        jQuery("#" + fileInputErrorName).hide();

        if ( !checkIfFileExist(fileInput[0].files[0].name) )
        {            
            jQuery("#" + "error-revision-file2").hide();
            var serverUrl = _spPageContextInfo.webAbsoluteUrl;
            
            // Initiate method calls using jQuery promises.
            // Get the local file as an array buffer.
            var getFile = getFileBuffer(fileInput);
            getFile.done(function (arrayBuffer) {
            
            // Add the file to the SharePoint folder.
            var addFile = addFileToFolder(arrayBuffer, fileInput, serverUrl, serverRelativeUrlToFolder);
                addFile.done(function (file, status, xhr) {                    
                        
                    console.log('file has been uploaded successfully to document library', file.d.ServerRelativeUrl + " " + file.d.Name);
                        
                    // Reset the input control
                    fileInput.val("");

                    // Add new file metadata to the Array
                    let newItem = [file.d.Name, file.d.ServerRelativeUrl, -1];
                    _attachments.push(newItem);

                    // add attachment information to the ui screen
                    document.getElementById(divBucket).style.display = "flex";  

                    let startDiv = "<div class='col-2' style='text-align: right;'></div><div class='col-10'>";

                    let full_list = startDiv;
                    for(var i=0; i<_attachments.length; ++i){                        
                        full_list = full_list + _attachments[i][0]+ "&nbsp;&nbsp;&nbsp;<span class='ms-delAttachments'><img src='/_layouts/15/images/rect.gif?rev=44'>&nbsp;<a href='javascript:deleteAttachment(" + -1 + ", " + i + ")'>Delete</a></span><br>";
                    } 

                    full_list = full_list + "</div>";

                    $("#" + divBucket).html(full_list);

                    $('#addFileButton').attr("disabled", false);

                });
                addFile.fail(onError);        
            });
            getFile.fail(onError);
        }
        else {
            jQuery("#" + "error-revision-file2").show();
            $('#addFileButton').attr("disabled", false);
        }        
    }
    else {
        jQuery("#" + fileInputErrorName).show();
        $('#addFileButton').attr("disabled", false);
    }
}

function checkIfFileExist(filename)
{
    let found = false;

    for(let i=0; i<_attachments.length; i++)
    {
        if ( _attachments[i][0] === filename )
            found = true;
    }

    return found;
}
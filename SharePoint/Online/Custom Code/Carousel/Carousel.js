'use strict';

jQuery(document).ready(function () {

    console.log('loading ....');    

    GetImages("NewsCarousel");
    

});

function GetImages(hp) {

    let results = retrieveSharePointListItemsByListName("NewsCarousel");

    results.done(function (data) {
                   
        console.log('data', data); 

        let items = data.d.results;

        let i=0;

        for ( i=0; i<items.length; i++ )
        {
            console.log(items[i].Title);

            //var filename = ($(this).attr("ows_FileRef"));
            var title = "";//items[i].Title;
            var desc = strippedHtml(items[i].Description);
            var picture = items[i].BackgroundImage.Url;

            if (i == 0) {
                $("#DynamicCarousel .carousel-indicators").append("<li data-target='#DynamicCarousel' data-slide-to=" + i + " class='active'></li>");
                $("#DynamicCarousel .carousel-inner").append("<div class='item active'><img src='" + picture + "' alt='" + desc + "'><div class='carousel-caption'><strong>" + title + "</strong></div></div>");

            } else {
                $("#DynamicCarousel .carousel-indicators").append("<li data-target='#DynamicCarousel' data-slide-to=" + i + "></li>");
                $("#DynamicCarousel .carousel-inner").append("<div class='item'><img src='" + picture + "' alt='" + desc + "'><div class='carousel-caption'><strong>" + title + "</strong></div></div>");
            }
        }
    });
    results.fail(function(err) {
            alert(err.responseText);
    });
}

function retrieveSharePointListItemsByListName(listName)  
{  
    var deferred = jQuery.Deferred();

    jQuery.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items",          
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

function strippedHtml(html){
    
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    
    // Retrieve the text property of the element (cross-browser support)    
    return temporalDivElement.textContent || temporalDivElement.innerText || "";    
}
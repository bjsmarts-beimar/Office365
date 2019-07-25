$(document).ready(function() {

    loadingBreakingNews();    

});

function loadingBreakingNews() {

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Breaking News",
        CAMLViewFields: "<ViewFields><FieldRef Name='Id' /><FieldRef Name='Title' /><FieldRef Name='Body' /><FieldRef Name='Modified' /><FieldRef Name='Post_x0020_Date' /></ViewFields>",      
        //CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Geq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Show' /><Value Type='Boolean'>1</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        CAMLQuery: "<Query><Where><And><Eq><FieldRef Name='Show' /><Value Type='Boolean'>1</Value></Eq><Geq><FieldRef Name='Post_x0020_Date' /><Value Type='DateTime'><Today OffsetDays='-7' /></Value></Geq></And></Where><OrderBy><FieldRef Name='Post_x0020_Date' Ascending='FALSE' /></OrderBy></Query>",
        completefunc: function (xData, Status) {

            var SliHtml = "";//"<table><tbody>";
            var index = 0;
            
            $(xData.responseXML).SPFilterNode("z:row").each(function() {

                var message = $(this).context.attributes.item(0).nodeValue;

                SliHtml = "<h3 style='text-align:justify; background-color: red; padding-left: 1%; font-size: large;' class='ms-standardheader ms-WPTitle'><nobr><span>Breaking News:" + message + " </span><span id='WebPartCaptionWPQ4'></span></nobr></h3>"
                                  
            });

            $("#BreakingNewsDiv").append(SliHtml);
        }
    });

}
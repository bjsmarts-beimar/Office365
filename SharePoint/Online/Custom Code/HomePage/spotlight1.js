$(document).ready(function() {

    loadingSpotlightData();    

});

function loadingSpotlightData() {

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Announcements",
        CAMLViewFields: "<ViewFields><FieldRef Name='Id' /><FieldRef Name='Title' /><FieldRef Name='Body' /><FieldRef Name='Modified' /><FieldRef Name='Post_x0020_Date' /></ViewFields>",      
        //CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Geq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Show' /><Value Type='Boolean'>1</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        //CAMLQuery: "<Query><Where><And><Eq><FieldRef Name='Display_x0020_Area' /><Value Type='String'>eSpotlight</Value></Eq><And><Geq><FieldRef Name='Expires'/><Value Type='DateTime'><Today/></Value></Geq></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        //CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value Type='DateTime'><Today/></Value></Geq><And><Eq><FieldRef Name='Display_x0020_Area' /><Value Type='String'>eSpotlight</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value Type='DateTime'><Today/></Value></Geq><Eq><FieldRef Name='Display_x0020_Area' /><Value Type='String'>eSpotlight</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        completefunc: function (xData, Status) {

            var SliHtml = "<table><tbody>";
            var index = 0;
            
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
                  
                if ( index < 3 ) {       
                    
                    var mainBody = $(this).attr("ows_Body");

                    if (mainBody.length > 625) {
                        mainBody = mainBody.substr(0,625)+'...'+'</span></div>';
                    }
                                        
                    var AnnouncementsID = $(this).attr("ows_ID");                    
                    var Title = $(this).attr("ows_Title");
                    //var myDate = new Date($(this).attr("ows_Modified"));
                    var dateStr=$(this).attr("ows_Modified"); 
                    var a=dateStr.split(" ");
                    var d=a[0].split("-");
                    var t=a[1].split(":");
                    var myDate = new Date(d[0],(d[1]),d[2],t[0],t[1],t[2]);

                    SliHtml = SliHtml + "<tr><td><span class='ms-announcementtitle'><a href='/Lists/Announcements/DispForm.aspx?ID=" + AnnouncementsID + "&Source=https://team.scdhhs.gov/'>" + Title + "</a></spam></td></tr>";
                    SliHtml = SliHtml + "<tr><td>" + dateFormatUTC(myDate) + "</td></tr>";
                                                                          
                    SliHtml = SliHtml + "<tr><td>" + mainBody + "</td></tr>";
                }
                
                index++;                
            });

            SliHtml = SliHtml + "</tbody></table>";

            $("#EmployeeSlider").append(SliHtml);
        }
    });
}

function dateFormatUTC(date) {  

    var hours = date.getHours();
  
    var minutes = date.getMinutes();
    if (hours < 10) hours = '0' + hours;
  
    var timeOfDay = hours < 12 ? 'AM' : 'PM';
  
    return date.getUTCMonth() + '/' + date.getUTCDate() + '/' +
           date.getUTCFullYear();// + ' ' + hours + ':' + minutes + timeOfDay;
}
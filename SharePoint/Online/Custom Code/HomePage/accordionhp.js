$(document).ready(function() {

    loadingAccordion1();    

});

function loadingAccordion1()
{
       var thisSite = $().SPServices.SPGetCurrentSite();
       $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Announcements",
            CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /><FieldRef Name='EncodedAbsUrl' /><FieldRef Name='Body' /></ViewFields>",
            CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value Type='DateTime'><Today/></Value></Geq><And><Eq><FieldRef Name='_ModerationStatus' /><Value Type='ModStat'>0</Value></Eq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Display_x0020_Area'/><Value Type='Choice'>Announcements</Value></Eq></And></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
            completefunc: function (xData, Status) {

                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    var mainBody = $(this).attr("ows_Body");
                    mainBody = $("<div/>").html(mainBody).text();
					if (mainBody.length > 625) {
						 mainBody = mainBody.substr(0,625)+'...';
						}
                    var SliHtml = "<div class=\"va-slice\"><div class=\"SCtitle\">" + $(this).attr("ows_Title") + "</div><div class = \"va-content\">" + mainBody + "<a href=\"../Lists/Announcements/DispForm.aspx?ID=" + $(this).attr("ows_ID") + "&Source=" + thisSite + "\">.. More</a></div></div>";
                    $("#SmallSlider").append(SliHtml);

                });

                $('#va-accordion').vaccordion({
                    accordionW: 280,
                    accordionH: 350,
                    expandedHeight: 250,
                    animSpeed: 300,
                    animOpacity: 0.7,
                    visibleSlices: 6
                });

            }

       });

}

function loadingAccordion()
{
    var thisSite = "https://team.scdhhs.gov/";    
    var minDate = getMinDate();
    var todayDate = String.format("{0:yyyy-MM-ddThh:mm:ssZ}",minDate);
    
    var url = "https://team.scdhhs.gov/_vti_bin/ListData.svc/Announcements?$filter=Expires gt datetime'" + todayDate + "'&$orderby=Modified";
    
    $.ajax({
                url: url,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                                        
                    console.log('accordion data', data);                       

                    for ( var i=0; i<data.d.results.length; i++)
                    {
                        if ( data.d.results[i].DisplayAreaValue === "Announcements" )
                        {                            
                            var mainBody = data.d.results[i].Body;                            
                            mainBody = $("<div/>").html(mainBody).text();
                            
                            if (mainBody.length > 625) {
                                mainBody = mainBody.substr(0,625)+'...';
                            }
                            var SliHtml = "<div class='va-slice' style='top: 0px; height: 59px; opacity: 1; overflow: hidden;'><div class='SCtitle'>" + data.d.results[i].Title + "</div><div class='va-content' style='display: none;'>" + mainBody + "<a href='../Lists/Announcements/DispForm.aspx?ID=" + data.d.results[i].ID + "&Source='" + thisSite + "'>.. More</a></div></div>";

                            $("#SmallSlider").append(SliHtml);
                        }                        
                    }

                    $('#va-accordion').vaccordion({
                        accordionW: 280,
                        accordionH: 350,
                        expandedHeight: 250,
                        animSpeed: 300,
                        animOpacity: 0.7,
                        visibleSlices: 6
                    });
                                                            
                },
                error: function (data) {
                    console.log(data.d);
                }
            });   

}

function getMinDate()
{
    var d = new Date(); 
    d.setMonth(d.getMonth());
    d.setHours(12);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}  
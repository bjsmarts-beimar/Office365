$(document).ready(function() {

    loadingSpotlightData();    

});

function loadingSpotlightData() {

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Announcements",
        CAMLViewFields: "<ViewFields><FieldRef Name='Id' /><FieldRef Name='Title' /><FieldRef Name='Body' /><FieldRef Name='Modified' /></ViewFields>",      
        //CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Geq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Show' /><Value Type='Boolean'>1</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        CAMLQuery: "<Query><Where><Eq><FieldRef Name='Display_x0020_Area' /><Value Type='String'>eSpotlight</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        completefunc: function (xData, Status) {

            var SliHtml = "<table><tbody>";
            var index = 0;
            
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
  
                //liHtml = "<li>" + $(this).attr("ows_Body") + "</li>";

                if ( index < 2 ) {       
                    
                    var mainBody = $(this).attr("ows_Body");
                    var Id = $(this).attr("ows_Id");
                    var Title = $(this).attr("ows_Title");
                    //var myDate = new Date($(this).attr("ows_Modified"));
                    var dateStr=$(this).attr("ows_Modified"); 
                    var a=dateStr.split(" ");
                    var d=a[0].split("-");
                    var t=a[1].split(":");
                    var myDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

                    SliHtml = SliHtml + "<tr><td><span class='ms-announcementtitle'><a href='/Lists/Announcements/DispForm.aspx?ID=" + Id + "&Source=https://team.scdhhs.gov/'>" + Title + "</a></spam></td><td>&nbsp;" + myDate.toLocaleString("en-US") + "</td></tr>";
                    SliHtml = SliHtml + "<tr><td>" + mainBody + "</td></tr>";
                }
                
                index++;                
            });

            SliHtml = SliHtml + "</tbody></table>";

            $("#EmployeeSlider").append(SliHtml);
        }
    });
}

function loadingSpolightData() {

    var url = "https://team.scdhhs.gov/_vti_bin/ListData.svc/Announcements?$filter=DisplayAreaValue%20eq%20%27eSpotlight%27&$orderby=Modified%20desc";

    $.ajax({
        url: url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
                                
            console.log('spotlight data: ', data);          

            var SliHtml = "<table><tbody>";
            
            for ( var i=0; i<2; i++)
            {
                var myDate = new Date(parseJsonDate(data.d.results[i].Modified));
                console.log("UTC:" + myDate.toLocaleString());
                //SliHtml = SliHtml + "<tr><td width='80%' class='ms-vb' style='padding-bottom: 3px'></td><td width='20%' align='right' nowrap='' class='ms-vb'><span class='ms-announcementtitle'><a href=''>" + data.d.results[i].Title + "</a></spam><img src='/_layouts/1033/images/new.gif' alt='New' title='New' class='ms-newgif'>&nbsp;</span><br>by&nbsp;<nobr><span><a href=''>" + "Body" + "</a></span> &nbsp;5/14/2019 4:46 PM</td></tr>"
                SliHtml = SliHtml + "<tr><td><span class='ms-announcementtitle'><a href='/Lists/Announcements/DispForm.aspx?ID=" + data.d.results[i].Id + "&Source=" + _spPageContextInfo.webAbsoluteUrl + "'>" + data.d.results[i].Title + "</a></spam></td><td>&nbsp;" + myDate.toLocaleString() + "</td></tr>";
                SliHtml = SliHtml + "<tr><td>" + data.d.results[i].Body + "</td></tr>";
                //<span class="ms-announcementtitle"><a onfocus="OnLink(this)" href="https://team.scdhhs.gov/_layouts/listform.aspx?PageType=4&amp;ListId={B3BCAC42-88CE-4652-BC5A-216ADCA886B2}&amp;ID=1309" onclick="GoToLink(this);return false;" target="_self">Rock Hill CLTC Celebrates National Nurses Week!</a><img src="/_layouts/1033/images/new.gif" alt="New" title="New" class="ms-newgif">&nbsp;</span><br>by&nbsp;<nobr><span><a onclick="GoToLink(this);return false;" href="/_layouts/userdisp.aspx?ID=1129">Colleen Mullis</a><img border="0" height="1" width="3" src="/_layouts/images/blank.gif"><img name="imnmark" class="ms-imnImg" title="" border="0" height="12" width="12" src="/_layouts/images/blank.gif" alt="No presence information" sip="Colleen.Mullis@scdhhs.gov" id="imn_214512,type=sip"></span></nobr>
            }

            SliHtml = SliHtml + "</tbody></table>";

            $("#EmployeeSlider").append(SliHtml);
                                                    
        },
        error: function (data) {
            console.log(data.d);
        }
    });    
}

function parseJsonDate( sDate ) {
    var b, e, i;
    b = sDate.indexOf('(');
    e = sDate.indexOf(')');
    i = sDate.substring(b+1,e);

    if (isNaN(i)) { return null };
    return new Date(parseInt(i));
}
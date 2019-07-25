
$(document).ready(function () {

    loading();
    
 });

function loading() {     
    
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Commonly Used Links",
        CAMLViewFields: "<ViewFields><FieldRef Name='URLNoMenu' /></ViewFields>",
        CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value Type='DateTime'><Today/></Value></Geq><And><Eq><FieldRef Name='_ModerationStatus' /><Value Type='ModStat'>0</Value></Eq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Display_x0020_Area'/><Value Type='Choice'>Ribbon</Value></Eq></And></And></And></Where><OrderBy><FieldRef Name='ShowOrder' Ascending='True' /><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        completefunc: function (xData, Status) {
        
            $(xData.responseXML).SPFilterNode("z:row").each(function () {
            
            var PresentLink = $(this).attr("ows_URLNoMenu").split(',');
            var PresentLinkText = PresentLink.slice(1).join(',');
            
                var HoriHtml = "<li><a href=\"" + PresentLink[0] + "\">" + PresentLinkText + "</a></li>";
                $("#HorNovi").append(HoriHtml);

            });
        }
    });
}
'use strict';

$(document).ready(function() {    

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Home Slider Data",
        CAMLViewFields: "<ViewFields><FieldRef Name='Body' /></ViewFields>",      
        CAMLQuery: "<Query><Where><And><Geq><FieldRef Name='Expires'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Geq><And><Leq><FieldRef Name='Post_x0020_Date'/><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Leq><Eq><FieldRef Name='Show' /><Value Type='Boolean'>1</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Order0' Ascending='True' /><FieldRef Name='Modified' Ascending='FALSE' /></OrderBy></Query>",
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
  
                var liHtml = "<li>" + $(this).attr("ows_Body") + "</li>";
                $("#slider").append(liHtml);
            });
        }
    });
              

    $('#slider').anythingSlider({		
        autoPlay: true,
        delay: 7000         
    });

});

 
$(document).ready(function() {

    loadingSlider();


    $('#slider').anythingSlider({		
    	autoPlay: true
    });

});

function loadingSlider() {     
    
    var minDate = getMinDate();
    var todayDate = String.format("{0:yyyy-MM-ddThh:mm:ssZ}",minDate);
    var endpointUrl = "https://team.scdhhs.gov/_vti_bin/ListData.svc/HomeSliderData?$filter=Expires gt datetime'" + todayDate + "'&Show eq true$orderby=Order";

    console.log('url', endpointUrl);

    $.ajax({
               url: endpointUrl,
               method: "GET",
               headers: { "Accept": "application/json; odata=verbose" },
               success: function (data) {
                                       
                   //console.log('slider data', data);     
                   
                   for ( var i=0; i<data.d.results.length; i++)
                    {
                        if ( data.d.results[i].Show !== false )
                        {
                            var liHtml = "<li>" + data.d.results[i].Body + "</li>";
                            $("#slider").append(liHtml);
                        }                        
                    }
                                                           
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
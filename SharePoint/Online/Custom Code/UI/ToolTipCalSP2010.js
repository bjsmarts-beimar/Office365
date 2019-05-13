
<script src="/OPS/EES/SiteAssets/jquery-1.9.1.min.js" type="text/javascript"></script>

<script language="javascript" type="text/javascript">
_spBodyOnLoadFunctionNames.push("modifyCal");

function modifyCal() {
    window.setTimeout(doModifyCal, 100);
}

function doModifyCal() {

var url = "https://team.scdhhs.gov/OPS/EES/_vti_bin/ListData.svc/ETCCALENDAR";

$.ajax({
    url: url,
    method: "GET",
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {

        //console.log(data.d.results);
        
        var items = data.d.results;

        var CalData = $('div.ms-acal-rootdiv:eq(1)');
    
        $('div.ms-acal-item', CalData).each(function() {

            //console.log($(this));
            var str = $(this)[0].title;
            //var newstr = "My Tooltip";        
            //$(this)[0].title = newstr;
            
            for(var i = 0; i < items.length; i++) {

                //console.log(items[i]);
            
                if ( str.toLowerCase().indexOf(items[i].Title.toLowerCase()) > 0 ) {
                    
                    //var desc = items[i].Title + ' - ' + stripHtml(items[i].CourseDescription);                                                                
                    var newTitle = items[i].CourseTitleValue;

                    if ( items[i].LocationValue != null )
                        newTitle = newTitle + " - " + items[i].LocationValue

                    if ( items[i].PrimaryInstructorNonMagiValue != null )
                        newTitle = newTitle + " - " + items[i].PrimaryInstructorNonMagiValue;
                    
                    $(this)[0].title = newTitle;
   
                }        
            }
        });        

    },
    error: function (data) {
        console.log(data.d);
    }
});		
    
};

function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

</script>
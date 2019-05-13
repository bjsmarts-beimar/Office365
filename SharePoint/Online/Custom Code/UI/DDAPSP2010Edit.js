
<script src="/OPS/EES/SiteAssets/jquery-1.9.1.min.js" type="text/javascript"></script>

<script>
    $(document).ready(function () {

        var url = "https://team.scdhhs.gov/OPS/EES/_vti_bin/ListData.svc/CourseOfferingDescriptions";

        $("select[title='Course Title']").change(function () {

            var elem = $("select[title='Course Title']");

            $.ajax({
                url: url,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    //console.log(data.d.results);
                    
                    var items = data.d.results;
                    
                    for(var i = 0; i < items.length; i++) {

                        //console.log(items[i].Title.toLowerCase() + " - " + elem[0].value.toLowerCase());
            
                        if ( items[i].Title.toLowerCase() === elem[0].value.toLowerCase()) {
                    
                            $("#ctl00_m_g_04dd6b52_1faa_4d45_a792_be73c0e2867a_ctl00_ctl05_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField_inplacerte").text(stripHtml(items[i].CourseDescription));
            
                        }        
                    }                    
                },
                error: function (data) {
                    console.log(data.d);
                }
            });
            
        });		
    
    });


function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
</script>
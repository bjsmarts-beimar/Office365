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
                    
                            $("#ctl00_m_g_3e083864_cdce_4c6e_bab0_e306e282f16d_ctl00_ctl05_ctl02_ctl00_ctl00_ctl04_ctl00_ctl00_TextField_inplacerte").text(stripHtml(items[i].CourseDescription));                                                             
                        }     
                        
                        // if (detectIE()) { 
                        //     alert('IE was detected'); 
                        // } 
                        // else {

                        //     alert('is not IE');
                        // }
                         
                    }                    
                },
                error: function (data) {
                    console.log(data.d);
                }
            });
            
        });		
    
    });

function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // other browser
  return false;
}

function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
</script>
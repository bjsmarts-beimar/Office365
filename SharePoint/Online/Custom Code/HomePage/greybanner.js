
$(document).ready(function () {

    loading();

 });

function loading() {     

     var url = "https://team.scdhhs.gov/Lists/Commonly%20Used%20Links";
        
     $.ajax({
                url: url,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                                        
                    console.log(data);
                                                            
                },
                error: function (data) {
                    console.log(data.d);
                }
            });
            

}
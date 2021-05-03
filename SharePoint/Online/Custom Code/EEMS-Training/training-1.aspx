
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.1.0/material.min.css" >
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/dataTables.material.min.css" >


<style>

.ms-tableRow {
    display:none;
}
.ms-splinkbutton-text {
    display:none;
}
#pageTitle {
    display:none;
}
#sideNavBox {
    display:none;
}
table.blueTable {
    font-family: Tahoma, Geneva, sans-serif;
    border: 1px solid #1C6EA4;
    background-color: #1D3649;
    width: 100%;
    text-align: center;
    vertical-align: text-top;
}

table.blueTable tbody td {
    font-size: 16px;
    color: #FFFFFF;
}

table.blueTable td, table.blueTable th {
    border: 1px solid #1D3649;
    padding: 4px 15px;
    vertical-align: text-top;
}

#contentBox {
    margin-left: 0px !important;
}

#s4-titlerow {    
    height: 0px !important;
}

.table-custom-header {
    background: #1D3649 !important;
    color: white !important;
    font-size: initial !important;
}

.mdl-button--raised.mdl-button--colored {
        background: #1D3649 !important;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>

<!-- Javascript Files -->
<script src="https://code.jquery.com/jquery-3.3.1.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.material.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="/sites/ar/data/SiteAssets/AR1158/css/ar1158.css" >

<script>
    
    $(document).ready(function() {
            loadListItems(); //to load list items        
    });

    function loadListItems() {
        var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MAGI')/items?$filter=" + 
                       "Active eq 'Yes'&$orderby=Created desc";            
            
        $.ajax({
            url: oDataUrl,
            type: "GET",
            dataType: "json",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: successFunction,
            error: errorFunction
        });   
    }
    
    function successFunction(data) {

            console.log(data);

            let recordId = 0;

            try {                

                var dataTableExample = $('#pDashboard').DataTable();                

                if (dataTableExample != 'undefined') {
                        dataTableExample.destroy();
                }

                dataTableExample = $('#pDashboard').DataTable( {
                    columnDefs: [
                        {
                                targets: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                width: '10%',
                                className: 'mdl-data-table__cell--non-numeric'
                        }
                    ],
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging":         false,
                    "aaData": data.d.results,
                    "aoColumns": [
                        {
                                "mData": "Title",
                                "render": function(mData) {
                                        
                                        var results = mData.split("|");
                                        var subtitle = '';
                                        
                                        if ( results[1] !== undefined ) {
                                            subtitle = results[1];
                                        }

                                        return "<font style='font-size: initial;'>" + results[0] + "</font><br><font style='font-size: x-small;'>" + subtitle + "</font>";                                        
                                }
                        }, 
                        {
                                "mData": "Description",
                                "render": function(mData) {                                                                                                                              
                                          return "<a href='#'' rel='tooltip' title='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/hover.png'></a>"
                                }
                        }, {
                                "mData": "Category",
                                "render": function(mData) {
                                        return mData;                                        
                                }
                        }, {
                                "mData": "Created",
                                "render": function(mData) {
                                        let formatDate = new Date(mData);
                                        return dateFormatUTC(formatDate);
                                }

                        }, {
                                "mData": "JobAidLink",
                                "render": function(mData) {

                                        if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/jobaid_small.png'></a>";
                                        }
                                                                                
                                }
                        }, {
                                "mData": "QuickStepsLink",
                                "render": function(mData) {
                                    if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/quicksteps_small.png'></a>";
                                        }                                         
                                }
                        }, {
                                "mData": "ShowMeLink",
                                "render": function(mData) {
                                        return "N/A";                                        
                                }
                        }, {
                                "mData": "PolicyReferenceLink",
                                "render": function(mData) {
                                    
                                    if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/policy_small.png'></a>";
                                        }                                        
                                }
                        }, {
                                "mData": "PPTLink",
                                "render": function(mData) {
                                    if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/ppt_small.png'></a>";
                                        }                                          
                                }
                        }, {
                                "mData": "WBTLink",
                                "render": function(mData) {
                                    if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/wbt_small.png'></a>";
                                        }                                        
                                }
                        }, {
                                "mData": "OtherLink",
                                "render": function(mData) {
                                    if ( mData === null) {
                                            return "N/A";
                                        } else {
                                            return "<a target='_blank' href='" + mData + "'><img src='https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/MAGI/ppt_small.png'></a>";
                                        }                                          
                                }
                        }	
                        
                    ]
                });
            }
            catch(err) {

            }

    }

    function errorFunction() {
            
    }

    function dateFormatUTC(date) {  

        let hours = date.getHours();

        let minutes = date.getMinutes();
        if (hours < 10) hours = '0' + hours;

        let timeOfDay = hours < 12 ? 'AM' : 'PM';

        return date.getUTCMonth() + '/' + date.getUTCDate() + '/' +
        date.getUTCFullYear();// + ' ' + hours + ':' + minutes + timeOfDay;
    }
    
</script>
    
<body>

    <div class="container">
        <div class="row mb-4">
            <div class="col-sm-12 col-md-9 col-lg-6">

                <table class="blueTable" width="100%" align="center">
                    <tbody><tr></tr></tbody><thead>
                          <tr><th colspan="6"><img style="float: left; padding: 0px 0px 0px 10px;" src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/header3.png" width="903" height="90" alt=""><img style="float: right; padding: 10px 20px 0px 40px;" src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/whitelogo.png" width="300" height="61" alt=""></th></tr></thead>
                    <tbody><tr>
                        <td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/jobaid1.png" align="center"></td>
                        <td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/quicksteps1.png" align="center"></td>
                        </td><td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/showme1.png" align="center"></td>
                        </td><td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/policy1.png" align="center"></td>
                        </td><td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/powerpoint1.png" align="center"></td>
                        </td><td width="1%" align="center"><img src="https://schhs.sharepoint.com/sites/ET/data/SiteAssets/images/wbt1.png" align="center"></td></tr>
                    <tr>
                        <td width="1%" align="center">Content information 
                     explaining the 
                    step-by-step process. 
                    Ideal for new 
                    Cúram users.</td>
                        <td width="1%" align="center">Provides step-by-step 
                    instructions for the 
                    process (contains NO 
                    screen shots). Ideal
                    for seasoned users.</td>
                        <td width="1%" align="center">Watch the 
                    step-by-step process
                    being performed
                    in Cúram 
                    (no audio). </td>
                        <td width="1%" align="center">Linked to SCDHHS 
                    Policy if applicable. 
                    Hover mouse over
                    table image to view 
                    Policy Sections.</td>
                        <td width="1%" align="center">Provides concept 
                    PowerPoint (PPT) slides 
                    from Instructor-led Training 
                    or other supplemental materials</td>
                        <td width="1%" align="center">Provides access to 
                    WBT module seen in 
                    MySCLearning
                     (if applicable).</td>
                    
                    </tr></tbody></table>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-sm-12 col-md-9 col-lg-6">
                <font face="Arial" style="bold" size="2"><strong> &nbsp;&nbsp; <span style="background-color: #f5bc40">INSTRUCTIONS: </span> &nbsp;&nbsp;To search for a job aid by name, press the "Ctrl + F" or use the “Search” bar on the upper left side of the page. &nbsp;&nbsp;Sort the table below by clicking the arrows next to the column heading (Title, Category, etc.).  <br>&nbsp;&nbsp;&nbsp;Hover your mouse over any "Hover" to read additional information. If a Policy Reference document does not open, right-click and either choose "Open link in new tab" or "Open link in new window". &nbsp;&nbsp;You may have to refresh the new window to open the policy chapter.<br>&nbsp;&nbsp;&nbsp;<span style="background-color: #66ff66">GETTING HELP: </span> &nbsp;&nbsp;If you are having issues with the Training Materials Portal, please send an email to Eligibilitytraining@scdhhs.gov.  </strong></font>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-sm-12 col-md-9 col-lg-6">
                

                <div id="searchTable">
                
                    <div class="table-responsive">
                    <table id="pDashboard" class="mdl-data-table" cellspacing="0" style="width:100% !important;">
                            <thead>  
                            <tr>                                                       
                                    <th class="table-custom-header">Title</th>           
                                    <th class="table-custom-header">Description</th>
                                    <th class="table-custom-header">Category</th>  
                                    <th class="table-custom-header">Updated On</th>  
                                    <th class="table-custom-header">Job Aid</th>  
                                    <th class="table-custom-header">Quick Steps</th>
                                    <th class="table-custom-header">Show Me</th>  
                                    <th class="table-custom-header">Policy Reference</th>  
                                    <th class="table-custom-header">PPT</th>        
                                    <th class="table-custom-header">WBT</th>
                                    <th class="table-custom-header">Other</th>                                        
                            </tr>  
                            </thead>  
                            <tfoot> </tfoot>  
                    </table>
                    </div>        
                </div>



            </div>
        </div>
    </div>
</body>


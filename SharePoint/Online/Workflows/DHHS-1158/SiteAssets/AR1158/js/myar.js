(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th style='padding-left: 60px;'>Action</th><th>Name of Debtor</th><th>Provider ID#</th><th>Requestor</th><th>Supervisor</th><th>Program</th><th>Date Created</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {  
        
        getDataFromlocalStorage(); 

           
        let backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        let color = getRowColor(ctx.CurrentItem.Created);
        let linkColor = "white";
        let comments = getfewComments(ctx.CurrentItem.Comments, 60);        
        
        if ( backgroundColor != "red")
        {
            linkColor = "black";
        }        
        

    return "<tr style='background-color: " + backgroundColor  + "; color: " + color + "'><td width='195px'>" 
    + "<button type='button' style='background: " + backgroundColor + "; border: 0;' onClick='deleteSubmission(" + ctx.CurrentItem.ID + ");'><img src='https://schhs.sharepoint.com/sites/ar/data/SiteAssets/AR1158/images/trash-img.png' width='35px' style='background: white;' title='Delete Submission' /><span style='color: " + linkColor + "; display: block;'>Delete</span></button>" 
    + "<button type='button' style='background: " + backgroundColor + "; border: 0;' onClick='updateSubmission(" + ctx.CurrentItem.ID + ");'><img src='https://schhs.sharepoint.com/sites/ar/data/SiteAssets/AR1158/images/lapiz.png' width='35px' style='background: white;' title='Update Submission' /><span style='color: " + linkColor + "; display: block;'>Update</span></button>" 
    + "</td>" 
    + "<td><u>"
    + "<a style='color: " + linkColor + "' href='view.aspx?RecordID=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</u></td>"         
    + "<td>" 
    + ctx.CurrentItem.ProviderCaseNumber 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Requestor[0].title 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Supervisor[0].title
    + "</td>"    
    + "<td>" 
    + ctx.CurrentItem.Program[0].lookupValue
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    // + "<td>" 
    // + stripHtml(comments)
    // + "</td>"
    + "</tr>";
    }
    
    


    
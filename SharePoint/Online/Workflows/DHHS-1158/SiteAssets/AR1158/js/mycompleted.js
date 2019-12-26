(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>ID</th><th>Name of Debtor</th><th>Provider ID#</th><th>Requestor</th><th>Supervisor</th><th>Program</th><th>Date Created</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {  
        
        getDataFromlocalStorage(); 

           
        var backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        let comments = getfewComments(ctx.CurrentItem.Comments, 60);  

        
        if ( backgroundColor != "red")
        {
            linkColor = "black";
        }
        

    return "<tr style='background-color: white; color: black'><td>"
    + ctx.CurrentItem.ID 
    + "</td>"
    + "<td>"
    + "<a href='view.aspx?RecordID=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
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
    //+ stripHtml(comments)
    + ctx.CurrentItem.Created
    + "</td>"
    + "</tr>";
    }
    
    


    
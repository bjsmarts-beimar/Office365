(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>Name of Debtor</th><th>Provider ID#</th><th>Program</th><th>Requestor</th><th>Created</th><th>Supervisor</th><th>Approved</th><th>Clerk</th><th>Completed</th></tr>";
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
    + "<a href='view.aspx?RecordID=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.ProviderCaseNumber 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Program[0].lookupValue
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Requestor[0].title
    + "</td>"    
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Supervisor[0].title
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.InitialApproved
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Clerk[0].title
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.FinalApproved
    + "</td>"
    + "</tr>";
    }
    
    


    
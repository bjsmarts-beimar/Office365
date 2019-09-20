(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>Name of Debtor</th><th>Amount Due</th><th>Requestor Signature</th><th>City</th><th>Date Created</th><th>Comments</th></tr>";
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
    + ctx.CurrentItem.AmountDue 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.RequestorSignature
    + "</td>"    
    + "<td>" 
    + ctx.CurrentItem.City
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "<td>" 
    + stripHtml(comments)
    + "</td>"
    + "</tr>";
    }
    
    


    
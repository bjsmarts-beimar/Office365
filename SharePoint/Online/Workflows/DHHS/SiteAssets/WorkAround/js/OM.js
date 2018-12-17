(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>Workaround Title</th><th>Workaround Number</th><th>WorkAround Type</th><th>Status</th><th>Date Submitted</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {  
        
        getDataFromlocalStorage(); 

           
        var backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        var color = getRowColor(ctx.CurrentItem.Created);
        var linkColor = "white";

        
        if ( backgroundColor != "red")
        {
            linkColor = "black";
        }
        

    return "<tr style='background-color: " + backgroundColor  + "; color: " + color + "'><td>"
    + "<a style='color: " + linkColor + "' href='view.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Workaround_x0020_Number 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.WorkaroundType
    + "</td>"    
    + "<td>" 
    + "<a style='color: " + linkColor + "' href='omdetails.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.WorkaroundWorkflowStatus + "</a>"
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "</tr>";
    }
    
    


    
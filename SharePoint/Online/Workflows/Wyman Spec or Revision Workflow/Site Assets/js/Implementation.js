

(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b>Open Implementations<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Specification</th><th>Date Created</th><th>Revision Status</th><th>Date Assign To</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        var backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        var color = getRowColor(ctx.CurrentItem.Created);

    return "<tr style='background-color: " + backgroundColor  + "; color: " + color + "'>"
    +"<td>"  
    + "<a href='process.aspx?RevisionId=" + ctx.CurrentItem.Revision_x0020_Id + "' style='color: " + color + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>"    
    + "<td>" 
    + ctx.CurrentItem.Revision_x0020_Date_x0020_Create 
    + "</td>"
    + "<td>" 
    + "Accepted" 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "</tr>";
    }
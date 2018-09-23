(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3><b>Reviewees Comments<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Reviewee</th><th>Date Assigned</th><th>Task Status</th><th>Comments</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        var RevisionId = getUrlParameter('RevisionId');

        console.log(ctx.CurrentItem.Revision_x0020_Id);
        
        if (RevisionId !== ctx.CurrentItem.Revision_x0020_Id )
            return '';
        else 
        
    return "<tr>"
    + "<td>" 
    + ctx.CurrentItem.AssignTo 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Task_x0020_Status 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Comments 
    + "</td>"
    + "</tr>";
    }
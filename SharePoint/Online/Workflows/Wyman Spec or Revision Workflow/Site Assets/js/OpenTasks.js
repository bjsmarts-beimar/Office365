

(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b>Open Tasks<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Specification</th><th>Status</th><th>Initiator</th><th>Created</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        var backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        var color = getRowColor(ctx.CurrentItem.Created);
    return "<tr style='background-color: " + backgroundColor  + "; color: " + color + "'><td>"
    + "<a href='Approval.aspx?TaskId=" + ctx.CurrentItem.ID + "&RevisionId=" + ctx.CurrentItem.Revision_x0020_Id + "' style='color: " + color + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Task_x0020_Status 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Author[0].title
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td></tr>";
    }
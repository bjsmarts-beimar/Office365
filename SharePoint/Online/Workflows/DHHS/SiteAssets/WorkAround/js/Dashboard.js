(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b>WorkAround Submitted Items<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Workaround Title</th><th>Workaround Number</th><th>WorkAround Type</th><th>Submitted</th><th>Created</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        //var backgroundColor = getRowBackgroundColor(ctx.CurrentItem.Created);
        //var color = getRowColor(ctx.CurrentItem.Created);
    return "<tr style='background-color: white; color: black'><td>"
    + "<a href='edit.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    // + "<td>" 
    // + ctx.CurrentItem.Revision_x0020_Status 
    // + "</td>"
    // + "<td>" 
    // + ctx.CurrentItem.Initiator
    // + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    // + "<td>" 
    // + "<a target='_blank' href='" + ctx.CurrentItem.Link + "' style='color: " + color + "'>link</a>"
    // + "</td>"
    + "</tr>";
    }
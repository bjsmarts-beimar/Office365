(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b><i><u>WorkAround Submitted Items</u></i><b></h3><br><br><table class='table table-striped table-hover'><tr><th>Workaround Title</th><th>Workaround Number</th><th>WorkAround Type</th><th>Status</th><th>Date Submitted</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
    return "<tr style='background-color: white; color: black'><td>"
    + "<a href='edit.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Workaround_x0020_Number 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.WorkaroundType
    + "</td>"    
    + "<td>" 
    + "<a href='details.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.WorkaroundWorkflowStatus + "</a>"
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "</tr>";
    }
(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b>Rejected New/Revised Spec<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Specification</th><th>Date Created</th></th><th>Initiator</th></th><th>Reject Comments</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
    return "<tr style='background-color: white;'><td style='width: 220px;'>"
    + "<a href='reprocess.aspx?RevisionId=" + ctx.CurrentItem.Revision_x0020_Id + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>"     
    + "<td>" 
    + ctx.CurrentItem.Created 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Initiator 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Comments
    + "</td>"
    + "</tr>";
    }
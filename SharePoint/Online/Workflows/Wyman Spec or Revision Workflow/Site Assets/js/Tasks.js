

(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b>Revision Task List<b></h3><br><br><table class='table table-striped table-hover'><tr><th>Specification</th><th>Assign To</th><th>Date Assigned</th><th>Task Status</th><th>Comments</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        var RevisionId = getUrlParameter('RevisionId');

        var colorRow = "black";
        var backgroundColor = "white";

        if ( ctx.CurrentItem.Task_x0020_Status == "Reject" ) {
            colorRow = "white";
            backgroundColor = "red";
        }

        if ( ctx.CurrentItem.Task_x0020_Status == "Approved" )
                backgroundColor = "lightgreen";
        
        if (RevisionId !== ctx.CurrentItem.Revision_x0020_Id )
            return '';
        else 
        
    return "<tr style='background-color: " + backgroundColor  + "; color: " + colorRow + "'>"
    + "<td style='width: 220px;'>" 
    + ctx.CurrentItem.Title 
    + "</td>"
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
(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>TPC Title</th><th>TPC Number</th><th>TPC Type</th><th>Status</th><th>Date Submitted</th><th>Initiator</th><th>Retirement Status</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {

        let retireStatus = "";

        if ( ctx.CurrentItem.RetiredApprovalStatus === "In Progress") {
            retireStatus = ctx.CurrentItem.RetiredApprover[0].title + " - Pending Approval";
        }       
        
        if ( ctx.CurrentItem.RetiredApprovalStatus === "Rejected") {
            retireStatus = "Rejected By " + ctx.CurrentItem.RetiredApprover[0].title;
        }


    return "<tr style='background-color: white; color: black'><td>"
    + "<a href='retire.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Workaround_x0020_Number 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.WorkaroundType
    + "</td>"    
    + "<td>" 
    + ctx.CurrentItem.WorkaroundWorkflowStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Created
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Author[0].title
    + "</td>"
    + "<td>" 
    + retireStatus
    + "</td>"
    + "</tr>";
    }

    


    
(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover'><tr><th>TPC Title</th><th>TPC Number</th><th>TPC Type</th><th>Rejected By</th><th>Comments</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {

        let RejectedBy = "";

        if ( ctx.CurrentItem.IBMBAStatus == "Rejected")
        {
            RejectedBy = ctx.CurrentItem.IBM_x0020_BA[0].title;
        }

        if ( ctx.CurrentItem.TestingTeamStatus == "Rejected")
        {
            RejectedBy = ctx.CurrentItem.Testing_x0020_Team[0].title;
        }

        if ( ctx.CurrentItem.StateBaLeadStatus == "Rejected")
        {
            RejectedBy = ctx.CurrentItem.State_x0020_BA_x0020_Lead[0].title;
        }

        if ( ctx.CurrentItem.ProjectManagerStatus == "Rejected")
        {
            RejectedBy = ctx.CurrentItem.MMRP_x0020_State_x0020_Project_x[0].title;
        }


    return "<tr style='background-color: white; color: black'><td>"
    + "<a href='resubmit.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Workaround_x0020_Number 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.WorkaroundType
    + "</td>"    
    + "<td>" 
    + RejectedBy
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.Comments
    + "</td>"
    + "</tr>";
    }
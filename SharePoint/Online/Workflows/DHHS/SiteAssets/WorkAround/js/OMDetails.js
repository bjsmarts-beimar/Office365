(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b><i><u>Workflow Status Details Information</u></i><b></h3><br><br><table class='table table-striped table-hover'><tr><th>Workaround Title</th><th>Workaround Number</th><th>WorkAround Type</th><th>IBM BA</th><th>Testing Team</th><th>BA Lead</th><th>Project Manager</th><th>O&M Business Analyst</th><th>O&M Testing Analyst</th><th>O&M Manager</th><th>O&M Director</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {

        var WorkaroundId = getUrlParameter('WorkaroundId');
        if (WorkaroundId !== ctx.CurrentItem.ID )
            return '';
        else 
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
    + ctx.CurrentItem.IBMBAStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.TestingTeamStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.StateBaLeadStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.ProjectManagerStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.O_x0026_MBusinessAnalystStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.O_x0026_MTestingAnalystStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.O_x0026_MManagerStatus
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.O_x0026_MDirectorStatus
    + "</td>"
    + "</tr>";
    }

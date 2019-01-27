(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b><i><u>Workflow Status Details Information</u></i><b></h3><br><br><table class='table table-striped table-hover'><tr><th>TPC Title</th><th>TPC Number</th><th>TPC Type</th><th>IBM BA Lead</th><th>Testing Team Lead</th><th>State BA Lead</th><th>MMRP Program Director</th></tr>";
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
    + "<a href='view.aspx?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
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
    + "</tr>";
    }

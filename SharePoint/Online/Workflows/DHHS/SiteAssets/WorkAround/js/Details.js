(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<h3 style='padding-top: 30px;'><b><i><u>Workflow Status Details Information</u></i><b></h3><br><br><table class='table table-striped table-hover'><tr><th>TPC Title</th><th>TPC Number</th><th>TPC Type</th><th>IBM BA Lead</th><th>Testing Team Lead</th><th>State BA Lead</th><th>MMRP Program Director</th><th>Final Approver</th><th>Training Team</th></tr>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {

        var WorkaroundId = getUrlParameter('WorkaroundId');

        var page = "view.aspx";

        var finalApprover = "TBD";
        var trainingTeamStatus = "Not Started";
                
        if ( ctx.CurrentItem.IBMBAStatus === "Approved" && ctx.CurrentItem.TestingTeamStatus === "Approved" && ctx.CurrentItem.StateBaLeadStatus === "Approved" && ctx.CurrentItem.ProjectManagerStatus === "Approved") {
            page = "final.aspx";
            finalApprover = ctx.CurrentItem.finalApprover[0].title;
            trainingTeamStatus = "In Progress";
        }

        if (WorkaroundId !== ctx.CurrentItem.ID )
            return '';
        else 
    return "<tr style='background-color: white; color: black'><td>"
    + "<a href='" + page + "?WorkaroundId=" + ctx.CurrentItem.ID + "'>" + ctx.CurrentItem.Title + "</a>"
    + "</td>" 
    + "<td>" 
    + ctx.CurrentItem.Workaround_x0020_Number 
    + "</td>"
    + "<td>" 
    + ctx.CurrentItem.WorkaroundType
    + "</td>"
    + "<td align='center'>"  
    + ctx.CurrentItem.IBM_x0020_BA[0].title + "<br>(" + ctx.CurrentItem.IBMBAStatus + ")"
    + "</td>"
    + "<td align='center'>" 
    + ctx.CurrentItem.Testing_x0020_Team[0].title + "<br>(" + ctx.CurrentItem.TestingTeamStatus + ")"
    + "</td>"
    + "<td align='center'>" 
    + ctx.CurrentItem.State_x0020_BA_x0020_Lead[0].title + "<br>(" + ctx.CurrentItem.StateBaLeadStatus + ")"
    + "</td>"
    + "<td align='center'>" 
    + ctx.CurrentItem.Project_x0020_Manager[0].title + "<br>(" + ctx.CurrentItem.ProjectManagerStatus + ")"
    + "</td>"
    + "</td>"
    + "<td align='center'>" 
    + finalApprover + "<br>(" + ctx.CurrentItem.finalApproverStatus + ")"
    + "</td>"
    + "<td align='center'>" 
    + "Training Team" + "<br>(" + trainingTeamStatus + ")"
    + "</td>"
    + "</tr>";
    }

function getColor(status) {

    if ( status === "Up")
        return "https://schhs.sharepoint.com/teams/INTHub/DG/EO/Images1/green.png";

    if ( status === "Planned Down" )
    {
        return "https://schhs.sharepoint.com/teams/INTHub/DG/EO/Images1/yellow.png";
    }

    if ( status === "Unplanned Down" )
    {
        return "https://schhs.sharepoint.com/teams/INTHub/DG/EO/Images1/red.jpg";
    }
}

(function () {
    
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        
        var color = getColor(ctx.CurrentItem.Status);
        
    return "<tr><td align='center'><span style='font-size: x-large;'>System Status</span><br><br>"     
    + "<img style='width: 100px;' src='" + color + "' alt='color' /><br><br>" + ctx.CurrentItem.Description 
    + "</td>"
    + "</tr>";
    }
    
    


    
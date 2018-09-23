(function () {
    var overrideContext = {};
    overrideContext.Templates = {};
    overrideContext.Templates.Header = "<table class='table table-striped table-hover' style='width: 20%;'>";
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Footer = "</table>";
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
    })();
     
    function overrideTemplate(ctx) {
        var RevisionId = getUrlParameter('RevisionId');
        var Source = getUrlParameter('Source');
        var TextAs = '';        

        if ( Source !== undefined )
        {
            TextAs = 'X';
        }
        
        if (RevisionId !== ctx.CurrentItem.Revision_x0020_Id )
            return '';
        else 
        
    return "<tr>"
    + "<td>" 
    + "<a target='_blank' href=" + ctx.CurrentItem.Link + ">" + ctx.CurrentItem.Title + "</a>" 
    + "</td>"
    + "<td>" 
    + "<a href='javascript:deleteAttachment(" + ctx.CurrentItem.ID + ")'>" + TextAs + "</a>" 
    + "</td>"
    + "</tr>";
    }
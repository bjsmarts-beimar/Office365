<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	<PublishingWebControls:EditModePanel runat="server">
		<!-- Styles for edit mode only-->
		<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>" After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	</PublishingWebControls:EditModePanel>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server"><SharePointWebControls:FieldValue FieldName="Title" runat="server"/> | ShareBoot Theme by TopSharePoint.com</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server"><SharePointWebControls:FieldValue FieldName="Title" runat="server" /></asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server">
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <ol class="breadcrumb"><asp:SiteMapPath runat="server" SiteMapProvider="CurrentNavigation" RenderCurrentNodeAsLink="false" SkipLinkText="" CurrentNodeStyle-CssClass="active" /></ol>
        </div>
    </div>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderLeftNavBar" runat="server">
<div class="row">
    <div class="col-md-2 sidebar">
        <PublishingNavigation:PortalSiteMapDataSource
        ID="SiteMapDS"
        runat="server"
        EnableViewState="false"
        SiteMapProvider="CurrentNavigation"
        StartFromCurrentNode="true"
        StartingNodeOffset="0"
        ShowStartingNode="false"
        TrimNonCurrentTypes="Heading"/>			
        <SharePointWebControls:AspMenu
        ID="CurrentNav"
        runat="server"
        EnableViewState="false"
        DataSourceID="SiteMapDS"
        UseSeparateCSS="false"
        UseSimpleRendering="true"
        Orientation="Vertical"
        StaticDisplayLevels="3"
        MaximumDynamicDisplayLevels="0"
        CssClass="leftNav" 
        SkipLinkText="<%$Resources:cms,masterpages_skiplinktext%>"/>
    </div>   
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
<div class="col-md-10">

	<div class="col-sm-12"><PublishingWebControls:EditModePanel runat="server" CssClass="edit-mode-panel title-edit"><SharePointWebControls:TextField runat="server" FieldName="Title"/></PublishingWebControls:EditModePanel></div>

        <div class="col-sm-12"><PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" HasInitialFocus="True" MinimumEditHeight="100px" runat="server"/></div>
        
        <div class="col-sm-9"><WebPartPages:WebPartZone runat="server" Title="Zone 1" ID="Header"/></div>
        <div class="col-sm-3"><WebPartPages:WebPartZone runat="server" Title="Zone 2" ID="RightColumn" Orientation="Vertical"/></div>
        
        <div class="col-sm-6"><WebPartPages:WebPartZone runat="server" Title="Zone 3" ID="TopLeftRow" /></div>
        <div class="col-sm-6"><WebPartPages:WebPartZone runat="server" Title="Zone 4" ID="TopRightRow" /></div>
        
        <div class="col-sm-4"><WebPartPages:WebPartZone runat="server" Title="Zone 5" ID="CenterLeftColumn" /></div>
        <div class="col-sm-4"><WebPartPages:WebPartZone runat="server" Title="Zone 6" ID="CenterColumn" /></div>
        <div class="col-sm-4"><WebPartPages:WebPartZone runat="server" Title="Zone 7" ID="CenterRightColumn" /></div>
        
        <div class="col-sm-12"><WebPartPages:WebPartZone runat="server" Title="Footer" ID="Footer"/></div>
        
        <SharePointWebControls:ScriptBlock runat="server">if(typeof(MSOLayout_MakeInvisibleIfEmpty) == "function") {MSOLayout_MakeInvisibleIfEmpty();}</SharePointWebControls:ScriptBlock>

	</div>
    
</div><!-- end main content -->    
</div><!-- end row --> 
</div><!-- end container --> 
</asp:Content>
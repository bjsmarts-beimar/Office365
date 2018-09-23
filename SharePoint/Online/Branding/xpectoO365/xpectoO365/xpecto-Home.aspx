<%@ Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
    <PublishingWebControls:EditModePanel runat="server">
    	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>" After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
    </PublishingWebControls:EditModePanel>
    <SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server"/>
    <style>.pageTitle{display:none;}</style>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server"/> | xpecto Theme by TopSharePoint.com
</asp:Content>

<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">

<!-- Intro Section -->
<section id="intro">
    <header class="row">   
        <div id="logo" ><a href="#"><img src="/sites/demo/Style Library/xpecto/images/logo.png" alt="xpecto by TopSharePoint.com"></a></div>
        <nav id="nav-wrap">
            <a class="menu-btn" href="#nav-wrap" title="Show navigation">Show Navigation</a>
            <a class="menu-btn" href="#" title="Hide navigation">Hide Navigation</a>
            <ul id="nav" class="nav">
                <li class="current"><a class="smoothscroll" href="#home">Home</a></li>
                <li><a class="smoothscroll" href="#about">About</a></li>
                <li><a class="smoothscroll" href="#services">Services</a></li>
                <li><a class="smoothscroll" href="#products">Products</a></li>
                <li><a class="smoothscroll" href="#clients">Clients</a></li>			         
                <li><a class="smoothscroll" href="#location">Location</a></li> 
            </ul> <!-- / #nav -->
        </nav> <!-- / #nav-wrap --> 	         
    </header> <!-- / Header --> 
      	
	<div id="main" class="row">
    	<div class="twelve columns">
    		<WebPartPages:WebPartZone runat="server" Title="Intro Section" ID="Header"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
            <div id="counter" class="cf">
                <span>000<em> days</em></span> 
                <span>00<em> hours</em></span>
                <span>00<em> minutes</em></span>
                <span>00<em> seconds</em></span> 
            </div>
		</div>
        <ul class="social">
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
            <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="#"><i class="fa fa-skype"></i></a></li>
        </ul>
    </div> <!-- main end -->    	
</section> <!-- end intro section -->

<!-- About Section -->
<section id="about">
<PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" HasInitialFocus="False" MinimumEditHeight="200px" InputFieldLabel="About Section" runat="server"/>
</section>
<!-- / About Section -->

<!-- Services Section -->
<section id="services">
<WebPartPages:WebPartZone runat="server" Title="Services Section" ID="TopLeftRow"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
</section>
<!-- / Services Section -->

<!-- Products Section -->
<section id="products">
<WebPartPages:WebPartZone runat="server" Title="Products Section" ID="CenterColumn"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
</section> 
<!-- / Products Section 1 -->

<!-- Clients Section -->
<section id="clients">
<WebPartPages:WebPartZone runat="server" Title="Clients Section" ID="TopRightRow"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
</section> 
<!-- / Clients Section -->

<!-- Location Section -->
<section id="location">
<WebPartPages:WebPartZone runat="server" Title="Location Section" ID="CenterLeftColumn"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
<!-- map -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2971.259025300566!2d-87.61610102151447!3d41.86577318920475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb51220475f7ec7da!2sThe+Field+Museum!5e0!3m2!1sen!2sus!4v1392331956926" width="100%" height="450" frameborder="0" style="border:0"></iframe>
<!-- / map -->
</section> 
<!-- / Location Section -->

<!-- Footer -->
<footer>
<div class="row">
<WebPartPages:WebPartZone runat="server" Title="Footer" ID="CenterRightColumn"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>              
</div>
<div id="go-top"><a class="smoothscroll" title="Back to Top" href="#intro"><i class="fa fa-chevron-up"></i></a></div>
</footer>
<!-- / Footer -->
	
<!-- End Content Part -->  
</asp:Content>
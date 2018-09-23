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
	<SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server"/>
    <style>.pageTitle{display:none;}</style>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server"><SharePointWebControls:FieldValue FieldName="Title" runat="server"/> | ShareBoot Theme by TopSharePoint.com</asp:Content>

<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">

<!-- Start Slides -->
<div id="myCarousel" class="carousel slide">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    
    <!-- Wrapper for slides -->
    <div class="carousel-inner">
        <div class="item active">
            <div class="fill" style="background-image:url('http://placehold.it/1900x1080&text=ShareBoot');"></div>
            <div class="carousel-caption">
                <h4>Bootstrap framework now for SharePoint 2013!</h4>
            </div>
        </div>
        <div class="item">
            <div class="fill" style="background-image:url('http://placehold.it/1900x1080&text=Responsive');"></div>
            <div class="carousel-caption">
                <h4>Sleek Responsive SharePoint 2013 Theme</h4>
            </div>
        </div>
        <div class="item">
            <div class="fill" style="background-image:url('http://placehold.it/1900x1080&text=Mobile First');"></div>
            <div class="carousel-caption">
                <h4>Mobile SharePoint 2013 Starter Theme</h4>
            </div>
        </div>
    </div>
    
    <!-- Slide Controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="icon-prev"></span></a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="icon-next"></span></a>
</div>
<!-- End Slides -->

<!-- Start Section 1 -->
<div class="section">
<div class="container">
    <div class="row">
        <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-check-circle"></i> Bootstrap for SharePoint</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui faucibus orci luctus et ultrices posuere.</p>
        </div>
        <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-pencil"></i> Phasellus scelerisque</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui faucibus orci luctus et ultrices posuere.</p>
        </div>
        <div class="col-lg-4 col-md-4">
            <h3><i class="fa fa-folder-open"></i> Phasellus accumsan</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu aliquet tellus, eget laoreet dui faucibus orci luctus et ultrices posuere.</p>
        </div>
    </div>
    <!-- /.row -->
</div>
<!-- /.container -->
</div>
<!-- End Section 1 -->

<!-- Start Section 2 -->
<div class="section-colored">
<div class="container">
    <div class="row">
    	<div class="col-lg-12">
    	<PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" HasInitialFocus="True" MinimumEditHeight="200px" InputFieldLabel="Welcome Content" runat="server"/>
		</div>
    </div>
    <!-- /.row -->
</div>
<!-- /.container -->
</div>
<!-- End Section 2 -->

<!-- Start Section 3 -->
<div class="section">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <h2>Portfolio - Lorem ipsum dolor sit amet!</h2>
                <hr>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-home-portfolio" src="http://placehold.it/700x250">
                </a>
            </div>
        </div>
        <!-- /.row -->

    </div>
    <!-- /.container -->
</div>
<!-- End Section 3 -->

<!-- Start Section 4 -->
<div class="section-colored">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <h2>ShareBoot Features Include:</h2>
                <ul>
                    <li>Bootstrap 3 Framework</li>
                    <li>Mobile Responsive Design</li>
                    <li>Ready to use on SharePoint 2013</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                </ul>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <img class="img-responsive" src="http://placehold.it/700x300/ffffff/cccccc">
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</div>
<!-- End Section 4 -->

<!-- Start Section 5 -->
<div class="section">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <img class="img-responsive" src="http://placehold.it/700x300">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <h2>ShareBoot Features Include:</h2>
                <ul>
                    <li>Bootstrap 3 Framework</li>
                    <li>Mobile Responsive Design</li>
                    <li>Ready to use on SharePoint 2013</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Lorem ipsum dolor sit amet</li>
                </ul>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</div>
<!-- End Section 5 -->
			
<!-- Start Section 6 -->		
<div class="container">
    <div class="row well">
        <div class="col-lg-8 col-md-8">
            <h4>'ShareBoot' is a ready-to-use, SharePoint 2013 and Bootstrap 3 theme!</h4>
            <p>For more themes visit TopSharePoint.com! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="col-lg-4 col-md-4">
            <a class="btn btn-lg btn-primary pull-right" href="http://www.topsharepoint.com/themes">See More Templates!</a>
        </div>
    </div>
    <!-- /.row -->
</div>
<!-- End Section 6 -->			
   
</asp:Content>
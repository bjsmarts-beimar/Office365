// Main Javascript
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

var page, // [DOM element] The main area to be scrolled
	navLinks,
	isMobile, // [Boolean] Mobile platform? (phones, tablets)
	isModernWebkitMobile, // [Boolean] More specifically: is it a recent version of Webkit Mobile?
	modernWebkitMobile_topMargin, // [Int] In pixels, the margin-top attribute of the #main element
	supportPositionFixed, // [Boolean] Support fixed positioning? (all desktop platforms, Android 4.0+ and iOS 5.1+)
	hash_update_timer;
	
$(document).ready(function() {
	$('html').removeClass('no-js'); // Remove this if using Modernizr

	// Feature detection: CSS fixed positioning
	// Disclaimer: because some mobile browsers wrongly report support for fixed positioning, UA sniffing is the only way.
	if (navigator.userAgent.match(/android|iphone|ipad|ipod|windows phone|blackberry|playbook|hp-tablet/gi)) {
		isMobile = true; // It's a mobile platform
		
		var AppleWebKitVersion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("AppleWebKit")+12)) || false;
		if (AppleWebKitVersion && AppleWebKitVersion >= 534.30) { // Recent version of webkit mobile
			$("html").addClass("modern-mobile");
			isModernWebkitMobile = true;
			supportPositionFixed = true;
			
		} else { // Not a modern-mobile, but still a mobile!
			$("html").addClass("mobile");
			isModernWebkitMobile = false;
			supportPositionFixed = false; // Assume that all other mobile platforms DON'T support position-fixed
		}

	} else { // Not a mobile platform
		isMobile = false;
		isModernWebkitMobile = false;
		supportPositionFixed = true; // Desktop browsers all support position-fixed
	}
	
	
	if (isMobile) {
		page = $('html,body'); // Scroll main html page
		scrollbinder = $(window);
	} else { // Desktop platforms
		page = $('#main'); // Scroll overflowed div
		scrollbinder = page;
	}

	modernWebkitMobile_topMargin = $('#main').css('margin-top');
	modernWebkitMobile_topMargin = modernWebkitMobile_topMargin.replace(/px/, '');
		
	navLinks = $('nav a[href^="#"]');
		
	checkNavIntegrity(); // This checks if there aren't any broken links in the menu (you can remove this line)

	// Change all articles ID to avoid interference with browser's own scrollTo#hash
	navLinks.each(function(){
		var target = $(this).attr('href').replace(/#/, '');
			$('#'+target).attr('id', target+'_modified'); // Change ID
	});
	
	scroll_handler();	// Set menu according to scroll position
	scrollbinder.bind('scroll', scroll_handler);
		
	// Top navigation links
	navLinks.mousedown(function() {
		// Change current active link
		$('nav a.active').removeClass('active');
		$(this).addClass('active');
		
		// Scroll the page!
		var target = $(this).attr('href'),
			targetPosition = (isMobile) ? $(target+'_modified').offset().top : page.scrollTop() + $(target+'_modified').position().top;
			targetPosition = (targetPosition == 0 || (isModernWebkitMobile && targetPosition == modernWebkitMobile_topMargin)) ? targetPosition : targetPosition + 20; // Adjust top padding
			targetPosition = (isMobile && !isModernWebkitMobile && (targetPosition < 110)) ? 0 : targetPosition; // If old mobile and target is first section then scroll to the top to show the menu
			targetPosition = (isModernWebkitMobile) ? targetPosition-modernWebkitMobile_topMargin : targetPosition;

		clearTimeout(hash_update_timer); // Cancel any pending hash update 

		scrollbinder.unbind('scroll', scroll_handler); // Turn off scroll_handler
		page.stop().animate({scrollTop: targetPosition}, 500, function() {
			clearTimeout(hash_update_timer); // Cancel any previous hash update again
			if (window.location.hash !== target) { // Update #hash in URL only if the new differs from the current one
				hash_update_timer = setTimeout(function(){location.hash = target;}, 10);
			}
			scrollbinder.bind('scroll', scroll_handler); // Turn scroll_handler back on when animate complete
			fix_iOSfive_bug();
		});
	}).click(function(){
		return false;
	});
	
	// Internal links outside the <nav>
	$('a[href^=#]:not(nav a, .tabs a, a.no-animation)').click(function(){
		var target = $(this).attr('href');
		if ($('nav a[href='+target+']').length > 0) { // Target is part of the main navigation? (for which we altered the IDs)
			$('nav a[href='+target+']').trigger('mousedown');
		} else { // Target is outside main navigation: just scroll to target, no history management (which is good if you just want to scroll back to top using "#")
			targetPosition = (isMobile) ? $(target).offset().top : $(target).offset().top + page.scrollTop() - page.position().top;
			targetPosition = target != '#' ? targetPosition : 0;
			targetPosition = (isModernWebkitMobile) ? targetPosition-modernWebkitMobile_topMargin : targetPosition;

			scrollbinder.unbind('scroll', scroll_handler); // Turn off the scroll_handler
			page.stop().animate({scrollTop: targetPosition}, 500, function() {
				scrollbinder.bind('scroll', scroll_handler); // Turn scroll_handler back on when animate complete
				fix_iOSfive_bug();
			});
		}
		return false;
	});
	
	// Set menu and scroll position according to #hash in URL
	hash_handler();	
	 
	// Tabs (part of Skeleton)
	var tabs = $('ul.tabs');
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.mousedown(function(e) {
			//Get Location of tab's content
			var contentLocation = $(this).attr('href');
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
			}
		}).click(function(e){
			e.preventDefault();
		});
	});
	
}); // <-- document ready


$(window).hashchange(function(){
	// Set menu and scroll position according to #hash in URL
	hash_handler();
})


$(window).load(function() {

//	hash_handler(); // Re-call once page is fully loaded to correctly position the 	scroll

	// Main slider options
	$('.flexslider').find('.slides').removeClass('notloaded');
	$('.flexslider').flexslider({
		animation: "fade",              //String: Select your animation type, "fade" or "slide"
		slideshow: true,                //Boolean: Animate slider automatically
		slideshowSpeed: 3000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
		directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
		controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
		mousewheel: true,              //Boolean: Allow slider navigating via mousewheel
		slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
		animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
		pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
		pauseOnHover: false            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    });
});

/* Causes the browser to reflow all elements on the page */
function fix_iOSfive_bug() {
	if (isModernWebkitMobile) { // Only for Webkit Mobile and when the header is in position:fixed;
		document.documentElement.style.paddingRight = '1px';
		setTimeout(function () {
			document.documentElement.style.paddingRight = '';
		}, 0);
	}
}
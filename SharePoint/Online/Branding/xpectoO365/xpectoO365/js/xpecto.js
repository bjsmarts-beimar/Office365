/* xpecto SharePoint Theme by TopSharePoint.com */

/* jQuery Waypoints */
(function($,k,m,i,d){var e=$(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){if(!o){return -1}var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){$.extend(this,{element:$(n),oldScroll:0,waypoints:[],didScroll:false,didResize:false,doScroll:$.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=$.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){$[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}$.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});$(n).bind("scroll.waypoints",$.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout($.proxy(function(){this.doScroll();this.didScroll=false},this),$[m].settings.scrollThrottle)}},this)).bind("resize.waypoints",$.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout($.proxy(function(){$[m]("refresh");this.didResize=false},this),$[m].settings.resizeThrottle)}},this));e.load($.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;$.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=$.fn[k].defaults.context,q,t=$(this);if(n&&n.context){u=n.context}if(!$.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?$.fn[k].defaults:q.waypoints[p].options,r=$.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=$.isWindow(u)?$[m]("viewportHeight"):$(u).height();return v-$(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:null,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}if(n&&n.handler){t.bind(g,n.handler)}});$[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=$(p);$.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1);if(!s.waypoints.length){s.element.unbind("scroll.waypoints resize.waypoints");f.splice(r,1)}}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){$.each(f,function(r,s){var q=$.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?$[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();$.each(s.waypoints,function(u,x){if(!x){return}var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(x.options.onlyOnScroll){return}if(w!==null&&s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(w!==null&&s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}else{if(!w&&s.element.scrollTop()>x.offset){b(x,["down"])}}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=$();$.each(f,function(o,p){$.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};$.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{$.error("Method "+n+" does not exist on jQuery "+k)}}}};$.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};$[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};$[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){$[m]("refresh")})})(jQuery,"waypoint","waypoints",window);

/* Init JS */
jQuery(document).ready(function($) {

/* Preloader */ 
$(window).load(function() {

// will first fade out the loading animation 
	$("#status").fadeOut("slow"); 

	// will fade out the whole DIV that covers the website. 
	$("#preloader").delay(500).fadeOut("slow").remove();      

}) 

/* Menu */  
var toggle_button = $("<a>", {                         
					id: "toggle-btn", 
					html : "Menu",
					title: "Menu",
					href : "#" } 
					);
var nav_wrap = $('nav#nav-wrap')
var nav = $("ul#nav");  

/* id JS is enabled, remove the two a.menu-btns 
and dynamically prepend a.toggle-btn to #nav-wrap */
nav_wrap.find('a.menu-btn').remove(); 
nav_wrap.prepend(toggle_button); 

toggle_button.on("click", function(e) {
e.preventDefault();
	nav.slideToggle("fast");     
});

if (toggle_button.is(':visible')) nav.addClass('mobile');
$(window).resize(function(){
if (toggle_button.is(':visible')) nav.addClass('mobile');
	else nav.removeClass('mobile');
});

$('ul#nav li a').on("click", function(){      
if (nav.hasClass('mobile')) nav.fadeOut('fast');      
});

/* Back To Top Button */
var pxShow = 300;
var fadeInTime = 400;
var fadeOutTime = 400;
var scrollSpeed = 300;

// Show or hide the sticky footer button
jQuery(window).scroll(function() {

	if (jQuery(window).scrollTop() >= pxShow) {
		jQuery("#go-top").fadeIn(fadeInTime);
	} else {
		jQuery("#go-top").fadeOut(fadeOutTime);
	}

});

/* FitText Settings */
setTimeout( function() {
   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });	   
}, 100);

/* Final Countdown Settings */
var finalDate = '2016/07/07';

$('div#counter').countdown(finalDate)
.on('update.countdown', function(event) {

	$(this).html(event.strftime('<span>%D <em>days</em></span>' + 
										 '<span>%H <em>hours</em></span>' + 
										 '<span>%M <em>minutes</em></span>' +
										 '<span>%S <em>seconds</em></span>'));

});  

/* Smooth Scrolling */

$('.smoothscroll').on('click',function (e) {
	e.preventDefault();

	var target = this.hash,
	$target = $(target);

	$('html, body').stop().animate({
		'scrollTop': $target.offset().top
	}, 800, 'swing', function () {
		window.location.hash = target;
	});
});


/* Highlight current section in the navigation menu */

var sections = $("section");
var navigation_links = $("#nav-wrap a");

sections.waypoint({

  handler: function(event, direction) {

	   var active_section;

		active_section = $(this);
		if (direction === "up") active_section = active_section.prev();

		var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

	 navigation_links.parent().removeClass("current");
		active_link.parent().addClass("current");

	},
	offset: '35%'

});

});
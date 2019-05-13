$( document ).ready(function() {

  // Find all the top level links in the Quick Launch that have children
  var topLevelLinks = $("div[id$='QuickLaunchMenu'] > ul > li:has('ul') > a");
  
  // Prepend the little "twiddle" icon to each top level link
  topLevelLinks.prepend("<span class='plusnode'>+ <span>");
  
  // We're starting with all of the sections collapsed. If you want them expanded, comment this out.
  topLevelLinks.closest("li").find("> ul").hide();
  topLevelLinks.each(function(){
  
  var link = $(this).attr('href'); // get link from heading
  $(this).children('span.additional-background.ms-navedit-flyoutArrow').attr( "href", link ); //apply the href attribute to the span containing the name of the navigation item.
  $(this).children('span.additional-background.ms-navedit-flyoutArrow').css( "cursor", "pointer"); //bad fix to avoid the underline behaviour caused by the alterations (looks like basic hyperlink on mouse over)
  
  $(this).children('span.additional-background.ms-navedit-flyoutArrow').click(function (f){
  f.stopPropagation();//prevents opening of the accordion if intent to navigate so if you click on the text the event to expand the menu does not fire
  var link2 = $(this).attr('href');
  window.location = link2; // this could probably be done better :)
  });
  
  $(this).removeAttr('href');
  
  });
  
  // Set up for the click even of on the top level links
  topLevelLinks.click(function(e) {
  
  // We're going to stop the default behavior
  //e.preventDefault();
  
  // Find the elements we need to work with
  var childUl = $(this).closest("li").find("> ul");
  var isVisible = childUl.is(":visible")
  
  // If the section is visible, hide it, and vice versa
  if(isVisible) {
  
  // Replace the icon with its antitheses
  $(this).find(".ql-icon").replaceWith("");
  // Hide the child links by sliding up. Note: You could change the effect here.
  childUl.slideUp();
  
  } else {
  
  // Replace the icon with its antitheses
  $(this).find(".ql-icon").replaceWith("");
  // Show the child links by sliding down. Note: You could change the effect here.
  childUl.slideDown();
  
  }
  
  });
  });
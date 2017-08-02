$.fn.hasAttr = function (name) {
	"use strict";
	return this.attr(name) !== undefined;
};

//global variable for checking devices
var is720px = false;

//breakpoint checker
function checkBreakpointSizes() {
	"use strict";
	
	//reset to default
	is720px = false;
	
	$.breakpoint({
        condition: function () { return window.matchMedia('only screen and (max-width: 720px)').matches; },
        first_enter: function () { },
        enter: function () { is720px = true; },
        exit: function () { is720px = false; }
    });
	
}

function initCollasibleMenu() {
	"use strict";
	
	$('.collapsible li').has('ul').addClass('has-sub');
	$('.collapsible li.has-sub>a').after('<span class="holder"></span>');
	
    $('.collapsible li.has-sub>.holder').on('click', function () {
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown('fast');
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});
}

function initGenericSlider() {
	"use strict";
	
	var $slider = $('.generic-slider')
        .on('init', function() {
            /*$('.generic-slider').css({
				'height': $('.generic-slider').find('.slick-slide').height() });
			setTimeout(function(){
				$('.generic-slider').css({ 'height': 'auto' });
			}, 1);*/
        })
        .slick({
            lazyLoad: 'progressive',
			dots: false,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: false,
			arrow: true,
			swipe:true
        });
		

	$('.sponsor-slider').slick({
		arrow: false,
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 5,
		autoplay: true,
		autoplaySpeed: 1000,
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				arrow: false,
				dots: false,
				slidesToShow: 4,
				centerMode: false,
				infinite: true
			  }
			},
			{
			  breakpoint: 426,
			  settings: {
				autoplay: true,
				arrow: false,
				dots: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				infinite: true,
				centerPadding:'20%'
			  }
			}
		]
	});

}

function repositionSlider() {
	"use strict";
	
	$('.generic-slider').slick('setPosition');
	$('.sponsor-slider').slick('setPosition');
}

function showPage() {
	"use strict";
	
	(function defer() {
		if ($('body').hasClass('cssloaded')) {
			
			
			$('html,body').css({
				'overflow':'visible',
				'height':'auto'
			});
			
			//make page visible
			$('html,body').animate({
				opacity: 1
			}, 500, function() {
				// Animation complete.
			
				
			});
		}
		else {
			setTimeout(function() { defer(); }, 50);
		}
	})();
	
}

function reinitHomepageSubmenu() {
	"use strict";
	
	if(is720px) {
		$('.subnav-wrapper>nav>ul>li').each(function() {
			
			if(!$(this).hasClass('plate-wrapper')) {
				$(this).addClass('plate-wrapper');
				
				if($(this).find('>a').hasClass('active')) {
					$(this).addClass('active');
					$(this).find('>a').removeClass('active');
				}
				
				$(this).find('>a').removeClass('plate-wrapper');
				$(this).find('>a>div').removeClass('plate');
				
				$(this).append($(this).find('.bg'));
				$(this).append($(this).find('.bolts-top'));
				$(this).append($(this).find('.bolts-bottom'));
				
				$(this).wrapInner('<div class="plate" />');
			}
			
        });
	}
	else {
		$('.subnav-wrapper>nav>ul>li').each(function() {
			
			if($(this).hasClass('plate-wrapper')) {
				$(this).find('>div').contents().unwrap();
				
				$(this).find('>a>div').prepend($(this).find('.bolts-bottom'));
				$(this).find('>a>div').prepend($(this).find('.bolts-top'));
				$(this).find('>a>div').prepend($(this).find('.bg'));
				
				
				
				$(this).removeClass('plate-wrapper');
				
				if($(this).hasClass('active')) {
					$(this).find('>a').addClass('active');
					$(this).removeClass('active');
				}
				
				$(this).find('>a').addClass('plate-wrapper');
				$(this).find('>a>div').addClass('plate');
				
				
				
			}
			
        });
	}
}

function initHomepageSubmenu_click() {
	"use strict";
	
	$('.subnav-wrapper>nav>ul>li').each(function() {
		if(!is720px) {
			$(this).find('>a').click(function(e) {
				e.preventDefault();
				$('.subnav-wrapper>nav>ul>li,.subnav-wrapper a').removeClass('active');
				$(this).addClass('active');
				$(this).parent('li').addClass('active');
			});
		}
		
		else {
			
			$(this,$(this).find('>div>a')).click(function(e) {
				e.preventDefault();
				$('.subnav-wrapper>nav>ul>li,.subnav-wrapper a').removeClass('active');
				$(this).addClass('active');
				$(this).parent('li').addClass('active');
			});
		}
    });
}

function initMobileMenu() {
	"use strict";
	
	var $menu = $('header nav>ul')
				.clone()
				.addClass('collapsible');
	
	$menu.find('>li').each(function() {
	    var $sublinks = $(this).find('.sub-links>ul');
		$(this).find('.menu-feature').remove();
		$(this).find('.sub-nav-wrapper').remove();
		$(this).append($sublinks);
    });
	
	$('.mobile-menu').append($menu);
    $('.menu-opener').click(function (e) {
		e.preventDefault();
		$('.menu-opener').toggleClass('active');
        $("#wrapper header").toggleClass("active");
    });
}

function initCollasibleMenu() {
	"use strict";
	
	$('.collapsible li').has('ul').addClass('has-sub');
	$('.collapsible li.has-sub>a').after('<span class="holder"></span>');
	
    $('.collapsible li.has-sub>.holder').on('click', function () {
		$(this).removeAttr('href');
		var element = $(this).closest('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown('fast');
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

}

function initDesktopMenu() {
	"use strict";
	
	$('header nav>ul>li').each(function() {
		var elHtml = "";
		var totalCount = 0;
		var sublinks = $(this).find('.sub-links>ul>li');
		var listCount = sublinks.length;
		
		if(listCount>5) {
			sublinks.each(function() {
				
				if(totalCount==0) {
					elHtml += "<ul>";
				}
				
				totalCount++;
				elHtml += '<li>' + $(this).html() + '</li>';
				
				if (totalCount == Math.round(listCount/2) || totalCount == listCount) {
					elHtml += "</ul>";
					totalCount = 0;
				}
				
			});
			$(this).find('.sub-links>ul').remove();
			$(this).find('.sub-links').append(elHtml);
		}
		 
    });
   
}

function initResponsiveTabs() {
	"use strict";
	
	$('.responsive-tabs').each(function() {
        $(this).find('nav ul li').first().addClass('active');
		$(this).find('.tab-content').first().addClass('active');
		
		$(this).find('nav ul li a').bind('touchstart click', function(e){
			e.preventDefault();
			var tabContentId = $(this).attr('href');
			
			$(this).closest('ul').find('>li').removeClass('active');
			$(this).parent().toggleClass('active');
			
			$(this).closest('.responsive-tabs').find('.tab-content').removeClass('active');
			$(this).closest('.responsive-tabs').find(tabContentId).addClass('active');
			
		});
		
		$(this).find('.header').bind('touchstart click', function(e){
			e.preventDefault();
			$(this).closest('.tab-content-wrapper').find('.tab-content').removeClass('active');
			$(this).parent().addClass('active');
		});
    });
}

function initAccordion() {
	"use strict";
	
	$('.accordion').slideAccordion({
		opener: '.opener',
		slider: '.slide',
		animSpeed: 300
	});
}

function initJcfControls() {
	"use strict";
	
	if (typeof jcf !== 'undefined') {
	    jcf.setOptions('Select', {
	        wrapNative: false,
	        wrapNativeOnMobile: false,
	        fakeDropInBody: false
	    });
		jcf.replaceAll();
	}
}

function initMatchHeight() {
	"use strict";
	
	$('.product-list .prod-details').matchHeight();
	$('.content-info.icons .container-fluid.wide ul li').matchHeight();
}

function doneResizing() {
	"use strict";
	
	initMatchHeight();
	
}

var resizeId;
$(window).resize(function() {
	"use strict";
	
	clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

$(window).resize(function() {
	"use strict";
	
	checkBreakpointSizes();
	reinitHomepageSubmenu();
	repositionSlider();
	initMatchHeight();
	
});

$(window).load(function () {
	"use strict";
	
	//last priority
	//showPage();
});

// JavaScript Document
jQuery(document).ready(function () {
	"use strict";
	
	showPage();	
	checkBreakpointSizes();
	
	// priority elements
	$('.toggle-menu').jPushMenu();
	initMobileMenu();
	initCollasibleMenu();
	initDesktopMenu();
	
	initGenericSlider();
	initAccordion();
	initJcfControls();
	
	reinitHomepageSubmenu();
	initHomepageSubmenu_click();
	initResponsiveTabs();
	initMatchHeight();
});




































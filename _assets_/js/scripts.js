/*-----------------------------------------------------------------------------------

	Theme Name: Puerto Rico, Hotels and Tourism
	Front-end Developer: Chris Yang
	Author Design: Samir Alley
	Author URI: http://www.revize.com/
	Date: February 26, 2019

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
	 if(RZ.login){
	  $body.addClass("user-logged-in");
	 } else{
		 $body.addClass("user-not-logged-in");
	 }
	}

	// Search Toggle
	$('#search-toggle').on('click',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	$('#search-toggle-mobile').on('click',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("active");
	});

	// Menu Arrows
	$("#nav > li:has(ul)").addClass('first-parent').children("a,span").append('<i class="fa fa-angle-down down-arrow">');

	// Menu Toggles
	$("#nav >li:has(ul)").children("a,span").append('<i class="fa fa-angle-down toggle">');
	$("#nav li li:has(ul)").children("a,span").append('<i class="fa fa-angle-down toggle2">');

	function addNavClass() {
		if ($window.width() < 992) {
			$("#nav >li>ul").addClass('first-level');
			$("#nav  li ul ul").addClass('second-level');

		} else{
				$("#nav >li>ul").removeClass('first-level').css('display','');
				$("#nav  li ul ul").removeClass('second-level').css('display','');
		}
	}
	addNavClass();
	$window.resize(addNavClass);
	$('.toggle').on('click keydown', function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			if ($(this).parent().next('.first-level').is(':visible')) {
				$(this).parent().next('.first-level').slideUp();
			} else {
				$('.first-level').slideUp('slow');
				$(this).parent().next('.first-level').slideToggle();
			}
		}
	});

	$('.toggle2').on('click keydown', function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			if ($(this).parent().next('.second-level').is(':visible')) {
				$(this).parent().next('.second-level').slideUp();
			} else {
				$('.second-level').slideUp('slow');
				$(this).parent().next('.second-level').slideToggle();
			}
		}
	});

	// Add Class To Nav Items + Icons if Needed
	$('#nav> li:nth-child(1) >a, #nav> li:nth-child(1) >span').addClass('nav-item-one').prepend();
	$('#nav> li:nth-child(2) >a, #nav> li:nth-child(2) >span').addClass('nav-item-two').prepend();
	$('#nav> li:nth-child(3) >a, #nav> li:nth-child(3) >span').addClass('nav-item-three').prepend();
	$('#nav> li:nth-child(4) >a, #nav> li:nth-child(4) >span').addClass('nav-item-four').prepend();
	$('#nav> li:nth-child(5) >a, #nav> li:nth-child(5) >span').addClass('nav-item-five').prepend();
	$('#nav> li:nth-child(6) >a, #nav> li:nth-child(6) >span').addClass('nav-item-six').prepend();
	$('#nav> li:nth-child(7) >a, #nav> li:nth-child(7) >span').addClass('nav-item-seven').prepend();

	// Flyout
	var flyout = $('#flyout'),
		flyoutwrap = $('#flyout-wrap');

	if (flyout.text().length){
		flyoutwrap.prepend('<div id="flyout-toggle"><i class="fa fa-bars"></i> Related Pages</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.slideToggle();
		$(this).toggleClass("active");
	});

	$("#flyout li:has(ul)").children("a,span").append('<i class="fa fa-angle-down toggle-children">');
	$("#flyout ul").addClass('flyout-children');

	var flyoutChildren = $('.flyout-children');

	$(".toggle-children").on('click keypress', function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			if($(this).parent().next(flyoutChildren).is(":visible")){
				$(this).parent().next(flyoutChildren).slideUp();
			} else {
				$(flyoutChildren).slideUp("slow");
				$(this).parent().next(flyoutChildren).slideToggle();
			}
		}
	});

	// start calendar resize handler
	function resizeIframe(height) {
		var iFrameID = document.getElementById('calendar');
		if(iFrameID) {
				// here you can set the height, I delete it first, then I set it again
				iFrameID.height = "";
				iFrameID.height = height;
		}
		console.log("height to: " + height);
	}
	var eventMethod = window.addEventListener
	? "addEventListener"
	: "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent"
		? "onmessage"
		: "message";
	eventHandler(messageEvent, function (e) {

		if( e.data && e.data[0] === "setCalHeight" )
		{
			if(typeof resizeIframe === 'function'){
				resizeIframe(e.data[1]);
			}

		}

	});
	// end calendar resize handler

	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: false
		});
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let quickLinkCount = $('.quick-link').length;
		const quickLinkItem = function(num) {
			return (quickLinkCount >= num ? num : quickLinkCount);
		}
		$("#quick-links").owlCarousel({
			loop: true,
			responsiveClass: true,
			nav: true,
			navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			responsive: {
				0: {
					items: quickLinkItem(1),
				},
				600: {
					items: quickLinkItem(2),
				},
				900: {
					items: quickLinkItem(3),
				},
				1200: {
					items: quickLinkItem(4),
					loop: false,
					nav: false
				}
			}
		});
	}

	// Preloader
	$window.load(function() {

		setTimeout(function(){
			$body.addClass('loaded');
			 $('#loader-wrapper').fadeOut();
		}, 600);

	});

	$window.ready(function(){

		var translateURL = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

		 // Translate Script
		$.getScript(translateURL);
		console.log(translateURL);
		$('#translation-links a').click(function() {
			var lang = $(this).data('lang');
			console.log(lang);
			var $frame = $('.goog-te-menu-frame:first');
			if (!$frame.size()) {
				return false;
			}
			$frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
			return false;
		});

		// Animations http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
		function onScrollInit( items, trigger ) {
			items.each( function() {
				var osElement = $(this),
					osAnimationClass = osElement.data('os-animation'),
					osAnimationDelay = osElement.data('os-animation-delay');

				osElement.css({
					'-moz-animation-delay':     osAnimationDelay,
					'animation-delay':          osAnimationDelay,
					'-webkit-animation-delay':  osAnimationDelay
				});

				var osTrigger = ( trigger ) ? trigger : osElement;

				if(typeof $.fn.waypoint !== "undefined"){
					osTrigger.waypoint(function() {
						osElement.addClass('animated').addClass(osAnimationClass);
					},{
						triggerOnce: true,
						offset: '100%'
					});
				}
			});
		}
		onScrollInit($('.os-animation'));

		//#Smooth Scrolling
		$('a[href*=#]:not([href=#],[href*="#collapse"])').click(function() {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).load(function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();

	}); // Ready

})(jQuery);

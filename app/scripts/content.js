/*global TweenMax TimelineMax Power2 changeSlide*/
var nextSlide, showDescription, countdown;
(function () {
	'use strict';

	console.info('Content online!');
	//Initialize the global slides variable, then load the navbar, inro, and parallax content
	window.glob.slides = $('.slide');
	$('#navbar').load('partials/navbar.html');
	$('#intro').load('partials/intro.html');
	$('#parallax').load('partials/parallax.html');

	var content = [];
	var numBgs = [1, 4, 1, 0, 0];

	// Initialize each slide with the specified number of backgrounds in numBgs.
	/**
	 *	Slide background initialization function. Loads each slide with the specified number of backgrounds as specified by its index in numBgs.
	 *
	 *	@index 		- The index of the slide where the backgrounds are to be loaded (defined by slides.each)
	 * 	@slide 		- The slide object (defined by slides.each)
	 */
	window.glob.slides.each(function (index, slide) {
		var bgWrapper = $(slide).find('.bgWrapper');
		content[index] = [];
		for (var bg = 0; bg < numBgs[index]; bg++) {
			//Load the image
			content[index][bg] = '/images/slidebgs/slide' + index + 'bg' + bg + '.jpg';
			// Add the image div
			$('<div class="slideBg"></div>').css({
				background: 'url(' + content[index][bg] + ')',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center, center'
			}).prependTo(bgWrapper);
		}
	});

	/**
	 *	Bind scroll function. Toggles the binding of the changeSlide function to scroll wheel actions (up, down, left and right) and arrow keys (up and down).
	 *
	 * 	@state 		- The desired state of the bind ("truthy" = on)
	 */
	var bindScroll = function (state) {
		if (state) {
			//Firefox Mousewheel
			$('#content').on('DOMMouseScroll', function(event){
				if(event.originalEvent.detail > 0) {
				//scroll down
				changeSlide(window.glob.currentSlide + 1);
				}
				else {
					//scroll up
					changeSlide(window.glob.currentSlide - 1);
				}

				//allow page fom scrolling
				event.stopPropagation();
			});

			//IE, Opera, Safari Mousewheel
			$('body').on('mousewheel', function(event){
				//scroll down
				if(event.originalEvent.wheelDelta < 0) { changeSlide(window.glob.currentSlide + 1); }
				//scroll up
				else { changeSlide(window.glob.currentSlide - 1); }

				//allow page fom scrolling
				event.stopPropagation();
			});

			// Arrow keys
			$(document).on('keydown', function(event) {
				/* Act on the event */
				// On down-arrow or right-arrow
				if (event.which === 40 || event.which === 39) { changeSlide(window.glob.currentSlide + 1); }
				// On up-arrow or left-arrow
				else if (event.which === 38 || event.which === 37) { changeSlide(window.glob.currentSlide - 1); }
				event.preventDefault();
			});
		}

		if (!state) {
			$('#content').off('DOMMouseScroll');
			$('body').off('mousewheel');
			$(document).off('keydown');
		}
	};

	// Initializes the site with binded scrolling behviour
	bindScroll(true);

	var slideImg = -1;
	var delay = 2;
	var duration = 1;

	/**
	 *	Next slide funcition. Function which fades through the background images of a slide.
	 *
	 *	@currentSlide 		- The index of the current slide
	 */
	nextSlide = function (currentSlide) {
		var slide = $(window.glob.slides.get(currentSlide));
		if (currentSlide > -1 && $(slide).find('.slideBg').length > 1) {

			var bgSlides = $(slide).find('.slideBg');

			if (slideImg < 0 ) { slideImg = bgSlides.length - 1; }

			TweenMax
			.to($(bgSlides).get(slideImg--), duration, {
				delay: delay,
				filter: 'blur(3px)',
				// left: '-100vw',
				opacity: 0
			});
			TweenMax
			.to($(bgSlides).get(slideImg), duration, {
				delay: delay,
				// filter: 'blur(3px)',
				// '-webkit-filter': 'blur(3px)',
				// left: '0',
				opacity: 1
			});
		}
	};

	//Description functionality

	// COMMITTEE CONTENT BUTTON (IE LEARN MORE, SHOW DESCRIPTION) FUNCTIONALITY //

	/**
	 *	JQuery hover function for buttons on slides. Toggles the background opacity on mouseenter/mouseleave.
	 */
	$('.committeeContent').hover(function() {
		/* Act on the event */
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.3)'
		});
		// TODO: STOP BG SLIDE SHOW, BLUR BG
	}, function () {
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.15)'
		});
		// TODO: RESUME BG SLIDE SHOW, UNBLUR BG
	});

	/**
	 *	JQuery click function for buttons on slides. Takes the user to the appropriate page where the description of the committee can be found.
	 *
	 *	@event 		- The click event
	 */
	$('.committeeContent').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).parent().parent().parent().attr('id');
		id = id.charAt(id.length - 1);
		showDescription(id);
	});

	/**
	 *	JQuery hover function for title images buttons on slides. Toggles the dropshadow on mouseenter/mouseleave.
	 */
	$('.slide-title').hover(function () {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			filter: 'drop-shadow(1px 1px 5px rgba(255,255,255,1)',
			'-webkit-filter': 'drop-shadow(1px 1px 5px rgba(255,255,255,1))'
		});
	}, function(event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			filter: 'none',
			'-webkit-filter': 'none'
		});
	});

	/**
	 *	JQuery click function title images buttons on slides. Takes the user to the appropriate page where the description of the committee can be found.
	 *
	 *	@event 		- The click event
	 */
	$('.slide-title').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).parent().parent().attr('id');
		id = id.charAt(id.length - 1);
		showDescription(id);
	});

	/**
	 *	Show description function. Scrolls the page to the y-value of the target pages's description.
	 *
	 *	@page 		- The page to go to (usually the slide number)
	 */
	showDescription = function (page) {
		//unlock the vertical scolling
		//unbind the vertical scrolling
		bindScroll(false);
		$('body').css('overflow-y', 'visible');

		//Determine the destination of the scroll
		var position = $('.parallaxWrapper').find('#parallax' + page).offset().top;

		//pan down
		TweenMax.to(window, 1.5, {
			scrollTo: {y: position},
			ease: Power2.easeout
		});
		//REMEMBER: ON PAGE CHANGE RELOCK AND BIND VERTICAL SCROLLING
	};

	// CONFERENCE CONTENT FUNCTIONALITY //
	/**
	 *	JQuery hover function for the conference page's content. Toggles the background opacity on mouseenter/mouseleave, and appends/prepends "<"/">" respectively for emphasis.
	 */
	$('.conferenceContent').hover(function() {
		/* Act on the event */
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.3)'
			// backgroundOpacity: '+=30%'
		});
		if (this.id !== 'how') {
			$(this).children('h2').prepend('<i class="fa fa-angle-right"></i> ');
			$(this).children('h2').append(' <i class="fa fa-angle-left"></i>');
		}

	}, function () {
		if (this.id !== 'how') { $(this).children('h2').find('i').remove(); }
		TweenMax.to(this, 0.25, {
			backgroundColor: 'transparent'
			// backgroundOpacity: '-=30%'
		});
	});

	/**
	 *	Format Time function. Helper function which converts unix time into a formatted time object, which it returns. 
	 *
	 *	@time 					- The unix time to be formatted
	 	@return formattedTime	- The time, formatted 
	 			.Seconds 		- The seconds portion of the unix time
	 			.minutes 		- The minutes portion of the unix time
	 			.hours 			- The hours portion of the unix time
	 			.days 			- The days portion of the unix time
	 */
	var formatTime = function (time) {
		var formattedTime = {};
		time = (time / 1000) | 0;
		// Seconds
		formattedTime.seconds = time % 60;
		time = (time / 60) | 0;
		//Minutes
		formattedTime.minutes = time % 60;
		time = (time / 60) | 0;
		//Hours
		formattedTime.hours = time % 24;
		time = (time / 24) | 0;
		//Days
		formattedTime.days = time;
		return formattedTime;
	};

	/**
	 *	Countdown function. Creates a countdown from now to the next conference date which it embeds into the HTML structure.
	 *
	 *	@introTimer 		- The locatino of the timer (true = intro, false = confernce details)
	 */
	var timerIntervalId;
	countdown = function (introTimer) {
		var conferenceDate = new Date('March 12, 2016, 9:00 am');
		var formattedTime = formatTime(conferenceDate - new Date());

		// If the confernce has already started, the timer is unnecessary
		if (conferenceDate - new Date() < 0) {
			$('.colon').remove();
			$('.countdownLabels').remove();
			$('#when.conferenceDetails h4').css('top', '50%');
		}

		else if (introTimer) {
			$('#introClock.clock .countdown').remove();
			$('#introClock.clock #days').append('<span class="countdown">' + formattedTime.days + '</span>');
			$('#introClock.clock #hours').append('<span class="countdown">' + formattedTime.hours + '</span>');
			$('#introClock.clock #minutes').append('<span class="countdown">' + formattedTime.minutes + '</span>');
			$('#introClock.clock #seconds').append('<span class="countdown">' + formattedTime.seconds + '</span>');
		}
		else if (!introTimer) {
			$('#when.conferenceDetails .countdown').remove();
			$('#when.conferenceDetails #days').append('<span class="countdown">' + formattedTime.days + '</span>');
			$('#when.conferenceDetails #hours').append('<span class="countdown">' + formattedTime.hours + '</span>');
			$('#when.conferenceDetails #minutes').append('<span class="countdown">' + formattedTime.minutes + '</span>');
			$('#when.conferenceDetails #seconds').append('<span class="countdown">' + formattedTime.seconds + '</span>');
		}
	};

	/**
	 *	Close Div function. Helper function which closes the popup that opens when a conferenceContent button is clicked.
	 */
	var div;
	var divOpening = false;
	//define global divOpen
	window.glob.divOpen = false;
	var conferenceContentTimeline = new TimelineMax();
	var closeDiv = function(event) {
		event.preventDefault();
		/* Act on the event */
		if (window.glob.divOpen) {
			conferenceContentTimeline.reverse()
			.eventCallback('onReverseComplete', function () {
				if(timerIntervalId) {
					clearInterval(timerIntervalId);
					timerIntervalId = undefined;
				}
				divOpening = false;
				window.glob.divOpen = false;
				$('nav').css('padding-left', '200px');
				$('.row.conferenceRow').off('click', div, closeDiv);
				$('.popupWrapper').off('click', div, closeDiv);
				$('.conferenceDetails i.close').off('click', div, closeDiv);
				bindScroll(true);
			});
		}
	};

	/**
	 *	JQuery click function for conferenceContent buttons. When clicked, they expand their respective divs to create popups with more information.
	 *
	 *	@event 		- The event object
	 */
	$('.conferenceContent').on('click', function (event) {
		event.preventDefault();
		if (divOpening) { return; }
		divOpening = true;
		/* Act on the event */
		//Remove hover css effects
		$(this).trigger('mouseleave');
		//Reset the timeline
		conferenceContentTimeline = new TimelineMax();
		//Assign div and content for animation; store the div for closing
		var thisID = '#' + $(this).attr('id');
		div = $(thisID + '.conferenceDetails');
		// If it is the "When" view, start the countdown clock
		if (thisID === '#when') { timerIntervalId = setInterval(function() { countdown(false); }, 500); }
		//Insert the popup background
		var popupWrapper = $(div).siblings('.popupWrapper');
		var contents = $(div).children('i, h3, p');
		//Define animations
		var popupWrapperTween = TweenMax.to(popupWrapper, 0.25, {
			display: 'block',
			opacity: 1
		});
		var divTween = TweenMax.to(div, 0.5, {
			className: 'conferenceDetails divOpen',
			position: 'fixed',
			top: '15%',
			left: '5%',
			width: '90vw'
		}).eventCallback('onComplete', function () {
			divOpening = false;
			window.glob.divOpen = true;
			bindScroll(false);
			$('nav').css('padding-left', '0');
			$('.popupWrapper').on('click', div, closeDiv);
			$('.conferenceDetails i.close').on('click', div, closeDiv);
		});
		var contentween = TweenMax.to(contents, 0.33, {
				opacity: 1
		});
		//Add animations to timeline
		conferenceContentTimeline.add([popupWrapperTween, divTween, contentween], '+=0', 'normal', 0.5);
	});
}());

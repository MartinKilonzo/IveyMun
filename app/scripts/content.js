/*global TweenMax ScrollMagic*/
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
	var numBgs = [1,4,1,0,0];

	window.glob.slides.each(function (index, slide) {
		var bgWrapper = $(slide).find('.bgWrapper');
		content[index] = [];
		for (var bg = 0; bg < numBgs[index]; bg++) {
			//Load the image
			content[index][bg] = '/images/slidebgs/slide'+index+'bg'+bg+'.jpg';
			// Add the image div
			$('<div class="slideBg"></div>').css({
				background: 'url('+content[index][bg]+')',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center, center'
			}).prependTo(bgWrapper);
		}
	});

	var bindScroll = function (state) {
		if (state) {
			//Firefox
			$('#content').on('DOMMouseScroll', function(event){
				if(event.originalEvent.detail > 0) {
				//scroll down
				changeSlide(currentSlide + 1);
				}
				else {
					//scroll up
					changeSlide(currentSlide - 1);
				}

				//allow page fom scrolling
				event.stopPropagation();
			});

			//IE, Opera, Safari
			$('body').on('mousewheel', function(event){
				//scroll down
				if(event.originalEvent.wheelDelta < 0) { changeSlide(currentSlide + 1); }
				//scroll up
				else { changeSlide(currentSlide - 1); }

				//allow page fom scrolling
				event.stopPropagation();
			});

			$(document).on('keydown', function(event) {
				/* Act on the event */
				// On down-arrow or right-arrow
				if (event.which === 40 || event.which === 39) { changeSlide(currentSlide + 1); }
				// On up-arrow or left-arrow
				else if (event.which === 38 || event.which === 37) { changeSlide(currentSlide - 1); }
				event.preventDefault();
			});
		}

		if (!state) {
			$('#content').off('DOMMouseScroll');
			$('body').off('mousewheel');
			$(document).off('keydown');
		}
	};

	var slideImg = -1;
	var delay = 2;
	var duration = 1;

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

	//GOTO Description functionality

	// COMMITTEE CONTENT BUTTON (IE LEARN MORE, SHOW DESCRIPTION) FUNCTIONALITY //

	$('.committeeContent').hover(function(event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.3)'
		});
		// TODO: STOP BG SLIDE SHOW, BLUR BG
	}, function (event) {
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.15)'
		});
		// TODO: RESUME BG SLIDE SHOW, UNBLUR BG
	});

	$('.committeeContent').on('click',function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).parent().parent().parent().attr('id');
		id = id.charAt(id.length-1);
		showDescription(id);
	});

	$('.slide-title').hover(function (event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			filter: 'drop-shadow(1px 1px 5px rgba(255,255,255,1)',
			'-webkit-filter': 'drop-shadow(1px 1px 5px rgba(255,255,255,1))'
		});
	},function(event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			filter: 'none',
			'-webkit-filter': 'none'
		});
	});

	$('.slide-title').on('click',function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).parent().parent().attr('id');
		id = id.charAt(id.length-1);
		showDescription(id);
	});

	showDescription = function (page) {
		//unlock the vertical scolling
		//unbind the vertical scrolling
		
		bindScroll(false);
		$('body').css('overflow-y', 'visible');

		//Determine the destination of the scroll
		var position = $('.parallaxWrapper').find('#parallax'+page).offset().top;

		//pan down
		TweenMax.to(window, 1.5, {
			scrollTo: {y: position},
			ease: Power2.easeout
		});		
		//REMEMBER: ON PAGE CHANGE RELOCK AND BIND VERTICAL SCROLLING
	};

	// CONFERENCE CONTENT FUNCTIONALITY //

	$('.conferenceContent').hover(function(event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.25, {
			backgroundColor: 'rgba(255,255,255,0.3)'
			// backgroundOpacity: '+=30%'
		});
		if (this.id !== 'how') {
			$(this).children('h2').prepend('<i class="fa fa-angle-right"></i> ');
			$(this).children('h2').append(' <i class="fa fa-angle-left"></i>');
		}
		
	}, function (event) {
		if (this.id !== 'how') { $(this).children('h2').find('i').remove(); }
		TweenMax.to(this, 0.25, {
			backgroundColor: 'transparent'
			// backgroundOpacity: '-=30%'
		});
	});

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

	var timerIntervalId;
	var conferenceDate = new Date("March 12, 2016, 9:00 am");
	countdown = function () {
		var formattedTime = formatTime(conferenceDate - new Date());
		console.log(formattedTime);
		$('#when.conferenceDetails .countdown').remove();
		$('#when.conferenceDetails #days').append('<span class="countdown">'+formattedTime.days+'</span>');
		$('#when.conferenceDetails #hours').append('<span class="countdown">'+formattedTime.hours+'</span>');
		$('#when.conferenceDetails #minutes').append('<span class="countdown">'+formattedTime.minutes+'</span>');
		$('#when.conferenceDetails #seconds').append('<span class="countdown">'+formattedTime.seconds+'</span>');
	};

	var div;
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

	var divOpening = false;
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
		var thisID = '#'+$(this).attr('id');
		div = $(thisID+'.conferenceDetails');
		//Insert the popup background	
		var popupWrapper = $(div).siblings('.popupWrapper');
		var content = $(div).children('i, h3, p');
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
			if (thisID === '#when') { timerIntervalId = setInterval(function() { countdown(); }, 500); }
			divOpening = false;
			window.glob.divOpen = true;
			bindScroll(false);
			$('nav').css('padding-left', '0');
			$('.popupWrapper').on('click', div, closeDiv);
			$('.conferenceDetails i.close').on('click', div, closeDiv);
		});
		var contentween = TweenMax.to(content, 0.33, {
				opacity: 1
		});
		//Add animations to timeline
		conferenceContentTimeline.add([popupWrapperTween, divTween, contentween], '+=0', 'normal', 0.5);
	});
}());

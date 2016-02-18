/*global TweenMax ScrollMagic*/
var nextSlide, showDescription;
(function () {
	'use strict';

	console.info('Content online!');
	//Initialize the global slides variable, then load the navbar, inro, and parallax content
	window.glob.slides = $('.slide');
	$('#navbar').load('partials/navbar.html');
	$('#intro').load('partials/intro.html');
	$('#parallax').load('partials/parallax.html');

	var content = [];
	var numBgs = [1,2,2,2,2,0,0];

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
			// Add a button
			// TODO: Complete the link for the button
			// var marginLeft;
			// if (bg === 0) { marginLeft = 0; }
			// else { marginLeft = '2px'; }
			// $('<div class="slide-button"></div>').css({
			// 	left: 100*bg/numBgs[index]+'vw',
			// 	width: 100/numBgs[index]+'vw',
			// 	marginLeft: marginLeft
			// }).appendTo($(slide).children('.slide-downbar'));
}
});

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
				// left: '-100vw',
				opacity: 0
			});
			TweenMax
			.to($(bgSlides).get(slideImg), duration, {
				delay: delay,
				// left: '0',
				opacity: 1
			});
		}
	};

	//GOTO Description functionality

	$('.slide-title').hover(function (event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			backgroundColor: 'rgba(255,255,255,0.1)'
		});
	},function(event) {
		event.preventDefault();
		/* Act on the event */
		TweenMax.to(this, 0.5, {
			backgroundColor: 'transparent'
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
		console.debug('unlocked', page);
		//unlock the vertical scolling
		//unbind the vertical scrolling
		
		$('body').off('mousewheel');
		$(document).off('keydown');
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
		});
		if (this.id !== 'how') {
			$(this).children('h2').prepend('<i class="fa fa-angle-right"></i> ');
			$(this).children('h2').append(' <i class="fa fa-angle-left"></i>');
		}
		
	}, function (event) {
		if (this.id !== 'how') { $(this).children('h2').find('i').remove(); }
		TweenMax.to(this, 0.25, {
			backgroundColor: 'transparent'
		});
	});

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
				window.glob.divOpen = false;
				$(div).siblings('.popupBg').remove();
				$('.row.conferenceRow').off('click', div, closeDiv);
				$('.row .conferenceContent .popupBg').off('click', div, closeDiv);
				$('.row .conferenceContent div i.close').off('click', div, closeDiv);
			});
		}
	};

	$('.conferenceContent').on('click', function (event) {
		event.preventDefault();
		/* Act on the event */
		//Remove hover css effects
		$(this).trigger('mouseleave');
		//Reset the timeline
		conferenceContentTimeline = new TimelineMax();
		//Assign div and content for animation; store the div for closing
		div = $(this).children('div');
		//Insert the popup background	
		$(this).prepend('<div class="popupBg"></div>');
		var popupBg = $(this).find('.popupBg');
		var content = $(div).children('i, h3, p');
		//Define animations
		var popupBgTween = TweenMax.to(popupBg, 0.25, {
			opacity: 1
		});
		var divTween = TweenMax.to(div, 0.5, {
			className: 'divOpen',
			position: 'fixed',
			top: '15%',
			left: '5%'
		}).eventCallback('onComplete', function () {
			window.glob.divOpen = true;
			$('.row.conferenceRow').on('click', div, closeDiv);
			$('.row .conferenceContent .popupBg').on('click', div, closeDiv);
			$('.row .conferenceContent div i.close').on('click', div, closeDiv);
		});
		var contentween = TweenMax.to(content, 0.33, {
				opacity: 1
		});
		//Add animations to timeline
		conferenceContentTimeline.add([popupBgTween, divTween, contentween], '+=0', 'normal', 0.5);
	});
}());

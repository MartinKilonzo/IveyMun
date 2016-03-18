/*global TweenMax TimelineMax Back Power1 countdown nextSlide*/
var changeSlide;
(function () {
		'use strict';

		console.info('Navbar Loaded');
		var navTimeLine = new TimelineMax();
		// Initialize global variables
		window.glob.slides.length = window.glob.slides.length || 7;
		window.glob.navIsOpen = false;

		/**
		 *	JQuery nav hover function. When the mouse hovers over the nav, expand it.
		 * 	When the mouse leaves, hide it.
		 */
		$('.nav').hover(function() {
			// Check to see if the nav is open
			if (!window.glob.navIsOpen && !window.glob.divOpen) {
				var labels = $(this).find('.nav-label');
				var labelBars = $(this).find('.label-bar');
				// Open the nav
				navTimeLine.add(
					TweenMax.to(this, 0.5, {
						width: '25%',
						maxWidth: '300px',
						paddingLeft: '0'
					}).eventCallback('onComplete', function() {
						TweenMax.to([labels, labelBars], 0.2, {
							opacity: 1
						});
						labels.css({
							display: 'block',
							height: '25px',
							paddingTop: '8px',
							padddingBottom: '8px'
						});
						window.glob.navIsOpen = true;
					}));
			}
		}, function() {
			// Check to see if the nav is indeed open before attempting to close it
			if (window.glob.navIsOpen) {
				var nav = this;
				var labels = $(this).find('.nav-label');
				var labelBars = $(this).find('.label-bar');
				// Close the nav
				navTimeLine.add(TweenMax.to([labels, labelBars], 0.2, {
					opacity: 0
				}).eventCallback('onComplete', function() {
					labels.css('display', 'none');
					TweenMax.to(nav, 0.75, {
						width: '0',
						paddingLeft: '200px'
					}).eventCallback('onComplete', function () {
						window.glob.navIsOpen = false;
					});
				}));
			}
		});

	var busy = false;
	window.glob.currentSlide = -1;
	var imagesIntervalId;
	var introTimerId;
	introTimerId = setInterval( function() {countdown(true); }, 200);

	/**
	 *	Change Slide function. Changes the "slide" (page) to the desired page as indicated by index.
	 *
	 *	@index 		- The index of the slide to change to
	 */	
	changeSlide = function (index) {
		// Check that the function is not currently running, that the index is valid, and that it is pointing to a new slide before proceeding
		if (busy || (index < -1) || (index === window.glob.slides.length)) { return; }
		// If the next slide is the title page (-1), resume the countdown
		if (window.glob.currentSlide === -1) { introTimerId = setInterval( function() {countdown(true); }, 200); }
		// Otherwise, clear the countdown to save on resources
		else { clearInterval(introTimerId); }

		//Pause video if it exists on the current page
		var i;
		var video = $('#slideWrapper' + window.glob.currentSlide).find('video.slideBg').get(0);
		if (video && !video.paused) { video.pause(); }

		//Play a video if it exists on the next (index) page
		video = $('#slideWrapper' + index).find('video.slideBg').get(0);
		if (video && video.paused) { video.play(); }

		var slide;
		// If the next slide is "on top of" the current slide, animate it up then move the previous slides up behind it
		if (index > window.glob.currentSlide) {

			// Update the navbar to show the current page
			$('a.nav-button').removeClass('active');
			$($('a.nav-button').get(index + 1)).addClass('active');

			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper' + index);
			var bgWrapper = $(slide).find('.bgWrapper');
			var contentWrapper = $(slide).find('.contentWrapper, .redacted');
			var topbar = $(slide).find('.slide-topbar');

			// Slide the window.glob.currentSlide slide up
			TweenMax.staggerTo([topbar, bgWrapper, contentWrapper], 1, {
				cycle: {
					top: ['-100vh', '-100vh', '-100vh']
				},
				ease: Back.easeOut.config(0.5)
			}, 0.08, function () {
				$(bgWrapper).css('top', '0');
				$(contentWrapper).css('top', '0');
				$(topbar).css('top', '0');
				//Move each previous, unmoved slide up
				for (i = window.glob.currentSlide; i <= index; i++) {
					$('#slideWrapper' + i).css('top', '-100vh');
				}
				// Update window.glob.currentSlide and unset the busy flag
				window.glob.currentSlide = index;
				//CLEAR NEXT SLIDE
				if (imagesIntervalId) { clearInterval(imagesIntervalId); }
				imagesIntervalId = setInterval(function () { nextSlide(window.glob.currentSlide); }, 8000);
				busy = false;
			});
		}
		// If the next slide is "below" the current slide, move the slides between it and the desired slide down, then animate it down.
		else if (index < window.glob.currentSlide) {

			// Update the navbar to show the current page
			$('a.nav-button').removeClass('active');
			$($('a.nav-button').get(index + 1)).addClass('active');

			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper' + window.glob.currentSlide);

			// Move each previous, moved slide down
			for (i = index + 1; i < window.glob.currentSlide; i++) {
				$('#slideWrapper' + i).css('top', '0vh');
			}

			// Slide the window.glob.currentSlide slide down
			TweenMax.to(slide, 0.6, {
				top: '0vh',
				ease: Power1.easeOut
			})
			.eventCallback('onComplete', function () {
				// Update window.glob.currentSlide and unset the busy flag
				window.glob.currentSlide = index;
				busy = false;
			});
		}

		else { /* do nothing */ }
	};
}());

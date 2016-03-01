/*global TweenMax TimelineMax Back Power1 countdown nextSlide*/
var changeSlide;
(function () {
		'use strict';

		console.info('Navbar Loaded');
		var navTimeLine = new TimelineMax();
		window.glob.slides.length = window.glob.slides.length || 7;
		window.glob.navIsOpen = false;

		$('.nav').hover(function() {
			if (!window.glob.navIsOpen && !window.glob.divOpen) {
				var labels = $(this).find('.nav-label');
				var labelBars = $(this).find('.label-bar');
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
			if (window.glob.navIsOpen) {
				var nav = this;
				var labels = $(this).find('.nav-label');
				var labelBars = $(this).find('.label-bar');
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

		// $('a.nav-button').on('click', function(event) {
		// 	console.debug(event.data.value);
		// 	event.preventDefault();
		// 	$('a.nav-button').removeClass('active');
		// 	$(this).addClass('active');
		// });

	var busy = false;
	window.glob.currentSlide = -1;
	var imagesIntervalId;
	var introTimerId;
	introTimerId = setInterval( function() {countdown(true); }, 200);

	changeSlide = function (index) {
		if (busy || (index < -1) || (index === window.glob.slides.length)) { return; }
		if (window.glob.currentSlide === -1) { introTimerId = setInterval( function() {countdown(true); }, 200); }
		else { clearInterval(introTimerId); }

		//Pause video if it exists on the current page
		var i;
		var video = $('#slideWrapper' + window.glob.currentSlide).find('video.slideBg').get(0);
		if (video && !video.paused) { video.pause(); }

		//Play a video if it exists on the next (index) page
		video = $('#slideWrapper' + index).find('video.slideBg').get(0);
		if (video && video.paused) { video.play(); }

		var slide;
		if (index > window.glob.currentSlide) {

			// Update the navbar to show the current page
			$('a.nav-button').removeClass('active');
			$($('a.nav-button').get(index + 1)).addClass('active');

			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper' + index);
			var bgWrapper = $(slide).find('.bgWrapper');
			var contentWrapper = $(slide).find('.contentWrapper');
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

	//Firefox
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

	//IE, Opera, Safari
	$('body').on('mousewheel', function(event){
		//scroll down
		if(event.originalEvent.wheelDelta < 0) { changeSlide(window.glob.currentSlide + 1); }
		//scroll up
		else { changeSlide(window.glob.currentSlide - 1); }

		//allow page fom scrolling
		event.stopPropagation();
	});

	$(document).on('keydown', function(event) {
		/* Act on the event */
		// On down-arrow or right-arrow
		if (event.which === 40 || event.which === 39) { changeSlide(window.glob.currentSlide + 1); }
		// On up-arrow or left-arrow
		else if (event.which === 38 || event.which === 37) { changeSlide(window.glob.currentSlide - 1); }
		event.preventDefault();
	});
}());

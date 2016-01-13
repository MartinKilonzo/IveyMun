/*global TweenMax, Power1*/
var changeSlide;
(function () {
	'use strict';

	console.info('Navbar Loaded');

	$('.nav-button').hover(function() {
		var icon = $(this).children('i');
		icon.removeClass('fa fa-circle-o');
		icon.addClass('fa fa-circle');
	}, function() {
		var icon = $(this).children('i');
		icon.removeClass('fa fa-circle');
		icon.addClass('fa fa-circle-o');
	});

	$('.nav-button').click(function() {
		var icon = $(this).children('i');
		console.log(icon);
		icon.removeClass('fa fa-circle-o');
		icon.addClass('fa fa-circle');
	}, function() {
		var icon = $(this).children('i');
		icon.removeClass('fa fa-circle');
		icon.addClass('fa fa-circle-o');
	});

	var busy = false;
	var currentSlide = -1;
	var imagesIntervalId;

	changeSlide = function (index) {
		if (busy) { return; }

		var slide;
		if (index > currentSlide) {
			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper'+index);
			var buttons = slide.children('.slide-downbar');

			// Slide the currentSlide slide up
			TweenMax.to(slide, 0.60, {
				top: '-100vh',
				ease: Power1.easeOut
			})
			.eventCallback('onComplete', function () {
				// Move each previous, unmoved slide up
				for (var i = currentSlide; i < index; i++) {
					$('#slideWrapper'+i).css('top', '-100vh');
				}
				// Update currentSlide and unset the busy flag
				currentSlide = index;
				//CLEAR NEXT SLIDE
				if (imagesIntervalId) { clearInterval(imagesIntervalId); }
				imagesIntervalId = setInterval(function () { nextSlide(currentSlide); }, 8000);
				busy = false;
			});
		}

		else if (index < currentSlide) {
			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper'+currentSlide);

			// Move each previous, moved slide down
				for (var i = index + 1; i < currentSlide; i++) {
					$('#slideWrapper'+i).css('top', '0vh');
				}

			// Slide the currentSlide slide down
			TweenMax.to(slide, 0.6, {
				top: '0vh',
				ease: Power1.easeOut
			})
			.eventCallback('onComplete', function () {
				// Update currentSlide and unset the busy flag
				currentSlide = index;
				busy = false;
			});
		}

		else { /* do nothing */ }
	};
}());

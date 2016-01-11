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
	var current = 0;

	changeSlide = function (index) {
		if (busy) { return; }

		var slide;
		if (index > current) {
			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper'+index);
			var buttons = slide.children('.slide-downbar');

			// Slide the current slide up
			TweenMax.to(slide, 0.60, {
				top: '-100vh',
				ease: Power1.easeOut
			})
			.eventCallback('onComplete', function () {
				// Move each previous, unmoved slide up
				for (var i = current; i < index; i++) {
					$('#slideWrapper'+i).css('top', '-100vh');
				}
				// Update current and unset the busy flag
				current = index;
				busy = false;
			});
		}

		else if (index < current) {
			// Set the busy flag
			busy = true;
			slide = $('#slideWrapper'+current);

			// Move each previous, moved slide down
				for (var i = index + 1; i < current; i++) {
					$('#slideWrapper'+i).css('top', '0vh');
				}

			// Slide the current slide down
			TweenMax.to(slide, 0.6, {
				top: '0vh',
				ease: Power1.easeOut
			})
			.eventCallback('onComplete', function () {
				// Update current and unset the busy flag
				current = index;
				busy = false;
			});
		}

		else { /* do nothing */ }
	};
}());

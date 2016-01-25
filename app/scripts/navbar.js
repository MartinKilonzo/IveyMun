/*global TweenMax, Power1*/
var changeSlide;
(function () {
	'use strict';

	console.info('Navbar Loaded');

	$('.nav').hover(function() {
		var labels = $(this).find('.nav-label');
		var icons = $(this).find('img');
		TweenMax.to(icons, 0.2, {
			opacity: 0, 
			display: 'none'
		});
		TweenMax.to(this, 0.5, {
			width: '150px'
		}).eventCallback('onComplete', function() {
			TweenMax.to(labels, 0.2, {
				opacity: 1
			});
			labels.css({
				display: 'block',
				height: '25px',
				paddingTop: '16px'
			});
		});
		
	}, function() {
		var nav = this;
		var lables = $(this).find('.nav-label');
		var icons = $(this).find('img');
		TweenMax.to(lables, 0.2, {
				// visibility: 'visible',
				opacity: 0
			}).eventCallback('onComplete', function() {
				lables.css('display', 'none');
				TweenMax.to(nav, 0.5, {
					width: '75px'
				}).eventCallback('onComplete', function () {
					TweenMax.to(icons, 0.2, {
						display: 'inline',
						opacity: 1
					});
				});
			});
		});

	$('a.nav-button').on('click', function(event) {
		event.preventDefault();
		$('a.nav-button').removeClass('active');
		$(this).addClass('active');
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
			var bgWrapper = $(slide).find('.bgWrapper');
			var contentWrapper = $(slide).find('.contentWrapper');
			var downbar = $(slide).find('.slide-downbar');

			console.log(slide, bgWrapper, contentWrapper, downbar);

			// Slide the currentSlide slide up
			TweenMax.staggerTo([bgWrapper, contentWrapper, downbar], 0.75, {
				cycle: {
					top: ['-100vh', '-100vh', '-25%']
				},
				ease: Power1.easeOut
			}, 0.025, function () {
				$(bgWrapper).css('top', '0');
				$(contentWrapper).css('top', '0');
				$(downbar).css('top', '75%');
				//Move each previous, unmoved slide up
				for (var i = currentSlide; i <= index; i++) {
					console.log(i);
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

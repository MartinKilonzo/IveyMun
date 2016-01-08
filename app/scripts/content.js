/*global*/
var nextSlide;
(function () {
	'use strict';

	console.info('Scrolling online!');

	var slides = $('.slide').toArray();

	for (var i = slides.length - 1; i >= 0; i--) {
		$('#'+slides[i].id).css('zIndex', slides.length - i - 1);
	}

	var currentSlide = 0;
	var delay = 2;
	var duration = 1;

	nextSlide = function () {
		var slideId = slides[currentSlide].id;
		var slide = $('#'+slideId);

		TweenMax
		.to(slides[currentSlide++], duration, {
			delay: delay,
			// left: '-100vw',
			opacity: 0,
		})
		.eventCallback('onComplete', function () { 
			//move all slides up one z index
			for (var i = 0; i < slides.length; i++) {
				var s = $('#'+slides[i].id);

				var newZIndex = parseInt(s.css('zIndex')) + 1;
				s.css('zIndex', newZIndex);
			}
			var zIndex = slide.css('zIndex');

			slide.css({
				left: 0,
				opacity: 1,
				zIndex: zIndex - slides.length
			});
		});
		//Alternatively, using currentSlide%slide.length as the index would work and would reduce the need for this check
		if (currentSlide === slides.length) { currentSlide = 0; }
	};

	// Stopeed when in view
	// Need arrow buttons on the sides to navigate
	var slideLoop = setInterval(nextSlide, 5000);

	// init controller
	var sceneController = new ScrollMagic.Controller();

	// SCENE 1 //

	// var redContainerScene = new ScrollMagic.Scene({
	// 	triggerElement: '#red-scene',
	// 	duration: 100
	// })
	// .setTween('#red-block', 0.1, {
	// 	backgroundColor: 'red',
	// 	color: 'white',
	// 	ease: Linear.easeNone
	// })
	// .addIndicators({name: "red"})
	// .addTo(sceneController);

	//Parallax Scenes
}());

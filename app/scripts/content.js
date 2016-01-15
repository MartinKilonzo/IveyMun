/*global TweenMax ScrollMagic*/
var nextSlide;
(function () {
	'use strict';

	console.info('Scrolling online!');
	$('#intro').load('partials/intro.html');

	var content = [];
	var numBgs = [1,2,2,2,2,2];

	var slides = $('.slide');

	slides.each(function (index, slide) {
		content[index] = [];
		for (var bg = 0; bg < numBgs[index]; bg++) {
			//Load the image
			content[index][bg] = '/images/slidebgs/slide'+index+'bg'+bg+'.jpg';
			// Add the image div
			$(slide).prepend('<div class="slideBg"></div>');
			// Add a button
			// TODO: Complete the link for the button
			$(slide).children('.slide-downbar').prepend('<div class="slide-button" style="width: '+1/numBgs[index]+'%, left: '+bg/numBgs[index]+'%"></div>');
		}
		$(slide).children('.slideBg').each(function (bgIndex, bg) {
			$(bg).css({
				background: 'url('+content[index][bgIndex]+')',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center, center'
			});
		});
	});

	console.log(slides, content);

	var slideImg = -1;
	var delay = 2;
	var duration = 1;

	nextSlide = function (currentSlide) {
		if (currentSlide > -1 && $(slides.get(currentSlide)).children('.slideBg').length > 1) {

			var slide = $(slides).get(currentSlide);
			var bgSlides = $(slide).children('.slideBg');
			
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
				// left: '-100vw',
				opacity: 1
			});
		}
	};

	// nextSlide = function (currentSlide) {
	// 	if(currentSlide > -1) {
	// 		var length = $(slides.get(currentSlide)).children('.slideBg').length;
	// 		//Alternatively, using slideImg%slide.length as the index would work and would reduce the need for this check
	// 		if (slideImg % length === -1) { slideImg = length - 1; }
	// 		var bgSlides = $('#slideWrapper'+currentSlide).children('.slideBg');
	// 		var slide = bgSlides.get(slideImg--);
	// 		console.debug($(slide));
	// 		TweenMax
	// 		.to($(slide), duration, {
	// 			delay: delay,
	// 		// left: '-100vw',
	// 		opacity: 0,
	// 		zIndex: $(slide).css('zIindex') - 1
	// 	})
	// 	.eventCallback('onComplete', function () {
	// 		//move all content up one z index
	// 		bgSlides.each(function (index, slide) {
	// 			$(slide).css('zIndex', parseInt($(slide).css('zIndex')) + 1);
	// 		});

	// 		$(slide).css({
	// 			left: 0,
	// 			opacity: 1,
	// 			zIndex: $(slide).css('zIndex') - bgSlides.length
	// 		});
	// 	}, [slideImg]);
	// 	}
	// };
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

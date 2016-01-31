/*global TweenMax ScrollMagic*/
var nextSlide, slides;
(function () {
	'use strict';

	console.info('Content online!');
	$('#intro').load('partials/intro.html');

	var content = [];
	var numBgs = [1,2,2,2,2,2,2];

	var slides = $('.slide');

	slides.each(function (index, slide) {
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
		var slide = $(slides.get(currentSlide));
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
}());

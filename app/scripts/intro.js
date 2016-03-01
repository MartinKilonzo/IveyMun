/*global TweenMax TimelineMax Linear Back*/
(function () {
	'use strict';

	console.info('Intro Loaded');

	var nav = $('.nav');
	var introTimeline = new TimelineMax();
	TweenMax.to('#Dark_Logo_bg', 1, {
			delay: 5,
			height: '75vh',
			ease: Linear.easeIn
	});
	setTimeout(function () {
		if (!window.glob.navIsOpen && window.glob.currentSlide === -1) {
			introTimeline.add(
				TweenMax.to(nav, 0.5, {
					width: '15%',
					maxWidth: '300px',
					paddingLeft: '0',
					force3D: true,
					ease: Back.easeOut.config(0.5)
				}).eventCallback('onComplete', function() {
				}));
		}
	}, 10000);
}());

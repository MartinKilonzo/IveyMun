/*global TweenMax TimelineMax ScrollMagic*/
(function () {
	'use strict';	

	console.info('Intro Loaded');

	var animateScene1 = new TimelineMax();
	animateScene1
	.insert(TweenMax.to([Dark_Logo_bg], 0.75, {
		delay: 6,
		height: '-=66%',
		ease: Linear.easeIn
	}))
;
	animateScene1.play();
}());

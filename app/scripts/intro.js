/*global TweenMax TimelineMax Power2*/
(function () {
	'use strict';

	console.info('Intro Loaded');
	$('#content').load('partials/content.html');

	//TODO: LoCK SCROL POSITION FOR ANIMATION DURATION
	// lock scroll position, but retain settings for later
	var scrollPosition = [
	self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
	self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	];

	var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
	html.data('scroll-position', scrollPosition);
	html.data('previous-overflow', html.css('overflow'));
	html.css('overflow', 'hidden');
	window.scrollTo(scrollPosition[0], scrollPosition[1]);

	/*
	 * Keep the header centered on the intro background by keeping its height
	 * the same as the background's
	 */
	var resizeHeader = function () {
		$('#header').css('height', $('#Dark_Logo_bg').height());
	};

	var resumeScroll = function () {
		// un-lock scroll position
		scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1]);

		resizeHeader();
	};

	$(window).on('resize', resizeHeader);

	var animateScene1 = new TimelineMax();
	animateScene1
	.insert(TweenMax.to('#Dark_Logo_bg', 2, {
		delay: 6,
		height: '-=66%',
		ease: Power2.easeOut,
		force3D: true,
		onComplete: resumeScroll
	}))
	.insert(TweenMax.to('#header', 2, {
		delay: 9,
		opacity: 1,
		ease: Power2.easeOut
	}));
	animateScene1.progress(0);
}());

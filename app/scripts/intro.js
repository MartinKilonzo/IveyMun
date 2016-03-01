/*global TweenMax TimelineMax Linear Back*/
(function () {
	'use strict';

	console.info('Intro Loaded');

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
	var nav = $('.nav');
	var introTimeline = new TimelineMax();
	TweenMax.to('#Dark_Logo_bg', 2, {
			delay: 5,
			height: '75vh',
			ease: Linear.easeIn
	});
	setTimeout(function () {
		if (!window.glob.navIsOpen) {
			introTimeline.add(
				TweenMax.to(nav, 0.5, {
					width: '15%',
					maxWidth: '300px',
					paddingLeft: '0',
					force3D: true,
					ease: Back.easeOut.config(0.5)
				}).eventCallback('onComplete', function() {
					resumeScroll();
				}));
		}
	}, 10000);
}());

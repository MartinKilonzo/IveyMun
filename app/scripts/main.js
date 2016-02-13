/*global TweenMax TimelineMax ScrollMagic*/
(function () {
'use strict';

// Building the pages components
$(function() {
	$('#content').load('partials/content.html');
	$('#navbar').load('partials/navbar.html');
	$('#footer').load('partials/footer.html');
	// $('html').niceScroll();


	console.info('Pages Loaded');

	console.info('TweenMax (GSAP) Version:', TweenMax.version);
	console.info('TimelineMax (GSAP) Version:', TimelineMax.version);
	console.info('ScrollMagic Version:', ScrollMagic.version);
	console.info('ScrollMagic (GSAP) Version:', ScrollMagic.version);
});
}());

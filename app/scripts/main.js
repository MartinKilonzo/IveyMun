/*global TweenMax TimelineMax ScrollMagic*/
(function () {
'use strict';

// Building the pages components
$(function() {
	$('#content').load('partials/content.html');
	$('#footer').load('partials/footer.html');
	// $('html').niceScroll();
	document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

	console.info('Pages Loaded');

	console.info('TweenMax (GSAP) Version:', TweenMax.version);
	console.info('TimelineMax (GSAP) Version:', TimelineMax.version);
	console.info('ScrollMagic Version:', ScrollMagic.version);
	console.info('ScrollMagic (GSAP) Version:', ScrollMagic.version);
	//Create window-wide "global" variable
	window.glob = {};
});
}());

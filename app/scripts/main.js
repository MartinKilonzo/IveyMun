/*global TweenMax TimelineMax ScrollMagic*/
(function () {
'use strict';
console.log('\'Allo \'Allo!');

// Building the pages components
$(function() {
	$('#intro').load('partials/intro.html');
	$('#header').load('partials/header.html');
	$('#content').load('partials/test.html');
	$('#footer').load('partials/footer.html');
	$('html').niceScroll();

	console.info('Scrolling online!');
	console.info('----- PLUGIN INFO -----');
	console.info('TweenMax (GSAP) Version:', TweenMax.version);
	console.info('TimelineMax (GSAP) Version:', TimelineMax.version);
	console.info('ScrollMagic Version:', ScrollMagic.version);
	console.info('ScrollMagic (GSAP) Version:', ScrollMagic.version);
	console.info('----- PLUGIN INFO -----\n');
});
}());

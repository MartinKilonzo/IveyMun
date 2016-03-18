/*global TweenMax TimelineMax ScrollMagic*/
(function () {
'use strict';
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Building the page components
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
	// If the brower is Safari, warn the user that it is not supported
	if (isSafari) {
		$('html').prepend('<div class="browserWarning"><h1>This Page Is Best Viewed in:<br>Chrome</h1></div>');

		$('.browserWarning h1').hover(function() {
			/* Stuff to do when the mouse enters the element */
			TweenMax.to(this, 0.25, {
				color: '#02c39a'
			});
		}, function() {
			/* Stuff to do when the mouse leaves the element */
			TweenMax.to(this, 0.25, {
				color: 'white'
			});
		});

		$('.browserWarning').click(function(event) {
			event.preventDefault();
			/* Act on the event */
			this.remove();
		});
	}
});
}());


/*global TweenMax*/
(function () {
'use strict';

	console.info('Parallax Online');
	/**
	 *	JQuery hover function for the download button in the descriptions. Toggles the background colour on mouseover/mouseexit.
	 */
	$('.section .DLWrapper .primerDL').hover(function() {
		/* Stuff to do when the mouse enters the element */
		TweenMax.to(this, 0.25, {
			color: 'white',
			backgroundColor: 'black'
		});
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		TweenMax.to(this, 0.25, {
			color: 'black',
			backgroundColor: 'transparent'
		});
	});

}());

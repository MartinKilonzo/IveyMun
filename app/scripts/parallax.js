/*global TweenMax*/
(function () {
'use strict';

	console.log('Parallax Online');

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

'use strict';
console.log('\'Allo \'Allo!');

// Building the pages components
$(function() {
	$('#header').load('partials/header.html');
	$('#content').load('partials/content.html');
	$('#footer').load('partials/footer.html');
});

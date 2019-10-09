new WOW().init();

$(document).ready(() => {
	const images = [$("#iss"), $("#cit")]
	const sections = [$("#first-card"), $("#classes")]
	let previous_image = images[0]
	
	$( "#cards" ).scroll(function() {
		console.log("called");
		moveMapDependingOnScroll();
	});
	
	function moveMapDependingOnScroll() {
		for (let i = 0; i < sections.length; i++) {
			if (isScrolledIntoTopHalf(sections[i])) {
				previous_image.hide();
				previous_image = images[i]
				previous_image.show();
				return;
			}
		}
	}
	
	function isScrolledIntoTopHalf(elem) {
		var docViewTop = $(window).scrollTop();
		var midScreen = docViewTop + ($(window).height()*0.5);
		//this .5 allows us to be in the top half of the page
	
		var elemTop = $(elem).offset().top;
	
		return (elemTop >= docViewTop) && (elemTop < midScreen);
	}
});
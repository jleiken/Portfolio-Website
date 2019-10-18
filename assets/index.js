new WOW().init();

$(document).ready(() => {
	const images = [$("#iss"), $("#cit"), $("#microsoft"), $("#granoff"), $("#emp")]
	const sections = [$("#first-card"), $("#classes"), $("#work"), $("#portfolio"), $("#contact")]
	const portfolioModals = {
		"taskr": $("#taskr-modal"),
		"equisat": $("#equisat-modal"),
		"wikispeedia": $("#wikispeedia-modal"),
		"nws": $("#nws-modal"),
		"tsp": $("#tsp-modal"),
		"rockets": $("#rockets-modal")
	};
	let previous_item = images[0];
	let previous_portfolio_item = null;
	
	$("#cards").scroll(function() {
		moveMapDependingOnScroll();
	});

	$(".portfolio-item").click(function() {
		previous_portfolio_item = portfolioModals[this.id];
		changeScrollItem(previous_portfolio_item);
	});

	function changeScrollItem(item) {
		previous_item.hide();
		previous_item = item;
		previous_item.show();
	}
	
	function moveMapDependingOnScroll() {
		for (let i = 0; i < sections.length; i++) {
			if (isScrolledIntoTopHalf(sections[i])) {
				if (sections[i].attr("id") == "portfolio" && previous_portfolio_item) {
					changeScrollItem(previous_portfolio_item);
				} else {
					changeScrollItem(images[i]);
				}
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

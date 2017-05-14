/* jshint esversion: 6 */

$(document).ready(function(){
	"use strict";
	setInterval(() => {
		let newq = makeNewPosition();
		$('#my-name').animate({ top: newq[0], left: newq[1] });
	}, 900);
    //animateDiv();
});

function makeNewPosition(){
	"use strict";
    // Get viewport dimensions (remove the dimension of the div)
    let h = $(window).height() - $("#my-name").height();
    let w = $(window).width() - $("#my-name").width();
    
    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

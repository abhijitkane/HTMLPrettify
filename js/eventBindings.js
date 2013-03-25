$("#pullHandle").click(function() {
	//toggle the i
	$(this).children("i").toggleClass("icon-chevron-down").toggleClass("icon-chevron-up");
	//$("#topNavBar").toggleClass("min").toggleClass("max");
	if(currMin==1) {
		$('#topNavBar').animate({
			'min-height': '80px',
			'max-height': '80px'
		}, 500, function() {
    		$("#topNavBar").children(".optContent").toggle();
		}
	);
		currMin=0;
	}
	else {
		$("#topNavBar").children(".optContent").toggle();
		$('#topNavBar').animate({
			'min-height': '1px',
			'max-height': '1px'
		}, 500, function() {
    		
		}
	);
		currMin=1; 
	}
	
});
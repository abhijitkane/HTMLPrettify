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



$("#phtml").click(function() {
		$("#thtml").val(prettifyHTML($("#thtml").val()));
});


$(function() {
	//CHECK IF FIRST INSTALL EXISTS
	if(getItem("firstInstall")==null) {
		console.log("this is the first install. Setting single array...");
		singleTagsName=["<area", "<base", "<br", "<col", "<command", "<embed", "<hr", "<img", "<input",
 		"keygen", "<link", "<meta", "<param", "<source", "<track", "<wbr","<!--"];

 		setItem("singleTags",singleTagsName);
 		setItem("firstInstall","done");
	}
	else {
		singleTagsName = getItem("singleTags").split(",");		
	}

	addTagList();
});
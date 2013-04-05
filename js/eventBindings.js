$("#pullHandle").click(function() {
	//toggle the i
	
	//$("#topNavBar").toggleClass("min").toggleClass("max");
	//$('#topNavBar').toggleClass("min");
	//$("#topNavBar").children(".optContent").toggle();
	//return;
	if(currMin==1) {
		$('#topNavBar').animate({
			'min-height': '50px',
			'max-height': '50px'
		}, 500, function() {
    		$("#topNavBar").children(".optContent").toggle();
    		$("#pullHandle").children("i").toggleClass("icon-chevron-down").toggleClass("icon-chevron-up");
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
    		$("#pullHandle").children("i").toggleClass("icon-chevron-down").toggleClass("icon-chevron-up");
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
 		"<keygen", "<link", "<meta", "<param", "<source", "<track", "<wbr","<!--"];

 		setItem("singleTags",singleTagsName);
 		setItem("firstInstall","done");
	}
	else {
		singleTagsName = getItem("singleTags").split(",");		
	}

	addTagList();
});
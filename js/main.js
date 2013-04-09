var re=/\n[\s]*\n/g;
var res=/[\s]+/g;
var currMin=1;
var singleTagsName;





function prettifyHTML(old1) {
	old1 = old1.replace(res, ' ');
	var inTag=0;
	old1=old1.split("\n");
	var old=[];
	var l1=old1.length;
	for(var i=0;i<l1;i++) if(old1[i]!="") old.push(old1[i]);
	var indent=0;
	var lines=old.length;
	var line;
	var op,j;
	var tot;
	var beg=0;
	op="";
	var tagname="";
	var inTagName;
	//var singleTags=["<br","<input","<hr","<!--","<link","<meta"];
	var insq=0,indq=0;
	for(var i=0;i<lines;i++) {
		line=old[i];
		//iterate thru line
		tot='-';
		for(j=0;j<line.length;j++) {


			if(line[j]=="'" && indq==0 && inTag==1) insq=1-insq;
			else if(line[j]=='"' && insq==0 && inTag==1) indq=1-indq;

			if(inTagName==1 && (line[j]==" " || line[j]=="/" || line[j]==">" || tagname=="<!--")) {
				inTagName=0;
				if(tagname!="")	console.log("Reached tag: "+tagname)
			}		


			if(line[j]=='<') {				
				inTag=1;
				inTagName=1;				

				tot='-';
				if(j<line.length-1 && line[j+1]=='/') indent--;
				if(beg==1) op+="\n"+getTabs(indent);
				beg=1;

				tagname="";
				op+=line[j];		

			}
			else if(line[j]=='>' && inTag==1) {
				inTag=0;				
				if(tot=='-') tot='o';
				if(j>0 && line[j-1]!='/') {
					console.log("Checking tagname: "+tagname);
					if(singleTagsName.indexOf(tagname)==-1)
						indent++;
				}
				if(tot=='c' && singleTagsName.indexOf(tagname)==-1) indent--;
				op+=line[j];
				op+="\n"+getTabs(indent);
			}
			else op+=line[j];	

			if(inTagName==1) tagname+=line[j];		


			if(inTag==1 && line[j]=='/' && (insq==0 && indq==0)) tot='c';
		}
		//op+=getTabs(indent)+"\n";
	}		
	op=op.replace(re, '\n');
	return op;
}

function addTagList() {
	var ts=[];
	var tss=[];
	var str="";
	var temp;
	var id1=0;
	$.each(singleTagsName,function(i,v) {
		temp=v.substring(1);
		if(temp!="!--") {
			ts.push({id:id1++, text:v.substring(1)});
			tss.push(v.substring(1));
			str+=v.substring(1)+",";
		}
	});
	str=str.substring(0,str.length-1);	
	
	
	$("input#singleTags").select2({tags:tss,tokenSeparators: [",", " "]});
	$("input#singleTags").select2("val",tss);
	
	//$("input#singleTags").select2("val", ts);
	$("input#singleTags").on('change', function(e) {
    	updateTags(e.val,e.removed);
    });

}

function updateTags(newarr, remE) {

	var una = [];
	var tr="";
	var ts="";
	if((typeof remE)!="undefined") tr=remE.text;
	$.each(newarr, function(i, el){
	    if($.inArray(el, una) === -1 && el!=tr) {
	    	una.push(el);
	    	ts+=","+el;
	    }
	});

	ts=ts.substring(1);
	//$("input#singleTags").select2("val",ts);


	var na="<!--,";
	$.each(una,function(i,v) {
		na+="<"+v+",";
	});

	na=na.substring(0,na.length-1);
	singleTagsName=na.split(",");
	setItem("singleTags",na);
}



var re=/\n[\s]*\n/g;
var res=/[\s]+/g;
var currMin=1;

function getTabs(num) {
	var str="";
	for(var i=0;i<num;i++) str+="\t";
	return str;
}

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
	var singleTags=["<br","<input","<hr","<!--","<link","<meta"];
	var insq=0,indq=0;
	for(var i=0;i<lines;i++) {
		line=old[i];
		//iterate thru line
		tot='-';
		for(j=0;j<line.length;j++) {
			if(line[j]=="'") insq=1-insq;
			else if(line[j]=='"') indq=1-indq;

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
					if(singleTags.indexOf(tagname)==-1)
						indent++;
				}
				if(tot=='c' && singleTags.indexOf(tagname)==-1) indent--;
				op+=line[j];
				op+="\n"+getTabs(indent);
			}
			else op+=line[j];	

			if(inTagName==1) tagname+=line[j];		


			if(inTag==1 && line[j]=='/' && insq==0 && indq==0) tot='c';
		}
		//op+=getTabs(indent)+"\n";
	}		
	op=op.replace(re, '\n');
	return op;
}

$("#phtml").click(function() {
		$("#thtml").val(prettifyHTML($("#thtml").val()));
});



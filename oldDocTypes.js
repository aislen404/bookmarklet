function versionInfo()
{
	this.xhtml="";
	this.version="";
	this.importance="";
}
function detectDoctype(){
	var re=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;
	var myversionInfo=new versionInfo();
	/*********************************************
	Just check for internet explorer.
	**********************************************/
	if(typeof document.namespaces != "undefined"){
		if(document.all[0].nodeType==8)
			re.exec(document.all[0].nodeValue);
		else
			return null;
	}else{
		if(document.doctype != null)
			re.exec(document.doctype.publicId);
		else
			return null;
	}
	
	myversionInfo.xhtml=RegExp.$1;
	myversionInfo.version=RegExp.$2;
	myversionInfo.importance=RegExp.$3;
	return myversionInfo;
}

var myversionInfo=detectDoctype();
	if(myversionInfo != null){
		alert(myversionInfo.xhtml+' '+myversionInfo.version+' '+myversionInfo.importance);
	}else{
		alert("There is no DOCTYPE in the code!");
}

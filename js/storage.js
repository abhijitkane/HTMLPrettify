//LOCAL STORAGE
function setItem(key, value) {
    try {
      log("Storing [" + key + ":" + value + "]");
      window.localStorage.removeItem(key);      // <-- Local storage!
      window.localStorage.setItem(key, value);  // <-- Local storage!
    } catch(e) {
      log("Error inside setItem");
      log(e);
    }
    log("Return from setItem" + key + ":" +  value);
}

  // Gets item from local storage with specified key.
function getItem(key) {
    var value;
    log('Retrieving key [' + key + ']');
    try {
      value = window.localStorage.getItem(key);  // <-- Local storage!
    }catch(e) {
      log("Error inside getItem() for key:" + key);
      log(e);
      value = "null";
    }
    log("Returning value: " + value);
    return value;
}

  // Clears all key/value pairs in local storage.
function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear(); // <-- Local storage!
    log('cleared');
}

function log(txt) {
   
      console.log(txt);
    
}
//--LOCAL STORGAE


function getTabs(num) {
	var str="";
	for(var i=0;i<num;i++) str+="    ";
	return str;
}
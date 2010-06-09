/*
* This function will not return until (at least)
* the specified number of milliseconds have passed.
* It uses a modal dialog.
*/ 
 function pause(numberMillis) { 
    var dialogScript =  
       'window.setTimeout(' + 
       ' function () { window.close(); }, ' + numberMillis + ');'; 
    var result =  
// For IE5. 
     window.showModalDialog( 
       'javascript:document.writeln(' + 
        '"<script>' + dialogScript + '<' + '/script>")',"","dialogTop:2400px; dialogLeft:3600px;dialogWidth:1px; dialogHeight:1px; dialogHide:yes"); 
 
/* For NN6, but it requires a trusted script.
     openDialog(
       'javascript:document.writeln(' +
        '"<script>' + dialogScript + '<' + '/script>"',
       'pauseDialog', 'modal=1,width=10,height=10');
*/ 

 } 
 
 function print_with_pause(field, message, reset ) { 
	if (reset) {
		document.getElementById(field).value = "";	
	}
	document.getElementById(field).value += message;
	pause(1);
}
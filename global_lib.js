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
	
	document.getElementById(field).focus();
	document.getElementById(field).scrollTop = document.getElementById(field).scrollHeight;
	pause(1);
}


//////////////////////
//
//	MultiDimArray is a 3 dimentional data strcture which has a [iRows][iCol][3] structure. it is used to store the data about the fractals
//	returns an allocated array
//
function MultDimArray(iRows,iCols) { 
	var a = new Array(iRows); 
	for (var i=0; i < iRows; i++) { 
	       	a[i] = new Array(iCols); 
		for (var j=0; j < iCols; j++) { 
			a[i][j] = new Array(4); 
			a[i][j][0] = "";
			a[i][j][1] = "";
			a[i][j][2] = "";
			a[i][j][3] = "";
		} 
	} 
	return(a); 
} 
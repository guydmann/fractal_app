/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 * 
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;
	
	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
	
	// We accept saturation and value arguments from 0 to 100 because that's
	// how Photoshop represents those values. Internally, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;
	
	if(s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	
	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));

	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
			
		case 1:
			r = q;
			g = v;
			b = p;
			break;
			
		case 2:
			r = p;
			g = v;
			b = t;
			break;
			
		case 3:
			r = p;
			g = q;
			b = v;
			break;
			
		case 4:
			r = t;
			g = p;
			b = v;
			break;
			
		default: // case 5:
			r = v;
			g = p;
			b = q;
	}
	
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/////////////////////////////////
//
// createColorFunction
//
function createColorFunction( color_scheme) {
	var color_txt = "";
	
	if (color_scheme == 0) {
	//simple
		var color_func_txt = "";
		color_txt = "precision*.03 RGBA:255,0,0,255\n";
		color_txt += "precision*.05 RGBA:255,255,0,255\n";
		color_txt += "precision*.1 RGBA:0,255,0,255\n";
		color_txt += "precision*.2 RGBA:0,255,255,255\n";
		color_txt += "precision RGBA:0,0,255,255\n";
		color_txt += "else RGBA:0,0,0,255";
		var line_array = color_txt.split("\n");
		for ( var k = 0; k < line_array.length ; k++) {
			var data_array = line_array[k].split(" ",2);
			var color_array = data_array[1].split(":",2);
			if (data_array[0]== "else") {
				color_func_txt += "} else {\n";
				if (color_array[0]=="RGBA") {
					var RGBA_array = color_array[1].split(",",4);
					color_func_txt += "pix[(pix_count*4)]=" + RGBA_array[0] + ";\n";
					color_func_txt += "pix[(pix_count*4)+1]=" + RGBA_array[1] + ";\n";
					color_func_txt += "pix[(pix_count*4)+2]=" + RGBA_array[2] + ";\n";
					color_func_txt += "pix[(pix_count*4)+3]=" + RGBA_array[3] + ";\n";
				} else if (color_array[0]=="RGB") {
					var RGB_array = color_array[1].split(",",3);
						color_func_txt += "pix[(pix_count*4)]=" + RGB_array[0] + ";\n";
						color_func_txt += "pix[(pix_count*4)+1]=" + RGB_array[1] + ";\n";
						color_func_txt += "pix[(pix_count*4)+2]=" + RGB_array[2] + ";\n";
						color_func_txt += "pix[(pix_count*4)+3]=255;\n";
				}
				color_func_txt += "}\n";
			} else {
				if (k==0) {
					color_func_txt += "if (fract_array[0] < " + data_array[0] + ") {\n"
				} else {
					color_func_txt += "} else if (fract_array[0] < " + data_array[0] + ") {\n"
				}
				if (color_array[0]=="RGBA") {
					var RGBA_array = color_array[1].split(",",4);
					color_func_txt += "pix[(pix_count*4)]=" + RGBA_array[0] + ";\n";
					color_func_txt += "pix[(pix_count*4)+1]=" + RGBA_array[1] + ";\n";
					color_func_txt += "pix[(pix_count*4)+2]=" + RGBA_array[2] + ";\n";
					color_func_txt += "pix[(pix_count*4)+3]=" + RGBA_array[3] + ";\n";			
				} else if (color_array[0]=="RGB") {
					var RGB_array = color_array[1].split(",",3);
					color_func_txt += "pix[(pix_count*4)]=" + RGB_array[0] + ";\n";
					color_func_txt += "pix[(pix_count*4)+1]=" + RGB_array[1] + ";\n";
					color_func_txt += "pix[(pix_count*4)+2]=" + RGB_array[2] + ";\n";
					color_func_txt += "pix[(pix_count*4)+3]=255;\n";
				}
			}
		}
		color_func_txt += "return pix;";
		//print_with_pause("sys_out", color_func_txt +"\n" , false) ;
	} else if (color_scheme == 1 || color_scheme == 2 || color_scheme == 3 || color_scheme == 4) {
		if (color_scheme == 1) {
			//
			color_txt = "color_count=5\n";
			color_txt += "precision RGB:27,52,94\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 2) {
			//
			color_txt = "color_count=5\n";
			color_txt += "precision RGB:187,90,69\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 3) {
			//
			color_txt = "color_count=12\n";
			color_txt += "precision RGB:27,52,94\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 4) {
			//
			color_txt = "color_count=36\n";
			color_txt += "precision RGB:27,52,94\n";
			color_txt += "else RGB:0,0,0";
		}
		var color_func_txt = "";	
		var line_array = color_txt.split("\n",3);
		var color_count_array = line_array [0].split("=");
		var color_count = color_count_array[1];
	
		//line 1
		color_func_txt += "var color_count = " + color_count + "\n";
		color_func_txt += "var Kval = fract_array[0];\n";
		color_func_txt += "var modcolor =  (Kval % color_count)+1;\n";

		//line 2
		for ( var k = 1; k < line_array.length ; k++) {
			var data_array = line_array[k].split(" ",2);
			var color_array = data_array[1].split(":",2);
			if (data_array[0]== "else") {
				color_func_txt += "} else {\n";
				if (color_array[0]=="RGBA") {
					var RGBA_array = color_array[1].split(",",4);
					color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGBA_array[0] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGBA_array[1] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGBA_array[2] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+3]=(modcolor*" + RGBA_array[3] + ")%255;\n";
				} else if (color_array[0]=="RGB") {
					var RGB_array = color_array[1].split(",",3);
					color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGB_array[0] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGB_array[1] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGB_array[2] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+3]=255;\n";
				}
				color_func_txt += "}\n";
			} else {
				if (k==1) {
					color_func_txt += "if (Kval < " + data_array[0] + ") {\n"
				} else {
					color_func_txt += "} else if (Kval < " + data_array[0] + ") {\n"
				}
				if (color_array[0]=="RGBA") {
					var RGBA_array = color_array[1].split(",",4);
					color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGBA_array[0] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGBA_array[1] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGBA_array[2] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+3]=(modcolor*" + RGBA_array[3] + ")%255;\n";			
				} else if (color_array[0]=="RGB") {
					var RGB_array = color_array[1].split(",",3);
					color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGB_array[0] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGB_array[1] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGB_array[2] + ")%255;\n";
					color_func_txt += "pix[(pix_count*4)+3]=255;\n";
				}
			}
		}
		
		color_func_txt += "return pix;";
		//print_with_pause("sys_out", color_func_txt +"\n" , false) ;
	} else if (color_scheme == 5 || color_scheme == 6 || color_scheme == 7 || color_scheme == 8 || color_scheme == 9) {
		if (color_scheme == 5 ) {
			var color_func_txt = ""+
				"if (fract_array[0] < precision) {"+
					"var c1 = 0;"+
					"var c2 = 360;"+
					"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else {"+
					"pix[(pix_count*4)]=0;"+	//red
					"pix[(pix_count*4)+1]=0;"+	//green
					"pix[(pix_count*4)+2]=0;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"}"+
				"return pix;";
				
			color_txt = "precision H_range:0,360\n";
			color_txt += "else RGB:0,0,0";
			
			
		} else if (color_scheme == 6) {
			var color_func_txt = ""+
				"if (fract_array[0] < precision) {"+
					"var c1 = 360;"+
					"var c2 = 0;"+
					"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else {"+
					"pix[(pix_count*4)]=0;"+	//red
					"pix[(pix_count*4)+1]=0;"+	//green
					"pix[(pix_count*4)+2]=0;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"}"+	
				"return pix;";
				
			color_txt = "precision H_range:360,0\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 7) {
			var color_func_txt = ""+
				"if (fract_array[0] < precision/80) {"+
					"var c1 = 0;"+
					"var c2 = 120;"+
					"var h = Math.round((fract_array[0] /(precision/80))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision/20) {"+
					"var c1 = 120;"+
					"var c2 = 280;"+
					"var h = Math.round((fract_array[0] /(precision/20))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision/10) {"+
					"var c1 = 280;"+
					"var c2 = 20;"+
					"var h = Math.round((fract_array[0] /(precision/10))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision/5) {"+
					"var c1 = 20;"+
					"var c2 = 180;"+
					"var h = Math.round((fract_array[0] /(precision/5))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision) {"+
					"var c1 = 180;"+
					"var c2 = 360;"+
					"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else {"+
					"pix[(pix_count*4)]=0;"+	//red
					"pix[(pix_count*4)+1]=0;"+	//green
					"pix[(pix_count*4)+2]=0;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"}"+
				"return pix;";
			color_txt = "precision/80 H_range:0,120\n";
			color_txt = "precision/20 H_range:120,280\n";
			color_txt = "precision/10 H_range:280,20\n";
			color_txt = "precision/5 H_range:20,180\n";
			color_txt = "precision H_range:180,360\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 8) {
			var color_func_txt = ""+
				"if (fract_array[0] < precision*.1) {"+
					"var c1 = 0;"+
					"var c2 = 120;"+
					"var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
					
				"} else if (fract_array[0] < precision*.3) {"+
					"var c1 = 120;"+
					"var c2 = 280;"+
					"var h = Math.round((fract_array[0] /(precision*.3))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
					
				"} else if (fract_array[0] < precision*.5) {"+
					"var c1 = 280;"+
					"var c2 = 20;"+
					"var h = Math.round((fract_array[0] /(precision*.5))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision*.7) {"+
					"var c1 = 20;"+
					"var c2 = 180;"+
					"var h = Math.round((fract_array[0] /(precision*.7))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision) {"+
					"var c1 = 180;"+
					"var c2 = 360;"+
					"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else {"+
					"pix[(pix_count*4)]=0;"+	//red
					"pix[(pix_count*4)+1]=0;"+	//green
					"pix[(pix_count*4)+2]=0;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"}"+
				"return pix;";
			color_txt = "precision*.1 H_range:0,120\n";
			color_txt = "precision*.3 H_range:120,280\n";
			color_txt = "precision*.5 H_range:280,20\n";
			color_txt = "precision*.7 H_range:20,180\n";
			color_txt = "precision H_range:180,360\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 9) {
			var color_func_txt = ""+
				"if (fract_array[0] < precision*.03) {"+
					"var c1 = 0;"+
					"var c2 = 120;"+
					"var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision*.05) {"+
					"var c1 = 120;"+
					"var c2 = 280;"+
					"var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision*.1) {"+
					"var c1 = 280;"+
					"var c2 = 20;"+
					"var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision*.7) {"+
					"var c1 = 20;"+
					"var c2 = 180;"+
					"var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else if (fract_array[0] < precision) {"+
					"var c1 = 180;"+
					"var c2 = 360;"+
					"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
					"var RGB = hsvToRgb(h, 100, 100);"+
					"pix[(pix_count*4)]=RGB[0];"+	//red
					"pix[(pix_count*4)+1]=RGB[1];"+	//green
					"pix[(pix_count*4)+2]=RGB[2];"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"} else {"+
					"pix[(pix_count*4)]=0;"+	//red
					"pix[(pix_count*4)+1]=0;"+	//green
					"pix[(pix_count*4)+2]=0;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
				"}"+
				"return pix;";
			color_txt = "precision*.03 H_range:0,120\n";
			color_txt = "precision*.05 H_range:120,280\n";
			color_txt = "precision*.1 H_range:280,20\n";
			color_txt = "precision*.7 H_range:20,180\n";
			color_txt = "precision H_range:180,360\n";
			color_txt += "else RGB:0,0,0";
		}
	} else if (color_scheme == 10) {
		var color_func_txt = ""+
			"if (fract_array[0] < precision*.03) {"+
				"var c1 = 0;"+
				"var c2 = 120;"+
				"var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((fract_array[1]*100 )%100));"+
				"var v = Math.abs(Math.round((fract_array[2]*100 )%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.05) {"+
				"var c1 = 120;"+
				"var c2 = 280;"+
				"var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((fract_array[1]*100 )%100));"+
				"var v = Math.abs(Math.round((fract_array[2]*100 )%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.1) {"+
				"var c1 = 280;"+
				"var c2 = 20;"+
				"var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((fract_array[1]*100 )%100));"+
				"var v = Math.abs(Math.round((fract_array[2]*100 )%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.7) {"+
				"var c1 = 20;"+
				"var c2 = 180;"+
				"var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((fract_array[1]*100 )%100));"+
				"var v = Math.abs(Math.round((fract_array[2]*100 )%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision) {"+
				"var c1 = 180;"+
				"var c2 = 360;"+
				"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((fract_array[1]*100 )%100));"+
				"var v = Math.abs(Math.round((fract_array[2]*100 )%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 11) {
		var color_func_txt = ""+
			"if (fract_array[0] < precision*.03) {"+
				"var c1 = 0;"+
				"var c2 = 120;"+
				"var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;"+
				"var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.05) {"+
				"var c1 = 120;"+
				"var c2 = 280;"+
				"var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;"+
				"var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.1) {"+
				"var c1 = 280;"+
				"var c2 = 20;"+
				"var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;"+
				"var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.7) {"+
				"var c1 = 20;"+
				"var c2 = 180;"+
				"var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;"+
				"var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision) {"+
				"var c1 = 180;"+
				"var c2 = 360;"+
				"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
				"var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 12) {
		var color_func_txt = ""+
			"if (fract_array[0] < precision*.03) {"+
				"var c1 = 0;"+
				"var c2 = 120;"+
				"var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.05) {"+
				"var c1 = 120;"+
				"var c2 = 280;"+
				"var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.1) {"+
				"var c1 = 280;"+
				"var c2 = 20;"+
				"var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision*.7) {"+
				"var c1 = 20;"+
				"var c2 = 180;"+
				"var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else if (fract_array[0] < precision) {"+
				"var c1 = 180;"+
				"var c2 = 360;"+
				"var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;"+
				"var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));"+
				"var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));"+
				"var RGB = hsvToRgb(h, s, v);"+
				"pix[(pix_count*4)]=RGB[0];"+	//red
				"pix[(pix_count*4)+1]=RGB[1];"+	//green
				"pix[(pix_count*4)+2]=RGB[2];"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else {
		var color_func_txt = ""+
			"if (fract_array[0]>= precision) {"+
				"pix[(pix_count*4)]=0;"+ //red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=0;"+	//alpha 
			"} else {"+
				"pix[(pix_count*4)]=255;"+	//red
				"pix[(pix_count*4)+1]=255;"+	//green
				"pix[(pix_count*4)+2]=255;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	}
	var setColorFunction = new Function("pix", "pix_count", "fract_array, width", "height", "precision", "color_scheme", color_func_txt);
	return setColorFunction;
}

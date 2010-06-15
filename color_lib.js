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
function createColorFunction( color_txt) {
	var color_func_txt = "";	
	var line_array = color_txt.split(/\n/);
	for ( var k = 0; k < line_array.length ; k++) {
		var data_array = line_array[k].split(/\s+/,2);
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
			} else if (color_array[0]=="RGBA_cycle") {
				var RGBAcycle_array = color_array[1].split(",",5);
				color_func_txt += "var color_count = " + RGBcycle_array[0]  + "\n";
				color_func_txt += "var modcolor =  (fract_array[0]% " + RGBAcycle_array[0] + ")+1;\n";
				color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGBAcycle_array[1] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGBAcycle_array[2] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGBAcycle_array[3] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+3]=(modcolor*" + RGBAcycle_array[4] + ")%255;\n";			
			} else if (color_array[0]=="RGB_cycle") {
				var RGBcycle_array = color_array[1].split(",",4);
				color_func_txt += "var color_count = " + RGBcycle_array[0]  + "\n";
				color_func_txt += "var modcolor =  (fract_array[0]% " + RGBcycle_array[0] + ")+1;\n";
				color_func_txt += "pix[(pix_count*4)]=(modcolor*" + RGBcycle_array[1] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+1]=(modcolor*" + RGBcycle_array[2] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+2]=(modcolor*" + RGBcycle_array[3] + ")%255;\n";
				color_func_txt += "pix[(pix_count*4)+3]=255;\n";
			} else if (color_array[0]=="H_range") {
				var HRange_array = color_array[1].split(",",3);
				color_func_txt += "var c1 = " + HRange_array[0] + ";\n";
				color_func_txt += "var c2 = " + HRange_array[1] + ";\n";
				
				var hval_tmp1 = HRange_array[2].replace("ITER","fract_array[0]");
				var hval_tmp2 = hval_tmp1.replace("DX","fract_array[1]");
				var hval = hval_tmp2.replace("DY","fract_array[2]");
				
				//color_func_txt += "var h = Math.round((" + hval + " /(" + data_array[0] +"))*(c2-c1))+c1;\n";
				color_func_txt += "var h = Math.round((" + hval + "/precision)*(c2-c1))+c1;\n";
				color_func_txt += "var RGB = hsvToRgb(h, 100, 100);\n";
				color_func_txt += "pix[(pix_count*4)]=RGB[0];\n";	//red
				color_func_txt += "pix[(pix_count*4)+1]=RGB[1];\n";	//green
				color_func_txt += "pix[(pix_count*4)+2]=RGB[2];\n";	//blue
				color_func_txt += "pix[(pix_count*4)+3]=255;\n";	//alpha
			} else if (color_array[0]=="HSV_range") {
				var HSVRange_array = color_array[1].split(",",5);
				var h_tmp = HSVRange_array[2].replace("DX","fract_array[1]");
				var h_tmp1 = h_tmp.replace("ITER","fract_array[0]");
				var h = h_tmp1.replace("DY","fract_array[2]");
				var s_tmp = HSVRange_array[3].replace("DX","fract_array[1]");
				var s_tmp1 = s_tmp.replace("ITER","fract_array[0]");
				var s = s_tmp1.replace("DY","fract_array[2]");
				var v_tmp = HSVRange_array[4].replace("DX","fract_array[1]");
				var v_tmp1 = v_tmp.replace("ITER","fract_array[0]");
				var v = v_tmp1.replace("DY","fract_array[2]");
				
				color_func_txt += "var c1 = " + HSVRange_array[0] + ";\n";
				color_func_txt += "var c2 = " + HSVRange_array[1] + ";\n";
				//color_func_txt += "var h = Math.round((" + h + " /(" + data_array[0] +"))*(c2-c1))+c1;\n";
				color_func_txt += "var h = Math.round((" + h + " /precision)*(c2-c1))+c1;\n";
				color_func_txt += "var s = Math.abs(Math.round((" + s + ")%100));\n";
				color_func_txt += "var v = Math.abs(Math.round((" + v + ")%100));\n";
				color_func_txt += "var RGB = hsvToRgb(h, s, v);\n";
				color_func_txt += "pix[(pix_count*4)]=RGB[0];\n";	//red
				color_func_txt += "pix[(pix_count*4)+1]=RGB[1];\n";	//green
				color_func_txt += "pix[(pix_count*4)+2]=RGB[2];\n";	//blue
				color_func_txt += "pix[(pix_count*4)+3]=255;\n";	//alpha

			}
		}
	}
	
	color_func_txt += "return pix;";
	//print_with_pause("sys_out", color_func_txt +"\n" , false) ;
	var setColorFunction = new Function("pix", "pix_count", "fract_array, width", "height", "precision", color_func_txt);
	return setColorFunction;
}

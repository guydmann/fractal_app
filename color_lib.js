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
			var color_txt = "precision*.03\t255,0,0\n";
			color_txt += "precision*.05\t255,255,0\n";
			color_txt += "precision*.1\t0,255,0\n";
			color_txt += "precision*.2\t0,255,255\n";
			color_txt += "precision\t0,0,255\n";
			color_txt += "else\t0,0,0\n";
	
	var color_txt = "precision*.03\t255,0,0\n";
			color_txt += "precision*.05\t255,255,0\n";
			color_txt += "precision*.1\t0,255,0\n";
			color_txt += "precision*.2\t0,255,255\n";
			color_txt += "precision\t0,0,255\n";
			color_txt += "else\t0,0,0\n";
	if (color_scheme == 0) {
	//simple
		var color_func_txt = ""+
			"if (fract_array[0] < precision*.03) {"+
				"pix[(pix_count*4)]=255;"+
				"pix[(pix_count*4)+1]=0;"+ 
				"pix[(pix_count*4)+2]=0;"+ 
				"pix[(pix_count*4)+3]=255;"+
			"} else if (fract_array[0] < precision*.05) {"+
				"pix[(pix_count*4)]=255;"+
				"pix[(pix_count*4)+1]=255;"+
				"pix[(pix_count*4)+2]=0;"+
				"pix[(pix_count*4)+3]=255;"+
			"} else if (fract_array[0] < precision*.1) {"+
				"pix[(pix_count*4)]=0;"+
				"pix[(pix_count*4)+1]=255;"+
				"pix[(pix_count*4)+2]=0;"+
				"pix[(pix_count*4)+3]=255;"+
			"} else if (fract_array[0] < precision*.2) {"+
				"pix[(pix_count*4)]=0;"+
				"pix[(pix_count*4)+1]=255;"+
				"pix[(pix_count*4)+2]=255;"+
				"pix[(pix_count*4)+3]=255;"+
			"} else if (fract_array[0] < precision) {"+
				"pix[(pix_count*4)]=0;"+
				"pix[(pix_count*4)+1]=0;"+
				"pix[(pix_count*4)+2]=255;"+
				"pix[(pix_count*4)+3]=255;"+
			"} else {"+
				"pix[(pix_count*4)]=0;"+
				"pix[(pix_count*4)+1]=0;"+
				"pix[(pix_count*4)+2]=0;"+
				"pix[(pix_count*4)+3]=255;"+
			"}"+
			"return pix;";
	} else if (color_scheme == 1) {
		//
		var color_func_txt = ""+
			"var color_count = 5;"+
			"var Kval = fract_array[0];"+
			"var modcolor =  (Kval % color_count)+1;"+
			"if (Kval >= precision) {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
					"pix[(pix_count*4)]=(modcolor*27)%255;"+	//red
					"pix[(pix_count*4)+1]=(modcolor*52)%255;"+	//green
					"pix[(pix_count*4)+2]=(modcolor*94)%255;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 2) {
		//
		var color_func_txt = ""+
			"var color_count = 5;"+
			"var Kval = fract_array[0];"+
			"var modcolor =  (Kval % color_count)+1;"+
			"if (Kval >= precision) {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
					"pix[(pix_count*4)]=(modcolor*187)%255;"+	//red
					"pix[(pix_count*4)+1]=(modcolor*90)%255;"+	//green
					"pix[(pix_count*4)+2]=(modcolor*69)%255;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 3) {
		//
		var color_func_txt = ""+
			"var color_count = 12;"+
			"var Kval = fract_array[0];"+
			"var modcolor =  (Kval % color_count)+1;"+
			"if (Kval >= precision) {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
					"pix[(pix_count*4)]=(modcolor*27)%255;"+	//red
					"pix[(pix_count*4)+1]=(modcolor*52)%255;"+	//green
					"pix[(pix_count*4)+2]=(modcolor*94)%255;"+	//blue
					"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 4) {
		//
		var color_func_txt = ""+
			"var color_count = 36;"+
			"var Kval = fract_array[0];"+
			"var modcolor =  (Kval % color_count)+1;"+
			"if (Kval >= precision) {"+
				"pix[(pix_count*4)]=0;"+	//red
				"pix[(pix_count*4)+1]=0;"+	//green
				"pix[(pix_count*4)+2]=0;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"} else {"+
				"pix[(pix_count*4)]=(modcolor*27)%255;"+	//red
				"pix[(pix_count*4)+1]=(modcolor*52)%255;"+	//green
				"pix[(pix_count*4)+2]=(modcolor*94)%255;"+	//blue
				"pix[(pix_count*4)+3]=255;"+	//alpha
			"}"+
			"return pix;";
	} else if (color_scheme == 5) {
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
	} else if (color_scheme == 8) {
		var color_func_txt = ""+
			"'if (fract_array[0] < precision*.1) {"+
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

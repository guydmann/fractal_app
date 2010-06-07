var canvasLocation;
////////////////////////////////
//
// dwell_mandel
//
function dwell_mandel ( cx, cy, precision ) {
 
        var num = precision;
        var breakout = 4;
        var dx = cx;
        var dy = cy;
        var dx2 = dx * dx;
        var dy2 = dy * dy;
        //z <= z(n-1)^2 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dy = ( 2.0 * (dx * dy) ) + cy;
                dx = dx2 - dy2 + cx;
                dx2 = dx * dx;
                dy2 = dy * dy;
        }
	//alert(count + " " + dx + " " +dy);
        return [count,dx,dy];
 
}
 
/////////////////////////////////
//
// dwal_burningship
//
function dwell_burningship( cx, cy, precision ) {
        var num = precision;
        var breakout = 8;
        var dx = cx;
        var dy = cy;
        var dx2 = dx * dx;
        var dy2 = dy * dy;
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dy = ( 2.0 * Math.abs(dx * dy) ) + cy;
                dx = dx2 - dy2 + cx;
                dx2 = dx * dx;
                dy2 = dy * dy;
        }
        return [count,dx,dy];
}



/////////////////////////////////
//
// dwal_star
//
function dwell_star( cx, cy, precision ) {
        var num = precision;
        var px = .289;
        var py = .928;
        var breakout = 0.00001;

        var absv = 1.0;
        var x = cx;
        var y = cy;
        for ( var count = 0; count < num && absv > breakout ; count++) {
                var oldx = x;
                var oldy = y;
		var notx = 0.0;
		var noty = 0.0;

                if (oldx<1.0 && oldx>-1.0) {
                        notx =  1.0;
                }
                if (oldy<1.0 && oldy>-1.0) {
                        noty =  1.0;
                }

                x = (px*notx*oldx) - (px*noty*oldy)- (py*noty*oldx) - (py*notx*oldy);
                y = (px*noty*oldx) + (px*notx*oldy)+ (py*notx*oldx) - (py*noty*oldy);
                absv=(oldx-x)*(oldx-x)+(oldy-y)*(oldy-y);

        }
        if (absv>breakout) {
                i = precision;
        }
        return [count,x,y];
}



/////////////////////////////////
//
// dwal_newton
//
function dwell_newton( cx, cy, precision ) {
        var num = precision;
        var breakout = 0.00001;
        var absv2 = 1.0;
        var dx = cx;
        var dy = cy;
	var dx2, dy2, oldx, oldy, r4;
        for ( var count = 0; count < num && absv2 > breakout ; count++) {
                oldx = dx;
                oldy = dy;

                dx2 = oldx * oldx;
                dy2 = oldy * oldy;

                r4=(dx2+dy2) * (dx2+dy2);
                if (r4>0) {
                        dx=(2 * oldx * r4 + dx2 - dy2) / (3.0*r4);
                        dy= 2 * oldy * (r4-oldx) / (3.0*r4);
                } else {
                        return precision;
                }

                absv2 = (dx-oldx) * (dx-oldx) + (dy-oldy) * (dy-oldy);

        }
        if (absv2>breakout) {
                count = precision;
        }
        return [count,dx,dy];
}

/////////////////////////////////
//
// dwell_julia
//
function dwell_julia( cx, cy, precision, cr , ci) {
	var itermax= precision;
	var breakout=8;
	var x=cx;
	var y=cy;

	var x2 = x*x;
	var y2 = y*y;
	for (var iter=0;iter<itermax && x2+y2<breakout;iter++) {

		y=(2*x*y) + ci;
		x=x2-y2+cr;
		x2 = x*x;
		y2 = y*y;
	}
	return [iter,x,y];
}


//////////////////////////////////
//
// dwell_phoenix_mandel
//
function dwell_phoenix_mandel( cx, cy, precision) {
	var itermax= precision;
	var breakout=8;
	var x= cx;
	var y= cy;
	var cr = cx;
	var ci = cy;
	var xprev=0;
	var yprev=0;

	var xint,yint;

	var x2 = x*x;
	var y2 = y*y;
	//z[n+1] <= z[n]^2 +Re(c) + Im(c)*z[n-1]
	for (var iter=0;iter<itermax && x2+y2<breakout;iter++) {

		xint = -1 * yprev * ci;
		yint = xprev * ci;

		xint += cr;

		xprev=x;
		yprev=y;

		x=(x2-y2) + xint;
		y=(2*x*y) + yint;

		x2 = x*x;
		y2 = y*y;

	}
	return [iter,x,y];
}


//////////////////////////////////////
//
// dwell_phoenix_julia
//
function dwell_phoenix_julia( cx, cy, precision, cr , ci) {
	  var itermax= precision;
	  var breakout=8;
	  var x=cx;
	  var y=cy;
	  var xprev=0;
	  var yprev=0;

	  var xint,yint;

	  x2 = x*x;
	  y2 = y*y;
	  //z[n+1] <= z[n]^2 +Re(c) + Im(c)*z[n-1]
	for (var iter=0;iter<itermax && x2+y2<breakout;iter++) {

		xint = -1 * yprev * ci;
		yint = xprev * ci;

		xint += cr;

		xprev=x;
		yprev=y;

		x=(x2-y2) + xint;
		y=(2*x*y) + yint;

		x2 = x*x;
		y2 = y*y;

	}
	return [iter,x,y];
}

//////////////////////////////////////
//
// dwell_buddha
//
function dwell_buddha( cx, cy, precision , width, height, x_inc, y_inc, fract_array, lx, ty) {
        num = precision;
	breakout = 4;
        dx = cx;
        dy = cy;
        dx2 = dx * dx;
        dy2 = dy * dy;
        //z <= z(n-1)^2 +c
        for ( count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dy = ( 2.0 * (dx * dy) ) + cy;
                dx = dx2 - dy2 + cx;
                dx2 = dx * dx;
                dy2 = dy * dy;

		j_t = Math.floor((dx-lx)/x_inc);
		k_t = Math.floor((ty-dy)/y_inc);
		if (j_t>=0 && j_t<width && k_t>=0 && k_t<height) { if(fract_array[j_t][k_t][0]==precision){ fract_array[j_t][k_t][0] = 1;} else { fract_array[j_t][k_t][0] += 1;}}
        }
        return fract_array;
}

//////////////////////////////////////
//
// dwell_mandel_cubic
//
function dwell_mandel_cubic( cx, cy, precision ) {
        var num = precision;
	var breakout = 8;
        var dx = cx;
        var dy = cy;
	var dx2 = dx * dx;
	var dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = dx2 - dy2;
                dysqr = 2.0 * (dy * dx);

                dtmp = (dxsqr * dx) - (dysqr * dy);
                dy = (dxsqr * dy) + (dysqr * dx);
		dx = dtmp;


		dx += cx;
		dy += cy;

		dx2 = dx * dx;
		dy2 = dy * dy;
        }
	return [count,dx,dy];
}

///////////////////////////////////////
//
// dwell_mandel_quartic
//
function dwell_mandel_quartic( cx, cy, precision ) {
        var num = precision;
	var breakout = 128;
        var dx = cx;
        var dy = cy;
	var dx2 = dx * dx;
	var dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = (dx * dx) - (dy * dy);
                dysqr = (dx * dy) + (dy * dx);

                dx = (dxsqr * dxsqr) - (dysqr * dysqr);
                dy = (dxsqr * dysqr) + (dysqr * dxsqr);

		dx = dx + cx;
		dy = dy + cy;

		dx2 = dx * dx;
		dy2 = dy * dy;
//		$dy2 = $dy * $dy;
        }
        return [count,dx,dy];

}

///////////////////////////////////////
//
// dwell_julia_cubic
//
function dwell_julia_cubic( cx, cy, precision, cr, ci ) {
        var num = precision;
	var breakout = 8;
        var dx = cx;
        var dy = cy;

	var a3 = -3 * ( cx * cx - cy * cy );
	var b3 = -3 * ( 2 * cx * cy );

	var dx2 = dx * dx;
	var dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = dx2 - dy2 + a3;
                dysqr = 2.0 * (dy * dx) + b3;

                dtmp = (dxsqr * dx) - (dysqr * dy);
                dy = (dxsqr * dy) + (dysqr * dx);
		dx = dtmp;


		dx += cr;
		dy += ci;

		dx2 = dx * dx;
		dy2 = dy * dy;
        }
	return [count,dx,dy];
}

///////////////////////////////////////
//
// dwell_julia_cubic_experimental
//
function dwell_julia_cubic_experimental( cx, cy, precision, cr, ci ) {
        var num = precision;
	var breakout = 8;
        var dx = cx;
        var dy = cy;

	var a3 = -3 * ( cx * cx - cy * cy );
	var b3 = -3 * ( 2 * cx * cy );

	var dx2 = dx * dx;
	var dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = dx2 - dy2 + a3;
                dysqr = 2.0 * (dy * dx) + b3;

                dtmp = (dxsqr * dx) - (dysqr * dy);
                dy = (dxsqr * dy) + (dysqr * dx);
		dx = dtmp;


		dx += cr;
		dy += ci;

		dx2 = dx * dx;
		dy2 = dy * dy;
        }
	count1 = count;

        dx = -1*cx;
        dy = -1*cy;

	a3 = -3 * ( cx * cx - cy * cy );
	b3 = -3 * ( 2 * cx * cy );

	dx2 = dx * dx;
	dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = dx2 - dy2 + a3;
                dysqr = 2.0 * (dy * dx) + b3;

                dtmp = (dxsqr * dx) - (dysqr * dy);
                dy = (dxsqr * dy) + (dysqr * dx);
		dx = dtmp;


		dx += cr;
		dy += ci;

		dx2 = dx * dx;
		dy2 = dy * dy;
        }
	count2 = count;
	if (count1 == count2) {
		count = num;
	} else if (count1<count2) {
		count = count1;
	} else {
		count = count2;
	}

        return [count,dx,dy];

}

///////////////////////////////////////
//
// dwell_julia_quartic
//
function dwell_julia_quartic( cx, cy, precision, cr, ci ) {
        var num = precision;
	var breakout = 128;
        var dx = cx;
        var dy = cy;
	var dx2 = dx * dx;
	var dy2 = dy * dy;
	//z <= z(n-1)^3 +c
        for ( var count = 0; count < num && (dx2 + dy2) <= breakout; count++) {
                dxsqr = (dx * dx) - (dy * dy);
                dysqr = (dx * dy) + (dy * dx);

                dx = (dxsqr * dxsqr) - (dysqr * dysqr);
                dy = (dxsqr * dysqr) + (dysqr * dxsqr);

		dx = dx + cx;
		dy = dy + cy;

		dx2 = dx * dx;
		dy2 = dy * dy;
        }
        return [count,dx,dy];
}


/////////////////////////////////
//
// setColor
//
function setColor( pix, pix_count, fract_array, width, height, precision, color_scheme) {
//        if ( color_scheme == 1 ) {
	var color;

	if (color_scheme == 0) {
		//simple
		if (fract_array[0] < precision*.03) {
			pix[(pix_count*4)]=255;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.05) {
			pix[(pix_count*4)]=255;	//red
			pix[(pix_count*4)+1]=255;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.1) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=255;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.2) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=255;	//green
			pix[(pix_count*4)+2]=255;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=255;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 1) {
		//
		var color_count = 5;
		var Kval = fract_array[0];
		var modcolor =  (Kval % color_count)+1;
		if (Kval >= precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
				pix[(pix_count*4)]=(modcolor*27)%255;	//red
				pix[(pix_count*4)+1]=(modcolor*52)%255;	//green
				pix[(pix_count*4)+2]=(modcolor*94)%255;	//blue
				pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 2) {
		//
		var color_count = 5;
		var Kval = fract_array[0];
		var modcolor =  (Kval % color_count)+1;
		if (Kval >= precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
				pix[(pix_count*4)]=(modcolor*187)%255;	//red
				pix[(pix_count*4)+1]=(modcolor*90)%255;	//green
				pix[(pix_count*4)+2]=(modcolor*69)%255;	//blue
				pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 3) {
		//
		var color_count = 12;
		var Kval = fract_array[0];
		var modcolor =  (Kval % color_count)+1;
		if (Kval >= precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
				pix[(pix_count*4)]=(modcolor*27)%255;	//red
				pix[(pix_count*4)+1]=(modcolor*52)%255;	//green
				pix[(pix_count*4)+2]=(modcolor*94)%255;	//blue
				pix[(pix_count*4)+3]=255;	//alpha
		}

	} else if (color_scheme == 4) {
		//
		var color_count = 36;
		var Kval = fract_array[0];
		var modcolor =  (Kval % color_count)+1;
		if (Kval >= precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
				pix[(pix_count*4)]=(modcolor*27)%255;	//red
				pix[(pix_count*4)+1]=(modcolor*52)%255;	//green
				pix[(pix_count*4)+2]=(modcolor*94)%255;	//blue
				pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 5) {
		if (fract_array[0] < precision) {
			var c1 = 0;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 6) {
		if (fract_array[0] < precision) {
			var c1 = 360;
			var c2 = 0;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
				
	} else if (color_scheme == 7) {
		if (fract_array[0] < precision/80) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision/80))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision/20) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision/20))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision/10) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision/10))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100)
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision/5) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision/5))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 8) {
		if (fract_array[0] < precision*.1) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.3) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision*.3))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.5) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision*.5))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.7) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision*.7))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 9) {
		if (fract_array[0] < precision*.03) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.05) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.1) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.7) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var RGB = hsvToRgb(h, 100, 100);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 10) {
		if (fract_array[0] < precision*.03) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;
			var s = Math.abs(Math.round((fract_array[1]*100 )%100));
			var v = Math.abs(Math.round((fract_array[2]*100 )%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.05) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;
			var s = Math.abs(Math.round((fract_array[1]*100 )%100));
			var v = Math.abs(Math.round((fract_array[2]*100 )%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.1) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;
			var s = Math.abs(Math.round((fract_array[1]*100 )%100));
			var v = Math.abs(Math.round((fract_array[2]*100 )%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.7) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;
			var s = Math.abs(Math.round((fract_array[1]*100 )%100));
			var v = Math.abs(Math.round((fract_array[2]*100 )%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var s = Math.abs(Math.round((fract_array[1]*100 )%100));
			var v = Math.abs(Math.round((fract_array[2]*100 )%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 11) {
		if (fract_array[0] < precision*.03) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;
			var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.05) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;
			var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.1) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;
			var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.7) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;
			var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var v = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var s = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else if (color_scheme == 12) {
		if (fract_array[0] < precision*.03) {
			var c1 = 0;
			var c2 = 120;
			var h = Math.round((fract_array[0] /(precision*.03))*(c2-c1))+c1;
			var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.05) {
			var c1 = 120;
			var c2 = 280;
			var h = Math.round((fract_array[0] /(precision*.05))*(c2-c1))+c1;
			var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.1) {
			var c1 = 280;
			var c2 = 20;
			var h = Math.round((fract_array[0] /(precision*.1))*(c2-c1))+c1;
			var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision*.7) {
			var c1 = 20;
			var c2 = 180;
			var h = Math.round((fract_array[0] /(precision*.2))*(c2-c1))+c1;
			var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else if (fract_array[0] < precision) {
			var c1 = 180;
			var c2 = 360;
			var h = Math.round((fract_array[0] /precision)*(c2-c1))+c1;
			var s = Math.abs(Math.round((Math.sqrt(fract_array[2]^2+fract_array[1]^2)*100 )%100));
			var v = Math.abs(Math.round(((Math.atan(fract_array[1]/fract_array[2])/1)*100)%100));
			var RGB = hsvToRgb(h, s, v);
			pix[(pix_count*4)]=RGB[0];	//red
			pix[(pix_count*4)+1]=RGB[1];	//green
			pix[(pix_count*4)+2]=RGB[2];	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		} else {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	} else {
		if (fract_array[0]>= precision) {
			pix[(pix_count*4)]=0;	//red
			pix[(pix_count*4)+1]=0;	//green
			pix[(pix_count*4)+2]=0;	//blue
			pix[(pix_count*4)+3]=0;	//alpha 
		} else {
			pix[(pix_count*4)]=255;	//red
			pix[(pix_count*4)+1]=255;	//green
			pix[(pix_count*4)+2]=255;	//blue
			pix[(pix_count*4)+3]=255;	//alpha
		}
	}
	return pix;
}
 
function MultDimArray(iRows,iCols) { 
	var a = new Array(iRows); 
	for (var i=0; i < iRows; i++) { 
	       	a[i] = new Array(iCols); 
		for (var j=0; j < iCols; j++) { 
			a[i][j] = new Array(3); 
			a[i][j][0] = "";
			a[i][j][1] = "";
			a[i][j][2] = "";
		} 
	} 
	return(a); 
} 

function create_fractal(pix, width, height, precision, color_scheme, lx, ty, rx, by, precision, algorithm, cr, ci) {
	var fract_array = MultDimArray(width,height);
	var pixcount = 0;
//setColor( pix, pixcount fract_array, width, height, precision, color_scheme)	
        var x_inc = ( rx - lx ) / width;
        var y_inc = ( ty - by ) / height;
	if  (algorithm  == 12) {
		escape_index = 0;
		var escapes_set = MultDimArray(width*height,2);
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				fract_array[j][k][0] = precision;
				fractal_val_temp = dwell_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision);
				if (fractal_val_temp[0] >= precision) {
					escapes_set[escape_index ][0] = j;
					escapes_set[escape_index ][1] = k;
					escape_index++;
				}
			}
		}
		for (q = 0;  q<escape_index; q++) {
			if (escapes_set[q] != "undefined") {
				j = escapes_set[q][0];
				k = escapes_set[q][1];
				fract_array= dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
			} else {
				alert(escape_index + "\n");
			}
		}
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				pix = setColor( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
				pixcount++;
			}
		}
	} else if  (algorithm  == 13) {
		escape_index = 0;
		var escapes_set = MultDimArray(width*height,2);
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				fract_array[j][k][0] = precision;
				fractal_val_temp = dwell_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision);
				if (fractal_val_temp[0] >= precision) {
					escapes_set[escape_index ][0][0] = j;
					escapes_set[escape_index ][1][0] = k;
					escape_index++;
				}
			}
		}
		iterations = 10000 - 5000*(100/width);
		for (q = 0;  q<iterations; q++) {
			var rand_index = Math.floor(Math.random()*(escape_index-1))  ;
			j = escapes_set[rand_index][0][0];
			k = escapes_set[rand_index][1][0];
			fract_array = dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
		}
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				pix = setColor( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
				pixcount++;
			}
		}
	} else {
		if (algorithm  == 0) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 1) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci);
					pix = setColor( pix, pixcount, dwell_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 2) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_burningship( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_burningship( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 3) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_newton( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_newton( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 4) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_star( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_star( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 5) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_phoenix_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci);
					pix = setColor( pix, pixcount, dwell_phoenix_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 6) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_phoenix_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_phoenix_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 7) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_mandel_cubic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_mandel_cubic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 8) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_mandel_quartic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor( pix, pixcount, dwell_mandel_quartic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 9) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_julia_cubic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci );
					pix = setColor( pix, pixcount, dwell_julia_cubic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 10) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_julia_quartic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci );
					pix = setColor( pix, pixcount, dwell_julia_quartic( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else if  (algorithm  == 11) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = dwell_julia_cubic_experimental( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci );
					pix = setColor( pix, pixcount, dwell_julia_cubic_experimental( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					//fract_array[j][k] = [0,0,0];
					pix = setColor( pix, pixcount, fract_array[j][k] = [0,0,0], width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		}


	}
	return pix;
}

function compress_imagedata(imgd, imgd_tmp, width, height, compression_factor) {
	pix_count = 0;
	pix = imgd.data;
	pix_tmp = imgd_tmp.data;
	for ( var k = 0; k < height ; k++) {
		for ( var j = 0; j < width ; j++) {
			red = 0;
			green = 0;
			blue = 0;
			alpha = 0;
			for ( var q = 0; q < compression_factor ; q++) {
				if (j+q<width) {
					red += pix_tmp[(pix_count*compression_factor*4)+(4*q)];
					green += pix_tmp[(pix_count*compression_factor*4)+(4*q)+1];
					blue += pix_tmp[(pix_count*compression_factor*4)+(4*q)+2];
					alpha += pix_tmp[(pix_count*compression_factor*4)+(4*q)+3];
				}
				if (j+q<height) {
					red += pix_tmp[(pix_count*4)+(4*q*width)];
					green += pix_tmp[(pix_count*4)+(4*q*width)+1];
					blue += pix_tmp[(pix_count*4)+(4*q*width)+2];
					alpha += pix_tmp[(pix_count*4)+(4*q*width)+3];
				}
			}
			red = Math.round(red /(compression_factor*2));
			green = Math.round(green /(compression_factor*2));
			blue = Math.round(blue /(compression_factor*2));
			alpha = Math.round(alpha /(compression_factor*2));
			pix[(pix_count*4)]=red;	//red
			pix[(pix_count*4)+1]=green;	//green
			pix[(pix_count*4)+2]=blue;	//blue
			pix[(pix_count*4)+3]=alpha;	//alpha
			pix_count++;
		}
	}
	return imgd;

}


function DrawFractal( draw_region, width, height, lx, ty, rx, by, precision, algorithm, cr, ci, color_scheme, antialias ) {
	if (antialias) {
		compression_factor = 2;
		imgd_tmp = draw_region.createImageData(parseFloat(width*compression_factor),parseFloat(height*compression_factor));
		pix = imgd_tmp.data;
	
		pix = create_fractal(pix, width*compression_factor, height*compression_factor, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
	
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		imgd = compress_imagedata(imgd, imgd_tmp, width, height, compression_factor);
		draw_region.putImageData(imgd,0,0);
	
	} else {
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		pix = imgd.data;
	
		pix = create_fractal(pix, width, height, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
	
		draw_region.putImageData(imgd,0,0);
	}
	return true;
}


function draw(){
	var width, height, ty, by, lx, rx, precision, algorithm, cr, ci, color_scheme;
        var canvas = document.getElementById("theCanvas");

        if (canvas && canvas.getContext) {
		canvas.width = canvas.width;	//clears the canvas
                var draw_region = canvas.getContext("2d");
                if (draw_region) {
			if(document.getElementById("width").value.length>0) {
				width = document.getElementById("width").value;
				height = document.getElementById("width").value;
			} else {
				width = 500;
				height = 500;
				document.getElementById("width").value = width;
			}
			if(document.getElementById("algorithm").value.length>0) {
				algorithm = document.getElementById("algorithm").value;
			} else {
				algorithm = 0;
				document.getElementById("algorithm").value = algorithm;
			}
			if(document.getElementById("colorscheme").value.length>0) {
				color_scheme = document.getElementById("colorscheme").value;
			} else {
				color_scheme = 0;
				document.getElementById("colorscheme").value = color_scheme;
			}

			if(document.getElementById("lx").value.length>0) {
				lx = document.getElementById("lx").value;
			} else {
		                if (algorithm == 0) {
		                        lx = -2.25;
		                } else if  (algorithm == 1){
		                        lx = -1.75;
		                } else if  (algorithm == 2){
		                        lx = -2.25;
		                } else if  (algorithm == 3){
		                        lx = -5;
		                } else if  (algorithm == 4){
                		        lx = -2;
		                } else {
                		        lx = -2.25;
		                }
				document.getElementById("lx").value = lx;
			}
			if(document.getElementById("rx").value.length>0) {
				rx = document.getElementById("rx").value;
			} else {
		                if (algorithm == 0) {
		                        rx = 0.7;
		                } else if  (algorithm == 1){
		                        rx = 1.75;
		                } else if  (algorithm == 2){
		                        rx = 2.25;
		                } else if  (algorithm == 3){
		                        rx = 5;
		                } else if  (algorithm == 4){
                		        rx = 2;
		                } else {
                		        rx = 2.25;
		                }
				document.getElementById("rx").value = rx;
			}
			if(document.getElementById("ty").value.length>0) {
				ty = document.getElementById("ty").value;
			} else {
		                if (algorithm == 0) {
		                        ty =  1.5;
		                } else if  (algorithm == 1){
		                        ty= 1.25;
		                } else if  (algorithm == 2){
		                        ty =  1.5;
		                } else if  (algorithm == 3){
		                        ty =  5;
		                } else if  (algorithm == 4){
		                        ty =  2;
		                } else {
		                        ty =  1.5;
		                }
				document.getElementById("ty").value = ty;
			}
			if(document.getElementById("by").value.length>0) {
				by = document.getElementById("by").value;
			} else {
		                if (algorithm == 0) {
		                        by =  -1.5;
		                } else if  (algorithm == 1){
		                        by = -1.25;
		                } else if  (algorithm == 2){
		                        by =  -1.7;
		                } else if  (algorithm == 3){
		                        by =  -5;
		                } else if  (algorithm == 4){
		                        by =  -2;
		                } else {
		                        by =  -1.5;
		                }
				document.getElementById("by").value = by;
			}


		                //if (algorithm ==12 || algorithm ==13) {
		                //        precision = 300;
				//} else {
					precision = 360;
				//}


			if(document.getElementById("cr").value.length>0) {
				cr = document.getElementById("cr").value;
			} else {
				if(algorithm ==1 || algorithm ==5 || algorithm ==9 || algorithm ==10 || algorithm ==11) {
					cr=-.84413;
				} else {
					cr = "";
				}				
				document.getElementById("cr").value = cr;
			}
			if(document.getElementById("ci").value.length>0) {
				ci = document.getElementById("ci").value;
			} else {
				if(algorithm ==1 || algorithm ==5 || algorithm ==9 || algorithm ==10 || algorithm ==11) {
					ci=0.2;
				} else {
					ci ="";
				}				
				document.getElementById("ci").value = ci;
			}
			if(document.getElementById("antialias").value.length>0) {
				antialias = document.getElementById("antialias").value;
			} else {
				antialias = 0;
				document.getElementById("antialias").value = antialias;
			}
			var success = DrawFractal( draw_region, width, height, lx, ty, rx, by, precision, algorithm, cr, ci, color_scheme, antialias);
                }
        }
}

function tools_rect () {
	var tool = this;
	this.started = false;	
	function getMouseCoordsWithinTarget(event)
	{
		var coords = { x: 0, y: 0};
	 
		if(!event) // then we're in a non-DOM (probably IE) browser
		{
			event = window.event;
			if (event) {
				coords.x = event.offsetX;
				coords.y = event.offsetY;
			}
		}
		else		// we assume DOM modeled javascript
		{
			var Element = event.target ;
			var CalculatedTotalOffsetLeft = 0;
			var CalculatedTotalOffsetTop = 0 ;
	 
			while (Element.offsetParent)
			{
				CalculatedTotalOffsetLeft += Element.offsetLeft ;     
				CalculatedTotalOffsetTop += Element.offsetTop ;
				Element = Element.offsetParent ;
			}
	 
			coords.x = event.pageX - CalculatedTotalOffsetLeft ;
			coords.y = event.pageY - CalculatedTotalOffsetTop ;
		}
		return coords;
	}

	this.mousedown = function (ev) {
		tool.started = true;
		tool.image = null
		// Get the mouse position relative to the canvas element.
//		if (BrowserDetect.browser == "Firefox") { // Firefox
			var curPos = getMouseCoordsWithinTarget(ev);
			x =  curPos.x
			y = curPos.y
			
//		} else  { // Opera and chrome and hopefully other we'll see
//			x = ev.offsetX;
//			y = ev.offsetY;
//		}
		tool.x0 = x;
		tool.y0 = y;
	  };

	this.mousemove = function (ev) {
		if (!tool.started) {
			return;
		}
//		if (BrowserDetect.browser == "Firefox") { // Firefox
			var curPos = getMouseCoordsWithinTarget(ev);
			x_temp =  curPos.x
			y_temp = curPos.y
//		} else  { // Opera and chrome and hoporking to my satisfaction, I will paste the one script file into this message here and attach the other one, together they are too long for the forum post message limit. The only one I need to pastefully other we'll see
//			x_temp = ev.offsetX;
//			y_temp = ev.offsetY;
//		}

		var x = Math.min(x_temp,  tool.x0),
		y = Math.min(y_temp,  tool.y0),
		w = Math.abs(x_temp - tool.x0),
		h = Math.abs(y_temp - tool.y0);
		

		
		if (!w || !h) {
			return;
		}
		var canvas = document.getElementById("theCanvas");

		if (canvas && canvas.getContext) {
			var draw_region = canvas.getContext("2d");
			if (draw_region) {
				
				//draw_region.strokeRect(x, y, w, h);
				if (tool.image == null) {
					tool.image = draw_region.getImageData(0,0,canvas.width,canvas.height);
				} else {
					draw_region.clearRect(0, 0, canvas.width, canvas.height);
					draw_region.putImageData(tool.image,0,0);
				}
				draw_region.strokeRect(x, y, w, h);
				
			}
		}
	  };

	this.mouseup = function (ev) {
		if (tool.started) {
			var x_temp = 0;
			var y_temp = 0;
//			if (BrowserDetect.browser == "Firefox") { // Firefox
				var curPos = getMouseCoordsWithinTarget(ev);
				x =  curPos.x
				y = curPos.y
//			} else  { // Opera and chrome and hopefully other we'll see
//				x = ev.offsetX;
//				y = ev.offsetY;
//			}
			if (x>tool.x0) {
				x_temp += x;
			} else {
				x_temp += tool.x0;
				tool.x0 = x;
			}
			if (y>tool.y0) {
				y_temp += y;
			} else {
				y_temp += tool.y0;
				tool.y0= y;
			}
			tool.mousemove(ev); 
			tool.started = false;

			var coord_width = parseFloat(document.getElementById("rx").value) - parseFloat(document.getElementById("lx").value);
			var coord_height = parseFloat(document.getElementById("ty").value) - parseFloat(document.getElementById("by").value);
			var image_width = parseFloat(document.getElementById("width").value);
			var image_height = parseFloat(document.getElementById("width").value);
			var coord_x_1 = Math.abs(((tool.x0/image_width) * coord_width)) ;
			var coord_x_2 = Math.abs(((x_temp/image_width) * coord_width)) ;
			var coord_y_1 = Math.abs(((tool.y0/image_height) * coord_height));
			var coord_y_2 = Math.abs(((y_temp/image_height) * coord_height));
			var lx = coord_x_1 + parseFloat(document.getElementById("lx").value);
			var rx = coord_x_2 + parseFloat(document.getElementById("lx").value);
			var ty = parseFloat(document.getElementById("ty").value) - coord_y_1;
			var by = parseFloat(document.getElementById("ty").value) - coord_y_2;
			document.getElementById("lx").value = lx;
			document.getElementById("rx").value = rx;
			document.getElementById("ty").value = ty;
			document.getElementById("by").value = by;
			draw();
			redirectURL = "http://guydmann.no-ip.org/code/fractal_app/index.php";
			redirectURL += "?algorithm=" + document.getElementById("algorithm").value + "&";
			redirectURL += "colorscheme=" + document.getElementById("colorscheme").value + "&";
			redirectURL += "width=" + document.getElementById("width").value + "&";
			if (document.getElementById("algorithm").value ==1 || document.getElementById("algorithm").value ==5 || document.getElementById("algorithm").value ==9 || document.getElementById("algorithm").value ==10 || document.getElementById("algorithm").value ==11) {
				redirectURL += "cr=" + document.getElementById("cr").value + "&";
				redirectURL += "ci=" + document.getElementById("ci").value + "&";
			}
			redirectURL += "lx=" + document.getElementById("lx").value + "&";
			redirectURL += "rx=" + document.getElementById("rx").value + "&";
			redirectURL += "ty=" + document.getElementById("ty").value + "&";
			redirectURL += "by=" + document.getElementById("by").value;
			document.getElementById("URL").value  = redirectURL;
		}
	}
}

function findPosition(obj) {
	var left = 0;
	var top = 0;
	if (obj.offsetParent) {
		while(obj) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	
	return {x : left, y: top};
}

function init () {
  // ...
  // Attach the mousemove event handler.
	tool = new tools_rect();

	var canvas = document.getElementById("theCanvas");
	if (!canvas) {
	      alert('Error: I cannot find the canvas element!');
	      return;
	}
	if (!canvas.getContext) {
	      alert('Error: no canvas.getContext!');
	      return;
	}
	
	canvasLocation = findPosition(canvas);
	canvas.addEventListener('mousemove', tool.mousemove, false);
	canvas.addEventListener('mousedown', tool.mousedown, false);
	canvas.addEventListener('mouseup',   tool.mouseup, false);

	draw();
}


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

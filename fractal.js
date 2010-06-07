var canvasLocation;

 
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
	
	var pixcount = 0;
        var x_inc = ( rx - lx ) / width;
        var y_inc = ( ty - by ) / height;
	if  (algorithm  == 12 || algorithm  == 13) {
		print_with_pause("sys_out", "Generating Mandelbrot escape set\n", false);
		var fract_array = MultDimArray(width,height);
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
		 if  (algorithm  == 12) {
			print_with_pause("sys_out", "Traversing all members of the escape set\n", false);
			for (q = 0;  q<escape_index; q++) {
				if (escapes_set[q] != "undefined") {
					j = escapes_set[q][0];
					k = escapes_set[q][1];
					fract_array= dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
				} else {
					alert(escape_index + "\n");
				}
			}
		} else {		
			iterations = 10000 - 5000*(100/width);
			print_with_pause("sys_out", "Traversing " + iterations  + " random members of the escape set\n", false);
			for (q = 0;  q<iterations; q++) {
				var rand_index = Math.floor(Math.random()*(escape_index))  ;
				if (escapes_set[rand_index] != "undefined") {
					j = escapes_set[rand_index][0];
					k = escapes_set[rand_index][1];
					fract_array = dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
				} else {
					alert(escape_index + "\n");
				}
			}
		}
		print_with_pause("sys_out", "Coloring the image\n", false);
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				pix = setColor( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
				pixcount++;
			}
		}
	}  else if  (algorithm  <12) {
		var dwell_func_array = new Array (dwell_mandel,dwell_julia,dwell_burningship, dwell_newton, dwell_star,dwell_phoenix_julia,dwell_phoenix_mandel,dwell_mandel_cubic, dwell_mandel_quartic,dwell_julia_cubic, dwell_julia_quartic, dwell_julia_cubic_experimental);
		julia_type = 0;
		if (algorithm ==1 || algorithm ==5 || algorithm ==9 || algorithm == 10 || algorithm ==11) {
			julia_type++;
		}
		if (julia_type == 0) {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					pix = setColor( pix, pixcount, dwell_func_array [algorithm]( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		} else {
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					pix = setColor( pix, pixcount, dwell_func_array [algorithm]( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci ), width, height, precision, color_scheme);	
					pixcount++;
				}
			}
		}
	} else {
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				pix = setColor( pix, pixcount, fract_array[j][k] = [0,0,0], width, height, precision, color_scheme);	
				pixcount++;
			}
		}
	}
	return pix;
}

function compress_imagedata(imgd, imgd_tmp, width, height, compression_factor) {
	pix_count = 0;
	pix_tmp_count = 0;
	pix = imgd.data;
	pix_tmp = imgd_tmp.data;
	for ( var k = 0; k < height ; k++) {
		for ( var j = 0; j < width ; j++) {
			red = 0;
			green = 0;
			blue = 0;
			alpha = 0;
			avg_count = 1;
			red += pix_tmp[(pix_tmp_count*4)];
			green += pix_tmp[(pix_tmp_count*4)+1];
			blue += pix_tmp[(pix_tmp_count*4)+2];
			alpha += pix_tmp[(pix_tmp_count*4)+3];
			
			for ( var q = 1; q < compression_factor ; q++) {
				if (j+q<width) {
					red += pix_tmp[(pix_tmp_count*4)+(4*q*compression_factor)];
					green += pix_tmp[(pix_tmp_count*4)+(4*q*compression_factor)+1];
					blue += pix_tmp[(pix_tmp_count*4)+(4*q*compression_factor)+2];
					alpha += pix_tmp[(pix_tmp_count*4)+(4*q*compression_factor)+3];
					avg_count++;
				}
				if (k+q<height) {
					red += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)];
					green += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+1];
					blue += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+2];
					alpha += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+3];
					avg_count++;
				}
			}
			red = Math.round(red /(avg_count));
			green = Math.round(green /(avg_count));
			blue = Math.round(blue /(avg_count));
			alpha = Math.round(alpha /(avg_count));
			pix[(pix_count*4)]=red;	//red
			pix[(pix_count*4)+1]=green;	//green
			pix[(pix_count*4)+2]=blue;	//blue
			pix[(pix_count*4)+3]=alpha;	//alpha
			pix_count++;
			pix_tmp_count+= compression_factor;
		}
		pix_tmp_count+= compression_factor*width;
	}
	return imgd;

}


function DrawFractal( draw_region, width, height, lx, ty, rx, by, precision, algorithm, cr, ci, color_scheme, antialias ) {
	print_with_pause("sys_out", "Beginning Fractal Generation\n", true);
	if (antialias) {
		compression_factor = 2;
		imgd_tmp = draw_region.createImageData(parseFloat(width*compression_factor),parseFloat(height*compression_factor));
		pix = imgd_tmp.data;
	
		print_with_pause("sys_out", "Creating fractal at "+(width*compression_factor)+"x"+(height*compression_factor)+"\n", false);
		pix = create_fractal(pix, width*compression_factor, height*compression_factor, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
	
		
		print_with_pause("sys_out","Compressing image to "+width+"x"+height+"\n", false);
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		imgd = compress_imagedata(imgd, imgd_tmp, width, height, compression_factor);
		draw_region.putImageData(imgd,0,0);
	
	} else {
		print_with_pause("sys_out","Creating fractal at "+width+"x"+height+"\n", false);
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		pix = imgd.data;
		pix = create_fractal(pix, width, height, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
		draw_region.putImageData(imgd,0,0);
	}
	
	document.getElementById("sys_out").value += "Fractal Generation Complete\n";
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
			if(document.getElementById("antialias").checked) {
				antialias = document.getElementById("antialias").value;
			} else {
				antialias = 0;
				document.getElementById("antialias").value = antialias;
			}
			var success = DrawFractal( draw_region, width, height, lx, ty, rx, by, precision, algorithm, cr, ci, color_scheme, antialias);
                }
        }
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


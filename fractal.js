var canvasLocation;
var fractal_array_global;

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
			a[i][j] = new Array(3); 
			a[i][j][0] = "";
			a[i][j][1] = "";
			a[i][j][2] = "";
		} 
	} 
	return(a); 
} 


function create_fractal(pix, width, height, precision, color_scheme, lx, ty, rx, by, precision, algorithm, cr, ci) {
	//var setColor_func_array = new Array (setColor, createColorFunction(color_scheme) );
	print_with_pause("sys_out", "Creating color function\n", false);
	var setColor_func_array = new Array ( createColorFunction(color_scheme) );
	var fract_array = MultDimArray(width,height);
	
	var pixcount = 0;
        var x_inc = ( rx - lx ) / width;
        var y_inc = ( ty - by ) / height;
	if  (algorithm  >= 12) {
		print_with_pause("sys_out", "Generating Mandelbrot escape set\n", false);
		escape_index = 0;
		var escapes_set = MultDimArray(width*height,2);
		var escapes_array = MultDimArray(width,height);
		decinal = height/10;
		decinal_count = 0;
		decinal_val = decinal;
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				fract_array[j][k][0] = precision;
				fractal_val_temp = dwell_mandel( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision);
				if (fractal_val_temp[0] >= precision) {
					escapes_set[escape_index ][0] = j;
					escapes_set[escape_index ][1] = k;
					escapes_array[j][k][0] = 1;
					escape_index++;
				}
			}
			if (k>=decinal_val) {
				decinal_val += decinal;
				decinal_count++;
				print_with_pause("sys_out", decinal_count + "0%...", false);
			}
		}
		decinal_val += decinal;
		decinal_count++;
		print_with_pause("sys_out", decinal_count + "0%\n", false);
		if  (algorithm  == 12 || algorithm  == 13 || algorithm  == 14 || algorithm == 15) {
			 if  (algorithm  == 12) {
				//Buddhabrot full traversal
				print_with_pause("sys_out", "Traversing all members of the escape set\n", false);
				decinal = escape_index/10;
				decinal_count = 0;
				decinal_val = decinal;
				for (q = 0;  q<escape_index; q++) {
//					if (escapes_set[q] != "undefined") {
						j = escapes_set[q][0];
						k = escapes_set[q][1];
						fract_array= dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
//					} else {
//						alert(escape_index + "\n");
//					}
					if (q>=decinal_val) {
						decinal_val += decinal;
						decinal_count++;
						print_with_pause("sys_out", decinal_count + "0%...", false);
					}
				}
				decinal_val += decinal;
				decinal_count++;
				print_with_pause("sys_out", decinal_count + "0%\n", false);
			} else if (algorithm ==13){		
				//Buddhabrot random
				iterations = 10000+ 5000*(width/100);
				print_with_pause("sys_out", "Traversing " + iterations  + " random members of the escape set\n", false);
				decinal = iterations/10;
				decinal_count = 0;
				decinal_val = decinal;
				for (q = 0;  q<iterations; q++) {
					var rand_index = Math.floor(Math.random()*(escape_index))  ;
//					if (escapes_set[rand_index] != "undefined") {
						j = escapes_set[rand_index][0];
						k = escapes_set[rand_index][1];
						fract_array = dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
//					} else {
//						alert(escape_index + "\n");
//					}
					if (q>=decinal_val) {
						decinal_val += decinal;
						decinal_count++;
						print_with_pause("sys_out", decinal_count + "0%...", false);
					}
				}
				decinal_val += decinal;
				decinal_count++;
				print_with_pause("sys_out", decinal_count + "0%\n", false);
			} else if (algorithm ==14){		
				//Buddhabrot Julia random
				iterations = 10000+ 5000*(width/100);
				print_with_pause("sys_out", "Traversing " + iterations  + " random members of the escape set\n", false);
				decinal = iterations/10;
				decinal_count = 0;
				decinal_val = decinal;
				for (q = 0;  q<iterations; q++) {
					var rand_index = Math.floor(Math.random()*(escape_index))  ;
//					if (escapes_set[rand_index] != "undefined") {
						j = escapes_set[rand_index][0];
						k = escapes_set[rand_index][1];
						fract_array = dwell_buddha_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty, cr, ci);
//					} else {
//						alert(escape_index + "\n");
//					}
					if (q>=decinal_val) {
						decinal_val += decinal;
						decinal_count++;
						print_with_pause("sys_out", decinal_count + "0%...", false);
					}
				}
				decinal_val += decinal;
				decinal_count++;
				print_with_pause("sys_out", decinal_count + "0%\n", false);
			} else if (algorithm ==15){		
				//Buddhabrot Julia random with centered cr, ci traversal
				var iterations = 5000+ 1000*(width/100);
				var cr_int = (rx - lx)/100;
				var ci_int = (ty - by)/100;
				var cr_max = cr_int;
				var ci_max = ci_int ;
				
				for (var cr_temp = cr_int * -1;  cr_temp<=cr_max ; cr_temp+= cr_int ) {
					for (var ci_temp = ci_int * -1;  ci_temp <=ci_max ; ci_temp+=ci_int ) {
				
				
						print_with_pause("sys_out", "Traversing " + iterations  + " random members of the escape set with cr, ci of (" + cr_temp + ", " + ci_temp + ")\n", false);
						decinal = iterations/10;
						decinal_count = 0;
						decinal_val = decinal;
						for (q = 0;  q<iterations; q++) {
							var rand_index = Math.floor(Math.random()*(escape_index))  ;
								j = escapes_set[rand_index][0];
								k = escapes_set[rand_index][1];
								fract_array = dwell_buddha_julia( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty, cr_temp, ci_temp);
							if (q>=decinal_val) {
								decinal_val += decinal;
								decinal_count++;
								print_with_pause("sys_out", decinal_count + "0%...", false);
							}
						}
						decinal_val += decinal;
						decinal_count++;
						print_with_pause("sys_out", decinal_count + "0%\n", false);
					}
				}
			}
			print_with_pause("sys_out", "Coloring the image\n", false);
			decinal = height/10;
			decinal_count = 0;
			decinal_val = decinal;
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					pix = setColor_func_array[0]( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
		} else {		
			//Buddhabrot random  with inverse
			iterations = 10000+ 5000*(width/100);
			print_with_pause("sys_out", "Traversing " + iterations  + " random members of the escape set\n", false);
			decinal = iterations/10;
			decinal_count = 0;
			decinal_val = decinal;
			for (q = 0;  q<iterations; q++) {
				var rand_index = Math.floor(Math.random()*(escape_index))  ;
//				if (escapes_set[rand_index] != "undefined") {
					j = escapes_set[rand_index][0];
					k = escapes_set[rand_index][1];
					fract_array = dwell_buddha( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, width, height, x_inc, y_inc, fract_array, lx, ty);
//				} else {
//					alert(escape_index + "\n");
//				}
				if (q>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%\n", false);			
			
			print_with_pause("sys_out", "Coloring the image\n", false);
			decinal = height/10;
			decinal_count = 0;
			decinal_val = decinal;
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					if (escapes_array[j][k][0]==0) {
						pix = setColor_func_array[0]( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
					} else {
						pix = setColor_func_array[0]( pix, pixcount, [precision,0,0], width, height, precision, color_scheme);	
					}
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
		}
		
		decinal_val += decinal;
		decinal_count++;
		print_with_pause("sys_out", decinal_count + "0%\n", false);
	}  else if  (algorithm  <12) {
		//dwell_func_array {
		//	0 =dwell_mandel
		//	1 = dwell_julia
		//	2 = dwell_burningship
		//	3 = dwell_newton
		//	4 = dwell_star
		//	5 = dwell_phoenix_julia
		//	6 = dwell_phoenix_mandel
		//	7 = dwell_mandel_cubic
		//	8 = dwell_mandel_quartic
		//	9 = dwell_julia_cubic
		//	10 = dwell_julia_quartic
		//	11 = dwell_julia_cubic_experimental
		//	}
		var dwell_func_array = new Array (dwell_mandel,dwell_julia,dwell_burningship, dwell_newton, dwell_star,dwell_phoenix_julia,dwell_phoenix_mandel,dwell_mandel_cubic, dwell_mandel_quartic,dwell_julia_cubic, dwell_julia_quartic, dwell_julia_cubic_experimental);
		julia_type = 0;
		if (algorithm ==1 || algorithm ==5 || algorithm ==9 || algorithm == 10 || algorithm ==11) {
			julia_type++;
		}
		decinal = height/10;
		decinal_count = 0;
		decinal_val = decinal;
		if (julia_type == 0) {
		//Mandelbrot type fractals
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					fract_array[j][k] = dwell_func_array [algorithm]( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision );
					pix = setColor_func_array[0]( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%\n", false);
		} else {
		//Julia type fractals	
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					fract_array[j][k] = dwell_func_array [algorithm]( ( j * x_inc ) + lx ,  ty - ( k * y_inc ), precision, cr, ci );
					pix = setColor_func_array[0]( pix, pixcount, fract_array[j][k], width, height, precision, color_scheme);	
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%\n", false);
		}
	} else {
		//Blank
		//fill the image with black pixels
		decinal = height/10;
		decinal_count = 0;
		decinal_val = decinal;
		for ( var k = 0; k < height ; k++) {
			for ( var j = 0; j < width ; j++) {
				pix = setColor_func_array[0]( pix, pixcount, fract_array[j][k] = [0,0,0], width, height, precision, color_scheme);	
				pixcount++;
			}
			if (k>=decinal_val) {
				decinal_val += decinal;
				decinal_count++;
				print_with_pause("sys_out", decinal_count + "0%...", false);
			}
		}
		decinal_val += decinal;
		decinal_count++;
		print_with_pause("sys_out", decinal_count + "0%\n", false);
	}
	fractal_array_global = fract_array;
	return pix;
}



function DrawFractal( draw_region, width, height, lx, ty, rx, by, precision, algorithm, cr, ci, color_scheme, antialias ) {
	print_with_pause("sys_out", "Beginning Fractal Generation\n", true);
	var date = new Date();
	if (antialias) {
		var compression_func_array = new Array (compress_imagedata_avg);
		compression_factor = 2;
		imgd_tmp = draw_region.createImageData(parseFloat(width*compression_factor),parseFloat(height*compression_factor));
		pix = imgd_tmp.data;
	
		print_with_pause("sys_out", "Creating fractal at "+(width*compression_factor)+"x"+(height*compression_factor)+"\n", false);
		pix = create_fractal(pix, width*compression_factor, height*compression_factor, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
	
		
		print_with_pause("sys_out","Compressing image to "+width+"x"+height+"\n", false);
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		imgd = compression_func_array[0](imgd, imgd_tmp, width, height, compression_factor);
		draw_region.putImageData(imgd,0,0);
	
	} else {
		print_with_pause("sys_out","Creating fractal at "+width+"x"+height+"\n", false);
		imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
		pix = imgd.data;
		pix = create_fractal(pix, width, height, precision, color_scheme, parseFloat(lx), parseFloat(ty), parseFloat(rx), parseFloat(by), precision, algorithm, parseFloat(cr), parseFloat(ci));
		draw_region.putImageData(imgd,0,0);
	}
	curDate = new Date();
	document.getElementById("sys_out").value += "Fractal Generation Complete\n";
	document.getElementById("sys_out").value += (curDate -date)/1000 +" seconds\n";
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
					cr=-.844;
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


function ColorFractal( draw_region, width, height, precision, algorithm, color_scheme, antialias) {
	print_with_pause("sys_out", "Recoloring of Fractal\n", false);
	var date = new Date();
	var setColor_func_array = new Array ( createColorFunction(color_scheme) );
	var pixcount = 0
	if (antialias) {
		if ((width*compression_factor)==fractal_array_global.length) {
			var compression_func_array = new Array (compress_imagedata_avg);
			compression_factor = 2;
			imgd_tmp = draw_region.createImageData(parseFloat(width*compression_factor),parseFloat(height*compression_factor));
			pix = imgd_tmp.data;
		
			print_with_pause("sys_out", "Coloring fractal at "+(width*compression_factor)+"x"+(height*compression_factor)+"\n", false);
			decinal = (height*compression_factor)/10;
			decinal_count = 0;
			decinal_val = decinal;
			for ( var k = 0; k < height*compression_factor ; k++) {
				for ( var j = 0; j < width*compression_factor ; j++) {
					pix = setColor_func_array[0]( pix, pixcount, fractal_array_global[j][k], width, height, precision, color_scheme);	
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%\n", false);
		
			
			print_with_pause("sys_out","Compressing image to "+width+"x"+height+"\n", false);
			imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
			imgd = compression_func_array[0](imgd, imgd_tmp, width, height, compression_factor);
			draw_region.putImageData(imgd,0,0);
		} else {
			print_with_pause("sys_out", "Cannot recolor, redrawing\n", true);
			pause(1000);
			draw();
		}
	} else {
		if (width==fractal_array_global.length) {
			print_with_pause("sys_out","Coloring fractal at "+width+"x"+height+"\n", false);
			imgd = draw_region.createImageData(parseFloat(width),parseFloat(height));
			pix = imgd.data;
			
			decinal = height/10;
			decinal_count = 0;
			decinal_val = decinal;
			for ( var k = 0; k < height ; k++) {
				for ( var j = 0; j < width ; j++) {
					pix = setColor_func_array[0]( pix, pixcount, fractal_array_global[j][k], width, height, precision, color_scheme);	
					pixcount++;
				}
				if (k>=decinal_val) {
					decinal_val += decinal;
					decinal_count++;
					print_with_pause("sys_out", decinal_count + "0%...", false);
				}
			}
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%\n", false);
			draw_region.putImageData(imgd,0,0);
		} else {
			print_with_pause("sys_out", "Cannot recolor, redrawing\n", false);
			pause(1000);
			draw();
		}
	}
	curDate = new Date();
	document.getElementById("sys_out").value += "Fractal Coloring sComplete\n";
	document.getElementById("sys_out").value += (curDate -date)/1000 +" seconds\n";
	return true;
}

function recolor(){
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
					cr=-.844;
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
			var success = ColorFractal( draw_region, width, height, precision, algorithm, color_scheme, antialias);
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


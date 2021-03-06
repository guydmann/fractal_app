function compress_imagedata_avg(imgd, imgd_tmp, width, height, compression_factor) {
	pix_count = 0;
	pix_tmp_count = 0;
	pix = imgd.data;
	pix_tmp = imgd_tmp.data;
	
	decinal = height/10;
	decinal_count = 0;
	decinal_val = decinal;
	
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
			
			for ( var q = 0; q < compression_factor ; q++) {
				for ( var r = 0; r < compression_factor ; r++) {
					if (r!=0 && q!=0) {
						if (j+r<width) {
							red += pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)];
							green += pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+1];
							blue += pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+2];
							alpha += pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+3];
							avg_count++;
						}
						if (k+q<height) {
							red += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)];
							green += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+1];
							blue += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+2];
							alpha += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+3];
							avg_count++;
						}
						if (k+q<height && j+r<width) {
							red += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)];
							green += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+1];
							blue += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+2];
							alpha += pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+3];
							avg_count++;
						}
					}
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
		if (k>=decinal_val) {
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%...", false);
		}
	}
	decinal_val += decinal;
	decinal_count++;
	print_with_pause("sys_out", decinal_count + "0%\n", false);
	return imgd;

}


function compress_imagedata_freq(imgd, imgd_tmp, width, height, compression_factor) {
	pix_count = 0;
	pix_tmp_count = 0;
	pix = imgd.data;
	pix_tmp = imgd_tmp.data;
	
	decinal = height/10;
	decinal_count = 0;
	decinal_val = decinal;
	
	for ( var k = 0; k < height ; k++) {
		for ( var j = 0; j < width ; j++) {
			var red = MultDimArray(compression_factor ,compression_factor );
			var green = MultDimArray(compression_factor ,compression_factor );
			var blue = MultDimArray(compression_factor ,compression_factor );
			var alpha = MultDimArray(compression_factor ,compression_factor );
			red[0][0] = pix_tmp[(pix_tmp_count*4)];
			green[0][0] = pix_tmp[(pix_tmp_count*4)+1];
			blue[0][0] = pix_tmp[(pix_tmp_count*4)+2];
			alpha[0][0] = pix_tmp[(pix_tmp_count*4)+3];
			
			for ( var q = 0; q < compression_factor ; q++) {
				for ( var r = 0; r < compression_factor ; r++) {
					if (r!=0 && q!=0) {
						if (j+r<width) {
							red[q][r] = pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)];
							green[q][r] = pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+1];
							blue[q][r] = pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+2];
							alpha[q][r] = pix_tmp[(pix_tmp_count*4)+(4*r*compression_factor)+3];
						}
						if (k+q<height) {
							red[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)];
							green[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+1];
							blue[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+2];
							alpha[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+3];
						}
						if (k+q<height && j+r<width) {
							red[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)];
							green[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+1];
							blue[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+2];
							alpha[q][r] = pix_tmp[(pix_tmp_count*4)+(4*(q*width)*compression_factor)+(4*r*compression_factor)+3];
						}
					}
				}
			}
			var color_list = MultDimArray(compression_factor*compression_factor,2 );
			var color_list_count = 0
			color_list[0][color_list_count] = 1;
			color_list[0][1][0]=red[0][0];
			color_list[0][1][1]=green[0][0];
			color_list[0][1][2]=blue[0][0];
			color_list[0][1][3]=alpha[0][0];
			color_list_count++;
			for ( var q = 0; q < compression_factor ; q++) {
				for ( var r = 0; r < compression_factor ; r++) {
					if (r!=0 && q!=0) {
						if (j+r<width) {
							red[q][r];
							green[q][r];
							blue[q][r];
							alpha[q][r];
						}
						if (k+q<height) {
						
						}
						if (k+q<height && j+r<width) {
						
						}
					}
				}
			}
			
			
			
			red_val = Math.round(red /(avg_count));
			green_val = Math.round(green /(avg_count));
			blue_val = Math.round(blue /(avg_count));
			alpha_val = Math.round(alpha /(avg_count));
			pix[(pix_count*4)]=red_val;	//red
			pix[(pix_count*4)+1]=green_val;	//green
			pix[(pix_count*4)+2]=blue_val;	//blue
			pix[(pix_count*4)+3]=alpha_val;	//alpha
			pix_count++;
			pix_tmp_count+= compression_factor;
		}
		pix_tmp_count+= compression_factor*width;
		if (k>=decinal_val) {
			decinal_val += decinal;
			decinal_count++;
			print_with_pause("sys_out", decinal_count + "0%...", false);
		}
	}
	decinal_val += decinal;
	decinal_count++;
	print_with_pause("sys_out", decinal_count + "0%\n", false);
	return imgd;

}

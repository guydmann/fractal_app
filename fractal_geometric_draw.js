function DrawSierpinski(pix, width, height)
{
	var Direct;
	var x1, y1, x2, y2;

	len_val = Math.floor(width/2);
	x1 = x2 = len_val;
	y1 = y2 = 0;

	for(var iterate = 0; iterate < 50000; iterate++)
	{
		Direct = Math.floor(Math.random()*4);
		
		if(Direct == 0)
		{
			x1 = (x2 + (len_val)) / 2;
			y1 = (y2 + 0) / 2;	
		} else if(Direct == 1) {
			x1 = (x2 + 0) / 2;
			y1 = (y2 + (len_val*1.5)) / 2;
		} else if(Direct == 2) {
			x1 = (x2 + (len_val*2)) / 2;	
			y1 = (y2 + (len_val*1.5)) / 2;
		}
		x1 = Math.floor(x1);
		y1 = Math.floor(y1);
		pix_count=(y1*width*4)+(x1*4);
		//print_with_pause("sys_out", "x: " + x1 + "  y: " + y1 +"  pixcount: "+pix_count +"\n", false);
		pix[pix_count]=255;		//red
		pix[pix_count+1]=255;		//green
		pix[pix_count+2]=255;		//blue
		pix[pix_count+3]=255;		//alpha

		x2 = x1;
		y2 = y1;
	}
	return pix;
}
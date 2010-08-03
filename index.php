<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include("header.php");
//this is style information for my webpage, not needed for depoloyment elsewhere
writeheader("Fractal Application - Javascript, HTML5","php, fractal, mandelbrot, julia, burning ship, newton, zoom","Fractal Application developed in Javascript using the HTML5 canvas element by Guy Mann");
?>


<?php include("../../topbar.phtml"); //this is style information for my webpage, not needed for depoloyment elsewhere ?><br>
<?php 
	if (!isset($_GET['algorithm']) || $_GET['algorithm'] <= "") { $algorithm = 0; } else { $algorithm = $_GET['algorithm']; }
	if (!isset($_GET['precision']) || $_GET['precision'] <= "") { $precision = 360; } else { $precision = $_GET['precision']; }
	if (!isset($_GET['lx']) || $_GET['lx'] <= "") { 
		if ($algorithm == 0) {
			$lx = -2;
		} elseif  ($algorithm == 1){ 
			$lx = -1.75;
		} elseif  ($algorithm == 2){ 
			$lx = -2.25;
		} elseif  ($algorithm == 3){ 
			$lx = -5;
		} elseif  ($algorithm == 4){ 
			$lx = -2;
		} else {
			$lx = -1.5;
		}
	} else { $lx = $_GET['lx']; }
	if (!isset($_GET['rx']) || $_GET['rx'] <= "") { 
		if ($algorithm == 0 || $algorithm == 12 || $algorithm ==13) {
			$rx =  0.5;
		} elseif  ($algorithm == 1){ 
			$rx = 1.75;
		} elseif  ($algorithm == 2){ 
			$rx = 2.25;
		} elseif  ($algorithm == 3){ 
			$rx = 5;
		} elseif  ($algorithm == 4){ 
			$rx = 2;
		} else {
			$rx =  1;
		}
	} else { $rx = $_GET['rx']; }

	if (!isset($_GET['ty']) || $_GET['ty'] <= "") { 
		if ($algorithm == 0) {
			$ty =  1.25;
		} elseif  ($algorithm == 1){ 
			$ty= 1;
                } elseif  ($algorithm == 2){
                        $ty = 2;
                } elseif  ($algorithm == 3){
                        $ty = 5;
                } elseif  ($algorithm == 4){
                        $ty = 2;
		} else {
			$ty =  1.25;
		}
	} else { $ty = $_GET['ty']; }
	if (!isset($_GET['by']) || $_GET['by'] <= "") { 
		if ($algorithm == 0) {
			$by =  -1.25;
		} elseif  ($algorithm == 1){ 
			$by = -1;
                } elseif  ($algorithm == 2){
                        $by = -2;
                } elseif  ($algorithm == 3){
                        $by = -5;
                } elseif  ($algorithm == 4){
                        $by = -2;
		} else {
			$by =  -1.25;
		}
	} else { $by = $_GET['by']; }
	if (!isset($_GET['cr']) || $_GET['cr'] <= "") { 
		if ($algorithm == 1) {
			$cr = -.844;
		} elseif ($algorithm == 5) {
			$cr = -.566;
		} elseif ($algorithm == 9 or $algorithm == 10) {
			$cr = .5;
		} else {
			$cr = -.844;
		}
        } else { $cr = $_GET['cr']; }

        if (!isset($_GET['ci']) || $_GET['ci'] <= "") {
                if ($algorithm == 1) {
                        $ci =.2;
		} elseif ($algorithm == 5) {
			$ci = .5;
		} elseif ($algorithm == 9 or $algorithm == 10 or $algorithm == 11) {
			$ci = .5;
		} else {
			$ci = .2;
                }
        } else { $ci = $_GET['ci']; }
	if (!isset($_GET['colorscheme']) || $_GET['colorscheme'] <= "") { $colorscheme= 0; } else { $colorscheme = $_GET['colorscheme']; }
	if (!isset($_GET['colorscheme_script']) || $_GET['colorscheme_script'] <= "") { 
		$colorscheme_script = "precision*.03 RGBA:255,0,0,255\n";
		$colorscheme_script  .= "precision*.05 RGBA:255,255,0,255\n";
		$colorscheme_script  .= "precision*.1 RGBA:0,255,0,255\n";
		$colorscheme_script  .= "precision*.2 RGBA:0,255,255,255\n";
		$colorscheme_script  .= "precision RGBA:0,0,255,255\n";
		$colorscheme_script  .= "else RGBA:0,0,0,255";
	} else { $colorscheme_script =  str_replace("PLUS","+",str_replace(";","\n", $_GET['colorscheme_script'])); }
	//} else { $colorscheme_script = str_replace("%20"," ",str_replace(";","\n", $_GET['colorscheme_script'])); }
	if (!isset($_GET['antialias']) || $_GET['antialias'] <= "") { $antialias= 0; } else { $antialias = $_GET['antialias']; }
	if (!isset($_GET['width']) || $_GET['width'] <= "") { 	
		$width= 300;
	} else { $width = $_GET['width']; }
	
	?>
	<body>
	
	<script type="text/javascript" src="fractal.js"></script>
	<script type="text/javascript" src="fractal_dwell.js"></script>
	<script type="text/javascript" src="fractal_geometric_draw.js"></script>
	<script type="text/javascript" src="color_lib.js"></script>
	<script type="text/javascript" src="tools_rec.js"></script>
	<script type="text/javascript" src="global_lib.js"></script>
	<script type="text/javascript" src="canvas_lib.js"></script>
	<script type="text/javascript" src="canvas2image.js"></script>
	<script type="text/javascript" src="base64.js"></script>
	<script type="text/javascript" src="slider.js"></script>
	<script type="text/javascript" src="tabcontent.js">
	/***********************************************
	* Tab Content script v2.2- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
	* This notice MUST stay intact for legal use
	* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
	***********************************************/
	</script>
	<link rel="stylesheet" type="text/css" href="tabcontent.css" />
	<!--[if IE]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
	<script type="text/javascript" language="JavaScript"> 
	function create_png() {
		var oCanvas = document.getElementById("theCanvas");  
		var strDataURI = oCanvas.toDataURL();  
		window.open(strDataURI);
	}

	function zoom_out() {
		document.getElementById("ty").value = parseFloat(document.getElementById("ty").value) + (parseFloat(document.getElementById("ty").value)-parseFloat(document.getElementById("by").value))*.5;
		document.getElementById("by").value = parseFloat(document.getElementById("by").value) - (parseFloat(document.getElementById("ty").value)-parseFloat(document.getElementById("by").value))*.5;
		document.getElementById("rx").value = parseFloat(document.getElementById("rx").value) + (parseFloat(document.getElementById("rx").value)-parseFloat(document.getElementById("lx").value))*.5;
		document.getElementById("lx").value = parseFloat(document.getElementById("lx").value) - (parseFloat(document.getElementById("rx").value)-parseFloat(document.getElementById("lx").value))*.5;
		redraw();
	}

	function resetcoords() {
		document.getElementById("ty").value = "";
		document.getElementById("by").value = "";
		document.getElementById("rx").value = "";
		document.getElementById("lx").value = "";
		if (document.getElementById("algorithm").value ==1 || document.getElementById("algorithm").value ==5 || document.getElementById("algorithm").value ==9 || document.getElementById("algorithm").value ==10 || document.getElementById("algorithm").value ==11 || document.getElementById("algorithm").value ==14) {
			document.getElementById('Julia_args').style.display = '';
		} else {
			document.getElementById('Julia_args').style.display = 'none';
		}
	}

	function setColorText(colorscheme_selector) {
		var color_scheme = colorscheme_selector.value;
		var color_txt = "";
		if (color_scheme == 0) {
		//simple
			color_txt = "precision*.03 RGBA:255,0,0,255\n";
			color_txt += "precision*.05 RGBA:255,255,0,255\n";
			color_txt += "precision*.1 RGBA:0,255,0,255\n";
			color_txt += "precision*.2 RGBA:0,255,255,255\n";
			color_txt += "precision RGBA:0,0,255,255\n";
			color_txt += "else RGBA:0,0,0,255";
		} else if (color_scheme == 1) {
			// 5 color cyclic
			color_txt = "precision RGB_cycle:5,27,52,94\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 2) {
			// 5 color cyclic
			color_txt = "precision RGB_cycle:5,187,90,69\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 3) {
			// 12 color cyclic
			color_txt = "precision RGB_cycle:12,27,52,94\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 4) {
			// 36 color cyclic
			color_txt = "precision RGB_cycle:36,27,52,94\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 5 ) {
			// HSV 0-360
			color_txt = "precision H_range:0,360,ITER\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 6) {
			// HSV 360-0
			color_txt   = "precision H_range:360,0,ITER\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 7) {
			color_txt   = "precision/80 H_range:0,120,ITER\n";
			color_txt += "precision/20 H_range:120,280,ITER\n";
			color_txt += "precision/10 H_range:280,20,ITER\n";
			color_txt += "precision/5 H_range:20,180,ITER\n";
			color_txt += "precision H_range:180,360,ITER\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 8) {
			color_txt   = "precision*.1 H_range:0,120,ITER\n";
			color_txt += "precision*.3 H_range:120,280,ITER\n";
			color_txt += "precision*.5 H_range:280,20,ITER\n";
			color_txt += "precision*.7 H_range:20,180,ITER\n";
			color_txt += "precision H_range:180,360,ITER\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 9) {
			color_txt   = "precision*.03 H_range:0,120,ITER\n";
			color_txt += "precision*.05 H_range:120,280,ITER\n";
			color_txt += "precision*.1 H_range:280,20,ITER\n";
			color_txt += "precision*.7 H_range:20,180,ITER\n";
			color_txt += "precision H_range:180,360,ITER\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 10) {
			color_txt = "precision*.03 HSV_range:0,120,ITER,DX*100,DY*100\n";
			color_txt += "precision*.05 HSV_range:120,280,ITER,DX*100,DY*100\n";
			color_txt += "precision*.1 HSV_range:280,20,ITER,DX*100,DY*100\n";
			color_txt += "precision*.7 HSV_range:20,180,ITER,DX*100,DY*100\n";
			color_txt += "precision HSV_range:180,360,ITER,DX*100,DY*100\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 11) {
			color_txt = "precision*.03 HSV_range:0,120,ITER,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100,Math.sqrt(DY^2+DX^2)*100\n";
			color_txt += "precision*.05 HSV_range:120,280,ITER,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100,Math.sqrt(DY^2+DX^2)*100\n";
			color_txt += "precision*.1 HSV_range:280,20,ITER,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100,Math.sqrt(DY^2+DX^2)*100\n";
			color_txt += "precision*.7 HSV_range:20,180,ITER,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100,Math.sqrt(DY^2+DX^2)*100\n";
			color_txt += "precision HSV_range:180,360,ITER,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100,Math.sqrt(DY^2+DX^2)*100\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 12) {
			color_txt = "precision*.03 HSV_range:0,120,ITER,Math.sqrt(DY^2+DX^2)*100,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.05 HSV_range:120,280,ITER,Math.sqrt(DY^2+DX^2)*100,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.1 HSV_range:280,20,ITER,Math.sqrt(DY^2+DX^2)*100,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.7 HSV_range:20,180,ITER,Math.sqrt(DY^2+DX^2)*100,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision HSV_range:180,360,ITER,Math.sqrt(DY^2+DX^2)*100,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "else RGB:0,0,0";	
		} else if (color_scheme == 13) {
			color_txt = "precision*.01 HSV_range:0,120,ITER,Math.sqrt(DY^2+DX^2)*100,Math.atan(DX/DY)*100\n";
			color_txt += "precision*.03 H_range:120,280,ITER\n";
			color_txt += "precision*.05 RGB_cycle:3,86,150,230\n";
			color_txt += "precision*.1 HSV_range:20,180,ITER,DX*100,DY*100\n";
			color_txt += "precision RGBA:255,255,255,255\n";
			color_txt += "else RGB:0,0,0";	
			
		} else if (color_scheme == 14) {
			color_txt = "precision H_range:20,180,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "else RGB:0,0,0";
		} else if (color_scheme == 15) {
			color_txt = "precision*.03 H_range:0,120,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.05 H_range:120,280,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.1 H_range:280,20,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision*.7 H_range:20,180,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "precision H_range:180,360,((Math.atan(DX/DY)+(Math.PI/2))/Math.PI)*100\n";
			color_txt += "else RGB:0,0,0";
		} else {
			color_txt = "precision RGBA:255,255,255,255\n";
			color_txt += "else RGBA:0,0,0,255";
		}
		document.getElementById("colorscheme_script").value = color_txt;
		//redirectURL = getredirectURL();
		//document.getElementById("URL").value  = redirectURL;
	}

	function getredirectURL(){
		redirectURL = "http://guydmann.no-ip.org/code/fractal_app/index.php";
		redirectURL += "?algorithm=" + document.getElementById("algorithm").value + "&";
		redirectURL += "colorscheme=" + document.getElementById("colorscheme").value + "&";
		cs_text  = document.getElementById("colorscheme_script").value.replace(/\n/g,";");
		cs_text = cs_text.replace(/\+/g,"PLUS");
		cs_text = escape(cs_text) ;
		redirectURL += "colorscheme_script=" + cs_text + "&";
		redirectURL += "width=" + document.getElementById("width").value + "&";
		redirectURL += "precision=" + document.getElementById("precision").value + "&";
		redirectURL += "antialias=" 
		if  (document.getElementById("antialias").checked) {
			redirectURL += "1&";
		} else {
			redirectURL += "0&";
		}
		if (document.getElementById("algorithm").value ==1 || document.getElementById("algorithm").value ==5 || document.getElementById("algorithm").value ==9 || document.getElementById("algorithm").value ==10 || document.getElementById("algorithm").value ==11) {
			redirectURL += "cr=" + document.getElementById("cr").value + "&";
			redirectURL += "ci=" + document.getElementById("ci").value + "&";
		}
		redirectURL += "lx=" + document.getElementById("lx").value + "&";
		redirectURL += "rx=" + document.getElementById("rx").value + "&";
		redirectURL += "ty=" + document.getElementById("ty").value + "&";
		redirectURL += "by=" + document.getElementById("by").value;
		return redirectURL;
	}

	function recolor(){
		//this will need to check if the width in the width field is different from that of the canvas. 
		//if they are different it should reload the page pass the propoer variables to redraw the image at the larger width on a larger canvas
		var canvas = document.getElementById("theCanvas");
		//hack to get around popups for the pause in chrome. not sure if it helps in other browsers
		redirectURL = getredirectURL();
		document.getElementById("URL").value  = redirectURL;
		color();

	}

	function redraw(){
		//this will need to check if the width in the width field is different from that of the canvas. 
		//if they are different it should reload the page pass the propoer variables to redraw the image at the larger width on a larger canvas
		var canvas = document.getElementById("theCanvas");
		//hack to get around popups for the pause in chrome. not sure if it helps in other browsers
		redirectURL = getredirectURL();
		if (canvas.width != document.getElementById("width").value ) {
			window.location = redirectURL;
		} else {
			document.getElementById("URL").value  = redirectURL;
			draw();
		}
	}
	 
	</script> 
	<body onLoad="init();">
	
	

	<div style="padding: 3em">
	<div style="text-align: center">
		<h2>Welcome to the Fractal App Canvas Edition</h2>
		To zoom on a section of the fractal click and drag to highlight the region.<br>
		Other controls can be found in the control panel<br>
		You can reload the page or click <a href="./">here</a><br><br>
		This program uses Javascript to render the images to the new canvas element available in HTML5.<br>
		This page has been tested with Firefox 3.6, Opera 10.5 and Chrome.<br>
		The source repository can be found at <a href="http://github.com/guydmann/fractal_app">http://github.com/guydmann/fractal_app</a><br><br>
		
	</div>
	<canvas id="theCanvas" width="<?php echo $width; ?>" height="<?php echo ($width); ?>">Fallback content, in case the browser does not support Canvas.</canvas>
	<div style="float:right; padding: 1em">

		<table>
			<tr>
				<td><input type="submit" value="Redraw"  onclick="redraw();"></td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td>
					<input type="submit" value="Zoom Out"  onclick="zoom_out();">
				</td>
				<td>
					<input type="submit" value="Reset Coords"  onclick="resetcoords();redraw();">
				</td>
			</tr>
		</table>
		<textarea name="sys_out" id="sys_out" rows="8" cols="60" style="overflow-y: scroll;"></textarea>
		<br><br><br>
		<div>
			<ul id="controltabs" class="modernbricksmenu2">
				<li><a href="#" rel="controltab1" class="selected">Algorithm</a></li>
				<li><a href="#" rel="controltab2">Coloring</a></li>
				<li><a href="#" rel="controltab3">Image</a></li>
				<li><a href="#" rel="controltab4">Coords</a></li>
				<li><a href="#" rel="controltab5">Credits</a></li>
			</ul>
		</div>				
		<div style="border:1px solid gray; width:425px; margin-bottom: 1em; padding: 10px">
			<form name="sampleForm" style="margin: 0px; padding: 0px;"> 
			<div name="ALGORITHM"  id="controltab1" class="tabcontent">
				Algorithm:
					<select name="algorithm" id="algorithm" onchange="resetcoords();"> 
						<option <?php if ($algorithm == 0) {  print "selected ";} ?> value=0>Mandelbrot (Quadratic)</option> 
						<option <?php if ($algorithm == 1) {  print "selected ";} ?> value=1>Julia (Quadratic)</option> 
						<option <?php if ($algorithm == 2) {  print "selected ";} ?> value=2>Burning Ship</option> 
						<option <?php if ($algorithm == 3) {  print "selected ";} ?> value=3>Newton</option> 
						<option <?php if ($algorithm == 4) {  print "selected ";} ?> value=4>Star</option> 
						<option <?php if ($algorithm == 5) {  print "selected ";} ?> value=5>Phoenix, Julia type</option> 
						<option <?php if ($algorithm == 6) {  print "selected ";} ?> value=6>Phoenix, Mandelbrot type</option> 
						<option <?php if ($algorithm == 7) {  print "selected ";} ?> value=7>Cubic Mandelbrot</option> 
						<option <?php if ($algorithm == 8) {  print "selected ";} ?> value=8>Quartic Mandelbrot</option> 
						<option <?php if ($algorithm == 9) {  print "selected ";} ?> value=9>Cubic Julia</option> 
						<option <?php if ($algorithm == 10) {  print "selected ";} ?> value=10>Quartic Julia</option> 
						<option <?php if ($algorithm == 11) {  print "selected ";} ?> value=11>Cubic Julia Experimental</option> 
						<option <?php if ($algorithm == 12) {  print "selected ";} ?> value=12>Buddhabrot Full Traversal</option> 
						<option <?php if ($algorithm == 13) {  print "selected ";} ?> value=13>Buddhabrot Random Traversal</option> 
						<option <?php if ($algorithm == 14) {  print "selected ";} ?> value=14>Buddhabrot Random Traversal Julia</option> 
						<option <?php if ($algorithm == 15) {  print "selected ";} ?> value=15>Buddhabrot Random Traversal Julia experimental </option> 
						<option <?php if ($algorithm == 16) {  print "selected ";} ?> value=16>Buddhabrot Random Traversal with inverse</option> 
						<option <?php if ($algorithm == 17) {  print "selected ";} ?> value=17>Sierpinski Triangle</option> 
						<option <?php if ($algorithm == 99) {  print "selected ";} ?> value=99>Blank</option> 
					</select> <br><br>
					<table><tr><td>Precision:&nbsp;</td><td><input type="text" size="4" name="precision" id="precision" value="<?php echo $precision; ?>"></td></tr></table>
					<div id="Julia_args" 
						<?php
						if ($algorithm == 1 or $algorithm == 5 or $algorithm == 9 or $algorithm == 10 or $algorithm == 11 or $algorithm == 14) {
						?>
							style= "display: "
						<?php
						} else {
						?>
							style= "display: none"
						<?php
						}
						?>
						>
							<br>
							<table cellpadding="0" cellspacing="3"> 
							<tr> 
								<td>C(real):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="Text" name="cr" id="cr" style="border: 1px solid gray;width:40px; height:16px; font-size: 10px;" onchange="A_SLIDERS[0].f_setValue(this.value)"></td> 
								<td> 
								<script language="JavaScript"> 
									var A_TPL1h = {
										'b_vertical' : false,
										'b_watch': true,
										'n_controlWidth': 120,
										'n_controlHeight': 16,
										'n_sliderWidth': 16,
										'n_sliderHeight': 15,
										'n_pathLeft' : 1,
										'n_pathTop' : 1,
										'n_pathLength' : 103,
										's_imgControl': 'img/blueh_bg.gif',
										's_imgSlider': 'img/blueh_sl.gif',
										'n_zIndex': 1
									}
								
									var A_INIT1h = {
										's_form' : 'sampleForm',
										's_name': 'cr',
										'n_minValue' : -1.5,
										'n_maxValue' : 1.5,
										'n_value' : <?php echo $cr; ?>,
										'n_step' : 0.001
									}
									new slider(A_INIT1h, A_TPL1h);
								</script> 
								</td> 
							</tr> 
							</table> 
							<table cellpadding="0" cellspacing="3"> 
							<tr> 
								<td>C(imaginary):&nbsp;<input type="Text" name="ci" id="ci" style="border: 1px solid gray;width:40px; height:16px; font-size: 10px;" onchange="A_SLIDERS[1].f_setValue(this.value)"></td> 
								<td> 
								<script language="JavaScript"> 
									var A_TPL2h = {
										'b_vertical' : false,
										'b_watch': true,
										'n_controlWidth': 120,
										'n_controlHeight': 16,
										'n_sliderWidth': 16,
										'n_sliderHeight': 15,
										'n_pathLeft' : 1,
										'n_pathTop' : 1,
										'n_pathLength' : 103,
										's_imgControl': 'img/blueh_bg.gif',
										's_imgSlider': 'img/blueh_sl.gif',
										'n_zIndex': 1
									}
								
									var A_INIT2h = {
										's_form' : 'sampleForm',
										's_name': 'ci',
										'n_minValue' : -1.5,
										'n_maxValue' : 1.5,
										'n_value' : <?php echo $ci; ?>,
										'n_step' : 0.001
									}
									new slider(A_INIT2h, A_TPL2h);
								</script> 
								</td> 
							</tr> 
							</table> 
						
					</div>
			</div>
			<div name="COLORING" id="controltab2" class="tabcontent">
				<table><tr><td><input type="button" value="Recolor"  onclick="recolor();">&nbsp;&nbsp;&nbsp;</td><td>Color Scheme:&nbsp;</td><td>
				<select name="colorscheme" id="colorscheme" onchange="setColorText(this);"> 
					<option <? if ($colorscheme == 0) {  print "selected ";} ?> value=0>Simple 5 Color</option> 
					<option <? if ($colorscheme == 1) {  print "selected ";} ?> value=1> 5 Color Cyclic 1</option> 
					<option <? if ($colorscheme == 2) {  print "selected ";} ?> value=2>5 Color Cyclic 2</option> 
					<option <? if ($colorscheme == 3) {  print "selected ";} ?> value=3>12 Color Cyclic</option> 
					<option <? if ($colorscheme == 4) {  print "selected ";} ?> value=4>36 Color Cyclic</option> 
					<option <? if ($colorscheme == 5) {  print "selected ";} ?> value=5>H 0-360</option> 
					<option <? if ($colorscheme == 6) {  print "selected ";} ?> value=6>H 360-0</option> 
					<option <? if ($colorscheme == 7) {  print "selected ";} ?> value=7>H(sv) multi 1</option> 
					<option <? if ($colorscheme == 8) {  print "selected ";} ?> value=8>H(sv) multi 2</option> 
					<option <? if ($colorscheme == 9) {  print "selected ";} ?> value=9>H(sv) multi 3</option> 
					<option <? if ($colorscheme == 10) {  print "selected ";} ?> value=10>HSV 1</option> 
					<option <? if ($colorscheme == 11) {  print "selected ";} ?> value=11>HSV 2</option> 
					<option <? if ($colorscheme == 12) {  print "selected ";} ?> value=12>HSV 3</option> 
					<option <? if ($colorscheme == 13) {  print "selected ";} ?> value=13>Mixed Example Case</option> 
					<option <? if ($colorscheme == 14) {  print "selected ";} ?> value=14>H(sv) new</option> 
					<option <? if ($colorscheme == 15) {  print "selected ";} ?> value=15>H(sv) new multi</option> 
					<option <? if ($colorscheme == 99) {  print "selected ";} ?> value=99>2 Color Black and White</option> 
				</select> 
				</td></tr></table>
				<textarea name="colorscheme_script" id="colorscheme_script" rows="10" cols="50"><?php echo $colorscheme_script; ?></textarea>
				<br>
				
			</div>
			<div name="IMAGE" id="controltab3" class="tabcontent">
				<table>
					<tr>
						<td >Canvas Width:&nbsp;</td><td ><input type="text" size="2" name="width" id="width" value="<?php echo $width; ?>">&nbsp;&nbsp;&nbsp;</td>
						<td >Anti-Aliasing:&nbsp;</td><td><INPUT TYPE="checkbox" NAME="antialias"  id="antialias" <?php if ($antialias) {  print "CHECKED";}  ?>></td>
					</tr>
				</table>
				<table>
					<tr>
						<td>URL:&nbsp;</td><td ><input type="text" size="45" name="URL" id="URL" value="<?php echo $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];?>"></td>
					</tr>
				</table>
				<br><br>
				<input type="button" value="Open as PNG"  onclick="create_png();">
				
			</div>
			<div name="COORDS" id="controltab4" class="tabcontent">
				<table cellpadding="0" cellspacing="3"> 
					<tr> 
						<td>Left X:&nbsp;</td><td><input type="text" size="4" name="lx" id="lx" value="<?php echo $lx; ?>"></td>
						<td>Right X:&nbsp;</td><td><input type="text" size="4" name="rx" id="rx" value="<?php echo $rx; ?>"></td>
					</tr>
					<tr>
						<td>Top Y:&nbsp;</td><td><input type="text" size="4" name="ty" id="ty" value="<?php echo $ty; ?>"></td>
						<td>Bottom Y:&nbsp;</td><td><input type="text" size="4" name="by" id="by" value="<?php echo $by; ?>"></td>
					</tr>
				</table>
			</div>
			<div name="CREDITS" id="controltab5" class="tabcontent">
				Coding: Guy Mann<br><br>
				special thanks to Yeiguer Contreras for a little extra javascript wizardry, BoingBoing for inspiration to move forward and Cai for putting up with me showing him all my incremental updates.
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var controls=new ddtabcontent("controltabs")
		controls.setpersist(true)
		controls.setselectedClassTarget("link") //"link" or "linkparent"
		controls.init()
	</script>
	</form>
	<br>
	<br>
	<br>
	<br>
	</div>
	
</body>
</html>


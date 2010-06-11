<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include("../../header.html"); //this is style information for my webpage, not needed for depoloyment elsewhere ?>

<?php include("../../topbar.phtml"); //this is style information for my webpage, not needed for depoloyment elsewhere ?><br>
<?php 
	if (!isset($_GET['algorithm']) || $_GET['algorithm'] <= "") { $algorithm = 0; } else { $algorithm = $_GET['algorithm']; }
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
			$lx = -2.25;
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
			$rx =  2.25;
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
			$ty =  1.5;
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
			$by =  -1.5;
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
	if (!isset($_GET['antialias']) || $_GET['antialias'] <= "") { $antialias= 0; } else { $antialias = $_GET['antialias']; }
	if (!isset($_GET['width']) || $_GET['width'] <= "") { 	
		$width= 500;
	} else { $width = $_GET['width']; }
	
	?>
	<body>
	
	<script type="text/javascript" src="fractal.js"></script>
	<script type="text/javascript" src="fractal_dwell.js"></script>
	<script type="text/javascript" src="color_lib.js"></script>
	<script type="text/javascript" src="tools_rec.js"></script>
	<script type="text/javascript" src="global_lib.js"></script>
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
		if (document.getElementById("algorithm").value ==1 || document.getElementById("algorithm").value ==5 || document.getElementById("algorithm").value ==9 || document.getElementById("algorithm").value ==10 || document.getElementById("algorithm").value ==11) {
			document.getElementById('Julia_args').style.display = '';
		} else {
			document.getElementById('Julia_args').style.display = 'none';
		}
	}

	function redraw(){
		//this will need to check if the width in the width field is different from that of the canvas. 
		//if they are different it should reload the page pass the propoer variables to redraw the image at the larger width on a larger canvas
		var canvas = document.getElementById("theCanvas");
		redirectURL = "http://guydmann.no-ip.org/code/fractal_app/index.php";
		redirectURL += "?algorithm=" + document.getElementById("algorithm").value + "&";
		redirectURL += "colorscheme=" + document.getElementById("colorscheme").value + "&";
		redirectURL += "width=" + document.getElementById("width").value + "&";
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
		//hack to get around popups for the pause in chrome. not sure if it helps in other browsers
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
		<h2>Welcome to the Fractal Zoomer HTML5 Canvas Edition</h2>
		This version uses Javascript to render the images to the new canvas element available in HTML5.<br>
		This page has been tested with Firefox 3.6, Opera 10.5 and Chrome.<br>
		The source repository can be found at <a href="http://github.com/guydmann/fractal_app">http://github.com/guydmann/fractal_app</a><br><br>
		To zoom on a section of the fractal click and drag to highlight the region.  You can reload the page or click <a href="./">here</a><br>
	</div>
	<canvas id="theCanvas" width="<?php echo $width; ?>" height="<?php echo ($width); ?>">Fallback content, in case the browser does not support Canvas.</canvas>
	<div style="float:right; padding: 2em">

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
		<textarea name="sys_out" id="sys_out" rows="8" cols="43"></textarea>
		<br><br><br><br>
		<div>
			<ul id="controltabs" class="modernbricksmenu2">
				<li><a href="#" rel="controltab1" class="selected">Algorithm</a></li>
				<li><a href="#" rel="controltab2">Coloring</a></li>
				<li><a href="#" rel="controltab3">Image</a></li>
				<li><a href="#" rel="controltab4">Credits</a></li>
			</ul>
		</div>				
		<div style="border:1px solid gray; width:350px; margin-bottom: 1em; padding: 10px">
			<form name="sampleForm" style="margin: 0px; padding: 0px;"> 
			<div id="controltab1" class="tabcontent">
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
						<option <?php if ($algorithm == 14) {  print "selected ";} ?> value=14>Buddhabrot Random Traversal 2</option> 
						<option <?php if ($algorithm == 15) {  print "selected ";} ?> value=15>Buddhabrot Random Traversal 3</option> 
						<option <?php if ($algorithm == 99) {  print "selected ";} ?> value=99>Blank</option> 
					</select> <br><br>
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
					<div id="Julia_args" 
						<?php
						if ($algorithm == 1 or $algorithm == 5 or $algorithm == 9 or $algorithm == 10 or $algorithm == 11) {
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
								<td>C(imaginary):&nbsp;<input type="Text" name="ci" id="ci" style="border: 1px solid gray;width:40px; height:16px; font-size: 10px;" onchange="A_SLIDERS[0].f_setValue(this.value)"></td> 
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
			<div id="controltab2" class="tabcontent">
				<table>
					<tr>
						<td>Color Scheme:&nbsp;</td>
						<td colspan=3><select name="colorscheme" id="colorscheme"> 
						<option <? if ($colorscheme == 0) {  print "selected ";} ?> value=0>Simple</option> 
						<option <? if ($colorscheme == 1) {  print "selected ";} ?> value=1> 5 Color Cyclic 1</option> 
						<option <? if ($colorscheme == 2) {  print "selected ";} ?> value=2>5 Color Cyclic 2</option> 
						<option <? if ($colorscheme == 3) {  print "selected ";} ?> value=3>12 Color Cyclic 1</option> 
						<option <? if ($colorscheme == 4) {  print "selected ";} ?> value=4>36 Color Cyclic</option> 
						<option <? if ($colorscheme == 5) {  print "selected ";} ?> value=5>HSV 0-360</option> 
						<option <? if ($colorscheme == 6) {  print "selected ";} ?> value=6>HSV 360-0</option> 
						<option <? if ($colorscheme == 7) {  print "selected ";} ?> value=7>HSV with static modulus</option> 
						<option <? if ($colorscheme == 8) {  print "selected ";} ?> value=8>HSV with percentage modulus</option> 
						<option <? if ($colorscheme == 9) {  print "selected ";} ?> value=9>HSV with percentage modulus 2</option> 
						<option <? if ($colorscheme == 10) {  print "selected ";} ?> value=10>TEST 3d HSV</option> 
						<option <? if ($colorscheme == 11) {  print "selected ";} ?> value=11>TEST 3d HSV 2</option> 
						<option <? if ($colorscheme == 12) {  print "selected ";} ?> value=12>TEST 3d HSV 3</option> 
						<option <? if ($colorscheme == 99) {  print "selected ";} ?> value=99>2 Color Black and White</option> 
						</select> 
						<td>
					</tr>
				</table>
			</div>
			<div id="controltab3" class="tabcontent">
				Canvas Width:&nbsp;<input type="text" size="2" name="width" id="width" value="<?php echo $width; ?>"><br>
				Anti-Aliasing:&nbsp;<INPUT TYPE="checkbox" NAME="antialias"  id="antialias" <?php if ($antialias) {  print "CHECKED";}  ?>><br><br>
				<input type="submit" value="Open as PNG"  onclick="create_png();"><br><br>
				URL:&nbsp;<input type="text" size="30" name="URL" id="URL" value="<?php echo $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];?>">
			</div>
			<div id="controltab4" class="tabcontent">
				Coding: Guy Mann<br><br>
				special thanks to Yeiguer Contrera, BoingBoing and Cai
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
	</div>
		
</body>
</html>


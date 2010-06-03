<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include("../../header.html"); //this is style information for my webpage, not needed for depoloyment elsewhere ?>

<?php include("../../topbar.phtml"); //this is style information for my webpage, not needed for depoloyment elsewhere ?><br>
<?php 
	if (!isset($_GET['lx']) || $_GET['lx'] <= "") { 
		if ($algorithm == 0) {
			$lx = -2.25;
		} elseif  ($algorithm == 1){ 
			$lx = -2;
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
			$rx =  0.7;
		} elseif  ($algorithm == 1){ 
			$rx = 2;
		} elseif  ($algorithm == 2){ 
			$rx = 2;
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
			$ty =  1.5;
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
			$by =  -1.5;
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
			$cr = -.7492;
		} elseif ($algorithm == 5) {
			$cr = -.56667;
		} elseif ($algorithm == 9 or $algorithm == 10) {
			$cr = .5;
		} else {
			$cr = null;
		}
        } else { $cr = $_GET['cr']; }

        if (!isset($_GET['ci']) || $_GET['ci'] <= "") {
                if ($algorithm == 1) {
                        $ci =.1;
		} elseif ($algorithm == 5) {
			$ci = .5;
		} elseif ($algorithm == 9 or $algorithm == 10 or $algorithm == 11) {
			$ci = .5;
		} else {
			$ci = null;
                }
        } else { $ci = $_GET['ci']; }
	if (!isset($_GET['algorithm']) || $_GET['algorithm'] <= "") { $algorithm = 0; } else { $algorithm = $_GET['algorithm']; }
	if (!isset($_GET['colorscheme']) || $_GET['colorscheme'] <= "") { $colorscheme= 0; } else { $colorscheme = $_GET['colorscheme']; }
	if (!isset($_GET['width']) || $_GET['width'] <= "") { 	
		$width= 500;
	} else { $width = $_GET['width']; }
	
	?>
	<body>
	
	<script type="text/javascript" src="fractal.js"></script>
	<script type="text/javascript" src="color_lib.js"></script>
	<script type="text/javascript" language="JavaScript"> 
	 
	function resetcoords() {
		document.getElementById("ty").value = "";
		document.getElementById("by").value = "";
		document.getElementById("rx").value = "";
		document.getElementById("lx").value = "";
		if (document.getElementById("algorithm").value ==1 || document.getElementById("algorithm").value ==5 || document.getElementById("algorithm").value ==9 || document.getElementById("algorithm").value ==10 || document.getElementById("algorithm").value ==11) {
			var newHTML = "<td> C(real):</td><td><input type=\"text\" size=\"4\" value=\"\" name=\"cr\" id=\"cr\"> </td>\n<td> C(imaginary):</td><td><input type=\"text\" size=\"4\" value=\"\" name=\"ci\" id=\"ci\"></td>";
			document.getElementById('Julia_args').innerHTML = newHTML
		} else {
			var newHTML = "<td><input type=\"hidden\" size=\"4\" value=\"\" name=\"cr\" id=\"cr\"><td><td><input type=\"hidden\" size=\"4\" value=\"\" name=\"ci\" id=\"ci\"></td>";
			document.getElementById('Julia_args').innerHTML = newHTML
		}
	}
	
	function redraw(){
		//this will need to check if the width in the width field is different from that of the canvas. 
		//if they are different it should reload the page pass the propoer variables to redraw the image at the larger width on a larger canvas
		var canvas = document.getElementById("theCanvas");
		if (canvas.width != document.getElementById("width").value ) {
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
			
			window.location = redirectURL;
		} else {
			draw();
		}
	}
	 
	</script> 
	<body onLoad="init();">
	<table width="100%" border="0">
		<tr>
			<td width="5%"></td>
			<td width="90%" align="center">
			<h2>Welcome to the Fractal Zoomer HTML5 Canvas Edition</h2>
			This version uses Javascript to render the images to the new canvas element available in HTML5.
			This page has been tested with Firefox 3.6, Opera 10.5 and Chrome<br><br>
			To zoom on a section of the fractal click and drag to highlight the region.  You can reload the page or click <a href="./">here</a><br>
			<canvas id="theCanvas" width="<?php echo $width; ?>" height="<?php echo ($width+20); ?>">Fallback content, in case the browser does not support Canvas.</canvas>
			<table> 
		<tr>
		<td> 
		<table> 
			<tr><td> colorscheme:</td><td><select name="colorscheme" id="colorscheme"> 
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
				<option <? if ($colorscheme == 99) {  print "selected ";} ?> value=99>2 Color Black and White</option> 
				</select> 
			<td></tr> 
			<tr><td> algorithm:</td><td><select name="algorithm" id="algorithm" onchange="resetcoords();"> 
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
				<option <?php if ($algorithm == 12) {  print "selected ";} ?> value=12>Mandelbrot Interior Coloring</option> 
				<option <?php if ($algorithm == 13) {  print "selected ";} ?> value=13>Mandelbrot Interior Coloring 2</option> 
				<option <?php if ($algorithm == 99) {  print "selected ";} ?> value=99>Blank</option> 
				</select> 
				</td></tr> 
				<tr id="Julia_args">
					<?php
					if ($algorithm == 1 or $algorithm == 5 or $algorithm == 1 or $algorithm == 9 or $algorithm == 10 or $algorithm == 11) {
					?>
						<td> C(real):</td><td><input type="text" size="4" value="<?php echo $cr; ?>" name="cr" id="cr"> </td><td> C(imaginary):</td><td><input type="text" size="4" value="<?php echo $ci; ?>" name="ci" id="ci"></td>
					<?php
					} else {
					?>
						<td><input type="hidden" size="4" value="" name="cr" id="cr"><td><td><input type="hidden" size="4" value="" name="ci" id="ci"></td>
					<?php
					}
					?>
				</tr> 
				<tr> 
				<td>Width: <input type="text" size="2" name="width" id="width" value="<?php echo $width; ?>"> </td>
				</tr>
		</table>
		</td> 
		<td>
		<table> 
			<tr><td> Left X Coord</td><td><input type="text" size="2" name="lx" id="lx" value="<?php echo $lx; ?>"> </td></tr> 
			<tr><td> Right X Coord</td><td><input type="text" size="2" name="rx" id="rx" value="<?php echo $rx; ?>"> </td></tr> 
			<tr><td> Top Y Coord</td><td><input type="text" size="2" name="ty" id="ty" value="<?php echo $ty; ?>"> </td></tr> 
			<tr><td> Bottom Y Coord</td><td><input type="text" size="2" name="by" id="by" value="<?php echo $by; ?>"> </td></tr> 
			<tr><td><br><br> </td></tr> 
		</table>
		</td></tr>
		</table>
		<input type="submit" value="Redraw"  onclick="redraw();"></td>
		<td width="5%"></td>
		</tr>
	</table>
		
</body>
</html>


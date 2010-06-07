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

			if (x==tool.x0 || y==tool.y0) {
				tool.mousemove(ev); 
				tool.started = false;
				return;
			}
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
			redraw();
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
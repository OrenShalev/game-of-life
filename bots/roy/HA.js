(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// structures --------------------------------------------------------------------------------------------------------

function tryPlaceBoom(data) {

	var pixels = [];
		if (data.budget >= 7) {
			
			var c = lastCol;
			var r = getRnd(10,35);

			pixels.push([c, r]);
			pixels.push([c, r-1]);
			pixels.push([c, r-2]);
			pixels.push([c+1, r-2]);
			pixels.push([c+2, r-2]);
			pixels.push([c+2, r-1]);
			pixels.push([c+2, r]);
			

			if (sideFlag == 0) {
				lastCol += 20;
			} else {
				lastCol -= 20;
			}
		}
		return pixels;
	}

function tryPlaceGlider(data) {

	var pixels = [];
		if (data.budget >= 5) {
			
			var c = lastCol;
			var r = 0;

			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push(getRnd(0,1) ? [c, r+1] : [c+2, r+1]);
			pixels.push([c+1, r+2]);

			if (sideFlag == 0) {
				lastCol += 20;
			} else {
				lastCol -= 20;
			}
		}
		return pixels;
	}

	function tryPlaceSpaceship(data) {
		var pixels = [];
		if (data.budget >= 9) {
			
			var c = lastCol;
			var r = 0;
			
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push([c+3, r]);
			pixels.push([c, r+1]);
			pixels.push([c+3, r+1]);
			pixels.push([c+3, r+2]);
			pixels.push([c+3, r+3]);
			pixels.push([c, r+4]);
			pixels.push([c+2, r+4]);

			if (sideFlag == 0) {
				lastCol += 30;
			} else {
				lastCol -= 30;
			}
		}
		return pixels;
	}

	function tryPlaceHaSecret(data) {
		var pixels = [];
		if (data.budget >= 7) {
			
			var c = lastCol;
			var r = 70;

			pixels.push([c, r]);
			pixels.push([c+1, r-1]);
			pixels.push([c+2, r-2]);
			pixels.push([c+3, r-3]);
			pixels.push([c+4, r-3]);
			pixels.push([c+5, r-3]);
			pixels.push([c+5, r-2]);

			if (lastCol >= 380) {
				lastCol = 0
			} else {
				lastCol += 30;
			}
		}
		return pixels;
	}

	// bot --------------------------------------------------------------------------------------------------------------

	var bot = function bot(data) {
		
		if (data.generation === 1) {
			sideFlag = 0;
			lastCol = 20;
		}

		if (lastCol >= 380) {
			sideFlag = 1;
		} else if (lastCol < 20) {
			sideFlag = 0;
		}

		var pixels = [];
		if (data.generation < 100) {
			pixels = tryPlaceHaSecret(data);
		} else if (sideFlag == 0) {
			pixels = tryPlaceBoom(data);
		} else {

			if (switchFlag == 0) {
				pixels = tryPlaceGlider(data);
				if  (pixels.length > 0) {
					switchFlag = 1;
				}
			} else {
				pixels = tryPlaceSpaceship(data);
				if  (pixels.length > 0) {
					switchFlag = 0;
				}
			}
			

		}
		return pixels;
	};

	// init --------------------------------------------------------------------------------------------------------------

	var switchFlag = 0;
	var sideFlag = 0;
	var lastCol = 20;
    var bot = {name: 'HA!', icon:'bot', cb: bot};        
    	
	setTimeout(function registerArmy() {
		window.registerArmy({
			name: bot.name,
			icon: bot.icon,
			cb: bot.cb
		});
	}, 2000);

})();
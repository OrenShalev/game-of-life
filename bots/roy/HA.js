(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// structures --------------------------------------------------------------------------------------------------------

function tryPlaceGlider(data) {

	var pixels = [];
		if (data.budget >= 5) {
			
			var c = lastCol;
			var r = 0;

			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push(sideFlag ? [c, r+1] : [c+2, r+1]);
			pixels.push([c+1, r+2]);

			if (sideFlag == 0) {
				lastCol += 15;
			} else {
				lastCol -= 15;
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
				lastCol += 25;
			} else {
				lastCol -= 25;
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

			if (lastCol >= 370) {
				lastCol = 20
			} else {
				lastCol += 30;
			}
		}
		return pixels;
	}

	// bot --------------------------------------------------------------------------------------------------------------

	var bot = function bot(data) {
		
		if (lastCol >= 380) {
			sideFlag = 1;
		} else if (lastCol < 20) {
			sideFlag = 0;
		}

		var pixels = [];
		if (data.generation < 100) {
			pixels = tryPlaceHaSecret(data);
		} else if (sideFlag == 0) {
			pixels = tryPlaceSpaceship(data);
		} else {
			pixels = tryPlaceGlider(data);
		}
		return pixels;
	};

	// init --------------------------------------------------------------------------------------------------------------

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

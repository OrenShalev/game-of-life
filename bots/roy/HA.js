(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// structures --------------------------------------------------------------------------------------------------------

	function tryPlaceGuard(data, col, row) {
		var pixels = [];
		if (data.budget >= 5) {
		
			var c = col;
			var r = row;

			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c-1, r]);
			pixels.push([c, r+1]);
			pixels.push([c, r-1]);
		}
		return pixels;
	}

	function tryPlaceGlider(data, col, row) {
		var pixels = [];
		if (data.budget >= 5) {

			var c = col;
			var r = row;

			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push(data.generation % 2 ? [c, r+1] : [c+2, r+1]);
			pixels.push([c+1, r+2]);
		}
		return pixels;
	}

	function tryPlaceSpaceship(data, col, row) {
		var pixels = [];
		if (data.budget >= 9) {
		
			var c = col;
			var r = row;
	
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push([c+3, r]);
			pixels.push([c, r+1]);
			pixels.push([c+3, r+1]);
			pixels.push([c+3, r+2]);
			pixels.push([c+3, r+3]);
			pixels.push([c, r+4]);
			pixels.push([c+2, r+4]);
		}
		return pixels;
	}

	function tryPlaceHaSecret(data, col, row) {
		var pixels = [];
		if (data.budget >= 7) {
			
			var c = col;
			var r = row;

			pixels.push([c, r]);
			pixels.push([c+1, r-1]);
			pixels.push([c+2, r-2]);
			pixels.push([c+3, r-3]);
			pixels.push([c+4, r-3]);
			pixels.push([c+5, r-3]);
			pixels.push([c+5, r-2]);	

			lastCol += 40;		
		}
		return pixels;
	}

	// bot --------------------------------------------------------------------------------------------------------------

	var bot = function bot(data) {

		var pixels = [];
		
		if (data.generation === 0) {
			enforceGuard = 0;
			lastCol = 20;
		}

		if (lastCol >= 381) {
			lastCol = 20;
		}

		if (data.generation < 75) {
			pixels = tryPlaceHaSecret(data, lastCol, 70);
		} else if (data.generation < 250) {
			if (data.generation % 2) {
				pixels = tryPlaceSpaceship(data, 0, 0);
			} else {
				pixels = tryPlaceSpaceship(data, 395, 0);
			}
		} else if (data.generation < 350) {
			pixels = tryPlaceHaSecret(data, lastCol, 5);
		} else {
	
			if (enforceGuard > 50 && enforceGuard < 100) {
				pixels = tryPlaceHaSecret(data, getRnd(5,395), getRnd(10,80));
				if (pixels.length > 0) {
					enforceGuard ++;
				}
			} else {
				if (enforceGuard > 100) {
					enforceGuard = 0;
				}
				pixels = tryPlaceSpaceship(data, lastCol, 0);
				if (pixels.length > 0) {
					lastCol += 40;
					enforceGuard ++;
				}
			}
		}
		return pixels;
	};

	// init --------------------------------------------------------------------------------------------------------------

	var enforceGuard = 0;
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

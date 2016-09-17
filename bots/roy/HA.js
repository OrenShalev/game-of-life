(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// structures --------------------------------------------------------------------------------------------------------

	function tryPlaceHaSecret(data) {
		var pixels = [];
		if (data.budget >= 9) {

			var c = haLastCol;
			var r = getRnd(50, 80);

			pixels.push([c, r]);
			pixels.push([c, r+1]);
			pixels.push([c+1, r+1]);
			pixels.push([c+1, r+2]);
			pixels.push([c+2, r+1]);
			pixels.push([c+4, r]);
			pixels.push([c+5, r]);
			pixels.push([c+5, r+1]);
			pixels.push([c+6, r]);

			// prepare for next haSecret.
			haLastCol += 20;
			if (haLastCol >= 400) {
				haLastCol = 0
			}
		}
		return pixels;
	}

	function tryPlaceSpaceship(data) {
		var pixels = [];
		if (data.budget >= 9) {

			var c = spaceShipLastCol;
			var r = 0;

			if (c < data.cols / 2) {
				pixels.push([c+1, r]);
				pixels.push([c+2, r]);
				pixels.push([c+3, r]);
				pixels.push([c, r+1]);
				pixels.push([c+3, r+1]);
				pixels.push([c+3, r+2]);
				pixels.push([c+3, r+3]);
				pixels.push([c, r+4]);
				pixels.push([c+2, r+4]);
			} else {
				pixels.push([c, r]);
				pixels.push([c+1, r]);
				pixels.push([c+2, r]);
				pixels.push([c, r+1]);
				pixels.push([c+3, r+1]);
				pixels.push([c, r+2]);
				pixels.push([c, r+3]);
				pixels.push([c+1, r+4]);
				pixels.push([c+3, r+4]);
			}

			spaceShipLastCol += 56;
			if (spaceShipLastCol >= 400) {
				spaceShipLastCol = 0
			}
		}
		return pixels;
	}

	// bots --------------------------------------------------------------------------------------------------------------

	var ha = function bot1(data) {
		var pixels = [];

		if (data.generation < 200) {
			pixels = tryPlaceHaSecret(data);
		} else if (data.generation < 400) {
			pixels = tryPlaceSpaceship(data);
		} else if (data.generation < 600) {
			pixels = tryPlaceHaSecret(data);
		}  else {
			pixels = tryPlaceSpaceship(data);
		}
		return pixels;
	};

	// init --------------------------------------------------------------------------------------------------------------

	var haLastCol = 0;
	var spaceShipLastCol = 0;
	var bot = {name: 'HA!', icon:'bot', cb: ha};

	setTimeout(function registerArmy() {
		window.registerArmy({
			name: bot.name,
			icon: bot.icon,
			cb: bot.cb
		});
	}, 2000);

})();

(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// structures --------------------------------------------------------------------------------------------------------

	function tryPlaceRoysAirplane(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 8) {
			c = col || getRnd(0, data.cols - 2);
			r = row || getRnd(20, 80);
			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c+2, r]);
			pixels.push([c+3, r]);

			pixels.push([c+1, r+1]);
			pixels.push([c+1, r-1]);

			pixels.push([c+3, r+1]);
			pixels.push([c+3, r-1]);
			
		}
		return pixels;
	}

	function tryPlaceSpaceship(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 9) {
			c = col || getRnd(0, data.cols - 4);
			r = row || 0;
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
		}
		return pixels;
	}

	// bots --------------------------------------------------------------------------------------------------------------

	var bot = function bot1(data) {
		var pixels = [];
		var plan;
		if (data.generation === 1) {
			planIndex = 0;
      		fenceLocation = 0;
		}
		if (data.generation < 300) {
			plan = ['mine'];
		} else if (data.generation < 500) {
			plan = ['spaceship'];
		} else {
			plan = ['spaceship', 'spaceship', 'spaceship', 'spaceship'];
		}
		if (plan[planIndex] === 'mine') {
			pixels = tryPlaceRoysAirplane(data);
		} else if (plan[planIndex] === 'spaceship') {
			pixels = tryPlaceSpaceship(data, null, 0);
		}
		if (pixels.length > 0) {
			planIndex = (planIndex + 1) % plan.length;
		}
		return pixels;
	};

	// init --------------------------------------------------------------------------------------------------------------

	var planIndex = 0;
	var fenceLocation = 0;
	var bots = [
		{name: 'HA!',   icon:'bot', cb: bot}
	];
	//var b = (localStorage.getItem('game-of-life-training-bot-index') || 0) % bots.length;
	var b = getRnd(0, bots.length-1);
    var bot = bots[0];        
    //b = (b + 1) % bots.length;
    //localStorage.setItem('game-of-life-training-bot-index', b);	
	setTimeout(function registerArmy() {
		window.registerArmy({
			name: bot.name,
			icon: bot.icon,
			cb: bot.cb
		});
	}, 2000);

})();

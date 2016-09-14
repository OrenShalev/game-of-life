(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function _hiss(msg) {
		console.log('COBRAS ' + msg);
	}
	// structures --------------------------------------------------------------------------------------------------------

	// budget 16 ------------------------------------------

	function placePuffer(pixels, c, r) {
		// Noah's ark
		// top switch engine
		pixels.push([c+9, r+13]);
		pixels.push([c+10, r+12]);
		pixels.push([c+10, r+14]);
		pixels.push([c+12, r+11]);
		pixels.push([c+12, r+14]);
		pixels.push([c+13, r+11]);
		pixels.push([c+13, r+12]);
		pixels.push([c+14, r+11]);
		// bottom switch engine
		pixels.push([c, r+2]);
		pixels.push([c, r+4]);
		pixels.push([c+1, r+5]);
		pixels.push([c+2, r+1]);
		pixels.push([c+2, r+4]);
		pixels.push([c+3, r]);
		pixels.push([c+3, r+1]);
		pixels.push([c+3, r+2]);
	}

	function tryPlacePuffer(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 16) {
			c = col || getRnd(0, data.cols - 15);
			r = row || 0;
			placePuffer(pixels, c, r);
		}
		return pixels;
	}

	// budget 9 ------------------------------------------

	function placeSpaceship(pixels, c, r, isLeft) {
		if (isLeft) {
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
	
	function tryPlaceSpaceship(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 9) {
			c = col || getRnd(0, data.cols - 4);
			r = row || 0;
			placeSpaceship(pixels, c, r, c < data.cols / 2); 
		}
		return pixels;
	}
	
	// budget 7 ------------------------------------------

	function placeEater(pixels, c, r) {
		//fishhook
		pixels.push([c, r+2]);
		pixels.push([c, r+3]);
		pixels.push([c+1, r+3]);
		pixels.push([c+2, r]);
		pixels.push([c+2, r+1]);
		pixels.push([c+2, r+2]);
		pixels.push([c+3, r]);

	}
	
	function tryPlaceEater(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 7) {
			c = col || getRnd(0, data.cols - 4);
			r = row || getRnd(20, 80);
			placeEater(pixels, c, r);
		}
		return pixels;
	}
	
	function placeLoaf(pixels, c, r) {
		pixels.push([c, r+2]);
		pixels.push([c+1, r+1]);
		pixels.push([c+1, r+3]);
		pixels.push([c+2, r]);
		pixels.push([c+2, r+3]);
		pixels.push([c+3, r+1]);
		pixels.push([c+3, r+2]);
	}
	
	function tryPlaceLoaf(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 7) {
			c = col || getRnd(0, data.cols - 4);
			r = row || getRnd(20, 80);
			placeLoaf(pixels, c, r);
		}
		return pixels;
	}

	// budget 6 ------------------------------------------

	function placeCentury(pixels, c, r) {
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+1]);
		pixels.push([c+2, r+1]);
		pixels.push([c+2, r+2]);
		pixels.push([c+3, r+2]);
	}

	function tryPlaceCentury(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 6) {
			c = col || getRnd(0, data.cols - 4);
			r = row || getRnd(20, 40);
			placeCentury(pixels, c, r);
		}
		return pixels;
	}

	function placeBeehive(pixels, c, r) {
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+2]);
		pixels.push([c+2, r]);
		pixels.push([c+2, r+2]);
		pixels.push([c+3, r+1]);
	}
	
	function tryPlaceBeehive(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 6) {
			c = col || getRnd(0, data.cols - 4);
			r = row || getRnd(20, 80);
			placeBeehive(pixels, c, r);
		}
		return pixels;
	}

	// budget 5 ------------------------------------------
	function placeGlider(pixels, c, r, isLeft) {
		pixels.push([c, r]);
		pixels.push([c+1, r]);
		pixels.push([c+2, r]);
		pixels.push(isLeft ? [c, r+1] : [c+2, r+1]);
		pixels.push([c+1, r+2]);
	}
	
	function tryPlaceGlider(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 5) {
			c = col || getRnd(0, data.cols - 3);
			r = row || getRnd(0, data.rows - 3);
			placeGlider(pixels, c, r, getRnd(0, 1) === 0);
		}
		return pixels;
	}
	
	function placeBoat(pixels, c, r) {
		pixels.push([c+1, r+1]);
		pixels.push([c+1, r+2]);
		pixels.push([c+2, r]);
		pixels.push([c+2, r+2]);
		pixels.push([c+3, r+1]);
	}
	
	function tryPlaceBoat(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 5) {
			c = col || getRnd(0, data.cols - 3);
			r = row || getRnd(20, 80);
			placeBoat(pixels, c, r);
		}
		return pixels;
	}
	
	// budget 4 ------------------------------------------

	function placeBlock(pixels, c, r) {
		pixels.push([c, r]);
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+1]);
	}
	
	function tryPlaceBlock(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 4) {
			c = col || getRnd(0, data.cols - 2);
			r = row || getRnd(20, 80);
			placeBlock(pixels, c, r);
		}
		return pixels;
	}

	function placeRock(pixels, c, r) {
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+2]);
		pixels.push([c+2, r+1]);
	}
	
	function tryPlaceRock(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 4) {
			c = col || getRnd(0, data.cols - 2);
			r = row || getRnd(20, 80);
			placeRock(pixels, c, r);
		}
		return pixels;
	}
	
	// budget 3 ------------------------------------------

	function placeMine(pixels, c, r) {
		pixels.push([c, r]);
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
	}
	
	function tryPlaceMine(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 3) {
			c = col || getRnd(0, data.cols - 2);
			r = row || getRnd(20, 80);
			placeMine(pixels, c, r);
		}
		return pixels;
	}

	function tryPlaceFence(data, col, row, dmz) {
		var pixels = [];
		var r, c;
		c = col || fenceColumn;
		r = row || data.rows - dmz - fenceRow;
		if (dmz === 15) {
			pixels = tryPlaceMine(data, c, r);
		} else if (dmz === 20) {
			pixels = tryPlaceRock(data, c, r);
		} else {
			pixels = tryPlaceCentury(data, c, r);
		}
		if (pixels.length > 0) {
			fenceColumn = fenceColumn + dmz - 10;
			if (fenceColumn > data.cols - 2) {
				fenceColumn = 0;
				fenceRow += dmz;
			}
			if (fenceRow > data.rows - 30) {
				fenceRow = 0;
			}
		}
		return pixels;
	}


	// bots --------------------------------------------------------------------------------------------------------------

	function determinePlan(data) {
		var plan = ['century-fence'];
		if (data.generation === 1) {
			planIndex = 0;
			fenceRow = 0;
			fenceColumn = 0;
		}
		return plan;
	}

	function executePlan(data, plan) {
		var pixels = [];
		if (plan[planIndex] === 'mine-fence') {
			pixels = tryPlaceFence(data, null, null, 15);
		} else if (plan[planIndex] === 'rock-fence') {
			pixels = tryPlaceFence(data, null, null, 20);
		} else if (plan[planIndex] === 'century-fence') {
			pixels = tryPlaceFence(data, null, null, 25);
		}
		if (pixels.length > 0) {
			planIndex = (planIndex + 1) % plan.length;
		}
		return pixels;
	}

	var bot = function kingCobra(data) {
		var plan = determinePlan(data);
		var pixels = executePlan(data, plan);
		return pixels;
	};


	// init --------------------------------------------------------------------------------------------------------------

	var planIndex = 0;
	var fenceRow = 0;
	var fenceColumn = 0;
	var fenceLocation = 0;

	setTimeout(function registerArmy() {
		window.registerArmy({
			name: 'COBRAS',
			icon: 'cobra',
			cb: bot
		});
	}, 2000);

})();

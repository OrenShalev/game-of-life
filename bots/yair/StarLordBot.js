(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function _hiss(msg) {
		console.log('COBRAS ' + msg);
	}
	// structures --------------------------------------------------------------------------------------------------------

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
			r = row || 0; //getRnd(0, data.rows - 3);
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
		c = col || Math.floor(fenceColumn + (data.cols / areas) * areasCounter);
		r = row || fenceRow;
		if (dmz === 15) {
			pixels = tryPlaceMine(data, c, r);
		} else {
			pixels = tryPlaceRock(data, c, r);
		}
		if (pixels.length > 0) {
			areasCounter ++;
			if (areasCounter == areas) {
				fenceColumn += 5;
				areasCounter = 0;	
			}
			
			if (fenceColumn > (data.cols - 2) / areas) {
				fenceColumn = 0;
				fenceRow += 10;
				if (fenceRow >= data.rows - 1){
					fenceRow = data.rows - 50;
				}
			}
			// if (fenceRow > data.rows - 30) {
			// 	fenceRow = 0;
			// }
		}
		return pixels;
	}

	function tryPlaceSimpleFence(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 3) {
			c = col || Math.floor(fenceColumn + (data.cols / areas) * areasCounter);
			r = row || data.rows - 50;
			pixels.push([c, r]);
			pixels.push([c+1, r]);
			pixels.push([c + 2, r]);
			
			areasCounter ++;
			if (areasCounter == areas) {
				fenceColumn += 4;
				areasCounter = 0;	
			}

			if (fenceColumn >= (data.cols - 2) / areas) {
				fenceColumn = 0;
				simpleFenceBuilt = true;
			}
		}
		return pixels;
	}
	// bots --------------------------------------------------------------------------------------------------------------

	function determinePlanD(data) {
		var plan = ['mine-fence', 'rock-fence'];
		if (data.generation === 1) {
			planIndex = 0;
			fenceRow = data.rows - 40;
			fenceColumn = 0;
		}
		return plan;
	}

	function determinePlanO(data) {
		var plan;
		if (data.generation === 1) {
			planIndex = 0;
		}
		plan = ['glider', 'spaceship'];
		return plan;
	}

	var areas = 20;
	var areasCounter = 0;
	function executePlan(data, planD, planO) {
		var pixels = [];
		if (!simpleFenceBuilt) {
			pixels = tryPlaceSimpleFence(data, null, null);
		} else {
			var r = getRnd(0, 100);
			if (r < 20) {
				if (planD[planIndex] === 'mine-fence') {
					pixels = tryPlaceFence(data, null, null, 15);
				} else if (planD[planIndex] === 'rock-fence') {
					pixels = tryPlaceFence(data, null, null, 20);
				}
				if (pixels.length > 0) {
					planIndex = (planIndex + 1) % planD.length;
				}
			} else {
				if (planO[planIndex] === 'glider') {
					pixels = tryPlaceGlider(data);
				} else if (planO[planIndex] === 'spaceship') {
					pixels = tryPlaceSpaceship(data, null, 0);
				}
				if (pixels.length > 0) {
					planIndex = (planIndex + 1) % planO.length;
				}
			}
		}
		
		return pixels;
	}

	function init(){
		areasCounter = 0;
		fenceColumn = 0;
		fenceRow = 0;
		simpleFenceBuilt = false;
		planIndex = 0;
	}
	var bot = function kingCobra(data) {
		if (data.generation == 1) {
			init();
		}
		var pixels = [];
		var planD, planO;
		_hiss('budget = ' + data.budget);
		planD = determinePlanD(data);
		planO = determinePlanO(data);
		pixels = executePlan(data, planD, planO);
		return pixels;
	};


	// init --------------------------------------------------------------------------------------------------------------

	var planIndex = 0;
	var fenceColumn = 0;
	var fenceRow = 0;
	var simpleFenceBuilt = false;
	setTimeout(function registerArmy() {
		window.registerArmy({
			name: 'StarLordBot',
			icon: 'cobra',
			cb: bot
		});
	}, 2000);

})();

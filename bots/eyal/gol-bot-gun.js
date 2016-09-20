(function() {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function _hiss(msg) {
		console.log('COBRAS ' + msg);
	}
	// structures --------------------------------------------------------------------------------------------------------

	// budget 36 ------------------------------------------

	function placeGun(pixels, c, r) {
		// Gosper glider gun
		// left to right
		placeBlock(pixels, c, r +11);
		// -- special block
		pixels.push([c+8, r+11]);
		pixels.push([c+8, r+12]);
		pixels.push([c+9, r+11]);
		pixels.push([c+9, r+13]);
		pixels.push([c+10, r+12]);
		pixels.push([c+10, r+13]);
		// -- glider up 16
		pixels.push([c+16, r+9]);
		pixels.push([c+16, r+10]);
		pixels.push([c+16, r+11]);
		pixels.push([c+17, r+11]);
		pixels.push([c+18, r+10]);
		// -- special block
		pixels.push([c+22, r+13]);
		pixels.push([c+22, r+14]);
		pixels.push([c+23, r+13]);
		pixels.push([c+23, r+15]);
		pixels.push([c+24, r+14]);
		pixels.push([c+24, r+15]);
		// -- glider left 24
		pixels.push([c+24, r+1]);
		pixels.push([c+24, r+2]);
		pixels.push([c+25, r]);
		pixels.push([c+25, r+2]);
		pixels.push([c+26, r+2]);
		// block
		placeBlock(pixels, c+34, r +13);
		// -- glider up 35
		pixels.push([c+35, r+5]);
		pixels.push([c+35, r+6]);
		pixels.push([c+35, r+7]);
		pixels.push([c+36, r+7]);
		pixels.push([c+37, r+6]);

	}

	var stopGuns = false;

	function tryPlaceGun(data, col, row) {
		var pixels = [];
		if (!stopGuns) {
			var r, c;
			if (data.budget >= 35) {
				c = col || gunColumn;
				r = row || data.rows - 40;
				placeGun(pixels, c, r);
				gunColumn += 40;
				if (gunColumn > data.cols - 38) {
					gunColumn = 0;
				}
				stopGuns = true;
			}
		}
		return pixels;
	}

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

	function placePlus(pixels, c, r) {
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+1]);
		pixels.push([c+1, r+2]);
		pixels.push([c+2, r+1]);
	}

	function tryPlacePlus(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 5) {
			c = col || getRnd(0, data.cols - 3);
			r = row || getRnd(0, data.rows - 3);
			placeGlider(pixels, c, r);
		}
		return pixels;
	}

	// This is by far the most active polyomino with less than six cells: all the others stabilize in at most 10 generations,
	// but the R-pentomino does not do so until generation 1103,
	// by which time it has a population of 116.
	function placeRpentomino(pixels, c, r) {
		pixels.push([c, r+1]);
		pixels.push([c+1, r]);
		pixels.push([c+1, r+1]);
		pixels.push([c+1, r+2]);
		pixels.push([c+2, r+2]);
	}

	function tryPlaceRpentomino(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 5) {
			c = col || getRnd(0, data.cols - 3);
			r = row || getRnd(0, data.rows - 3);
			placeGlider(pixels, c, r);
		}
		return pixels;
	}

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

	function tryPlaceFence(data, col, row) {
		var pixels = [];
		var r, c;
		if (data.budget >= 5) {
			c = col || fenceColumn;
			r = row || fenceRow;
			placeRpentomino(pixels, c, r);
			fenceColumn += 10;
			if (fenceColumn > data.cols - 3) {
				fenceColumn = 0;
				fenceRow += 30;
			}
			if (fenceRow > data.rows - 40) {
				fenceRow = 40;
			}
		}
		return pixels;
	}


	// bots --------------------------------------------------------------------------------------------------------------

	function determinePlan(data) {
		var plan= ['gun'];
		//if (data.generation < data.cols) {
		//	plan = ['r-fence'];
		//} else if (data.generation > data.cols && data.generation < data.cols *2) {
		//	plan = ['gun'];
		//} else {
		//	plan = ['r-fence'];
		//}
		if (data.generation === 1) {
			planIndex = 0;
			fenceRow = 40;
			fenceColumn = 0;
			fenceLocation = 0;
			gunColumn = 0;
		}
		return plan;
	}

	function executePlan(data, plan) {
		var pixels = tryPlaceGun(data);
		//if (plan[planIndex] === 'r-fence') {
		//	pixels = tryPlaceFence(data);
		//} else if (plan[planIndex] === 'gun') {
		//	pixels = tryPlaceGun(data);
		//}
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
	var fenceColumn = 0;
	var fenceRow = 0;
	var fenceLocation = 0;
	var gunColumn = 0;

	setTimeout(function registerArmy() {
		window.registerArmy({
			name: 'Gun!',
			icon: 'cobra',
			cb: bot
		});
	}, 2000);

})();

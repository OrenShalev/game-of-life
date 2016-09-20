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

			if (lastCol > 400) {
				lastCol = 0
			} else {
				lastCol += 30;
			}
		}
		return pixels;
	}

	// bot --------------------------------------------------------------------------------------------------------------

	var bot = function bot(data) {
		
		if (lastCol > 400) {
			sideFlag = 1;
		} else if (lastCol < 0) {
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
	var lastCol = 0;
    var bot = {name: 'HA-Oren!', icon:'bot', cb: planBotCB};

	setTimeout(function registerArmy() {
		window.registerArmy({
			name: bot.name,
			icon: bot.icon,
			cb: bot.cb
		});
	}, 2000);

	////////



	function planBotCB({budget, generation, cols, rows}) {
		if (budget >= nextElement.length) {
			let el = nextElement;
			nextElement = battlePlan.getNextElement();
			return el;
		}
		else {
			return [];
		}
	}
	// let botbot = { name: };

	class Plan {
		// this.elements = [];
		constructor() {
			this.elements = [];
			this.nextElementIdx = 0;
		}

		getElements() {
			return this.elements;
		}

		addElements(elements) {
			this.elements.push(...elements);
			return this;
		}

		concatPlan(otherPlan) {
			this.addElements(otherPlan.getElements());
			return this;
		}

		hasMoreElements() {
			return this.nextElementIdx < this.elements.length;
		}

		getNextElement() {
			return this.elements[this.nextElementIdx++];
		}

		reverse() {
			this.elements.reverse();
			return this;
		}

		randomizeStartElement() {
			let startAt = Math.floor(Math.random() * this.elements.length);
			this.elements = this.elements.slice(startAt).concat(this.elements.slice(0, startAt));
			return this;
		}

		reset() {
			this.nextElementIdx = 0;
			return this;
		}
	}

	// Plan for a pattern that repeats horizontally from left to right.
	class RepeatPlan extends Plan {
		constructor(pattern = [], repeatEveryXPixels = 10) {
			super();
			let elements = [];
			for (let x = 0; x < 400; x += repeatEveryXPixels) { // TODO 400?
				elements.push(translatePixels(pattern, x, 0));
			}
			this.addElements(elements);
		}
	}
	
	class GliderRightLine extends RepeatPlan {
		constructor() {
			super(getGliderRight(), 100);
		}

	}

	let p = new RepeatPlan(getGliderRight()).concatPlan(new RepeatPlan(getGliderLeft()).reverse());
	// let p = new GliderRightLine().concatPlan(new GliderRightLine().reverse());
	debugger;

	// init plan
	let battlePlan__ = new GliderRightLine().concatPlan(new GliderRightLine().reverse()); // change as you wish
	let battlePlan = new RepeatPlan(getGliderRight()).concatPlan(new RepeatPlan(getGliderLeft()).reverse()); // change as you wish
	let nextElement = battlePlan.getNextElement();

	// Helper functions I (Oren) found useful. Currently as a separate file. I suggest that anyone who works on a file
// copy-pastes this, I think it can only make our lives easier. When someone copies a file and changes it -- these
// will be there and we won't need to copy this.

	var rnd = Math.random,
		floor = Math.floor;

// random int between 'from' and 'to'-1. For example, randomIntRange(0, 10) returns int between 0 and 9, (20, 60)-->20..59.
	function randomIntInRange(from, to) {
		return floor(rnd() * (to - from - 1)) + from;
	}

// lets you create array of arrays easily: flatArrayToPixelsArray([0, 1, 2, 3]) --> [ [0, 1], [2, 3] ]
	function flatArrayToPixelsArray(flat) {
		var pixels = [];
		for (var i = 0; i < flat.length; i = i + 2) {
			pixels.push([
				flat[i],
				flat[i + 1]
			]);
		}
		return pixels;
	}

// translates an array of pixels. Create pattern starting at [0, 0], then pass to this to move to desired location.
	function translatePixels(pixels, columns = 0, rows = 0) {
		return pixels.map(function translatePixel(pixel) {
			return [
				pixel[0] + columns,
				pixel[1] + rows
			];
		});
	}

// gets pixels array of a blocker, starting at 0,0
	function getBlocker() {
		return flatArrayToPixelsArray([
			0, 0,
			0, 1,
			1, 0,
			1, 1
		]);
	}

// gets pixels array of a blocker which will move right, starting at 0,0
	function getGliderLeft() {
		return flatArrayToPixelsArray([
			0, 0,
			1, 0,
			2, 0,
			0, 1,
			1, 2
		]);
	}
// gets pixels array of a blocker which will move left, starting at 0,0
	function getGliderRight() {
		return flatArrayToPixelsArray([
			0, 0,
			1, 0,
			2, 0,
			2, 1,
			1, 2
		]);
	}

})();

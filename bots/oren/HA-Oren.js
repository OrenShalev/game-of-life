/*
     MC COBRAS!                                  .o@*hu
                        ..      .........   .u*"    ^Rc
     Oren Shalev        oP""*Lo*#"""""""""""7d" .d*N.   $
     Eyal Luzon        @  u@""           .u*" o*"   #L  ?b
     Yair Barak       @   "              " .d"  .d@@e$   ?b.
     Roy Kronenfeld 8                    @*@me@#         '"Nu
                    @                                        '#b
                  .P                                           $r
                .@"                                  $L        $
              .@"                                   8"R      dP
           .d#"                                  .dP d"   .d#
          xP              .e                 .ud#"  dE.o@"(
          $             s*"              .u@*""     '""\dP"
          ?L  ..                    ..o@""        .$  uP
           #c:$"*u.             .u@*""$          uR .@"
            ?L$. '"""***Nc    x@""   @"         d" JP
             ^#$.        #L  .$     8"         d" d"
               '          "b.'$.   @"         $" 8"
                           '"*@$L $"         $  @
                           @L    $"         d" 8\
                           $$u.u$"         dF dF
                           $ """   o      dP xR
                           $      dFNu...@"  $
                           "N..   ?B ^"""   :R
                             """"* RL       d>
                                    "$u.   .$
                                      ^"*bo@"
 */
(function() {
	// --- Plan classes ---
	class Plan {
		constructor() {
			// So this is pretty low-level, but enough for our needs.
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

		getRequiredBudget() {
			return this.elements.reduce((budget, element) => budget + element.length, 0);
		}

		randomize() {
			var arr = this.elements; // Just to make the code simpler.
			for (let i = arr.length; i > 0; i--) {
				let idx = Math.floor(Math.random() * i);
				[ arr[i-1], arr[idx] ] = [ arr[idx], arr[i-1] ];
			}
			return this;
		}
	}

	// Plan for a pattern that repeats horizontally from left to right.
	class RepeatPlan extends Plan {
		constructor(pattern = [], repeatEveryXPixels = 10) {
			super();
			let elements = [];
			for (let x = 0; x < 400; x += repeatEveryXPixels) { // TODO 400?
				elements.push(translatePixels(pattern, [x, 0]));
			}
			this.addElements(elements);
		}
	}

	// --- 🐍🐍🐍 MC Cobra bot 🐍🐍🐍 ---
	
	// Set up battle plan:
	// For example, line of right gliders from left to right, then left gliders from right to left.
	// Change as you wish
	let battlePlan = new RepeatPlan( getGliderRight() )
		.concatPlan( new RepeatPlan( getGliderLeft() ).reverse() ).randomize();
	
	let haPlan = new RepeatPlan(translatePixels(getHA(), [, 70]), 30)
		.concatPlan(new RepeatPlan(getSpaceship(), 25))
		.concatPlan(new RepeatPlan(getGliderRight(), 15).reverse())
		.concatPlan(new RepeatPlan(getSpaceship(), 25))
		.concatPlan(new RepeatPlan(getGliderRight(), 15).reverse())
		.concatPlan(new RepeatPlan(getSpaceship(), 25))
		.concatPlan(new RepeatPlan(getGliderRight(), 15).reverse())
		.concatPlan(new RepeatPlan(getSpaceship(), 25))
		.concatPlan(new RepeatPlan(getGliderRight(), 15).reverse());
	battlePlan = haPlan;

	let nextElement = battlePlan.getNextElement();
	function cobraBite({ budget, generation, cols, rows }) {
		if (generation === 1) {
			// Verify dimensions, shouldn't change AFAWK
			if (cols !== 400) {
				alert(`cols === ${cols}`);
			}
			if (rows !== 100) {
				alert(`rows === ${rows}`);
			}
		}
		if (!nextElement) {
			alert('No next element! :-O');
		}

		if (budget < nextElement.length) {
			// No budget for next element, sit back and have a beer! 🍻
			return [];
		}

		// We have budget for next element, go go go!
		let el = nextElement;

		if (!battlePlan.hasMoreElements()) {
			battlePlan.reset();
		}
		nextElement = battlePlan.getNextElement();

		return el;
	}

	setTimeout(function registerCobraArmy() {
		window.registerArmy({
			name: 'MC Cobra',
			icon: 'cobra',
			cb: cobraBite // 🐍
		});
	}, 2000);

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

	var botOrig = function bot(data) {
		
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
	function translatePixels(pixels, [deltaCols = 0, deltaRows = 0] = []) {
		return pixels.map( ([col, row]) =>
			[
				col + deltaCols,
				row + deltaRows
			]);
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

	function getSpaceship() {
		return flatArrayToPixelsArray([
			1, 0,
			2, 0,
			3, 0,
			0, 1,
			3, 1,
			3, 2,
			3, 3,
			0, 4,
			2, 4
		]);
	}

	function getHA() {
		return flatArrayToPixelsArray([
			0, 0,
			1, 1,
			2, 2,
			3, 3,
			4, 3,
			5, 3,
			5, 2
		]);
	}

})();

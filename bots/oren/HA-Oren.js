/*
   MC COBRAS!                                    .o@*hu
   ------------         ..      .........   .u*"    ^Rc
   Oren Shalev          oP""*Lo*#"""""""""""7d" .d*N.   $
   Eyal Luzon          @  u@""           .u*" o*"   #L  ?b
   Yair Barak         @   "              " .d"  .d@@e$   ?b.
   Roy Kronenfeld   8                    @*@me@#         '"Nu
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
	const COLS = 400;
	// --- Plan classes ---

	/**
	 * A plan is a list of elements we intend to place on the board one by one.
	 * Operations on a plan returns the plan, to enable chaining.
	 * TODO: refactor to generator. Would be nicer code plus allow for "infinite plans", but
	 * some stuff like 'randomize' implementation get trickier. 🤔
	 */
	class Plan {
		constructor() {
			// So using an array is pretty low-level, but enough for our needs.
			this.elements = [];
			this.nextElementIdx = 0;
		}

		// -- Methods for getting data about the plan --
		hasMoreElements() {
			return this.nextElementIdx < this.elements.length;
		}
		getNextElement() {
			return this.elements[this.nextElementIdx++];
		}
		getElements() {
			return this.elements;
		}
		getRequiredBudget() { // Required budget is number of pixels, equals to sum of element lengths.
			return this.elements.reduce((budget, element) => budget + element.length, 0);
		}
		toString() {
			return `Plan with ${this.elements.length} elements, totaling ${this.getRequiredBudget()} pixels.`;
		}

		// -- Plan operations, change 'this', and return it for chaining. --
		// - Basic stuff: -
		reset() {
			this.nextElementIdx = 0;
			return this;
		}
		addElements(elements) {
			this.elements.push(...elements); // TODO: this is a shallow copy, fine only provided that we don't mutate elements/pixels.
			return this;
		}
		concatPlan(otherPlan) {
			this.addElements(otherPlan.getElements());
			return this;
		}

		// - Higher level: -
		reverse() {
			this.elements.reverse();
			return this;
		}
		randomizeStartElement() {
			var arr = this.elements; // Just to make the code simpler.
			let startAt = getRnd(0, arr.length - 1);
			this.elements = arr.slice(startAt).concat(arr.slice(0, startAt));
			return this;
		}
		randomize() {
			// Simple array shuffle.
			var arr = this.elements; // Just to make the code simpler.
			for (let i = arr.length - 1; i >= 0; i--) {
				let idx = getRnd(0, i);
				[ arr[i], arr[idx] ] = [ arr[idx], arr[i] ]; // Simple swap.
			}
			return this;
		}
		loop(times = 3) {
			for (let i = 0; i < times; i++) {
				this.concatPlan(this);
			}
			return this;
		}

		// -- Static methods, enable nicer code when creating new plans from existing ones. --
		static concat(...plans) {
			let newPlan = new Plan();
			for (let plan of plans) {
				newPlan.concatPlan(plan);
			}
			return newPlan;
		}
		static loop(plan = new Plan(), times = 3) {
			return Plan.concat(...new Array(times).fill(plan));
		}
	}

	// Plan for a pattern that repeats horizontally from left to right.
	class LinePlan extends Plan {
		constructor( {
			pattern = [],
			repeatEveryXPixels = 10,
			varianceCol = ()=>0,
			varianceRow = ()=>0
		} = {} ) {

			super();
			for (let x = 0; x < COLS; x += repeatEveryXPixels) { // TODO edges of board etc.
				this.elements.push(translatePixels(pattern, [x + varianceCol(), varianceRow()]));
			}
		}
	}

	// --- 🐍🐍🐍 MC Cobra bot 🐍🐍🐍 ---
	
	// Set up battle plan:
	// For example, line of right gliders from left to right, then left gliders from right to left.
	// Change as you wish
	// let battlePlan = new LinePlan( getGliderRight() )
	// 	.concatPlan( new LinePlan( getGliderLeft() ).reverse() ).randomize();

/*
	var haElement = translatePixels(getMultum(), [, 70]); // HA element at col 0 (default) and row 70
	let haDefense = new LinePlan( { pattern: haElement, repeatEveryXPixels: 30 } );
	let haAttack = new LinePlan( { pattern: getSpaceship(), repeatEveryXPixels: 25 } ).concatPlan(
		new LinePlan( { pattern: getGliderRight(), repeatEveryXPixels: 15 } ).reverse()
	);
	let haAttackLoop = Plan.loop(haAttack, 10);
	let haPlan = Plan.concat(haDefense, haAttackLoop);
*/

	//////
	let multumLine = new LinePlan( {
		pattern: translatePixels(getMultum(), [, 70]),
		repeatEveryXPixels: 30
	} ).randomize();

	// Line of pi, RTL.
	let piLine = new LinePlan( {
		pattern: translatePixels(getPi(), [, 35]),
		repeatEveryXPixels: 20,
		varianceRow: () => getRnd(10, 35)
	} ).reverse();

	// let notGood = new LinePlan( { pattern: getSpcecial(), repeatEveryXPixels: 20 } ).reverse();

	let attackLine = new Plan(), x = 0;
	while (true) {
		// Line of gliders-spaceships, LTR, until no more room. 

		if (x >= COLS) break;
		attackLine.addElements([translatePixels( getGliderLeft(), [x, ] )]);
		x += 20;

		if (x >= COLS) break;
		attackLine.addElements([translatePixels( getSpaceship(), [x, ] )]);
		x += 30;

		if (x >= COLS) break;
		attackLine.addElements([translatePixels( getGliderRight(), [x, ] )]);
		x += 20;

		if (x >= COLS) break;
		attackLine.addElements([translatePixels( getSpaceship(), [x, ] )]);
		x += 30;
	}

	let loopIteration = Plan.concat(piLine, attackLine);
	let mainLoop = Plan.loop(loopIteration, 100);
	let ha2 = Plan.concat(multumLine, mainLoop);

	// let battlePlan = haPlan;
	let battlePlan = ha2;
	let nextElement;

	function cobraBite({ budget, generation, cols, rows }) {
		if (generation === 1) {
			battlePlan.reset();
			nextElement = battlePlan.getNextElement();

			// Verify dimensions, shouldn't change AFAWK
			if (cols !== COLS) {
				alert(`cols === ${cols}`);
			}
			if (rows !== 100) {
				alert(`rows === ${rows}`);
			}
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

	function getRnd(min = 0, max = 1) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
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

	// Structures. All structures start at 0,0; translate as needed.

	// gets pixels array of a glider which will move right.
	function getGliderLeft() {
		return flatArrayToPixelsArray([
			0, 0,
			1, 0,
			2, 0,
			0, 1,
			1, 2
		]);
	}
	// gets pixels array of a glider which will move left.
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

	function getMultum() {
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

	function getPi() {
		// return 3.14; :-P
		return flatArrayToPixelsArray([
			0, 0,
			0, 1,
			0, 2,
			1, 0,
			2, 2,
			2, 1,
			2, 0
		]);
	}

})();

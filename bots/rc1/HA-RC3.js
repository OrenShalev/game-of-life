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
(function () {

	// utilities ---------------------------------------------------------------------------------------------------------

	function getRnd(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function _hiss(msg) {
		console.log('COBRAS: ' + msg);
	}
	// structures --------------------------------------------------------------------------------------------------------

	function tryInjectGliderVenom(data) {

		var pixels = [];
		if (data.budget >= 5) {

			var c = lastCol;
			var r = 0;
			//_hiss('location ' + c + ', ' + r);
			var isLeft = (c > data.cols/2);
			pixels.push([c, r]);
			pixels.push([c + 1, r]);
			pixels.push([c + 2, r]);
			pixels.push(isLeft ? [c, r + 1] : [c + 2, r + 1]);
			pixels.push([c + 1, r + 2]);

			advanceAttackPosition(data, 20, 3);
		}
		return pixels;
	}

	function injectSpaceshipVenom(data, pixels, column, row) {
		var c = column || lastCol;
		var r = row || 0;
		if (c < 0) {
			c = 0;
		}
		if (r < 0) {
			r = 0;
		}

		//_hiss('location ' + c + ', ' + r);

		pixels.push([c + 1, r]);
		pixels.push([c + 2, r]);
		pixels.push([c + 3, r]);
		pixels.push([c, r + 1]);
		pixels.push([c + 3, r + 1]);
		pixels.push([c + 3, r + 2]);
		pixels.push([c + 3, r + 3]);
		pixels.push([c, r + 4]);
		pixels.push([c + 2, r + 4]);

	}

	function tryInjectSpaceshipVenom(data, step) {
		var pixels = [];
		var delta = step || 30;
		//_hiss('delta = ' + delta);
		if (data.budget >= 9) {
			injectSpaceshipVenom(data, pixels);
			advanceAttackPosition(data, delta, 6);
		}
		return pixels;
	}

	function advanceAttackPosition(data, delta, range) {
		if (sideFlag == 0) {
			lastCol += delta;
			if (lastCol >= data.cols - range) {
				lastCol -= (delta * 2);
				sideFlag = 1;
			}
		} else {
			lastCol -= delta;
			if (lastCol < 0) {
				lastCol += (delta * 2);
				sideFlag = 0;
			}
		}
	}

	function tryInjectMultumVenom(data, row, column) {
		var pixels = [];
		if (data.budget >= 7) {

			var c = column || lastCol;
			var r = row || 70;

			//_hiss('location ' + c + ', ' + r);

			pixels.push([c, r]);
			pixels.push([c + 1, r - 1]);
			pixels.push([c + 2, r - 2]);
			pixels.push([c + 3, r - 3]);
			pixels.push([c + 4, r - 3]);
			pixels.push([c + 5, r - 3]);
			pixels.push([c + 5, r - 2]);

			if (sideFlag == 0) {
				lastCol += 30;
			} else {
				lastCol -= 30;
			}
			if (lastCol >= data.cols - 6) {
				lastCol -= 60;
			}
			if (lastCol < 0) {
				lastCol += 60;
			}
		}
		return pixels;
	}

	// bot --------------------------------------------------------------------------------------------------------------

	var bot = function kingCobra(data) {
		if (data.generation === 1) {
			switchFlag = 0;
			sideFlag = 0;
			lastCol = 20;
		}
		var pixels = [];
		if (data.generation % 500 < 100) {
			if (data.generation % 500 === 1) {
				lastCol = 0;
				sideFlag = 0;
			}
			pixels = tryInjectMultumVenom(data);
		} else {
			if (switchFlag == 0) {
				if (isAttack(data)) {
					pixels = tryInjectGliderVenom(data);
				} else {
					pixels = tryInjectMultumVenom(data, 5);
				}
				if (pixels.length > 0) {
					switchFlag = 1;
				}
			} else {
				if (isAttack(data)) {
					pixels = tryInjectSpaceshipVenom(data, getRnd(1, 4) * 30);
				} else {
					pixels = tryInjectMultumVenom(data, 5);
				}
				if (pixels.length > 0) {
					switchFlag = 0;
				}
			}
		}
		return pixels;
	};

	function isAttack(data) {
		return ( (lastCol <= (data.cols/3)) || (lastCol >= (data.cols *2 /3)));
	}
	// init --------------------------------------------------------------------------------------------------------------

	var switchFlag = 0;
	var sideFlag = 0;
	var lastCol = 20;

	setTimeout(function registerArmy() {
		window.registerArmy({
			name: 'MC Cobras RC3',
			icon: 'Cobra',
			cb: bot
		});
	}, 2000);

})();
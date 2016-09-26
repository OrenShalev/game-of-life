function GolHtmlHelper() {

	var that = this;

	that.init = function init(settings) {
		that.settings = settings;
		that.cols = settings.cols;
		that.rows = settings.rows;
		that.colorsRGB = settings.colorsRGB;
		that.colorsHex = [that.getColorHexStr(that.colorsRGB[0]), that.getColorHexStr(that.colorsRGB[1])];
		that.powerBarMaxWidth = Math.floor(that.settings.cols / 2 - 50);
		that.addCssRules();
		that.shakes = ['shake-little'];//['shake', 'shake-little', 'shake-horizontal', 'shake-rotate'];
		that.explosions = [];
		that.explosionSettings = {
			explosionArcs: 10,
			explosionFadeStart: 15,
			explosionMaxAge: 30
		};
	};

	that.addCssRules = function addCssRules() {
		var i;

		that.addCssRule('@font-face {font-family: visitor; src: url("' + that.settings.remotePlatformLocationRawGit + '/fonts/visitor.woff?raw=true") format("woff");}');
		that.addCssRule('@font-face {font-family: individigital; src: url("' + that.settings.remotePlatformLocationRawGit + '/fonts/individigital.woff?raw=true") format("woff");}');
		that.addCssRule('* {box-sizing: border-box;}');
		that.addCssRule('html {height: 100%; font-size: 12px;}');
		that.addCssRule('body {height: 100%; margin: 0; overflow: hidden; background-color: #202020; color: #fff; font-family: visitor, consolas, monospace, sans-serif;}');

		that.addCssRule('#pre-game-container {position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;}');

		that.addCssRule('#load-src-panel {width: 400px; text-align: center; opacity: 0; padding: 1px; transition: 1s all ease;}');
		that.addCssRule('#load-src-title {text-align: left; color: #fff; font-size: 28px;}');
		that.addCssRule('.load-src-msg {text-align: left; font-size: 12px; color: #333; transition: 1s color ease;}');
		that.addCssRule('.load-src-msg:nth-child(3) {margin-bottom: 2px;}');
		that.addCssRule('.load-src-input {outline: none !important; margin-bottom: 1px; width: 100%; height: 8px; border: none; background-color: #000; padding-left: 3px; font-family: visitor, consolas, monospace, sans-serif; font-size: 9px; color: #666; cursor: pointer; transition: 1s all ease;}');
		that.addCssRule('#load-src-button {margin-top: 8px; width: 50px; height: 20px; border: 1px solid #333; background-color: #202020; color: #333; font-family: visitor, consolas, monospace, sans-serif; font-size: 16px; outline: none; transition: 1s all ease;}');
		that.addCssRule('#start-tournament-button {position: absolute; bottom: 20px; right: 20px; background: #444; color: #888; font-family: visitor, consolas, monospace, sans-serif; font-size: 8px; cursor: pointer; outline: none; border: none;}');

		that.addCssRule('#army-vs-army-panel {width: 400px; text-align: center; display: none;}');
		that.addCssRule('.army-vs-army-icon {display: inline-block; height: 100px; vertical-align: middle;}');
		that.addCssRule('.army-vs-army-name {display: inline-block; vertical-align: middle; font-size: 16px;}');
		that.addCssRule('.army-vs-army-vs {margin: 20px;}');

		that.addCssRule('#gol-container {position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;}');
		that.addCssRule('#time-display {display: none; position: absolute; left: calc(50% - 30px); top: calc(50% - 11px); font-size: 24px; opacity: 0.5');
		that.addCssRule('#time-display-bar-0 {position: absolute; left: calc(50% + 200px); top: calc(50% - 100px); height: 200px; width: 2px;}');
		that.addCssRule('#time-display-bar-1 {position: absolute; left: calc(50% - 202px); top: calc(50% - 100px); height: 200px; width: 2px;}');
		that.addCssRule('#gol-canvas {background-color: #000; cursor: crosshair; margin-top: 6px; margin-bottom: 6px;}');
		that.addCssRule('.gol-army-line {display: flex; justify-content: space-between; align-items: center; text-align: left; height: 10px; line-height: 10px; width: ' + that.cols + 'px; position:relative;}');
		that.addCssRule('.gol-army-img {position: relative; top: 0px; margin-right: 1px; height: 16px}');
		that.addCssRule('.gol-army-stats {height: 10px; display: flex; align-items: center;}');
		that.addCssRule('.gol-army-name-and-wins {height: 10px; width: 50%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}');
		that.addCssRule('.gol-army-score {height: 10px;}');
		that.addCssRule('.gol-army-power {height: 2px; margin-left: 2px; transition: 1s width ease;}');

    that.addCssRule('#winner-loser-panel {display: none; height: 100%; flex-direction: column; justify-content: center; text-align: center;}');
		that.addCssRule('.winner-loser-line {margin: 15px 0;}');
		that.addCssRule('.winner-loser-result {display: inline-block; vertical-align: middle; font-size: 24px; color: #fff;}');
		that.addCssRule('.winner-loser-pic {display: inline-block; height: 125px; vertical-align: middle;}');
		that.addCssRule('.winner-loser-name {display: inline-block; vertical-align: middle; font-size: 12px;}');

		for (i = 0; i < 2; i++) {
			that.addCssRule('.src-' + i + ' {margin-bottom: 1px; width: 100%; border: none; background-color: #000; padding-left: 3px; font-family: visitor, consolas, monospace, sans-serif; font-size: 9px; color: #' + that.colorsHex[i] + ';}');
			that.addCssRule('#army-vs-army-name-' + i + ' {color: #' + that.colorsHex[i] + '}');
			that.addCssRule('#gol-army-name-and-wins-' + i + ' {color: #' + that.colorsHex[i] + ';}');
			that.addCssRule('#gol-army-score-' + i + ' {color: #' + that.colorsHex[i] + ';}');
			that.addCssRule('#gol-army-power-' + i + ' {background-color: #' + that.colorsHex[i] + '; box-shadow: 0px 0px 5px #' + that.colorsHex[i] +';}');
			that.addCssRule('#winner-loser-name-' + i + ' {color: #' + that.colorsHex[i] + '}');

			// that.addCssRule('#winner-loser-icon-' + i + ' {display: inline-block; height: 100px; vertical-align: middle;}');
		}
		//css shake effects
		that.addCssRule('.shake,.shake-little,.shake-slow,.shake-hard,.shake-horizontal,.shake-vertical,.shake-rotate,.shake-opacity,.shake-crazy,.shake-chunk{display:inline-block;transform-origin:center center}.shake-freeze,.shake-constant.shake-constant--hover:hover,.shake-trigger:hover .shake-constant.shake-constant--hover{animation-play-state:paused}.shake-freeze:hover,.shake-trigger:hover .shake-freeze,.shake:hover,.shake-trigger:hover .shake,.shake-little:hover,.shake-trigger:hover .shake-little,.shake-slow:hover,.shake-trigger:hover .shake-slow,.shake-hard:hover,.shake-trigger:hover .shake-hard,.shake-horizontal:hover,.shake-trigger:hover .shake-horizontal,.shake-vertical:hover,.shake-trigger:hover .shake-vertical,.shake-rotate:hover,.shake-trigger:hover .shake-rotate,.shake-opacity:hover,.shake-trigger:hover .shake-opacity,.shake-crazy:hover,.shake-trigger:hover .shake-crazy,.shake-chunk:hover,.shake-trigger:hover .shake-chunk{animation-play-state:running}@keyframes shake{2%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}4%{transform:translate(-1.5px, 1.5px) rotate(1.5deg)}6%{transform:translate(1.5px, 2.5px) rotate(-0.5deg)}8%{transform:translate(1.5px, -0.5px) rotate(0.5deg)}10%{transform:translate(2.5px, 0.5px) rotate(0.5deg)}12%{transform:translate(-1.5px, -0.5px) rotate(1.5deg)}14%{transform:translate(1.5px, 1.5px) rotate(1.5deg)}16%{transform:translate(0.5px, 0.5px) rotate(-0.5deg)}18%{transform:translate(-1.5px, -1.5px) rotate(1.5deg)}20%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}22%{transform:translate(0.5px, 2.5px) rotate(1.5deg)}24%{transform:translate(2.5px, 1.5px) rotate(-0.5deg)}26%{transform:translate(0.5px, 1.5px) rotate(1.5deg)}28%{transform:translate(-0.5px, -1.5px) rotate(-0.5deg)}30%{transform:translate(-0.5px, 1.5px) rotate(-0.5deg)}32%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}34%{transform:translate(-1.5px, 0.5px) rotate(1.5deg)}36%{transform:translate(2.5px, 0.5px) rotate(-0.5deg)}38%{transform:translate(-0.5px, -0.5px) rotate(0.5deg)}40%{transform:translate(0.5px, -1.5px) rotate(-0.5deg)}42%{transform:translate(0.5px, 1.5px) rotate(1.5deg)}44%{transform:translate(2.5px, 0.5px) rotate(-0.5deg)}46%{transform:translate(2.5px, 0.5px) rotate(1.5deg)}48%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}50%{transform:translate(-0.5px, -0.5px) rotate(1.5deg)}52%{transform:translate(2.5px, -1.5px) rotate(0.5deg)}54%{transform:translate(0.5px, 2.5px) rotate(1.5deg)}56%{transform:translate(0.5px, 2.5px) rotate(-0.5deg)}58%{transform:translate(1.5px, 0.5px) rotate(-0.5deg)}60%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}62%{transform:translate(2.5px, -1.5px) rotate(1.5deg)}64%{transform:translate(2.5px, 1.5px) rotate(0.5deg)}66%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}68%{transform:translate(-0.5px, 0.5px) rotate(0.5deg)}70%{transform:translate(-1.5px, 2.5px) rotate(1.5deg)}72%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}74%{transform:translate(-0.5px, 2.5px) rotate(0.5deg)}76%{transform:translate(1.5px, 2.5px) rotate(0.5deg)}78%{transform:translate(2.5px, 0.5px) rotate(0.5deg)}80%{transform:translate(-1.5px, -0.5px) rotate(0.5deg)}82%{transform:translate(-0.5px, -1.5px) rotate(0.5deg)}84%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}86%{transform:translate(-0.5px, 2.5px) rotate(0.5deg)}88%{transform:translate(-1.5px, 2.5px) rotate(0.5deg)}90%{transform:translate(-0.5px, -0.5px) rotate(-0.5deg)}92%{transform:translate(2.5px, 1.5px) rotate(-0.5deg)}94%{transform:translate(1.5px, 2.5px) rotate(0.5deg)}96%{transform:translate(0.5px, 2.5px) rotate(-0.5deg)}98%{transform:translate(2.5px, 0.5px) rotate(1.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake:hover,.shake-trigger:hover .shake,.shake.shake-freeze,.shake.shake-constant{animation:shake 100ms ease-in-out infinite}@keyframes shake-little{2%{transform:translate(1px, 1px) rotate(0.5deg)}4%{transform:translate(1px, 1px) rotate(0.5deg)}6%{transform:translate(1px, 1px) rotate(0.5deg)}8%{transform:translate(1px, 1px) rotate(0.5deg)}10%{transform:translate(1px, 1px) rotate(0.5deg)}12%{transform:translate(1px, 0px) rotate(0.5deg)}14%{transform:translate(0px, 1px) rotate(0.5deg)}16%{transform:translate(1px, 0px) rotate(0.5deg)}18%{transform:translate(1px, 0px) rotate(0.5deg)}20%{transform:translate(0px, 0px) rotate(0.5deg)}22%{transform:translate(0px, 0px) rotate(0.5deg)}24%{transform:translate(0px, 1px) rotate(0.5deg)}26%{transform:translate(0px, 1px) rotate(0.5deg)}28%{transform:translate(0px, 1px) rotate(0.5deg)}30%{transform:translate(1px, 1px) rotate(0.5deg)}32%{transform:translate(0px, 1px) rotate(0.5deg)}34%{transform:translate(0px, 1px) rotate(0.5deg)}36%{transform:translate(1px, 0px) rotate(0.5deg)}38%{transform:translate(1px, 1px) rotate(0.5deg)}40%{transform:translate(1px, 0px) rotate(0.5deg)}42%{transform:translate(1px, 1px) rotate(0.5deg)}44%{transform:translate(0px, 0px) rotate(0.5deg)}46%{transform:translate(1px, 0px) rotate(0.5deg)}48%{transform:translate(1px, 1px) rotate(0.5deg)}50%{transform:translate(0px, 0px) rotate(0.5deg)}52%{transform:translate(1px, 1px) rotate(0.5deg)}54%{transform:translate(0px, 0px) rotate(0.5deg)}56%{transform:translate(0px, 1px) rotate(0.5deg)}58%{transform:translate(1px, 1px) rotate(0.5deg)}60%{transform:translate(0px, 0px) rotate(0.5deg)}62%{transform:translate(0px, 0px) rotate(0.5deg)}64%{transform:translate(0px, 0px) rotate(0.5deg)}66%{transform:translate(0px, 1px) rotate(0.5deg)}68%{transform:translate(1px, 1px) rotate(0.5deg)}70%{transform:translate(0px, 0px) rotate(0.5deg)}72%{transform:translate(0px, 0px) rotate(0.5deg)}74%{transform:translate(0px, 0px) rotate(0.5deg)}76%{transform:translate(0px, 1px) rotate(0.5deg)}78%{transform:translate(0px, 0px) rotate(0.5deg)}80%{transform:translate(1px, 1px) rotate(0.5deg)}82%{transform:translate(0px, 0px) rotate(0.5deg)}84%{transform:translate(1px, 0px) rotate(0.5deg)}86%{transform:translate(1px, 1px) rotate(0.5deg)}88%{transform:translate(1px, 1px) rotate(0.5deg)}90%{transform:translate(1px, 1px) rotate(0.5deg)}92%{transform:translate(1px, 1px) rotate(0.5deg)}94%{transform:translate(0px, 1px) rotate(0.5deg)}96%{transform:translate(0px, 1px) rotate(0.5deg)}98%{transform:translate(0px, 1px) rotate(0.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-little:hover,.shake-trigger:hover .shake-little,.shake-little.shake-freeze,.shake-little.shake-constant{animation:shake-little 100ms ease-in-out infinite}@keyframes shake-slow{2%{transform:translate(2px, -9px) rotate(2.5deg)}4%{transform:translate(-4px, 5px) rotate(-2.5deg)}6%{transform:translate(-8px, 8px) rotate(3.5deg)}8%{transform:translate(-7px, 4px) rotate(-1.5deg)}10%{transform:translate(7px, 0px) rotate(1.5deg)}12%{transform:translate(3px, 8px) rotate(-0.5deg)}14%{transform:translate(4px, 4px) rotate(0.5deg)}16%{transform:translate(-4px, -4px) rotate(3.5deg)}18%{transform:translate(-8px, -7px) rotate(3.5deg)}20%{transform:translate(-9px, 8px) rotate(2.5deg)}22%{transform:translate(-9px, -5px) rotate(-2.5deg)}24%{transform:translate(4px, -7px) rotate(-2.5deg)}26%{transform:translate(-1px, 3px) rotate(1.5deg)}28%{transform:translate(-3px, -7px) rotate(3.5deg)}30%{transform:translate(6px, -9px) rotate(2.5deg)}32%{transform:translate(8px, -5px) rotate(-2.5deg)}34%{transform:translate(7px, 8px) rotate(1.5deg)}36%{transform:translate(2px, 5px) rotate(-2.5deg)}38%{transform:translate(-6px, 0px) rotate(2.5deg)}40%{transform:translate(9px, 7px) rotate(-2.5deg)}42%{transform:translate(-2px, -2px) rotate(-0.5deg)}44%{transform:translate(0px, -6px) rotate(-2.5deg)}46%{transform:translate(-5px, 2px) rotate(1.5deg)}48%{transform:translate(-8px, -7px) rotate(3.5deg)}50%{transform:translate(-5px, -6px) rotate(-2.5deg)}52%{transform:translate(8px, 1px) rotate(-2.5deg)}54%{transform:translate(-1px, -1px) rotate(-2.5deg)}56%{transform:translate(5px, -1px) rotate(2.5deg)}58%{transform:translate(-6px, -8px) rotate(-2.5deg)}60%{transform:translate(5px, 5px) rotate(3.5deg)}62%{transform:translate(-4px, -2px) rotate(1.5deg)}64%{transform:translate(-5px, 7px) rotate(3.5deg)}66%{transform:translate(7px, 4px) rotate(0.5deg)}68%{transform:translate(-5px, -2px) rotate(-2.5deg)}70%{transform:translate(1px, 3px) rotate(-1.5deg)}72%{transform:translate(-6px, 0px) rotate(2.5deg)}74%{transform:translate(1px, 9px) rotate(2.5deg)}76%{transform:translate(10px, -5px) rotate(-2.5deg)}78%{transform:translate(-5px, 4px) rotate(3.5deg)}80%{transform:translate(-6px, 1px) rotate(0.5deg)}82%{transform:translate(9px, 10px) rotate(2.5deg)}84%{transform:translate(-1px, 5px) rotate(-1.5deg)}86%{transform:translate(4px, 1px) rotate(2.5deg)}88%{transform:translate(-5px, -7px) rotate(1.5deg)}90%{transform:translate(-8px, -2px) rotate(0.5deg)}92%{transform:translate(10px, -9px) rotate(-0.5deg)}94%{transform:translate(7px, 6px) rotate(-0.5deg)}96%{transform:translate(6px, 1px) rotate(-2.5deg)}98%{transform:translate(5px, 0px) rotate(1.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-slow:hover,.shake-trigger:hover .shake-slow,.shake-slow.shake-freeze,.shake-slow.shake-constant{animation:shake-slow 5s ease-in-out infinite}@keyframes shake-hard{2%{transform:translate(2px, -5px) rotate(2.5deg)}4%{transform:translate(4px, 6px) rotate(-1.5deg)}6%{transform:translate(-5px, 3px) rotate(-2.5deg)}8%{transform:translate(-8px, 7px) rotate(3.5deg)}10%{transform:translate(-2px, -8px) rotate(3.5deg)}12%{transform:translate(-9px, -1px) rotate(1.5deg)}14%{transform:translate(1px, -8px) rotate(-0.5deg)}16%{transform:translate(-3px, 10px) rotate(-1.5deg)}18%{transform:translate(9px, -4px) rotate(0.5deg)}20%{transform:translate(4px, 8px) rotate(2.5deg)}22%{transform:translate(3px, 2px) rotate(-0.5deg)}24%{transform:translate(-5px, 6px) rotate(2.5deg)}26%{transform:translate(-7px, -6px) rotate(0.5deg)}28%{transform:translate(3px, 0px) rotate(2.5deg)}30%{transform:translate(8px, -8px) rotate(2.5deg)}32%{transform:translate(-9px, -8px) rotate(2.5deg)}34%{transform:translate(-9px, 3px) rotate(2.5deg)}36%{transform:translate(-2px, 7px) rotate(2.5deg)}38%{transform:translate(8px, 7px) rotate(-1.5deg)}40%{transform:translate(4px, 0px) rotate(-1.5deg)}42%{transform:translate(-4px, -9px) rotate(-0.5deg)}44%{transform:translate(0px, -4px) rotate(2.5deg)}46%{transform:translate(4px, 2px) rotate(2.5deg)}48%{transform:translate(10px, -9px) rotate(2.5deg)}50%{transform:translate(3px, -6px) rotate(2.5deg)}52%{transform:translate(1px, 6px) rotate(0.5deg)}54%{transform:translate(3px, -1px) rotate(-1.5deg)}56%{transform:translate(-1px, -9px) rotate(0.5deg)}58%{transform:translate(7px, -4px) rotate(-0.5deg)}60%{transform:translate(2px, 0px) rotate(2.5deg)}62%{transform:translate(-5px, 3px) rotate(0.5deg)}64%{transform:translate(6px, -8px) rotate(3.5deg)}66%{transform:translate(1px, -3px) rotate(2.5deg)}68%{transform:translate(10px, 1px) rotate(1.5deg)}70%{transform:translate(0px, 7px) rotate(-0.5deg)}72%{transform:translate(-9px, 6px) rotate(3.5deg)}74%{transform:translate(8px, 0px) rotate(-0.5deg)}76%{transform:translate(0px, 5px) rotate(0.5deg)}78%{transform:translate(6px, 6px) rotate(-0.5deg)}80%{transform:translate(4px, 3px) rotate(-2.5deg)}82%{transform:translate(8px, -2px) rotate(3.5deg)}84%{transform:translate(0px, -8px) rotate(1.5deg)}86%{transform:translate(-2px, -8px) rotate(2.5deg)}88%{transform:translate(10px, -7px) rotate(2.5deg)}90%{transform:translate(2px, 10px) rotate(-0.5deg)}92%{transform:translate(-9px, 4px) rotate(2.5deg)}94%{transform:translate(-3px, 1px) rotate(1.5deg)}96%{transform:translate(-2px, -1px) rotate(0.5deg)}98%{transform:translate(7px, -9px) rotate(3.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-hard:hover,.shake-trigger:hover .shake-hard,.shake-hard.shake-freeze,.shake-hard.shake-constant{animation:shake-hard 100ms ease-in-out infinite}@keyframes shake-horizontal{2%{transform:translate(4px, 0) rotate(0)}4%{transform:translate(7px, 0) rotate(0)}6%{transform:translate(-2px, 0) rotate(0)}8%{transform:translate(-7px, 0) rotate(0)}10%{transform:translate(-1px, 0) rotate(0)}12%{transform:translate(-2px, 0) rotate(0)}14%{transform:translate(1px, 0) rotate(0)}16%{transform:translate(-8px, 0) rotate(0)}18%{transform:translate(-5px, 0) rotate(0)}20%{transform:translate(9px, 0) rotate(0)}22%{transform:translate(-5px, 0) rotate(0)}24%{transform:translate(6px, 0) rotate(0)}26%{transform:translate(2px, 0) rotate(0)}28%{transform:translate(2px, 0) rotate(0)}30%{transform:translate(-5px, 0) rotate(0)}32%{transform:translate(-7px, 0) rotate(0)}34%{transform:translate(10px, 0) rotate(0)}36%{transform:translate(1px, 0) rotate(0)}38%{transform:translate(-2px, 0) rotate(0)}40%{transform:translate(4px, 0) rotate(0)}42%{transform:translate(-8px, 0) rotate(0)}44%{transform:translate(5px, 0) rotate(0)}46%{transform:translate(9px, 0) rotate(0)}48%{transform:translate(6px, 0) rotate(0)}50%{transform:translate(-9px, 0) rotate(0)}52%{transform:translate(7px, 0) rotate(0)}54%{transform:translate(-9px, 0) rotate(0)}56%{transform:translate(-7px, 0) rotate(0)}58%{transform:translate(-8px, 0) rotate(0)}60%{transform:translate(3px, 0) rotate(0)}62%{transform:translate(-7px, 0) rotate(0)}64%{transform:translate(6px, 0) rotate(0)}66%{transform:translate(-4px, 0) rotate(0)}68%{transform:translate(-2px, 0) rotate(0)}70%{transform:translate(6px, 0) rotate(0)}72%{transform:translate(-9px, 0) rotate(0)}74%{transform:translate(7px, 0) rotate(0)}76%{transform:translate(2px, 0) rotate(0)}78%{transform:translate(-8px, 0) rotate(0)}80%{transform:translate(2px, 0) rotate(0)}82%{transform:translate(2px, 0) rotate(0)}84%{transform:translate(-4px, 0) rotate(0)}86%{transform:translate(-7px, 0) rotate(0)}88%{transform:translate(4px, 0) rotate(0)}90%{transform:translate(-6px, 0) rotate(0)}92%{transform:translate(-8px, 0) rotate(0)}94%{transform:translate(-3px, 0) rotate(0)}96%{transform:translate(4px, 0) rotate(0)}98%{transform:translate(-8px, 0) rotate(0)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-horizontal:hover,.shake-trigger:hover .shake-horizontal,.shake-horizontal.shake-freeze,.shake-horizontal.shake-constant{animation:shake-horizontal 100ms ease-in-out infinite}@keyframes shake-vertical{2%{transform:translate(0, 6px) rotate(0)}4%{transform:translate(0, -1px) rotate(0)}6%{transform:translate(0, -7px) rotate(0)}8%{transform:translate(0, -1px) rotate(0)}10%{transform:translate(0, 9px) rotate(0)}12%{transform:translate(0, 1px) rotate(0)}14%{transform:translate(0, 3px) rotate(0)}16%{transform:translate(0, 6px) rotate(0)}18%{transform:translate(0, 0px) rotate(0)}20%{transform:translate(0, 2px) rotate(0)}22%{transform:translate(0, 1px) rotate(0)}24%{transform:translate(0, 3px) rotate(0)}26%{transform:translate(0, 4px) rotate(0)}28%{transform:translate(0, 0px) rotate(0)}30%{transform:translate(0, -8px) rotate(0)}32%{transform:translate(0, 6px) rotate(0)}34%{transform:translate(0, 6px) rotate(0)}36%{transform:translate(0, -4px) rotate(0)}38%{transform:translate(0, 2px) rotate(0)}40%{transform:translate(0, -8px) rotate(0)}42%{transform:translate(0, -9px) rotate(0)}44%{transform:translate(0, -3px) rotate(0)}46%{transform:translate(0, 0px) rotate(0)}48%{transform:translate(0, -7px) rotate(0)}50%{transform:translate(0, 0px) rotate(0)}52%{transform:translate(0, 3px) rotate(0)}54%{transform:translate(0, -4px) rotate(0)}56%{transform:translate(0, 3px) rotate(0)}58%{transform:translate(0, -9px) rotate(0)}60%{transform:translate(0, 9px) rotate(0)}62%{transform:translate(0, -6px) rotate(0)}64%{transform:translate(0, 0px) rotate(0)}66%{transform:translate(0, -4px) rotate(0)}68%{transform:translate(0, 1px) rotate(0)}70%{transform:translate(0, 5px) rotate(0)}72%{transform:translate(0, 0px) rotate(0)}74%{transform:translate(0, -6px) rotate(0)}76%{transform:translate(0, -3px) rotate(0)}78%{transform:translate(0, 3px) rotate(0)}80%{transform:translate(0, 6px) rotate(0)}82%{transform:translate(0, 2px) rotate(0)}84%{transform:translate(0, -3px) rotate(0)}86%{transform:translate(0, 1px) rotate(0)}88%{transform:translate(0, 1px) rotate(0)}90%{transform:translate(0, 10px) rotate(0)}92%{transform:translate(0, -2px) rotate(0)}94%{transform:translate(0, -2px) rotate(0)}96%{transform:translate(0, -6px) rotate(0)}98%{transform:translate(0, -9px) rotate(0)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-vertical:hover,.shake-trigger:hover .shake-vertical,.shake-vertical.shake-freeze,.shake-vertical.shake-constant{animation:shake-vertical 100ms ease-in-out infinite}@keyframes shake-rotate{2%{transform:translate(0, 0) rotate(3.5deg)}4%{transform:translate(0, 0) rotate(4.5deg)}6%{transform:translate(0, 0) rotate(1.5deg)}8%{transform:translate(0, 0) rotate(2.5deg)}10%{transform:translate(0, 0) rotate(3.5deg)}12%{transform:translate(0, 0) rotate(0.5deg)}14%{transform:translate(0, 0) rotate(-5.5deg)}16%{transform:translate(0, 0) rotate(-1.5deg)}18%{transform:translate(0, 0) rotate(1.5deg)}20%{transform:translate(0, 0) rotate(6.5deg)}22%{transform:translate(0, 0) rotate(3.5deg)}24%{transform:translate(0, 0) rotate(6.5deg)}26%{transform:translate(0, 0) rotate(-0.5deg)}28%{transform:translate(0, 0) rotate(7.5deg)}30%{transform:translate(0, 0) rotate(6.5deg)}32%{transform:translate(0, 0) rotate(-3.5deg)}34%{transform:translate(0, 0) rotate(-1.5deg)}36%{transform:translate(0, 0) rotate(3.5deg)}38%{transform:translate(0, 0) rotate(7.5deg)}40%{transform:translate(0, 0) rotate(-0.5deg)}42%{transform:translate(0, 0) rotate(3.5deg)}44%{transform:translate(0, 0) rotate(7.5deg)}46%{transform:translate(0, 0) rotate(7.5deg)}48%{transform:translate(0, 0) rotate(3.5deg)}50%{transform:translate(0, 0) rotate(0.5deg)}52%{transform:translate(0, 0) rotate(2.5deg)}54%{transform:translate(0, 0) rotate(5.5deg)}56%{transform:translate(0, 0) rotate(2.5deg)}58%{transform:translate(0, 0) rotate(-4.5deg)}60%{transform:translate(0, 0) rotate(-4.5deg)}62%{transform:translate(0, 0) rotate(7.5deg)}64%{transform:translate(0, 0) rotate(0.5deg)}66%{transform:translate(0, 0) rotate(2.5deg)}68%{transform:translate(0, 0) rotate(2.5deg)}70%{transform:translate(0, 0) rotate(5.5deg)}72%{transform:translate(0, 0) rotate(5.5deg)}74%{transform:translate(0, 0) rotate(-2.5deg)}76%{transform:translate(0, 0) rotate(7.5deg)}78%{transform:translate(0, 0) rotate(2.5deg)}80%{transform:translate(0, 0) rotate(-6.5deg)}82%{transform:translate(0, 0) rotate(-0.5deg)}84%{transform:translate(0, 0) rotate(2.5deg)}86%{transform:translate(0, 0) rotate(5.5deg)}88%{transform:translate(0, 0) rotate(0.5deg)}90%{transform:translate(0, 0) rotate(-0.5deg)}92%{transform:translate(0, 0) rotate(-1.5deg)}94%{transform:translate(0, 0) rotate(-0.5deg)}96%{transform:translate(0, 0) rotate(0.5deg)}98%{transform:translate(0, 0) rotate(-4.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-rotate:hover,.shake-trigger:hover .shake-rotate,.shake-rotate.shake-freeze,.shake-rotate.shake-constant{animation:shake-rotate 100ms ease-in-out infinite}@keyframes shake-opacity{10%{transform:translate(-4px, 4px) rotate(-1.5deg);opacity:0.25}20%{transform:translate(-1px, 2px) rotate(0.5deg);opacity:1}30%{transform:translate(2px, -4px) rotate(-1.5deg);opacity:0.03}40%{transform:translate(-1px, -2px) rotate(1.5deg);opacity:0.55}50%{transform:translate(5px, -4px) rotate(1.5deg);opacity:0.09}60%{transform:translate(-1px, 1px) rotate(-1.5deg);opacity:0.97}70%{transform:translate(4px, 1px) rotate(0.5deg);opacity:0.96}80%{transform:translate(3px, 2px) rotate(2.5deg);opacity:0.83}90%{transform:translate(-2px, -4px) rotate(-1.5deg);opacity:0.09}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-opacity:hover,.shake-trigger:hover .shake-opacity,.shake-opacity.shake-freeze,.shake-opacity.shake-constant{animation:shake-opacity 0.5s ease-in-out infinite}@keyframes shake-crazy{10%{transform:translate(-10px, -19px) rotate(6deg);opacity:0.47}20%{transform:translate(-11px, 10px) rotate(5deg);opacity:0.82}30%{transform:translate(17px, -3px) rotate(-9deg);opacity:0.34}40%{transform:translate(11px, 19px) rotate(5deg);opacity:0.4}50%{transform:translate(-11px, 13px) rotate(1deg);opacity:0.97}60%{transform:translate(17px, -16px) rotate(7deg);opacity:0.24}70%{transform:translate(-10px, -12px) rotate(-6deg);opacity:0.56}80%{transform:translate(13px, -19px) rotate(-4deg);opacity:0.96}90%{transform:translate(-18px, -11px) rotate(3deg);opacity:0.49}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-crazy:hover,.shake-trigger:hover .shake-crazy,.shake-crazy.shake-freeze,.shake-crazy.shake-constant{animation:shake-crazy 100ms ease-in-out infinite}@keyframes shake-chunk{2%{transform:translate(5px, 2px) rotate(-12deg)}4%{transform:translate(-6px, 3px) rotate(1deg)}6%{transform:translate(3px, 6px) rotate(14deg)}8%{transform:translate(1px, 8px) rotate(1deg)}10%{transform:translate(-5px, 10px) rotate(0deg)}12%{transform:translate(-11px, 2px) rotate(7deg)}14%{transform:translate(4px, 15px) rotate(11deg)}16%{transform:translate(4px, -8px) rotate(15deg)}18%{transform:translate(-5px, 10px) rotate(1deg)}20%{transform:translate(-1px, 3px) rotate(15deg)}22%{transform:translate(-8px, 5px) rotate(-6deg)}24%{transform:translate(-1px, -9px) rotate(8deg)}26%{transform:translate(9px, 11px) rotate(-13deg)}28%{transform:translate(-7px, 4px) rotate(9deg)}30%{transform:translate(8px, 14px) rotate(9deg)}32%{transform:translate(-4px, 11px) rotate(-11deg)}34%{transform:translate(14px, 11px) rotate(-8deg)}36%{transform:translate(-13px, -8px) rotate(13deg)}38%{transform:translate(-12px, 1px) rotate(-13deg)}0%,40%,100%{transform:translate(0, 0) rotate(0)}}.shake-chunk:hover,.shake-trigger:hover .shake-chunk,.shake-chunk.shake-freeze,.shake-chunk.shake-constant{animation:shake-chunk 4s ease-in-out infinite}');
	};

	that.addCssRule = function addCssRule(cssText) {
		var style;
		style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = cssText;
		} else {
			style.appendChild(document.createTextNode(cssText));
		}
		document.head.appendChild(style);
	};

	that.getColorHexStr = function getColorHexStr(colorRGBArray) {
		return colorRGBArray[0].toString(16) + colorRGBArray[1].toString(16) + colorRGBArray[2].toString(16);
	};

	that.fadeInLoadSourcesPanel = function fadeInLoadSourcesPanel() {
		document.getElementById('load-src-panel').style['opacity'] = 1;
	};

	that.markSrcLines = function markSrcLines(srcIndices) {
		var i, elm, readyToLoad, loadBtn;
		for (i = 0; i < 16; i++) {
			elm = document.getElementById('src-' + i);
			if ('' + i === srcIndices[0]) {
				elm.classList.add('src-0');
				elm.classList.remove('src-1');
			} else if ('' + i === srcIndices[1]) {
				elm.classList.add('src-1');
				elm.classList.remove('src-0');
			} else {
				elm.classList.remove('src-0');
				elm.classList.remove('src-1');
			}
		}
		document.getElementById('load-src-msg-1').style['color'] = srcIndices[1] === -1 ? '#' + that.colorsHex[1] : '#333';
		document.getElementById('load-src-msg-0').style['color'] = srcIndices[0] === -1 && srcIndices[1] !== -1 ? '#' + that.colorsHex[0] : '#333';

		readyToLoad = srcIndices[1] !== -1 && srcIndices[0] !== -1;
		loadBtn = document.getElementById('load-src-button');
		loadBtn.style['border'] = readyToLoad ? '1px solid #666' : '1px solid #333';
		loadBtn.style['background-color'] = readyToLoad ? '#666' : '#202020';
		loadBtn.style['color'] = readyToLoad ? '#fff' : '#333';
		loadBtn.style['cursor'] = readyToLoad ? 'pointer' : 'default';
		loadBtn.setAttribute('onclick', readyToLoad ? 'loadSources()' : '');
	};

	that.loadSource = function loadSource(index) {
		var srcText, srcElm;
		srcText = document.getElementById('src-' + index).value;
		_log('loading source: ' + srcText);
		if (srcText) {
			srcElm = document.createElement('script');
			srcElm.setAttribute('type', 'text/javascript');
			srcElm.setAttribute('src', srcText);
			document.getElementsByTagName('head')[0].appendChild(srcElm);
		}
	};

	that.hideLoadSourcesPanel = function hideLoadSourcesPanel() {
		document.getElementById('load-src-title').style['color'] = '#202020';
		document.getElementById('load-src-panel').style['display'] = 'none';
	};

	that.showArmyVsArmyPanel = function showArmyVsArmyPanel(armies) {
		var i;
		for (i = 0; i < 2; i++) {
			document.getElementById('army-vs-army-icon-' + i).setAttribute('src', 'platform/icons/' + armies[i].icon + '.png');
			document.getElementById('army-vs-army-name-' + i).innerHTML = armies[i].name;
		}
		setTimeout(function() {
			document.getElementById('army-vs-army-panel').style['display'] = 'block';
		}, 1000);
	};

	that.hideArmyVsArmyPanel = function hideArmyVsArmyPanel() {
		//document.getElementById('army-vs-army-panel').style['display'] = 'none';
		document.getElementById('pre-game-container').style['display'] = 'none';
	};

	that.drawUserInterface = function drawUserInterface(armies) {
		var container, canvas;
		container = that.addContainer();
		that.addTimeDisplay(container);
		that.addArmyLine(container, 1, armies[1]);
		canvas = that.addCanvas(container, 'gol-canvas', that.cols, that.rows);
		that.addArmyLine(container, 0, armies[0]);
		that.ctx = canvas.getContext('2d');
	};

	that.addContainer = function addContainer() {
	    if (document.getElementById('gol-container') == null || document.getElementById('gol-container') == undefined) {
            var container;
		    container = document.createElement('div');
		    container.setAttribute('id', 'gol-container');
		    return document.body.appendChild(container);
	    }
	    return document.getElementById('gol-container');
	};

	that.addArmyLine = function addArmyLine(container, index, army) {
		var textNode, armyLine, armyIcon, armyName, armyStats, armyPower, armyScore;
		armyLine = document.createElement('div');
		armyLine.setAttribute('id', 'gol-army-line-' + index);
		armyLine.classList.add('gol-army-line');

		armyName = document.createElement('div');
		armyName.setAttribute('id', 'gol-army-name-and-wins-' + index);
		armyName.classList.add('gol-army-name-and-wins');
		armyLine.appendChild(armyName);

		armyStats = document.createElement('div');

		armyStats.setAttribute('id', 'gol-army-stats-' + index);
		armyStats.classList.add('gol-army-stats');

		if (that.settings.gameMode !== that.settings.gameModes.AUTO_START) {
			armyIcon = document.createElement('img');
			armyIcon.setAttribute('id', 'gol-army-img-' + index);
			armyIcon.className = 'gol-army-img';
			armyIcon.setAttribute('src', 'platform/icons/' + army.icon + '.png');
			armyStats.appendChild(armyIcon);
		}
		armyScore = document.createElement('div');
		armyScore.setAttribute('id', 'gol-army-score-' + index);
		armyScore.classList.add('gol-army-score');
		textNode = document.createTextNode('' + that.settings.powerMaxValue);
		armyScore.appendChild(textNode);
		armyStats.appendChild(armyScore);

		armyPower = document.createElement('div');
		armyPower.setAttribute('id', 'gol-army-power-' + index);
		armyPower.classList.add('gol-army-power');
		armyPower.style['width'] = that.powerBarMaxWidth + 'px';
		armyStats.appendChild(armyPower);

		armyLine.appendChild(armyStats);

		return container.appendChild(armyLine);
	};

	that.addCanvas = function addCanvas(container, id, width, height) {
		var canvas;
		canvas = document.createElement('canvas');
		canvas.setAttribute('id', id);
		canvas.setAttribute('width', width + 'px');
		canvas.setAttribute('height', height + 'px');
		return container.appendChild(canvas);
	};

	that.addTimeDisplay = function addTimeDisplay(container) {
		var i, timeDisplay, timeDisplayBar;
		timeDisplay = document.createElement('div');
		timeDisplay.setAttribute('id', 'time-display');
		container.appendChild(timeDisplay);

		for (i = 0; i < 2; i++) {
			timeDisplayBar = document.createElement('div');
			timeDisplayBar.setAttribute('id', 'time-display-bar-' + i);
			container.appendChild(timeDisplayBar);	
		}
	};

	that.clearExplosions = function clearExplosions() {
		that.explosions = [];
	};

	that.updateExplosionCollection = function updateExplosionCollection(scoringPixelIndices) {
		var i, j, index, oldExplosions;

		// delete old explosions
		oldExplosions = [];
		for (i = 0; i < that.explosions.length; i++) {
			that.explosions[i].age++;
			if (that.explosions[i].age > that.explosionSettings.explosionMaxAge) {
				oldExplosions.push(i);
			}
		}
		for (i = 0; i < oldExplosions.length; i++) {
			that.explosions.splice(oldExplosions[i], 1);
		}

		// add new explosions
		for (i = 0; i < 2; i++) {
			for (j = 0; j < scoringPixelIndices[i].length; j++) {
				index = scoringPixelIndices[i][j];
				that.explosions.push({
					index: index,
					armyIndex: i,
					age: 1
				});
			}
		}
	};

	that.drawExplosionsCore = function drawExplosionsCore(array, imgData) {
		var i, k, index, x, y, c, maxDistance, multiplier, distance, corePixels, age, armyIndex;

		for (i = 0; i < that.explosions.length; i++) {
			x = that.explosions[i].index % that.cols;
			y = Math.floor(that.explosions[i].index / that.cols);
			armyIndex = that.explosions[i].armyIndex;
			age = that.explosions[i].age;

			maxDistance = Math.floor(64 / that.explosions[i].age);
			multiplier = Math.floor(256 / maxDistance);

			if (that.explosions[i].armyIndex === 0){
				corePixels = [[x,y], [x-1,y+1], [x,y+1], [x+1,y+1], [x,y+2]];
			} else {
				corePixels = [[x,y], [x-1,y-1], [x,y-1], [x+1,y-1], [x,y-2]];
			}
			for (c = 0; c < corePixels.length; c++) {
				for (k = 0; k < that.rows; k++) {
					distance = Math.abs(k - corePixels[c][1]);
					if (distance < maxDistance) {
						index = k * that.cols + corePixels[c][0];
						if (array[index] === -1) {
							imgData.data[index * 4] = imgData.data[index * 4 + 1] = imgData.data[index * 4 + 2] = 255;
							imgData.data[index * 4 + 3] = (1 / age) * (maxDistance - distance) * multiplier - 1;
						}
					}
				}
				for (k = 0; k < that.cols; k++) {
					distance = Math.abs(k - corePixels[c][0]);
					if (distance < maxDistance) {
						index = corePixels[c][1] * that.cols + k;
						if (array[index] === -1) {
							imgData.data[index * 4] = imgData.data[index * 4 + 1] = imgData.data[index * 4 + 2] = 255;
							imgData.data[index * 4 + 3] = (1 / age) * (maxDistance - distance) * multiplier - 1;
						}
					}
				}
			}
		}
	};

	that.drawExplosionsHalo = function drawExplosionsHalo() {
		var i, j, x, y, radius, startAngle, endAngle, counterClockwise, c, age, armyIndex;

		counterClockwise = false;
		for (i = 0; i < that.explosions.length; i++) {
			x = that.explosions[i].index % that.cols;
			y = Math.floor(that.explosions[i].index / that.cols);
			armyIndex = that.explosions[i].armyIndex;
			age = that.explosions[i].age;

			for (j = 0; j < that.explosionSettings.explosionArcs; j++) {
				radius = 4 + that.explosions[i].age * 1.5 * Math.random();
				startAngle = that.explosions[i].armyIndex === 0 ? Math.random() * Math.PI / 2 : Math.PI + Math.random()* Math.PI / 2;
				endAngle = that.explosions[i].armyIndex === 0 ? Math.PI - Math.random()* Math.PI / 2 : - Math.random() * Math.PI / 2;
				that.ctx.beginPath();
				that.ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
				that.ctx.lineWidth = radius;
				c = 0.4 + Math.random() * 0.6;
				if (that.explosions[i].age < that.explosionSettings.explosionFadeStart) {
					that.ctx.strokeStyle = 'rgb(' +
						Math.floor(that.colorsRGB[armyIndex][0] * c) + ',' +
						Math.floor(that.colorsRGB[armyIndex][1] * c) + ',' +
						Math.floor(that.colorsRGB[armyIndex][2] * c) + ')';
				} else {
					that.ctx.strokeStyle = 'rgb(' +
						Math.floor(that.colorsRGB[armyIndex][0] * c / (age - that.explosionSettings.explosionFadeStart + 1)) + ',' +
						Math.floor(that.colorsRGB[armyIndex][1] * c / (age - that.explosionSettings.explosionFadeStart + 1)) + ',' +
						Math.floor(that.colorsRGB[armyIndex][2] * c / (age - that.explosionSettings.explosionFadeStart + 1)) + ')';
				}
				that.ctx.stroke();
			}
		}
	};

	that.drawArrayToCanvas = function drawArrayToCanvas(array, newPixels, newPixelsAge, scoringPixelIndices) {
		var i, j, k, x, y, r, g, b, a, maxAge, maxDistance, multiplier, distance, index, imgData;

		imgData = that.ctx.createImageData(that.cols, that.rows);

		// regular matrix
		for (y = 0; y < that.rows; y++) {
			for (x = 0; x < that.cols; x++) {
				i = y * that.cols + x;
				if (array[i] === -1) {
					imgData.data[i * 4] = imgData.data[i * 4 + 1] = imgData.data[i * 4 + 2] = 0;
				} else {
					imgData.data[i * 4] = that.colorsRGB[array[i]][0];
					imgData.data[i * 4 + 1] = that.colorsRGB[array[i]][1];
					imgData.data[i * 4 + 2] = that.colorsRGB[array[i]][2];
				}
				imgData.data[i * 4 + 3] = 255;
			}
		}

		// back line
		for (i = 0; i < 2; i++) {
			y = (i === 0) ? that.rows-1 : 0;
			for (x = 0; x < that.cols; x++) {
				index = y * that.cols + x;
				if (array[index] === -1) {
					r = that.colorsRGB[i][0];
					g = that.colorsRGB[i][1];
					b = that.colorsRGB[i][2];
					a = Math.floor(Math.random() * 255);
					imgData.data[index * 4] = r;
					imgData.data[index * 4 + 1] = g;
					imgData.data[index * 4 + 2] = b;
					imgData.data[index * 4 + 3] = a;
				}
			}
		}

		// new pixels mark
		maxAge = 5;
		for (i = 0; i < newPixels.length; i++) {
			for (j = 0; j < newPixels[i].length; j++) {
				if (newPixelsAge[i] <= maxAge) {
					maxDistance = Math.floor(42 / newPixelsAge[i]);
					multiplier = Math.floor(256 / maxDistance);
					for (k = 0; k < that.rows; k++) {
						distance = Math.abs(k - newPixels[i][j][1]);
						if (distance < maxDistance) {
							index = k * that.cols + newPixels[i][j][0];
							if (array[index] === -1) {
								imgData.data[index * 4] = that.colorsRGB[i][0];
								imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
								imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
								imgData.data[index * 4 + 3] = (1 / newPixelsAge[i]) * (maxDistance - distance) * multiplier - 1;
							}
						}
					}
					for (k = 0; k < that.cols; k++) {
						distance = Math.abs(k - newPixels[i][j][0]);
						if (distance < maxDistance) {
							index = newPixels[i][j][1] * that.cols + k;
							if (array[index] === -1) {
								imgData.data[index * 4] = that.colorsRGB[i][0];
								imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
								imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
								imgData.data[index * 4 + 3] = (1 / newPixelsAge[i]) * (maxDistance - distance) * multiplier - 1;
							}
						}
					}
				}
			}
		}

		// new pixels
		for (i = 0; i < newPixels.length; i++) {
			if (newPixelsAge[i] <= maxAge) {
				for (j = 0; j < newPixels[i].length; j++) {
					index = newPixels[i][j][1] * that.cols + newPixels[i][j][0];
					imgData.data[index * 4] = imgData.data[index * 4 + 1] = imgData.data[index * 4 + 2] = imgData.data[index * 4 + 3] = 255;
				}
			}
		}

		that.updateExplosionCollection(scoringPixelIndices);
		that.drawExplosionsCore(array, imgData);

		// board center mark
		// for (y = 99; y <= 100; y++) {
		// 	for (x = 199; x <= 200; x++) {
		// 		i = y * that.cols + x;
		// 		imgData.data[i * 4] = imgData.data[i * 4 + 1] = imgData.data[i * 4 + 2] = imgData.data[i * 4 + 3] = 255;
		// 	}
		// }
		
		that.ctx.putImageData(imgData, 0, 0);

		that.drawExplosionsHalo();		
	};

	that.shake = function shake() {
		var shakeIndex = Math.floor(Math.random() * that.shakes.length);
		document.getElementById('gol-canvas').className = that.shakes[shakeIndex] + ' shake-constant';
		setTimeout(function () {
			document.getElementById('gol-canvas').className = '';
		}, 500);
	};

	that.updateTimeDisplay = function updateTimeDisplay(secondsLeft) {
		var i, elm, minutes, seconds, timeStr, borderHeight;

		if (secondsLeft <= 10) {
			minutes = Math.floor(secondsLeft / 60);
			seconds = secondsLeft - minutes * 60;
			timeStr = (minutes >= 10 ? '' + minutes : '0' + minutes) + ':' + (seconds >= 10 ? '' + seconds : '0' + seconds);
			elm = document.getElementById('time-display');
			elm.innerHTML = timeStr;
			elm.style['color'] = secondsLeft > 10 ? '#999' : '#fff';
			elm.style['display'] = 'block';
		}

		borderHeight = Math.floor(that.settings.rows / 2 - (that.settings.rows / 2 * secondsLeft / that.settings.secondsMaxRoundDuration));
		for (i = 0; i < 2; i++) {
			elm = document.getElementById('time-display-bar-' + i);
			elm.style['background-color'] = secondsLeft > 10 ? '#999' : '#fff';
			elm.style['border-top'] =	'' + borderHeight + 'px solid #333';
			elm.style['border-bottom'] =	'' + borderHeight + 'px solid #333';
			elm.style['top'] = 'calc(50% - 100px)';
			elm.style['display'] = 'block';
		}
	};

	that.hideTimeDisplay = function hideTimeDisplay(time) {
		var i;
		document.getElementById('time-display').style['display'] = 'none';
		for (i = 0; i < 2; i++) {
			document.getElementById('time-display-bar-' + i).style['display'] = 'none';
		}
	};

	that.updateScore = function updateScore(armyIndex, armyPower, scoringPixels) {
		var score, scoreText, powerWidth;
		document.getElementById('gol-army-score-' + armyIndex).style['color'] = (scoringPixels === 0) ? '#' + that.colorsHex[armyIndex] : '#fff';
		document.getElementById('gol-army-power-' + armyIndex).style['background-color'] = (scoringPixels === 0) ? '#' + that.colorsHex[armyIndex] : '#fff';
		score = Math.round(armyPower);
		if (score === 0 && armyPower > 0) {
			score = 1;
		}
		scoreText = '' + score;
		document.getElementById('gol-army-score-' + armyIndex).innerHTML = scoreText;
		powerWidth = Math.round(armyPower / that.settings.powerMaxValue * that.powerBarMaxWidth);
		if (powerWidth === 0 && armyPower > 0) {
			powerWidth = 1;
		}
		document.getElementById('gol-army-power-' + armyIndex).style['width'] = powerWidth + 'px';
	};

	that.updateArmyNamesAndWins = function updateArmyNamesAndWins(armies, roundWins) {
		var i;
		for (i = 0; i < 2; i++) {
			document.getElementById('gol-army-name-and-wins-' + i).innerHTML = armies[i].name + ' : ' + roundWins[i];
		}
	};

	that.endRoundByDraw = function endRoundByDraw()  {
		var i;
		that.hideTimeDisplay();
		for (i = 0; i < 2; i++) {
			document.getElementById('gol-army-score-' + i).style['color'] = '#' + that.colorsHex[i];
			document.getElementById('gol-army-power-' + i).style['background-color'] = '#' + that.colorsHex[i];
		}
		that.ctx.clearRect(0, 0, that.cols, that.rows);
		that.ctx.textAlign = 'center';
		that.ctx.fillStyle = 'rgb(255, 255, 255)';
		that.ctx.font = '16px visitor';
		that.ctx.fillText('DRAW', that.cols / 2, that.rows / 2 + 3);
	};

	that.endRound = function endRound(round, roundWins, armies, winnerIndex)  {
		var i;
		that.hideTimeDisplay();
		for (i = 0; i < 2; i++) {
			document.getElementById('gol-army-score-' + i).style['color'] = '#' + that.colorsHex[i];
			document.getElementById('gol-army-power-' + i).style['background-color'] = '#' + that.colorsHex[i];
		}
		that.ctx.clearRect(0, 0, that.cols, that.rows);
		that.ctx.textAlign = 'center';
		that.ctx.fillStyle = 'rgb(' + armies[1].color[0] + ',' + armies[1].color[1] + ',' + armies[1].color[2] + ')';
		that.ctx.font = (winnerIndex === 1) ? '24px visitor' : '16px visitor';
		that.ctx.fillText(armies[1].name + ' : ' + roundWins[1], that.cols / 2, that.rows / 2 - (winnerIndex === 0 ? 6 : 8));
		that.ctx.fillStyle = 'rgb(' + armies[0].color[0] + ',' + armies[0].color[1] + ',' + armies[0].color[2] + ')';
		that.ctx.font = (winnerIndex === 0) ? '24px visitor' : '16px visitor';
		that.ctx.fillText(armies[0].name + ' : ' + roundWins[0], that.cols / 2, that.rows / 2 + (winnerIndex === 0 ? 18 : 16));
		that.updateArmyNamesAndWins(armies, roundWins);
	};

	that.endGame = function endGame(armies, winnerIndex /*roundWins*/) {
		var i;
    if (document.getElementById('winner-loser-panel')) {
      document.getElementById('gol-container').style['display'] = 'none';
      for (i = 0; i < 2; i++) {
        document.getElementById('winner-loser-result-' + i).innerHTML = (i === winnerIndex ? 'Winner' : 'Loser');
	      document.getElementById('winner-loser-name-' + i).innerHTML = armies[i].name;
        // document.getElementById('winner-loser-icon-' + i).setAttribute('src', 'platform/icons/' + armies[i].icon + '.png');
        document.getElementById('winner-loser-pic-' + i).setAttribute('src', 'armies/pictures/' + armies[i].icon + (i === winnerIndex ? '-win' : '-lose') + '.jpg');
      }
	    setTimeout(function() {
        document.getElementById('winner-loser-panel').style['display'] = 'flex';
	    }, 1000);
    }
    else {
	    document.getElementById('gol-army-stats-0').style['visibility'] = 'hidden';
	    document.getElementById('gol-army-stats-1').style['visibility'] = 'hidden';
	    that.ctx.clearRect(0, 0, that.cols, that.rows);
	    that.ctx.textAlign = 'center';
	    that.ctx.font = '16px visitor';
	    that.ctx.fillStyle = 'rgb(255, 255, 255)';
	    that.ctx.fillText('winner:', that.cols / 2, that.rows / 2 - 6);
	    that.ctx.font = '24px visitor';
	    that.ctx.fillStyle = 'rgb(' + armies[winnerIndex].color[0] + ',' + armies[winnerIndex].color[1] + ',' + armies[winnerIndex].color[2] + ')';
	    that.ctx.fillText(armies[winnerIndex].name, that.cols / 2, that.rows / 2 + 16);
    }
	};

}

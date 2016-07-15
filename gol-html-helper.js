function GolHtmlHelper() {

	var that = this;

	that.init = function init(settings) {
		that.settings = settings;
		that.cols = settings.cols;
		that.rows = settings.rows;
		that.colorsRGB = settings.colorsRGB;
		that.addCssRules();
	};

	that.drawUserInterface = function drawUserInterface(armies) {
		var container, canvas;
		container = that.addContainer();
		that.addArmyLine(container, 1, armies[1]);
		canvas = that.addCanvas(container, 'gol-canvas', that.cols, that.rows);
  		that.addArmyLine(container, 0, armies[0]);
		that.ctx = canvas.getContext('2d');
	};

	that.getColorHexStr = function getColorHexStr(colorRGBArray) {
		return colorRGBArray[0].toString(16) + colorRGBArray[1].toString(16) + colorRGBArray[2].toString(16);
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

	that.addCssRules = function addCssRules() {
		var colorsHex = [that.getColorHexStr(that.colorsRGB[0]), that.getColorHexStr(that.colorsRGB[1])];
		that.addCssRule('* {box-sizing: border-box;}');
		that.addCssRule('html {height: 100%;}');
		that.addCssRule('body {height: 100%; margin: 0; overflow: hidden; background-color: #222; color: #FFF; font-family: consolas, monospace, sans-serif; font-size: 16px;}');
		that.addCssRule('#gol-container {height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;}');
		that.addCssRule('#gol-canvas {background-color: #000000; cursor: crosshair; margin: 5px;}');
		that.addCssRule('#gol-army-line-0 {display: flex; justify-content: space-between; width: ' + that.cols + 'px; color: #' + colorsHex[0] + ';}');
		that.addCssRule('#gol-army-line-1 {display: flex; justify-content: space-between; width: ' + that.cols + 'px; color: #' + colorsHex[1] + ';}');
	};

	that.addContainer = function addContainer() {
		var container;
		container = document.createElement('div');
		container.setAttribute('id', 'gol-container');
		return document.body.appendChild(container);
	};

	that.addArmyLine = function addArmyLine(container, index, army) {
		var textNode, armyLine, armyName, armyScore;
		armyLine = document.createElement('div');
		armyLine.setAttribute('id', 'gol-army-line-' + index);

		armyName = document.createElement('div');
		armyName.setAttribute('id', 'gol-army-name-' + index);
		textNode = document.createTextNode(army.name);
		armyName.appendChild(textNode);
		armyLine.appendChild(armyName);

		armyScore = document.createElement('div');
		armyScore.setAttribute('id', 'gol-army-score-' + index);
		textNode = document.createTextNode(army.score);
		armyScore.appendChild(textNode);
		armyLine.appendChild(armyScore);

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

	that.drawVectorToCanvas = function drawVectorToCanvas(vector, newPixels) {
		var i, j, k, x, y, b, distance, index, imgData;
		imgData = that.ctx.createImageData(that.cols, that.rows);
		for (y = 0; y < that.rows; y++) {
			for (x = 0; x < that.cols; x++) {
				i = y * that.cols + x;
				if (vector[i] === -1) {
					imgData.data[i * 4] = imgData.data[i * 4 + 1] = imgData.data[i * 4 + 2] = 0;
				} else {
					imgData.data[i * 4] = that.colorsRGB[vector[i]][0];
					imgData.data[i * 4 + 1] = that.colorsRGB[vector[i]][1];
					imgData.data[i * 4 + 2] = that.colorsRGB[vector[i]][2];
				}
				imgData.data[i * 4 + 3] = 255;
			}
		}		
		for (i = 0; i < newPixels.length; i++) {
			for (j = 0; j < newPixels[i].length; j++) {
				for (k = 0; k < that.rows; k++) {
					distance = Math.abs(k - newPixels[i][j][1]);
					if (distance < 128) {
						index = k * that.cols + newPixels[i][j][0];
						imgData.data[index * 4] = that.colorsRGB[i][0];
						imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
						imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
						imgData.data[index * 4 + 3] = (128 - distance) * 2 - 1;
					}
				}
				for (k = 0; k < that.cols; k++) {
					distance = Math.abs(k - newPixels[i][j][0]);
					if (distance < 128) {
						index = newPixels[i][j][1] * that.cols + k;
						imgData.data[index * 4] = that.colorsRGB[i][0];
						imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
						imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
						imgData.data[index * 4 + 3] = (128 - distance) * 2 - 1;
					}
				}	
			}
		}
		for (i = 0; i < 2; i++) {
			if (Math.random() > 0.05) {
				y = (i === 0) ? that.rows-1 : 0;
				for (x = 0; x < that.cols; x++) {
					index = y * that.cols + x;
					imgData.data[index * 4] = that.colorsRGB[i][0];
					imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
					imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
					imgData.data[index * 4 + 3] = Math.floor(Math.random() * 255);
				}
			}
		}
		that.ctx.putImageData(imgData, 0, 0);
	};

	that.updateScore = function updateScore(army) {
		document.getElementById('gol-army-score-' + army.index).innerHTML = army.score;
	};

}
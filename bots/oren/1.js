// Only spaceships, at random

(function() {
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
    function translatePixels(pixels, columns, rows) {
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


    // utilities ---------------------------------------------------------------------------------------------------------

    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // structures --------------------------------------------------------------------------------------------------------

    function tryPlaceMine(data, col, row) {
        var pixels = [];
        var r, c;
        if (data.budget >= 3) {
            c = col || getRnd(0, data.cols - 2);
            r = row || getRnd(20, 80);
            pixels.push([c, r]);
            pixels.push([c, r+1]);
            pixels.push([c+1, r]);
        }
        return pixels;
    }

    function tryPlaceFence(data, col, row) {
        var pixels = [];
        var r, c;
        if (data.budget >= 3) {
            c = col || fenceLocation;
            r = row || data.rows - 15;
            pixels.push([c, r]);
            pixels.push([c+1, r]);
            pixels.push([c, r+1]);
            fenceLocation += 5;
            if (fenceLocation > data.cols - 2) {
                fenceLocation = 0;
            }
        }
        return pixels;
    }

    function tryPlaceGlider(data, col, row) {
        var pixels = [];
        var r, c;
        if (data.budget >= 5) {
            c = col || getRnd(0, data.cols - 3);
            r = row || getRnd(0, data.rows - 3);
            pixels.push([c, r]);
            pixels.push([c+1, r]);
            pixels.push([c+2, r]);
            pixels.push(getRnd(0, 1) === 0 ? [c, r+1] : [c+2, r+1]);
            pixels.push([c+1, r+2]);
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

    var randomSpaceships = function randomSpaceships(data) {
        var pixels = tryPlaceSpaceship(data, null, 0);

        return pixels;
    };

    // init --------------------------------------------------------------------------------------------------------------

    var planIndex = 0;
    var fenceLocation = 0;
    var bot =         {name: 'randomSpaceships',   icon:'bot', cb: randomSpaceships};
    setTimeout(function registerArmy() {
        window.registerArmy({
            name: bot.name,
            icon: bot.icon,
            cb: bot.cb
        });
    }, 2000);

})();

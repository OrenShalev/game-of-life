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

    // gets pixels array of a spaceship; variant that was originally used where selected column is < data.col/2
    function getSpaceshipVariant1() {
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

    // gets pixels array of a spaceship; variant that was originally used where selected column is >= data.col/2
    function getSpaceshipVariant2() {
        return flatArrayToPixelsArray([
            0, 0,
            1, 0,
            2, 0,
            0, 1,
            3, 1,
            0, 2,
            0, 3,
            1, 4,
            3, 4
        ]);
    }

    // utilities ---------------------------------------------------------------------------------------------------------

    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // structures --------------------------------------------------------------------------------------------------------

    function tryPlaceSpaceship(data, col, row) {
        var pixels = [];
        var r, c;
        if (data.budget >= 9) {
            c = col || getRnd(0, data.cols - 4);
            r = row || 0;

            if (c < data.cols / 2) {
                pixels = getSpaceshipVariant1();
            } else {
                pixels = getSpaceshipVariant2();
            }
            pixels = translatePixels(pixels, c, r);

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

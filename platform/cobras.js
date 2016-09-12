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

(function () {

    // utilities ---------------------------------------------------------------------------------------------------------

    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function _hiss(msg) {
        console.log('COBRAS ' + msg);
    }

    function checkColumn(data, range) {
        // check range
        if (lastColumn < 0) {
            lastColumn = 0;
        }else if (lastColumn > data.cols - range) {
            lastColumn = data.cols - range;
        }

    }

    function advanceLocation(data, range, delta) {
        lastColumn += (direction * delta);
        // change direction
        if (lastColumn > data.cols - range) {
            direction = -1;
            lastColumn = data.cols - delta;
            lastRow += rowChange;
        } else if (lastColumn < 0) {
            direction = 1;
            lastColumn = delta;
            lastRow += rowChange;
        }
        // make sure that we dont invade the dmz
        if (lastRow > dmz - 5) {
            lastRow = 0;
        }

        _hiss('next snake on ' + lastColumn + ', ' + lastRow);
    }

    // structures --------------------------------------------------------------------------------------------------------

    function tryPlaceNajaNivea(data) {

        var pixels = [];
        if (data.budget >= 5) {

            checkColumn(data, 3);

            var c = lastColumn;
            var r = lastRow;

            _hiss('placing capeCobra on ' + c + ', ' + r);
            pixels.push([c, r]);
            pixels.push([c + 1, r]);
            pixels.push([c + 2, r]);
            if (direction > 0) {
                pixels.push([c + 2, r + 1]);
            } else {
                pixels.push([c, r + 1]);
            }
            pixels.push([c + 1, r + 2]);

            advanceLocation(data, 3, 15);
        }
        return pixels;
    }

    function tryPlaceNajaKatiensis(data) {
        var pixels = [];
        if (data.budget >= 9) {

            checkColumn(data, 3);

            var c = lastColumn;
            var r = lastRow;

            _hiss('placing spittingCobra on ' + c + ', ' + r);
            pixels.push([c + 1, r]);
            pixels.push([c + 2, r]);
            pixels.push([c + 3, r]);
            pixels.push([c, r + 1]);
            pixels.push([c + 3, r + 1]);
            pixels.push([c + 3, r + 2]);
            pixels.push([c + 3, r + 3]);
            pixels.push([c, r + 4]);
            pixels.push([c + 2, r + 4]);

            advanceLocation(data, 3, 25);
        }
        return pixels;
    }

    function tryPlaceNajaMossambica(data) {
        var pixels = [];
        // we skip a cycle to allow space
        if (data.budget >= 18) {

            checkColumn(data, 3);

            var c = lastColumn;
            var r = lastRow;

            _hiss('placing spittingCobra on ' + c + ', ' + r);
            pixels.push([c + 1, r]);
            pixels.push([c + 2, r]);
            pixels.push([c + 3, r]);
            pixels.push([c, r + 1]);
            pixels.push([c + 3, r + 1]);
            pixels.push([c + 3, r + 2]);
            pixels.push([c + 3, r + 3]);
            pixels.push([c, r + 4]);
            pixels.push([c + 2, r + 4]);

            advanceLocation(data, 3, 0);
        }
        return pixels;
    }

    function tryPlaceNajaMultifasciata(data) {
        var pixels = [];
        if (data.budget >= 7) {

            checkColumn(data, 6);

            var c = lastColumn;
            var r = dmz;

            _hiss('placing burrowingCobra on ' + c + ', ' + r);
            pixels.push([c, r]);
            pixels.push([c + 1, r - 1]);
            pixels.push([c + 2, r - 2]);
            pixels.push([c + 3, r - 3]);
            pixels.push([c + 4, r - 3]);
            pixels.push([c + 5, r - 3]);
            pixels.push([c + 5, r - 2]);

            direction = 1;
            lastRow = dmz;
            advanceLocation(data, 6, 30);
        }
        return pixels;
    }

    //Spectacled cobra
    // bot --------------------------------------------------------------------------------------------------------------
    function determineSnake(data) {
        if (data.generation === 1) {
            direction = 1;
            lastColumn = 0;
            lastRow = 0;
        }
        // we use 100 generations for ever 500 generations for defence (20%)
        if (data.generation % 500 < 100) {
            return 'burrowingCobra';
        } else if (data.generation % 500 < 400) {
            if (data.generation % 500 > 350 ) {
                return 'mozambiqueSpittingCobra'
            } else {
                return 'spittingCobra';
            }
        } else {
            return 'capeCobra';
        }
    }

    function placeSnake(data, snake) {
        var pixels = [];
        if (snake === 'burrowingCobra') {
            pixels = tryPlaceNajaMultifasciata(data);
        } else if (snake === 'spittingCobra') {
            pixels = tryPlaceNajaKatiensis(data);
        } else if (snake === 'mozambiqueSpittingCobra') {
            pixels = tryPlaceNajaMossambica(data);
        } else {
            pixels = tryPlaceNajaNivea(data);
        }
        if (pixels.length > 0) {
            _hiss('strike! snake is ' + snake + ', cost is ' + pixels.length);
        //} else {
        //    _hiss('wait... budget is ' + data.budget + ', generation is ' + data.generation)
        }
        return pixels;
    }

    var bot = function kingCobra(data) {
        var snake = determineSnake(data);
        return placeSnake(data, snake);
    };

    // init --------------------------------------------------------------------------------------------------------------

    var direction = 1;
    var lastColumn = 0;
    var lastRow = 0;
    var dmz = 70;
    // this indicates the attack row variation
    var rowChange = 0;
    setTimeout(function registerArmy() {
        window.registerArmy({
            name: 'HA_HA',
            icon: 'cobra',
            cb: bot
        });
    }, 2000);

})();

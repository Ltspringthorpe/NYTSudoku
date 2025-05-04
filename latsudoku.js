/**
 LOS ANGELES TIMES
 -----------------
 Check Candidates Function:
 Adds a listener for the `+` key or the `=` key being pressed.
 Checks each square that has candidates in it. If a square only has
 one candidate remaining, fill in the square with that value.
 */

function init() {
    return 'SUCCESS: Your game is ready to play.';
}

function error() {
    return 'ERROR: No puzzle found. Please make sure dev tools is focused inside the iframe.';
}

async function checkCandidates(e) {
    if (e.key !== '+' && e.key !== '=') return;
    var foundEmpties = false;

    // Find all squares that don't have values
    var empties = document.querySelectorAll('.letter-in-box');
    empties = Array.from(empties).filter(function(empty) {
        return empty.innerHTML === ' ';
    });
    // Find all squares that have candidates in them
    var candidates = document.querySelectorAll('.pencil-letters-in-box');

    // If there's no candidates, abort script. But only show the alert once.
    if (!alertShown && empties.length && document.querySelectorAll('.pencil-box:not(.invisible)').length === 0) {
        alertShown = true;
        return alert('Please enable Auto Candidate Mode or enter some candidates manually.');
    }

    for (var i=0; i<candidates.length; i++) {
        // If there's only one candidate left in a given square
        if (candidates[i].querySelectorAll('.pencil-box:not(.invisible)').length === 1) {
            var answer = candidates[i].querySelector('.pencil-box:not(.invisible)').getAttribute('data-alphabet');
            foundEmpties = true;
            var numCandidates = document.querySelectorAll('.pencil-box:not(.invisible)').length;

            // Make sure "Normal Mode" is enabled
            if (!document.querySelector('.image-key.pen-mode.active')) {
                await simulateClick('click', document.querySelector('.key.key-2x.pen-mode-key'));
            }
            // Select the square with a simulated click
            await simulateClick('mousedown', candidates[i].parentElement);
            // Give it value with a simulated keypress
            await simulateClick('mousedown', document.querySelector('.key.key-2x[data-char="' + answer + '"] .key-tap-area'));

            // If no empties are being filled, abort the script.
            if (numCandidates === document.querySelectorAll('.pencil-box:not(.invisible)').length) {
                return alert('ERROR. Something on your computer is blocking simulated keypresses. Aborting script.');
            }
        }
    };

    // Rerun until no more squares can be automatically filled in
    if (foundEmpties) checkCandidates(e);
}

function simulateClick(evtType, elem) {
    var evt = new MouseEvent(evtType, {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    elem.dispatchEvent(evt);
};

var alertShown = false;

if (!!document.querySelector('.main-body')) {
    document.querySelector('.main-body').addEventListener('keydown', checkCandidates);
    init();
} else  {
    error();
}

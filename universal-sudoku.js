/**
 Check Candidates Function:
 Adds a listener for the `+` key or the `=` key being pressed.
 Checks each square that has candidates in it. If a square only has
 one candidate remaining, fill in the square with that value.
 */

function init() {
    return 'SUCCESS: Your game is ready to play.';
}

function error() {
    return 'ERROR: No puzzle found. Please make sure you\'re on the right page and dev tools is focused inside the iframe if applicable.';
}

var alertShown = false;

var laTimes = false;
var nyTimes = false;
var laGridQueryStr = '.main-body';
var nyGridQueryStr = '.su-app__main';

var candidateQueryStr;
var candidatesQueryStr;
var dataAttr;
var emptiesQueryStr;
var mouseEventType;
var normalModeBtnQueryStr;
var normalModeQueryStr;

// LA
if (document.querySelector(laGridQueryStr)) {
    laTimes = true;
    candidateQueryStr = '.pencil-box:not(.invisible, .manually-removed)';
    candidatesQueryStr = '.pencil-letters-in-box';
    dataAttr = 'data-alphabet';
    emptiesQueryStr = '.letter-in-box';
    mouseEventType = 'mousedown';
    normalModeBtnQueryStr = '.key.key-2x.pen-mode-key';
    normalModeQueryStr = '.image-key.pen-mode.active';
}

// NY
else if (document.querySelector(nyGridQueryStr)) {
    nyTimes = true;
    candidateQueryStr = '.su-candidate';
    candidatesQueryStr = '.su-candidates';
    dataAttr = 'data-number';
    emptiesQueryStr = '.su-cell[aria-label="empty"]';
    mouseEventType = 'click';
    normalModeBtnQueryStr = '.su-keyboard__mode.normal';
    normalModeQueryStr = '.su-keyboard__mode.normalMode';
}

async function checkCandidates(e, firstrun = true) {
    if (e.key !== '+' && e.key !== '=') return;
    var foundEmpties = false;

    // Find all squares that don't have values
    var empties = document.querySelectorAll(emptiesQueryStr);
    if (laTimes) {
        empties = Array.from(empties).filter(function(empty) {
            return empty.innerHTML === ' ';
        });
    }

    // Find all squares that have candidates in them
    var candidates = document.querySelectorAll(candidatesQueryStr);

    // If there's no candidates, abort script. But only show the alert once.
    if (!alertShown && firstrun && empties.length && document.querySelectorAll(candidateQueryStr).length === 0) {
        alertShown = true;
        return alert('Please enable Auto Candidate Mode or enter some candidates manually.');
    }

    for (var i=0; i<candidates.length; i++) {
        // If there's only one candidate left in a given square
        if (candidates[i].querySelectorAll(candidateQueryStr).length === 1) {
            var answer = candidates[i].querySelector(candidateQueryStr).getAttribute(dataAttr);
            foundEmpties = true;
            var numCandidates = document.querySelectorAll(candidateQueryStr).length;

            // Make sure "Normal Mode" is enabled
            if (!document.querySelector(normalModeQueryStr)) {
                await simulateClick('click', document.querySelector(normalModeBtnQueryStr));
            }

            // Select the square with a simulated click
            var boxTarget = laTimes ? candidates[i].parentElement : empties[i];
            await simulateClick(mouseEventType, boxTarget);

            // Give it value with a simulated click
            var numTarget = laTimes
                ? document.querySelector('.key.key-2x[data-char="' + answer + '"] .key-tap-area')
                : document.querySelectorAll('.su-keyboard__number')[answer - 1];
            await simulateClick(mouseEventType, numTarget);

            // If no empties are being filled, abort the script.
            if (numCandidates === document.querySelectorAll(candidateQueryStr).length) {
                return alert('ERROR. Something on your computer is blocking simulated mouse clicks. Aborting script.');
            }
        }
    };

    // Rerun until no more squares can be automatically filled in
    if (foundEmpties) checkCandidates(e, false);
}

function simulateClick(evtType, elem) {
    var evt = new MouseEvent(evtType, {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    elem.dispatchEvent(evt);
};

// Add the event listener to the grid
if (!laTimes && !nyTimes) {
    error();
} else if (laTimes) {
    document.querySelector(laGridQueryStr).addEventListener('keydown', checkCandidates);
    init();
} else if (nyTimes) {
    document.addEventListener('keydown', checkCandidates);
    init();
}

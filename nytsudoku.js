/**
 NEW YORK TIMES
 --------------
 Check Candidates Function:
 Adds a listener for the `+` key or the `=` key being pressed.
 Checks each square that has candidates in it. If a square only has
 one candidate remaining, fill in the square with that value.
 */

function init() {
    return 'SUCCESS: Your game is ready to play.';
}

async function checkCandidates(e) {
    if (e.key !== '+' && e.key !== '=') return;
    var foundEmpties = false;

    // Find all squares that don't have values
    var empties = document.querySelectorAll('.su-cell[aria-label="empty"]');
    // Find all squares that have candidates in them
    var candidates = document.querySelectorAll('.su-candidates');

    // If there's no candidates, abort script. But only show the alert once.
    if (!alertShown && empties.length && document.querySelectorAll('.su-candidate').length === 0) {
        alertShown = true;
        return alert('Please enable Auto Candidate Mode or enter some candidates manually.');
    }

    for (var i=0; i<candidates.length; i++) {
        // If there's only one candidate left in a given square
        if (candidates[i].querySelectorAll('svg.su-candidate').length === 1) {
            var answer = candidates[i].querySelector('svg.su-candidate').getAttribute('data-number');
            foundEmpties = true;
            var numEmpties = empties.length;

            // Make sure "Normal Mode" is enabled
            if (!document.querySelector('.su-keyboard__mode.normalMode')) {
                await simulateClick(document.querySelector('.su-keyboard__mode.normal'));
            }

            // Select the square with a simulated click
            await simulateClick(empties[i]);
            // Give it value with a simulated keypress
            await simulateKeyPress(answer);

            // If no empties are being filled, abort the script.
            if (numEmpties === document.querySelectorAll('.su-cell[aria-label="empty"]').length) {
                return alert('ERROR. Something on your computer is blocking simulated keypresses. Aborting script.');
            }
        }
    };

    // Rerun until no more squares can be automatically filled in
    if (foundEmpties) checkCandidates(e);
}

function simulateKeyPress(key) {
    var event = new KeyboardEvent('keydown', {
        key: key,
        code: key,
        which: key.charCodeAt(0),
        keyCode: key.charCodeAt(0),
        charCode: key.charCodeAt(0),
        bubbles: false,
        cancelable: true,
    });

    document.dispatchEvent(event);
}

function simulateClick(elem) {
    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    elem.dispatchEvent(evt);
};

var alertShown = false;

document.addEventListener('keydown', checkCandidates);

init();

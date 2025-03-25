/**
 NEW YORK TIMES
 --------------
 Highlight Function:
 Adds even listeners for click and keyup to determine currently selected square.
 If the selected square is filled in, highlight all other filled in squares
 of the same value.
 */
function highlight(e) {
    if (e.key && (e.key === '+' || e.key === '=')) return;

    // Get the currently selected number
    if (e.target.ariaLabel) {
        var num = e.target.ariaLabel;
        e.target.classList.add('selected');
    } else {
        var num = document.querySelector('.su-cell.selected').ariaLabel;
    }

    // Remove previous highlights
    document.querySelectorAll('.su-cell').forEach(function(cell) {
        cell.style.backgroundColor = '';
    });

    // Find all other squares to highlight
    if (num !== 'empty') {
        document
            .querySelectorAll('.su-cell:not(.selected)[aria-label="' + num + '"]')
            .forEach(function(newHighlighted) {
                newHighlighted.style.backgroundColor = 'lightblue'; // <-- Change to any color you like
            });
    }
}

document.querySelector('.su-board').addEventListener('click', highlight);
document.addEventListener('keyup', highlight);


/**
 NEW YORK TIMES
 --------------
 Check Candidates Function:
 Adds a listener for the forward slash key being pressed.
 Checks each square that has candidates in it. If a square only has
 one candidate remaining, fill in the square with that value.
 */
async function checkCandidates(e) {
    if (e.key !== '+' && e.key !== '=') return;
    var foundEmpties = false;

    // Find all squares that don't have values
    var empties = document.querySelectorAll('.su-cell[aria-label="empty"]');
    // Find all squares that have candidates in them
    var candidates = document.querySelectorAll('.su-candidates');

    for (var i=0; i<candidates.length; i++) {
        // If there's only one candidate left in a given square
        if (candidates[i].querySelectorAll('svg.su-candidate').length === 1) {
            var answer = candidates[i].querySelector('svg.su-candidate').getAttribute('data-number');
            foundEmpties = true;

            // Make sure "Normal Mode" is enabled
            if (!document.querySelector('.su-keyboard__mode.normalMode')) {
                await simulateClick(document.querySelector('.su-keyboard__mode.normal'));
            }
            // Select the square with a simulated click
            await simulateClick(empties[i]);
            // Give it value with a simulated keypress
            await simulateKeyPress(answer);
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
        view: window
    });

    elem.dispatchEvent(evt);
};

document.addEventListener('keydown', checkCandidates);

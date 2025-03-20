/**
 LOS ANGELES TIMES
 -----------------
 Check Candidates Function:
 Adds a listener for the forward slash key being pressed.
 Checks each square that has candidates in it. If a square only has
 one candidate remaining, fill in the square with that value.
 */
async function checkCandidates(e) {
    if (e.key !== '/') return;
    var foundEmpties = false;

    // Find all squares that have candidates in them
    var candidates = document.querySelectorAll('.pencil-letters-in-box');

    for (var i=0; i<candidates.length; i++) {
        // If there's only one candidate left in a given square
        if (candidates[i].querySelectorAll('.pencil-box:not(.invisible)').length === 1) {
            var answer = candidates[i].querySelector('.pencil-box:not(.invisible)').getAttribute('data-alphabet');
            foundEmpties = true;

            // Make sure "Normal Mode" is enabled
            if (!document.querySelector('.image-key.pen-mode.active')) {
                await simulateClick('click', document.querySelector('.key.key-2x.pen-mode-key'));
            }
            // Select the square with a simulated click
            await simulateClick('mousedown', candidates[i].parentElement);
            // Give it value with a simulated keypress
            await simulateClick('mousedown', document.querySelector('.key.key-2x[data-char="' + answer + '"] .key-tap-area'));
        }
    };

    // Rerun until no more squares can be automatically filled in
    if (foundEmpties) checkCandidates(e);
}

function simulateClick(evtType, elem) {
    var evt = new MouseEvent(evtType, {
        bubbles: true,
        cancelable: true,
        view: window
    });

    elem.dispatchEvent(evt);
};

document.querySelector('.main-body').addEventListener('keydown', checkCandidates);

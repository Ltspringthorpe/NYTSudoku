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

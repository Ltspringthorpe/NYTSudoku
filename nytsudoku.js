var highlight = function(e) {
    if (e.target.ariaLabel) {
        var num = e.target.ariaLabel;
        e.target.classList.add('selected');
    } else {
        var num = document.querySelector('.su-cell.selected').ariaLabel;
    }

    document.querySelectorAll('.su-cell').forEach(function(cell) {
        cell.style.backgroundColor = '';
    });
    if (num !== 'empty') {
        document.querySelectorAll('.su-cell:not(.selected)[aria-label="' + num + '"]').forEach(function(newHighlighted) {
            newHighlighted.style.backgroundColor = 'lightblue';
        });
    }
}

document.querySelector('.su-board').addEventListener('click', highlight);
document.addEventListener('keyup', highlight);

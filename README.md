# NYTSudoku
Code snippet for NYT Sudoku puzzles

### Features

#### Highlighting (NYT Only)
Adds highlighting to the New York Times sudoku puzzles (when viewed on the website).
When you select a square with a number in it, all the other squares in the grid with that number are highlighted.
This is a feature that exists in the LA Times sudoku puzzles, but is amiss in NYT.

#### Autofill (Both NYT and LA Times)
Press the `+` key or the `=` key to autofill any squares that have only one possible candidate left.
This action will propagate to other candidates recursively until the puzzle is complete or there's no more squares with
single candidates.

### Usage
Open the page's console. (If you don't know how to access a page's console, you probably shouldn't be copying and pasting strange scripts from the internet.)
Copy the appropriate script (`nytsudoku.js` for NYT and `latsudoku.js` for LA Times) and paste it into the console. Hit enter. Play the puzzle like normal. Use `+` or `=` to autofill squares.

#### NB for LA Times:
The game elements are inside an iframe. The script will produce an error if dev tools is focused outside of the iframe due to CORS.
Before you paste the script, be sure that the selected element is inside the iframe.

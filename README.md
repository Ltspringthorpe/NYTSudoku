# NYTSudoku

Code snippets for New York Times and Los Angeles Times sudoku puzzles

### Features

#### Highlighting (NYT Only)

Adds highlighting to the New York Times sudoku puzzles (when viewed on the website).
When you select a square with a number in it, all the other squares in the grid with that number are highlighted.
This is a feature that exists in the LA Times sudoku puzzles, but is amiss in NYT.

Update: About two weeks after I wrote this script and uploaded it to Github, NYT added their own highlight feature. Go figure.

#### Autofill (Both NYT and LA Times)

Press the `+` key or the `=` key to autofill any squares that have only one possible candidate left.
This action will propagate to other candidates recursively until the puzzle is complete or there's no more squares with
single candidates.

### Usage

Open the page's console. (If you don't know how to access a page's console, you probably shouldn't be copying and
pasting strange scripts from the internet.) Copy the appropriate script (`nytsudoku.js` for NYT and `latsudoku.js`
for LA Times) and paste it into the console. Press enter. In order for the script to run, the candidates must be visible
(either auto-candidate mode or manual-candidate mode is fine). Use `+` or `=` to autofill squares.

Update: I've created a new script called `universal-sudoku.js` that should work on both NYT and LA Times sudoku pages. Script is in beta.

#### Links

[https://www.nytimes.com/puzzles/sudoku](https://www.nytimes.com/puzzles/sudoku)<br>

[https://www.latimes.com/games/sudoku](https://www.latimes.com/games/sudoku)<br>
(You must select a puzzle before pasting the script **AND** make sure the dev panel is focused inside the game's iframe.
Due to CORS, the script will produce an error if the inspector is focused outside the iframe.)

/**
* SaveFile Class
* Used to keep track of progress in the game, save the progress, and
*   load our progress from localStorage.  It also provides a standard for
*   how the SaveFile object should be structured.
*/
class SaveFile{
  /*
  * empty constructor
  * Creates a SaveFile object for a "new game"
  */
  constructor(){
    // pickups
    this.abilities = [];
    this.tanks = [];
    this.missiles = [];

    // save Room used
    this.area = 0;
    this.saveRow = 0;
    this.saveCol = 0;

    // explored areas: 2D Array [gridRow, gridColumn]
    this.testArea = generateGrid(1,1);
  }
}

/*
* Function generateGrid
* Generates an unexplored Grid that is gridRow by gridColumn Cells.
*
* @param gridRow: an integer for the number of Rows in the Grid
* @param gridColumn: an integer for the number of Columns in the Grid
*/
function generateGrid(gridRow, gridColumn){
  // init Row collector (complete Grid)
  let grid = [];

  // two for-loops to generate Rows and Columns
  for (row = 0; row < gridRow; row++){

    //init Column collector for each Row
    let column = [];
    for (col = 0; col < gridColumn; col++){
      column.push({visited:false, itemFound:false});
    }

    // push our completed Row (Array column) to Array grid
    grid.push(column);
  }

  // return completed Grid
  return grid;
}

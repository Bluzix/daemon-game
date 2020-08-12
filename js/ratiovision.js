// class used to normalize display to different screen sizes
class Ratiovision{

  /**
  * Constructor(int,int,canvas [,int])
  * Used to Initialize Ratiovision to a certain aspect ratio and bind it to
  * a canvas.
  *
  * @param {ratioWidth} int The width ratio or the first number in 16:9
  * @param {ratioHeight} int The height ratio or the second number in 16:9
  * @param {boundedCanvas} canvas The canvas this class will draw stuff on
  * @param {points} int The number of points between the 0 and your first unit
  * of ratio.  (example: 16:9 and points 100 gives you 1600x900 points to draw);
  * defaults to 100.
  */
  constructor(ratioWidth, ratioHeight, boundedCanvas, points = 100){
    // set up Ratiovision's variables
    this.ratioWidth = ratioWidth;
    this.ratioHeight = ratioHeight;
    this.canvas = boundedCanvas;
    this.points = points;
    this.ctx = this.canvas.getContext('2d');

    // calculated variables, assigned later
    this.x = 0;
    this.y = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.scale = 0;
    this.height = 0;
    this.width = 0;

    // units is how many points are
    // calculate variables here
    this.resized();
  }

  /**
  * Function resized()
  * Used when the window is resized so the Ratiovision can adjust display.
  */
  resized(){
    // always try to use the full available screen
    this.x = 0;
    this.y = 0;
    this.height = innerHeight;
    this.width = innerWidth;

    // try to use the most width first
    let gridLength = this.width / this.ratioWidth;

    // check the units, can't be above screen height
    if (gridLength * this.ratioHeight > this.height){
      // use the most height, if you cannot use the most width
      gridLength = this.height / this.ratioHeight;
      // set a new x to move the screen in the center horizontally
      this.x = (this.width - (this.ratioWidth * gridLength)) / 2;
    }

    // set a new y to move the screen in the center vertically
    this.y = (this.height - (this.ratioHeight * gridLength)) / 2;

    // set the final variables
    this.maxX = gridLength * this.ratioWidth;
    this.maxY = gridLength * this.ratioHeight;
    this.scale = gridLength / this.points;

    // resize the Canvas
    this.canvas.height = this.height;
    this.canvas.width = this.width;
  }

  /**
  * Function clear()
  * Clears the whole canvas bound to Ratiovision
  */
  clear(){
    this.ctx.clearRect(0,0, this.width, this.height);
  }

  /**
  * Fundtion drawLine(int, int, string)
  * Used to draw a line according to the relative display.
  *
  * @param {startX} int the starting X position on the display for the line
  * @param {startY} int the starting Y position on the display for the line
  * @param {endX} int the ending X position on the display for the line
  * @param {endY} int the ending Y position on the display for the line
  * @param {style} string the strokeStyle for the line
  */
  drawLine(startX, startY, endX, endY, style = "black"){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + (startX * this.scale), this.y + (startY * this.scale));
    this.ctx.strokeStyle = style;
    this.ctx.lineTo(this.x + (endX * this.scale), this.y + (endY * this.scale));
    this.ctx.stroke();
  }

  /**
  * Function drawGrid()
  * Draws a this.ratioWidth by this.ratioHeight grid in the display.
  */
  drawGrid(){
    // we want the lines to go across the screen
    let displayWidth = this.points * this.ratioWidth;
    let displayHeight = this.points * this.ratioHeight;

    // loop to draw vertical lines
    let i = 0;
    while (i <= displayWidth){
      /*this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.strokeStyle = "green";
      this.ctx.lineTo(i, this.maxY);
      this.ctx.stroke();*/
      this.drawLine(i, 0, i, displayHeight, "green");
      i = i + this.points;
    }

    // loop to draw horizontal lines
    i = 0;
    while (i <= displayHeight){
      /*this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.strokeStyle = "green";
      this.ctx.lineTo(this.maxX, i);
      this.ctx.stroke();*/
      this.drawLine(0, i, displayWidth, i, "green");
      i = i + this.points;
    }
  }
}

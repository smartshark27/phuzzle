class PieceSelectScreen {
  constructor() {
    this.elements = [];
    this.draw();
  }

  draw() {
    this._drawBackButton();
    this._drawTitle();
    this._drawButtons();
  }

  remove() {
    this.elements.forEach(element => element.remove());
  }

  static handleClick(event) {
    const clickedElement = event.target;
    pieceNum = clickedElement.getAttribute("pieceNum");
    switchScreenTo("puzzle");
  }

  _drawBackButton() {
    const handleClick = "switchScreenTo(\"puzzleSelect\")";
    this.elements.push(new BackButton(handleClick));
  }

  _drawTitle() {
    this.elements.push(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", "50%")
        .setAttribute("y", "40%")
        .setAttribute("style", FONT_STYLE_HEADING)
        .setAttribute("font-size", FONT_SIZE_HEADING)
        .setTextContent("Select Piece")
    );
  }

  _drawButtons() {
    const pieceNums = PUZZLE_LOOKUP[phonesNum][puzzleNum];
    const numberOfButtons = Object.keys(pieceNums).length;
    const xPositions = generatePositionsBetween(numberOfButtons, 30, 70);
    var xIndex = 0;
    for (var pieceNum in pieceNums) {
      const x = xPositions[xIndex];
      this._drawButton(x, pieceNum);
      xIndex++;
    }
  }

  _drawButton(x, pieceNum) {
    const tempText = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("x", x)
      .setAttribute("y", "60%")
      .setAttribute("style", FONT_STYLE_BODY)
      .setAttribute("font-size", FONT_SIZE_BODY)
      .setTextContent(pieceNum);
    const textBoundary = tempText.getBBox();
    tempText.remove();

    this.elements.push(
      SVG.new("rect")
        .setAttribute("x", textBoundary.x - 40)
        .setAttribute("y", textBoundary.y - 20)
        .setAttribute("width", textBoundary.width + 80)
        .setAttribute("height", textBoundary.height + 40)
        .setAttribute("fill", "LightGreen")
        .setAttribute("onclick", "PieceSelectScreen.handleClick(event)")
        .setAttribute("pieceNum", pieceNum)
    );
    this.elements.push(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", x)
        .setAttribute("y", "60%")
        .setAttribute("style", FONT_STYLE_BODY)
        .setAttribute("font-size", FONT_SIZE_BODY)
        .setTextContent(pieceNum)
        .setAttribute("onclick", "PieceSelectScreen.handleClick(event)")
        .setAttribute("pieceNum", pieceNum)
    );
  }
}
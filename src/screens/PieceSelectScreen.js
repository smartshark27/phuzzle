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
    switchScreenTo("PUZZLE");
  }

  _drawBackButton() {
    const handleClick = 'switchScreenTo("PUZZLE_SELECT")';
    this.elements.push(new BackButton(handleClick));
  }

  _drawTitle() {
    this.elements.push(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", "50%")
        .setAttribute("y", "40%")
        .setAttribute("style", TEXT_STYLE.HEADING.FONT)
        .setAttribute("font-size", TEXT_STYLE.HEADING.SIZE)
        .setTextContent("Select Piece")
    );
  }

  _drawButtons() {
    const numberOfButtons = Number(phonesNum);
    const xPositions = generatePositionsBetween(numberOfButtons, 30, 70);
    for (var i = 0; i < numberOfButtons; i++) {
      const x = xPositions[i];
      this._drawButton(x, (i + 1).toString());
    }
  }

  _drawButton(x, pieceNum) {
    const tempText = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("x", x)
      .setAttribute("y", "60%")
      .setAttribute("style", TEXT_STYLE.BODY.FONT)
      .setAttribute("font-size", TEXT_STYLE.BODY.SIZE)
      .setTextContent(pieceNum);
    const textBoundary = tempText.getBBox();
    tempText.remove();

    const difficulty = PUZZLE_LOOKUP[phonesNum][puzzleNum].DIFFICULTY;
    const color = DIFFICULTY_COLORS[difficulty];

    this.elements.push(
      SVG.new("rect")
        .setAttribute("x", textBoundary.x - 40)
        .setAttribute("y", textBoundary.y - 20)
        .setAttribute("width", textBoundary.width + 80)
        .setAttribute("height", textBoundary.height + 40)
        .setAttribute("fill", color)
        .setAttribute("onclick", "PieceSelectScreen.handleClick(event)")
        .setAttribute("pieceNum", pieceNum)
    );
    this.elements.push(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", x)
        .setAttribute("y", "60%")
        .setAttribute("style", TEXT_STYLE.BODY.FONT)
        .setAttribute("font-size", TEXT_STYLE.BODY.SIZE)
        .setTextContent(pieceNum)
        .setAttribute("onclick", "PieceSelectScreen.handleClick(event)")
        .setAttribute("pieceNum", pieceNum)
    );
  }
}

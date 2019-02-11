import BaseFigureToolState from '../BaseFigureToolState';

const CUTOFF_DISTANCE = 10;

class FigureToolState extends BaseFigureToolState {
  constructor() {
    super();

    this.points = [];
    this.isAddingPoints = false;

    this.clientX = 0;
    this.clientY = 0;
  }

  onMouseDown(event) {
    this.clientX = event.clientX;
    this.clientY = event.clientY;

    if (!this.isAddingPoints) {
      this.points = [[this.clientX, this.clientY]];
      this.isAddingPoints = true;
    }
  }

  onMouseMove(event) {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  onMouseUp() {
    const lastPoint = this.points.pop();
    const distance = Math.sqrt(
      ((lastPoint[0] - this.clientX) ** 2) + ((lastPoint[1] - this.clientY) ** 2),
    );

    if (distance <= CUTOFF_DISTANCE && this.points.length > 0) {
      this.isAddingPoints = false;
      this.points.push([this.clientX, this.clientY]);
    } else if (distance > CUTOFF_DISTANCE) {
      this.points.push(lastPoint);
      this.points.push([this.clientX, this.clientY]);
    } else {
      this.points.push(lastPoint);
    }
  }

  fixRelativeCoords(containerX, containerY) {
    this.points = this.points.map(coords => [
      coords[0] - containerX,
      coords[1] - containerY,
    ]);
  }

  serialize() {
    return {
      points: this.points,
      addBorder: this.addBorder,
      borderWidth: this.borderWidth,
      borderColor: this.borderColor,
      addFill: this.addFill,
      fillColor: this.fillColor,
    };
  }

  restore() {
    this.points = [];
    this.isAddingPoints = false;
  }

  static deserialize(stateObj) {
    const state = new FigureToolState();
    Object.assign(state, stateObj);

    return state;
  }
}

export default FigureToolState;

import BaseLineToolState from '../BaseLineToolState';

class BrushToolState extends BaseLineToolState {
  constructor() {
    super();

    this.points = [];
    this.isAddingPoints = false;
  }

  onMouseDown(event) {
    this.points = [[event.clientX, event.clientY]];
    this.isAddingPoints = true;
  }

  onMouseMove(event) {
    this.points.push([event.clientX, event.clientY]);
  }

  onMouseUp() {
    this.isAddingPoints = false;
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
      width: this.width,
      color: this.color,
    };
  }

  static deserialize(stateObj) {
    const state = new BrushToolState();
    Object.assign(state, stateObj);

    return state;
  }
}

export default BrushToolState;

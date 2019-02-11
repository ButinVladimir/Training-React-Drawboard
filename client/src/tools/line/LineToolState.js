import BaseLineToolState from '../BaseLineToolState';

class LineToolState extends BaseLineToolState {
  constructor() {
    super();

    this.anchorX = 0;
    this.anchorY = 0;

    this.clientX = 0;
    this.clientY = 0;
  }

  onMouseDown(event) {
    this.anchorX = event.clientX;
    this.anchorY = event.clientY;

    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  onMouseMove(event) {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  onMouseUp() {
    this.clientX = this.anchorX;
    this.clientY = this.anchorY;
  }

  fixRelativeCoords(containerX, containerY) {
    this.anchorX -= containerX;
    this.anchorY -= containerY;

    this.clientX -= containerX;
    this.clientY -= containerY;
  }

  serialize() {
    return {
      anchorX: this.anchorX,
      anchorY: this.anchorY,
      clientX: this.clientX,
      clientY: this.clientY,
      width: this.width,
      color: this.color,
    };
  }

  static deserialize(stateObj) {
    const state = new LineToolState();
    Object.assign(state, stateObj);

    return state;
  }
}

export default LineToolState;

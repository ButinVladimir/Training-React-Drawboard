import BaseToolState from '../BaseToolState';

class LineToolState extends BaseToolState {
  constructor() {
    super();

    this.anchorX = 0;
    this.anchorY = 0;

    this.clientX = 0;
    this.clientY = 0;

    this.width = 1;
    this.color = '#000000';
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
}

export default LineToolState;

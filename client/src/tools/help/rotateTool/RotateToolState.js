import ToolState from '../ToolState';
import { DEFAULT_ROTATION } from '../../ViewState';

const DEFAULT_SPEED = 200.0;

class RotateToolState extends ToolState {
  constructor() {
    super();

    this.rotation = DEFAULT_ROTATION;

    this.speed = DEFAULT_SPEED;
  }

  restore() {
    this.rotation = DEFAULT_ROTATION;
  }

  setDefaultSpeed() {
    this.speed = DEFAULT_SPEED;
  }

  onMouseUp() {
    this.rotation = this.calculateRotation();

    super.onMouseUp();
  }

  calculateRotation() {
    return Number.isNaN(this.speed)
      ? this.rotation
      : this.rotation - (this.clientX - this.anchorX) / this.speed;
  }
}

export default RotateToolState;

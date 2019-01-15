import HelpToolState from '../HelpToolState';
import { DEFAULT_DELTA_X, DEFAULT_DELTA_Y } from '../../ViewState';

const DEFAULT_SPEED = 1.0;

class MoveToolState extends HelpToolState {
  constructor() {
    super();

    this.deltaX = DEFAULT_DELTA_X;
    this.deltaY = DEFAULT_DELTA_Y;

    this.speed = DEFAULT_SPEED;
  }

  restore() {
    this.deltaX = DEFAULT_DELTA_X;
    this.deltaY = DEFAULT_DELTA_Y;
  }

  setDefaultSpeed() {
    this.speed = DEFAULT_SPEED;
  }

  onMouseUp() {
    this.deltaX = this.calculateDeltaX();
    this.deltaY = this.calculateDeltaY();

    super.onMouseUp();
  }

  calculateDeltaX() {
    return Number.isNaN(this.speed)
      ? this.deltaX
      : this.deltaX + (this.clientX - this.anchorX) * this.speed;
  }

  calculateDeltaY() {
    return Number.isNaN(this.speed)
      ? this.deltaY
      : this.deltaY + (this.clientY - this.anchorY) * this.speed;
  }
}

export default MoveToolState;

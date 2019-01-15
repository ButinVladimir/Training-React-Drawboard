import ToolState from '../ToolState';
import { DEFAULT_ZOOM } from '../../ViewState';

const DEFAULT_SPEED = 200.0;

class ZoomToolState extends ToolState {
  constructor() {
    super();

    this.zoom = DEFAULT_ZOOM;

    this.speed = DEFAULT_SPEED;
  }

  restore() {
    this.zoom = DEFAULT_ZOOM;
  }

  setDefaultSpeed() {
    this.speed = DEFAULT_SPEED;
  }

  onMouseUp() {
    this.zoom = this.calculateZoom();

    super.onMouseUp();
  }

  calculateZoom() {
    return Number.isNaN(this.speed)
      ? this.zoom
      : this.zoom + (this.clientX - this.anchorX) / this.speed;
  }
}

export default ZoomToolState;

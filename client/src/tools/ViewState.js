export const DEFAULT_DELTA_X = 0.0;
export const DEFAULT_DELTA_Y = 0.0;
export const DEFAULT_ZOOM = 1.0;
export const DEFAULT_ROTATION = 0.0;

class ViewState {
  constructor(
    deltaX = DEFAULT_DELTA_X,
    deltaY = DEFAULT_DELTA_Y,
    zoom = DEFAULT_ZOOM,
    rotation = DEFAULT_ROTATION,
  ) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.zoom = zoom;
    this.rotation = rotation;
  }

  changeDelta(deltaX, deltaY) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  changeZoom(zoom) {
    this.zoom = zoom;
  }

  changeRotation(rotation) {
    this.rotation = rotation;
  }

  applyTransformations(context) {
    context.resetTransform();
    context.translate(this.deltaX, this.deltaY);
    context.rotate(this.rotation);
    context.scale(this.zoom, this.zoom);
  }

  applyReverseTransformations(context) {
    context.resetTransform();
    context.scale(1 / this.zoom, 1 / this.zoom);
    context.rotate(-this.rotation);
    context.translate(-this.deltaX, -this.deltaY);
  }

  serialize() {
    return {
      deltaX: this.deltaX,
      deltaY: this.deltaY,
      zoom: this.zoom,
      rotation: this.rotation,
    };
  }

  static unserialize(viewStateObj) {
    return new ViewState(
      viewStateObj.deltaX,
      viewStateObj.deltaY,
      viewStateObj.zoom,
      viewStateObj.rotation,
    );
  }
}

export default ViewState;

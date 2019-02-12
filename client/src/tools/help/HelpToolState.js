import BaseToolState from '../BaseToolState';

class HelpToolState extends BaseToolState {
  constructor() {
    super();

    this.anchorX = 0;
    this.anchorY = 0;

    this.clientX = 0;
    this.clientY = 0;

    this.speed = 0;
  }

  restore() { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  setDefaultSpeed() { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
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

  serialize() { // eslint-disable-line class-methods-use-this
    return null;
  }

  static deserialize() {
    return null;
  }
}

export default HelpToolState;

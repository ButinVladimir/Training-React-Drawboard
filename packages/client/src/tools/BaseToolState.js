class BaseToolState {
  onMouseDown(event) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  onMouseMove(event) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  onMouseUp() { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  serialize() { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }

  static deserialize(stateObj) { // eslint-disable-line class-methods-use-this,no-unused-vars
    throw new Error('Method is not implemented');
  }
}

export default BaseToolState;

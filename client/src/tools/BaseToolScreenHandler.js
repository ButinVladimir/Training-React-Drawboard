class BaseToolScreenHandler {
  constructor(toolState, stateHandler) {
    this.toolState = toolState;
    this.stateHandler = stateHandler;

    this.isMouseDown = false;
  }

  onMouseDown(event) {
    if (!this.isMouseDown) {
      this.isMouseDown = true;
      this.toolState.onMouseDown(event);
    }
  }

  onMouseUp() {
    if (this.isMouseDown) {
      this.isMouseDown = false;

      return this.stateHandler.onMouseUp(this.toolState);
    }

    return null;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.toolState.onMouseMove(event);
      this.stateHandler.onMouseMove(this.toolState);
    }
  }
}

export default BaseToolScreenHandler;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardPage from './BoardPage';
import ToolsProvider from '../../../tools/ToolsProvider';
import Canvas from '../../../tools/Canvas';
import ViewState from '../../../tools/ViewState';

class BoardPageContainer extends Component {
  constructor(props) {
    super(props);

    const { toolsProvider } = this.props;
    const selectedToolName = toolsProvider.getToolsNames()[0];

    this.onError = this.onError.bind(this);
    this.onDraw = this.onDraw.bind(this);
    this.onDrawSingleOperation = this.onDrawSingleOperation.bind(this);
    this.onGetImage = this.onGetImage.bind(this);
    this.onChangeTool = this.onChangeTool.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = {
      errorMessage: '',
      selectedToolName,
    };
    this.selectedTool = toolsProvider.getTool(selectedToolName);

    this.canvasContainerRef = null;
    this.screenCanvasRef = null;
    this.bufferLoaded = false;
    this.buffer = [];
  }

  componentDidMount() {
    const {
      registerErrorHandlers,
      registerDrawHandler,
      registerGetImageHandler,
      emitGetImageEvent,
    } = this.props;

    registerErrorHandlers(this.onError);
    registerDrawHandler(this.onDraw);
    registerGetImageHandler(this.onGetImage);
    emitGetImageEvent();

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const { canvas } = this.props;
    const width = window.innerWidth - this.canvasContainerRef.offsetLeft;
    const height = window.innerHeight - this.canvasContainerRef.offsetTop;

    this.screenCanvasRef.setAttribute('width', width);
    this.screenCanvasRef.setAttribute('height', height);

    canvas.screenCanvas = this.screenCanvasRef;
    canvas.containerPositionX = this.canvasContainerRef.offsetLeft;
    canvas.containerPositionY = this.canvasContainerRef.offsetTop;
    canvas.outputCompletely();
  }

  onError(error) {
    this.setState({ errorMessage: error });
  }

  onDraw(viewStateObj, toolName, toolStateObj) {
    if (this.bufferLoaded) {
      this.onDrawSingleOperation(viewStateObj, toolName, toolStateObj);
    } else {
      this.buffer.push({ viewStateObj, toolName, toolStateObj });
    }
  }

  onGetImage(imageData) {
    const { canvas } = this.props;

    canvas.addPreloadedImage(imageData, () => {
      this.buffer.forEach(this.onDrawSingleOperation);
      this.bufferLoaded = true;
    });
  }

  onDrawSingleOperation(viewStateObj, toolName, toolStateObj) {
    const { canvas, toolsProvider } = this.props;
    const tool = toolsProvider.getTool(toolName);
    const viewState = ViewState.unserialize(viewStateObj);
    const toolState = tool.unserializeState(toolStateObj);

    canvas.applyState(tool.stateHandler, viewState, toolState);
  }

  onChangeTool(selectedToolName) {
    const { toolsProvider } = this.props;
    this.selectedTool = toolsProvider.getTool(selectedToolName);
    this.selectedTool.onSelect();

    this.setState({ selectedToolName });
  }

  onMouseDown(event) {
    this.selectedTool.screenHandler.onMouseDown(event);
  }

  onMouseUp(event) {
    const drawEventObj = this.selectedTool.screenHandler.onMouseUp(event);

    if (drawEventObj != null) {
      const { selectedToolName } = this.state;
      const { emitDrawEvent, canvas } = this.props;
      emitDrawEvent(
        canvas.viewState.serialize(),
        selectedToolName,
        drawEventObj,
      );
    }
  }

  onMouseMove(event) {
    this.selectedTool.screenHandler.onMouseMove(event);
  }

  render() {
    const { errorMessage, selectedToolName } = this.state;
    const { toolsProvider } = this.props;
    const toolsNames = toolsProvider.getToolsNames();

    const selectedToolOptions = this.selectedTool.optionsElement;

    return (
      <BoardPage
        errorMessage={errorMessage}
        toolsNames={toolsNames}
        selectedToolName={selectedToolName}
        selectedToolOptions={selectedToolOptions}
        onChangeTool={this.onChangeTool}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        setCanvasContainerRef={(ref) => { this.canvasContainerRef = ref; }}
        setScreenCanvasRef={(ref) => { this.screenCanvasRef = ref; }}
      />
    );
  }
}

BoardPageContainer.propTypes = {
  registerErrorHandlers: PropTypes.func.isRequired,
  registerDrawHandler: PropTypes.func.isRequired,
  registerGetImageHandler: PropTypes.func.isRequired,
  emitDrawEvent: PropTypes.func.isRequired,
  emitGetImageEvent: PropTypes.func.isRequired,
  toolsProvider: PropTypes.instanceOf(ToolsProvider).isRequired,
  canvas: PropTypes.instanceOf(Canvas).isRequired,
};

export default BoardPageContainer;

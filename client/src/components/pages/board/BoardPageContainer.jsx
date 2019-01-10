import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardPage from './BoardPage';
import ToolsProvider from '../../../tools/ToolsProvider';
import Canvas from '../../../tools/Canvas';

class BoardPageContainer extends Component {
  constructor(props) {
    super(props);

    const { toolsProvider } = this.props;
    const selectedToolName = toolsProvider.getToolsNames()[0];

    this.onError = this.onError.bind(this);
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

    const { registerErrorHandlers } = this.props;
    registerErrorHandlers(this.onError);
  }

  componentDidMount() {
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

  onChangeTool(selectedToolName) {
    const { toolsProvider } = this.props;
    this.selectedTool = toolsProvider.getTool(selectedToolName);

    this.setState({ selectedToolName });
  }

  onMouseDown(event) {
    this.selectedTool.onMouseDown(event);
  }

  onMouseUp(event) {
    this.selectedTool.onMouseUp(event);
  }

  onMouseMove(event) {
    this.selectedTool.onMouseMove(event);
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
  toolsProvider: PropTypes.instanceOf(ToolsProvider).isRequired,
  canvas: PropTypes.instanceOf(Canvas).isRequired,
};

export default BoardPageContainer;

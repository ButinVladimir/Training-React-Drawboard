import React, { Component, createRef } from 'react';
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

    this.canvasRef = createRef();
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
    const ref = this.canvasRef.current;
    ref.setAttribute('width', window.innerWidth);
    ref.setAttribute('height', window.innerHeight - 51);

    canvas.screenCanvas = this.canvasRef.current;
    canvas.completeOutput();
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
        ref={this.canvasRef}
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

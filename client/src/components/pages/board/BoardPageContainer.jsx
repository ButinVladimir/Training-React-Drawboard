import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardPage from './BoardPage';
import ToolsProvider from '../../../tools/ToolsProvider';

class BoardPageContainer extends Component {
  constructor(props) {
    super(props);

    const { toolsProvider } = this.props;
    const selectedToolName = toolsProvider.getToolsNames()[0];

    this.onError = this.onError.bind(this);
    this.onChangeTool = this.onChangeTool.bind(this);

    this.state = {
      errorMessage: '',
      selectedToolName,
    };

    const { registerErrorHandlers } = this.props;
    registerErrorHandlers(this.onError);
  }

  onError(error) {
    this.setState({ errorMessage: error });
  }

  onChangeTool(selectedToolName) {
    this.setState({ selectedToolName });
  }

  render() {
    const { errorMessage, selectedToolName } = this.state;
    const { toolsProvider } = this.props;
    const toolsNames = toolsProvider.getToolsNames();
    const selectedToolOptions = toolsProvider.getTool(selectedToolName).optionsElement;

    return (
      <BoardPage
        errorMessage={errorMessage}
        toolsNames={toolsNames}
        selectedToolName={selectedToolName}
        selectedToolOptions={selectedToolOptions}
        onChangeTool={this.onChangeTool}
      />
    );
  }
}

BoardPageContainer.propTypes = {
  registerErrorHandlers: PropTypes.func.isRequired,
  toolsProvider: PropTypes.instanceOf(ToolsProvider).isRequired,
};

export default BoardPageContainer;

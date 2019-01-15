import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineToolOptions from './LineToolOptions';
import LineToolState from './LineToolState';

const widths = [1, 2, 3, 4, 5, 10, 20, 50];

class LineToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onSelectWidth = this.onSelectWidth.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);

    const { toolState } = this.props;

    this.state = {
      width: toolState.width,
      color: toolState.color,
    };
  }

  onSelectWidth(width) {
    const { toolState } = this.props;
    const parsedWidth = parseInt(width, 10);

    this.setState({ width: parsedWidth });
    toolState.width = parsedWidth;
  }

  onSelectColor(color) {
    const { toolState } = this.props;

    this.setState({ color });
    toolState.color = color;
  }

  render() {
    const { width, color } = this.state;

    return (
      <LineToolOptions
        width={width}
        color={color}
        widths={widths}
        onSelectWidth={this.onSelectWidth}
        onSelectColor={this.onSelectColor}
      />
    );
  }
}

LineToolOptionsContainer.propTypes = {
  toolState: PropTypes.instanceOf(LineToolState).isRequired,
};

export default LineToolOptionsContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineToolOptions from './LineToolOptions';

const widths = [1, 2, 3, 4, 5, 10, 20, 50];

class LineToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onSelectWidth = this.onSelectWidth.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);

    const { width, color } = this.props;

    this.state = {
      width,
      color,
    };
  }

  onSelectWidth(width) {
    const { onSelectWidth } = this.props;
    const parsedWidth = parseInt(width, 10);

    this.setState({ width: parsedWidth });
    onSelectWidth(parsedWidth);
  }

  onSelectColor(color) {
    const { onSelectColor } = this.props;

    this.setState({ color });
    onSelectColor(color);
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
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onSelectWidth: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default LineToolOptionsContainer;

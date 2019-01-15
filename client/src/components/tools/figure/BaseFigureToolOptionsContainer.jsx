import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseFigureToolOptions from './BaseFigureToolOptions';
import BaseFigureToolState from '../../../tools/BaseFigureToolState';

const widths = [1, 2, 3, 4, 5, 10, 20, 50];

class BaseFigureToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddBorder = this.onChangeAddBorder.bind(this);
    this.onSelectBorderWidth = this.onSelectBorderWidth.bind(this);
    this.onSelectBorderColor = this.onSelectBorderColor.bind(this);
    this.onChangeAddFill = this.onChangeAddFill.bind(this);
    this.onSelectFillColor = this.onSelectFillColor.bind(this);

    const { toolState } = this.props;

    this.state = {
      addBorder: toolState.addBorder,
      borderWidth: toolState.borderWidth,
      borderColor: toolState.borderColor,
      addFill: toolState.addFill,
      fillColor: toolState.fillColor,
    };
  }

  onChangeAddBorder() {
    const { toolState } = this.props;
    toolState.addBorder = !toolState.addBorder;

    this.setState({ addBorder: toolState.addBorder });
  }

  onSelectBorderWidth(width) {
    const { toolState } = this.props;
    const parsedWidth = parseInt(width, 10);

    this.setState({ borderWidth: parsedWidth });
    toolState.borderWidth = parsedWidth;
  }

  onSelectBorderColor(borderColor) {
    const { toolState } = this.props;

    this.setState({ borderColor });
    toolState.borderColor = borderColor;
  }

  onChangeAddFill() {
    const { toolState } = this.props;
    toolState.addFill = !toolState.addFill;

    this.setState({ addFill: toolState.addFill });
  }

  onSelectFillColor(fillColor) {
    const { toolState } = this.props;

    this.setState({ fillColor });
    toolState.fillColor = fillColor;
  }

  render() {
    const {
      addBorder,
      borderWidth,
      borderColor,
      addFill,
      fillColor,
    } = this.state;

    return (
      <BaseFigureToolOptions
        addBorder={addBorder}
        borderWidth={borderWidth}
        borderColor={borderColor}
        addFill={addFill}
        fillColor={fillColor}
        widths={widths}
        onChangeAddBorder={this.onChangeAddBorder}
        onSelectBorderWidth={this.onSelectBorderWidth}
        onSelectBorderColor={this.onSelectBorderColor}
        onChangeAddFill={this.onChangeAddFill}
        onSelectFillColor={this.onSelectFillColor}
      />
    );
  }
}

BaseFigureToolOptionsContainer.propTypes = {
  toolState: PropTypes.instanceOf(BaseFigureToolState).isRequired,
};

export default BaseFigureToolOptionsContainer;

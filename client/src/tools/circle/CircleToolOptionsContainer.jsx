import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleToolOptions from './CircleToolOptions';

const widths = [1, 2, 3, 4, 5, 10, 20, 50];

class CircleToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddBorder = this.onChangeAddBorder.bind(this);
    this.onSelectBorderWidth = this.onSelectBorderWidth.bind(this);
    this.onSelectBorderColor = this.onSelectBorderColor.bind(this);
    this.onChangeAddFill = this.onChangeAddFill.bind(this);
    this.onSelectFillColor = this.onSelectFillColor.bind(this);

    const {
      addBorder,
      borderWidth,
      borderColor,
      addFill,
      fillColor,
    } = this.props;

    this.state = {
      addBorder,
      borderWidth,
      borderColor,
      addFill,
      fillColor,
    };
  }

  onChangeAddBorder() {
    const { onChangeAddBorder } = this.props;

    this.setState((state) => {
      const addBorder = !state.addBorder;
      onChangeAddBorder(addBorder);

      return { addBorder };
    });
  }

  onSelectBorderWidth(width) {
    const { onSelectBorderWidth } = this.props;
    const parsedWidth = parseInt(width, 10);

    this.setState({ borderWidth: parsedWidth });
    onSelectBorderWidth(parsedWidth);
  }

  onSelectBorderColor(borderColor) {
    const { onSelectBorderColor } = this.props;

    this.setState({ borderColor });
    onSelectBorderColor(borderColor);
  }

  onChangeAddFill() {
    const { onChangeAddFill } = this.props;

    this.setState((state) => {
      const addFill = !state.addFill;
      onChangeAddFill(addFill);

      return { addFill };
    });
  }

  onSelectFillColor(fillColor) {
    const { onSelectFillColor } = this.props;

    this.setState({ fillColor });
    onSelectFillColor(fillColor);
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
      <CircleToolOptions
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

CircleToolOptionsContainer.propTypes = {
  addBorder: PropTypes.bool.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  addFill: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  onChangeAddBorder: PropTypes.func.isRequired,
  onSelectBorderWidth: PropTypes.func.isRequired,
  onSelectBorderColor: PropTypes.func.isRequired,
  onChangeAddFill: PropTypes.func.isRequired,
  onSelectFillColor: PropTypes.func.isRequired,
};

export default CircleToolOptionsContainer;

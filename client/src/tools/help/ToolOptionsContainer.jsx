import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToolOptions from './ToolOptions';

class ToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onSetDefaultSpeed = this.onSetDefaultSpeed.bind(this);

    const { speed } = this.props;
    const parsedSpeed = parseFloat(speed);

    this.state = {
      speed,
      parsedSpeed,
    };
  }

  onChangeSpeed(speed) {
    const { onChangeSpeed } = this.props;
    const parsedSpeed = parseFloat(speed);

    this.setState({ speed, parsedSpeed });
    onChangeSpeed(parsedSpeed);
  }

  onSetDefaultSpeed() {
    const { onChangeSpeed, defaultSpeed } = this.props;
    const parsedSpeed = parseFloat(defaultSpeed);

    this.setState({ speed: defaultSpeed, parsedSpeed });
    onChangeSpeed(parsedSpeed);
  }

  render() {
    const { speed, parsedSpeed } = this.state;
    const { onRestore } = this.props;

    return (
      <ToolOptions
        speed={speed}
        parsedSpeed={parsedSpeed}
        onChangeSpeed={this.onChangeSpeed}
        onSetDefaultSpeed={this.onSetDefaultSpeed}
        onRestore={onRestore}
      />
    );
  }
}

ToolOptionsContainer.propTypes = {
  defaultSpeed: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
};

export default ToolOptionsContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelpToolOptions from './HelpToolOptions';
import HelpToolState from '../../../tools/help/HelpToolState';

class HelpToolOptionsContainer extends Component {
  constructor(props) {
    super(props);

    this.onRestore = this.onRestore.bind(this);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onSetDefaultSpeed = this.onSetDefaultSpeed.bind(this);

    const { toolState } = this.props;
    const parsedSpeed = parseFloat(toolState.speed);

    this.state = {
      speed: parsedSpeed,
      parsedSpeed,
    };
  }

  onRestore() {
    const { onRestore } = this.props;

    onRestore();
  }

  onChangeSpeed(speed) {
    const { toolState } = this.props;
    const parsedSpeed = parseFloat(speed);

    this.setState({ speed, parsedSpeed });
    toolState.speed = parsedSpeed;
  }

  onSetDefaultSpeed() {
    const { toolState } = this.props;

    toolState.setDefaultSpeed();
    this.setState({
      speed: toolState.speed,
      parsedSpeed: toolState.speed,
    });
  }

  render() {
    const { speed, parsedSpeed } = this.state;

    return (
      <HelpToolOptions
        speed={speed}
        parsedSpeed={parsedSpeed}
        onChangeSpeed={this.onChangeSpeed}
        onSetDefaultSpeed={this.onSetDefaultSpeed}
        onRestore={this.onRestore}
      />
    );
  }
}

HelpToolOptionsContainer.propTypes = {
  toolState: PropTypes.instanceOf(HelpToolState).isRequired,
  onRestore: PropTypes.func.isRequired,
};

export default HelpToolOptionsContainer;

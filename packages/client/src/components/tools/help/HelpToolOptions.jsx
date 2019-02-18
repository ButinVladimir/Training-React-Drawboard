import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HelpToolOptions = ({
  speed,
  parsedSpeed,
  onChangeSpeed,
  onSetDefaultSpeed,
  onRestore,
}) => (
  <Fragment>
    <div className="tool-option-container">
      <strong>Speed </strong>
      <input type="text" name="speed" value={speed} onChange={(e) => { onChangeSpeed(e.target.value); }} />
      <span>
        {`(${parsedSpeed})`}
      </span>
    </div>
    <div className="tool-option-container">
      <button type="button" name="set-default-speed" onClick={onSetDefaultSpeed}>Set default speed</button>
    </div>
    <div className="tool-option-container">
      <button type="button" name="restore" onClick={onRestore}>Restore</button>
    </div>
  </Fragment>
);

HelpToolOptions.propTypes = {
  speed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  parsedSpeed: PropTypes.number.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onSetDefaultSpeed: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
};

export default HelpToolOptions;

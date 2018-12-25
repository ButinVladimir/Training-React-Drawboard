import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ToolOptions = ({
  speed,
  parsedSpeed,
  currentValue,
  onChangeSpeed,
  onSetDefaultSpeed,
  onRestore,
}) => (
  <Fragment>
    <div className="tool-option-container">
      <strong>Speed </strong>
      <input type="text" value={speed} onChange={(e) => { onChangeSpeed(e.target.value); }} />
      <span>
        {`(${parsedSpeed})`}
      </span>
    </div>
    <div className="tool-option-container">
      <button type="button" onClick={onSetDefaultSpeed}>Set default speed</button>
    </div>
    <div className="tool-option-container">
      <button type="button" onClick={onRestore}>Restore</button>
    </div>
    <div className="tool-option-container">
      {currentValue}
    </div>
  </Fragment>
);

ToolOptions.propTypes = {
  speed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  parsedSpeed: PropTypes.number.isRequired,
  currentValue: PropTypes.string.isRequired,
  onChangeSpeed: PropTypes.func.isRequired,
  onSetDefaultSpeed: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
};

export default ToolOptions;

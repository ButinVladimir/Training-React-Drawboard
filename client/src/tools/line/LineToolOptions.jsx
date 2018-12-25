import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LineToolOptions = ({
  width,
  color,
  widths,
  onSelectWidth,
  onSelectColor,
}) => {
  const widthsOptions = widths.map(w => <option value={w} key={w}>{w}</option>);

  return (
    <Fragment>
      <div className="tool-option-container">
        <strong>Width </strong>
        <select value={width} onChange={e => onSelectWidth(e.target.value)}>
          {widthsOptions}
        </select>
      </div>
      <div className="tool-option-container">
        <strong>Color </strong>
        <input type="color" value={color} onChange={e => onSelectColor(e.target.value)} />
      </div>
    </Fragment>
  );
};

LineToolOptions.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectWidth: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default LineToolOptions;

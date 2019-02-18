import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const BaseLineToolOptions = ({
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
        <select name="width" value={width} onChange={e => onSelectWidth(e.target.value)}>
          {widthsOptions}
        </select>
      </div>
      <div className="tool-option-container">
        <strong>Color </strong>
        <input name="color" type="color" value={color} onChange={e => onSelectColor(e.target.value)} />
      </div>
    </Fragment>
  );
};

BaseLineToolOptions.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectWidth: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default BaseLineToolOptions;

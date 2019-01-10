import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CircleToolOptions = ({
  addBorder,
  borderWidth,
  borderColor,
  addFill,
  fillColor,
  widths,
  onChangeAddBorder,
  onSelectBorderWidth,
  onSelectBorderColor,
  onChangeAddFill,
  onSelectFillColor,
}) => {
  const widthsOptions = widths.map(w => <option value={w} key={w}>{w}</option>);

  return (
    <Fragment>
      <div className="tool-option-container">
        <strong>Add border </strong>
        <input type="checkbox" checked={addBorder} onChange={onChangeAddBorder} />
      </div>
      <div className="tool-option-container">
        <strong>Border Width </strong>
        <select value={borderWidth} onChange={e => onSelectBorderWidth(e.target.value)}>
          {widthsOptions}
        </select>
      </div>
      <div className="tool-option-container">
        <strong>Border color </strong>
        <input type="color" value={borderColor} onChange={e => onSelectBorderColor(e.target.value)} />
      </div>
      <div className="tool-option-container">
        <strong>Add fill </strong>
        <input type="checkbox" checked={addFill} onChange={onChangeAddFill} />
      </div>
      <div className="tool-option-container">
        <strong>Fill color </strong>
        <input type="color" value={fillColor} onChange={e => onSelectFillColor(e.target.value)} />
      </div>
    </Fragment>
  );
};

CircleToolOptions.propTypes = {
  addBorder: PropTypes.bool.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  addFill: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChangeAddBorder: PropTypes.func.isRequired,
  onSelectBorderWidth: PropTypes.func.isRequired,
  onSelectBorderColor: PropTypes.func.isRequired,
  onChangeAddFill: PropTypes.func.isRequired,
  onSelectFillColor: PropTypes.func.isRequired,
};

export default CircleToolOptions;

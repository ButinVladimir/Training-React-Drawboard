import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const BaseFigureToolOptions = ({
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
        <input name="add-border" type="checkbox" checked={addBorder} onChange={onChangeAddBorder} />
      </div>
      <div className="tool-option-container">
        <strong>Border Width </strong>
        <select name="border-width" value={borderWidth} onChange={e => onSelectBorderWidth(e.target.value)}>
          {widthsOptions}
        </select>
      </div>
      <div className="tool-option-container">
        <strong>Border color </strong>
        <input name="border-color" type="color" value={borderColor} onChange={e => onSelectBorderColor(e.target.value)} />
      </div>
      <div className="tool-option-container">
        <strong>Add fill </strong>
        <input name="add-fill" type="checkbox" checked={addFill} onChange={onChangeAddFill} />
      </div>
      <div className="tool-option-container">
        <strong>Fill color </strong>
        <input name="fill-color" type="color" value={fillColor} onChange={e => onSelectFillColor(e.target.value)} />
      </div>
    </Fragment>
  );
};

BaseFigureToolOptions.propTypes = {
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

export default BaseFigureToolOptions;

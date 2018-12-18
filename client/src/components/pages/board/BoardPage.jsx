import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BoardPage = ({
  toolsNames,
  selectedToolName,
  selectedToolOptions,
  onChangeTool,
}) => {
  const toolNameOptions = toolsNames
    .map(n => (<option key={n} value={n}>{n}</option>));

  return (
    <div className="board-container">
      <div className="top-panel-container">
        <div className="top-panel">
          <div className="tool-select">
            <select onChange={(e) => { onChangeTool(e.target.value); }} value={selectedToolName}>
              {toolNameOptions}
            </select>
          </div>
          <div className="tool-options">
            {selectedToolOptions}
          </div>
        </div>
      </div>
      <div className="drawboard-area" />
    </div>
  );
};

BoardPage.propTypes = {
  toolsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedToolName: PropTypes.string.isRequired,
  selectedToolOptions: PropTypes.element.isRequired,
  onChangeTool: PropTypes.func.isRequired,
};

export default BoardPage;

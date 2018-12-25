import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BoardPage = forwardRef(({
  toolsNames,
  selectedToolName,
  selectedToolOptions,
  onChangeTool,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}, canvasRef) => {
  const toolNameOptions = toolsNames
    .map(n => (<option key={n} value={n}>{n}</option>));

  return (
    <div className="board-container" draggable={false}>
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
      <div className="drawboard-canvas-container" draggable={false}>
        <canvas
          draggable={false}
          id="drawboard-canvas"
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
        />
      </div>
    </div>
  );
});

BoardPage.propTypes = {
  toolsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedToolName: PropTypes.string.isRequired,
  selectedToolOptions: PropTypes.element.isRequired,
  onChangeTool: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
};

export default BoardPage;

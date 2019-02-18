import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const BoardPage = ({
  toolsNames,
  selectedToolName,
  selectedToolOptions,
  onChangeTool,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  setCanvasContainerRef,
  setScreenCanvasRef,
}) => {
  const toolNameOptions = toolsNames
    .map(n => (<option key={n} value={n}>{n}</option>));

  return (
    <div className="board-container" draggable={false}>
      <div className="top-panel-container">
        <div className="top-panel">
          <div className="tool-select">
            <select name="tool-name-options" onChange={(e) => { onChangeTool(e.target.value); }} value={selectedToolName}>
              {toolNameOptions}
            </select>
          </div>
          <div className="tool-options">
            {selectedToolOptions}
          </div>
        </div>
      </div>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        id="drawboard-canvas-container"
        className="drawboard-canvas-container"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        ref={setCanvasContainerRef}
      >
        <canvas
          draggable={false}
          id="drawboard-canvas"
          ref={setScreenCanvasRef}
        />
      </div>
    </div>
  );
};

BoardPage.propTypes = {
  toolsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedToolName: PropTypes.string.isRequired,
  selectedToolOptions: PropTypes.element.isRequired,
  onChangeTool: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  setCanvasContainerRef: PropTypes.func.isRequired,
  setScreenCanvasRef: PropTypes.func.isRequired,
};

export default BoardPage;

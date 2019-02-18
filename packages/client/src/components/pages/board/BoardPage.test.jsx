import React from 'react';
import { shallow } from 'enzyme';
import BoardPage from './BoardPage';

describe('BoardPage', () => {
  const toolsNames = ['a', 'b', 'c'];
  const selectedToolName = 'a';
  const selectedToolOptions = (<div>Options</div>);

  it('renders properly', () => {
    const component = shallow(<BoardPage
      toolsNames={toolsNames}
      selectedToolName={selectedToolName}
      selectedToolOptions={selectedToolOptions}
      onChangeTool={() => {}}
      onMouseDown={() => {}}
      onMouseUp={() => {}}
      onMouseMove={() => {}}
      setCanvasContainerRef={() => {}}
      setScreenCanvasRef={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('handles onChangeTool event', () => {
    const onChangeToolMock = jest.fn();
    const component = shallow(<BoardPage
      toolsNames={toolsNames}
      selectedToolName={selectedToolName}
      selectedToolOptions={selectedToolOptions}
      onChangeTool={onChangeToolMock}
      onMouseDown={() => {}}
      onMouseUp={() => {}}
      onMouseMove={() => {}}
      setCanvasContainerRef={() => {}}
      setScreenCanvasRef={() => {}}
    />);

    component.find('select[name="tool-name-options"]').simulate('change', { target: { value: 'a' } });

    expect(onChangeToolMock).toHaveBeenCalledWith('a');
  });

  it('handles onMouseDown event', () => {
    const onMouseDownMock = jest.fn();
    const component = shallow(<BoardPage
      toolsNames={toolsNames}
      selectedToolName={selectedToolName}
      selectedToolOptions={selectedToolOptions}
      onChangeTool={() => {}}
      onMouseDown={onMouseDownMock}
      onMouseUp={() => {}}
      onMouseMove={() => {}}
      setCanvasContainerRef={() => {}}
      setScreenCanvasRef={() => {}}
    />);

    component.find('#drawboard-canvas-container').simulate('mousedown');

    expect(onMouseDownMock).toHaveBeenCalled();
  });

  it('handles onMouseUp event', () => {
    const onMouseUpMock = jest.fn();
    const component = shallow(<BoardPage
      toolsNames={toolsNames}
      selectedToolName={selectedToolName}
      selectedToolOptions={selectedToolOptions}
      onChangeTool={() => {}}
      onMouseDown={() => {}}
      onMouseUp={onMouseUpMock}
      onMouseMove={() => {}}
      setCanvasContainerRef={() => {}}
      setScreenCanvasRef={() => {}}
    />);

    component.find('#drawboard-canvas-container').simulate('mouseup');

    expect(onMouseUpMock).toHaveBeenCalled();
  });

  it('handles onMouseMove event', () => {
    const onMouseMoveMock = jest.fn();
    const component = shallow(<BoardPage
      toolsNames={toolsNames}
      selectedToolName={selectedToolName}
      selectedToolOptions={selectedToolOptions}
      onChangeTool={() => {}}
      onMouseDown={() => {}}
      onMouseUp={() => {}}
      onMouseMove={onMouseMoveMock}
      setCanvasContainerRef={() => {}}
      setScreenCanvasRef={() => {}}
    />);

    component.find('#drawboard-canvas-container').simulate('mousemove');

    expect(onMouseMoveMock).toHaveBeenCalled();
  });
});

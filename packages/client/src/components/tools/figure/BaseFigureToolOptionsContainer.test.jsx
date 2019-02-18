import React from 'react';
import { shallow, mount } from 'enzyme';
import BaseFigureToolOptionsContainer from './BaseFigureToolOptionsContainer';
import BaseFigureToolState from '../../../tools/BaseFigureToolState';

describe('BaseFigureToolOptionsContainer', () => {
  it('renders properly', () => {
    const addBorder = false;
    const borderWidth = 3;
    const borderColor = '#123';
    const addFill = true;
    const fillColor = '#456';
    const toolState = new BaseFigureToolState();
    Object.assign(toolState, {
      addBorder,
      borderWidth,
      borderColor,
      addFill,
      fillColor,
    });

    const component = shallow(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    const componentState = component.state();

    expect(component).toMatchSnapshot();
    expect(componentState).toEqual({
      addBorder,
      borderWidth,
      borderColor,
      addFill,
      fillColor,
    });
  });

  it('handles onChangeAddBorder event', () => {
    const toolState = new BaseFigureToolState();
    toolState.addBorder = false;

    const component = mount(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    component.find('input[name="add-border"]').simulate('change');
    const componentState = component.state();

    expect(componentState).toMatchObject({ addBorder: true });
    expect(toolState).toMatchObject({ addBorder: true });
  });

  it('handles onSelectBorderWidth event', () => {
    const borderWidth = 9;
    const toolState = new BaseFigureToolState();

    const component = mount(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    component.find('select[name="border-width"]').simulate('change', { target: { value: borderWidth } });
    const componentState = component.state();

    expect(componentState).toMatchObject({ borderWidth });
    expect(toolState).toMatchObject({ borderWidth });
  });

  it('handles onSelectBorderColor event', () => {
    const borderColor = '#def';
    const toolState = new BaseFigureToolState();

    const component = mount(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    component.find('input[name="border-color"]').simulate('change', { target: { value: borderColor } });
    const componentState = component.state();

    expect(componentState).toMatchObject({ borderColor });
    expect(toolState).toMatchObject({ borderColor });
  });

  it('handles onChangeAddFill event', () => {
    const toolState = new BaseFigureToolState();
    toolState.addFill = false;

    const component = mount(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    component.find('input[name="add-fill"]').simulate('change');
    const componentState = component.state();

    expect(componentState).toMatchObject({ addFill: true });
    expect(toolState).toMatchObject({ addFill: true });
  });

  it('handles onSelectFillColor event', () => {
    const fillColor = '#def';
    const toolState = new BaseFigureToolState();

    const component = mount(<BaseFigureToolOptionsContainer
      toolState={toolState}
    />);
    component.find('input[name="fill-color"]').simulate('change', { target: { value: fillColor } });
    const componentState = component.state();

    expect(componentState).toMatchObject({ fillColor });
    expect(toolState).toMatchObject({ fillColor });
  });
});

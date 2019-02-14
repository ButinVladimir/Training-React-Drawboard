import React from 'react';
import { shallow, mount } from 'enzyme';
import BaseLineToolOptionsContainer from './BaseLineToolOptionsContainer';
import BaseLineToolState from '../../../tools/BaseLineToolState';

describe('BaseLineToolOptionsContainer', () => {
  it('renders properly', () => {
    const width = 3;
    const color = '#123';
    const toolState = new BaseLineToolState();
    Object.assign(toolState, {
      width,
      color,
    });

    const component = shallow(<BaseLineToolOptionsContainer
      toolState={toolState}
    />);
    const componentState = component.state();

    expect(component).toMatchSnapshot();
    expect(componentState).toEqual({
      width,
      color,
    });
  });

  it('handles onSelectWidth event', () => {
    const toolState = new BaseLineToolState();
    const width = 7;

    const component = mount(<BaseLineToolOptionsContainer
      toolState={toolState}
    />);
    component.find('select[name="width"]').simulate('change', { target: { value: width } });
    const componentState = component.state();

    expect(componentState).toMatchObject({ width });
    expect(toolState).toMatchObject({ width });
  });

  it('handles onSelectColor event', () => {
    const toolState = new BaseLineToolState();
    const color = '#abc';

    const component = mount(<BaseLineToolOptionsContainer
      toolState={toolState}
    />);
    component.find('input[name="color"]').simulate('change', { target: { value: color } });
    const componentState = component.state();

    expect(componentState).toMatchObject({ color });
    expect(toolState).toMatchObject({ color });
  });
});

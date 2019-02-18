import React from 'react';
import { shallow, mount } from 'enzyme';
import HelpToolOptionsContainer from './HelpToolOptionsContainer';
import HelpToolState from '../../../tools/help/HelpToolState';

describe('HelpToolOptionsContainer', () => {
  it('renders properly', () => {
    const speed = 3;
    const toolState = new HelpToolState();
    Object.assign(toolState, { speed });

    const component = shallow(<HelpToolOptionsContainer
      toolState={toolState}
      onRestore={() => {}}
    />);
    const componentState = component.state();

    expect(component).toMatchSnapshot();
    expect(componentState).toEqual({
      speed,
      parsedSpeed: speed,
    });
  });

  it('handles onChangeSpeed event', () => {
    const toolState = new HelpToolState();
    const component = mount(<HelpToolOptionsContainer
      toolState={toolState}
      onRestore={() => {}}
    />);
    const speed = '5';
    const parsedSpeed = 5;

    component.find('input[name="speed"]').simulate('change', { target: { value: speed } });
    const componentState = component.state();

    expect(toolState.speed).toBe(parsedSpeed);
    expect(componentState).toMatchObject({
      speed,
      parsedSpeed,
    });
  });

  it('handles onSetDefaultSpeed event', () => {
    const speed = 4;
    const toolState = new HelpToolState();
    toolState.setDefaultSpeed = jest.fn(() => { toolState.speed = speed; });
    const component = mount(<HelpToolOptionsContainer
      toolState={toolState}
      onRestore={() => {}}
    />);

    component.find('button[name="set-default-speed"]').simulate('click');
    const componentState = component.state();

    expect(toolState.setDefaultSpeed).toHaveBeenCalled();
    expect(toolState.speed).toBe(speed);
    expect(componentState).toMatchObject({
      speed,
      parsedSpeed: speed,
    });
  });
});

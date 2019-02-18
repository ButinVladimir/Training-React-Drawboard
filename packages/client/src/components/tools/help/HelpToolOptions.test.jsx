import React from 'react';
import { shallow } from 'enzyme';
import HelpToolOptions from './HelpToolOptions';

describe('HelpToolOptions', () => {
  it('renders properly', () => {
    const component = shallow(<HelpToolOptions
      speed="2"
      parsedSpeed={2}
      onChangeSpeed={() => {}}
      onSetDefaultSpeed={() => {}}
      onRestore={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('handles onChangeSpeed event', () => {
    const mock = jest.fn();
    const component = shallow(<HelpToolOptions
      speed="2"
      parsedSpeed={2}
      onChangeSpeed={mock}
      onSetDefaultSpeed={() => {}}
      onRestore={() => {}}
    />);

    component.find('input[name="speed"]').simulate('change', { target: { value: '4' } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('4');
  });

  it('handles onSetDefaultSpeed event', () => {
    const mock = jest.fn();
    const component = shallow(<HelpToolOptions
      speed="2"
      parsedSpeed={2}
      onChangeSpeed={() => {}}
      onSetDefaultSpeed={mock}
      onRestore={() => {}}
    />);

    component.find('button[name="set-default-speed"]').simulate('click');

    expect(mock).toHaveBeenCalled();
  });

  it('handles onRestore event', () => {
    const mock = jest.fn();
    const component = shallow(<HelpToolOptions
      speed="2"
      parsedSpeed={2}
      onChangeSpeed={() => {}}
      onSetDefaultSpeed={() => {}}
      onRestore={mock}
    />);

    component.find('button[name="restore"]').simulate('click');

    expect(mock).toHaveBeenCalled();
  });
});

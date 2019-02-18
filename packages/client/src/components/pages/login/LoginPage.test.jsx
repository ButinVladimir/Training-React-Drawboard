import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders properly', () => {
    const component = shallow(<LoginPage
      locked={false}
      errorMessage=""
      room=""
      onSetRoom={() => {}}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('renders properly when form is locked', () => {
    const component = shallow(<LoginPage
      locked
      errorMessage=""
      room=""
      onSetRoom={() => {}}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('renders properly when form has error', () => {
    const component = shallow(<LoginPage
      locked={false}
      errorMessage="An error occurred"
      room=""
      onSetRoom={() => {}}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('renders properly when room has value', () => {
    const component = shallow(<LoginPage
      locked={false}
      errorMessage=""
      room="The Room"
      onSetRoom={() => {}}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('handles onSetRoom event', () => {
    const handler = jest.fn();
    const component = shallow(<LoginPage
      locked={false}
      errorMessage=""
      room="The Room"
      onSetRoom={handler}
      onLogin={() => {}}
    />);

    component.find('input[name="room"]').simulate('change', { target: { value: 'value' } });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('value');
  });

  it('handles onLogin event', () => {
    const handler = jest.fn();
    const component = shallow(<LoginPage
      locked={false}
      errorMessage=""
      room="The Room"
      onSetRoom={() => {}}
      onLogin={handler}
    />);

    component.find('button[name="enter"]').simulate('click');

    expect(handler).toHaveBeenCalled();
  });
});

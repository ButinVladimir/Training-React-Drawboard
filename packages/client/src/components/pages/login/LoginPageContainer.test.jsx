import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPageContainer from './LoginPageContainer';

describe('LoginPageContainer', () => {
  it('renders properly when user is not logged in', () => {
    const registerErrorHandlersMock = jest.fn();
    const component = shallow(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={registerErrorHandlersMock}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
    expect(registerErrorHandlersMock).toHaveBeenCalledWith(component.instance().onError);
  });

  it('renders properly when user is logged in', () => {
    const registerErrorHandlersMock = jest.fn();
    const component = shallow(<LoginPageContainer
      isLoggedIn
      registerErrorHandlers={registerErrorHandlersMock}
      onLogin={() => {}}
    />);

    expect(component).toMatchSnapshot();
    expect(registerErrorHandlersMock).toHaveBeenCalledWith(component.instance().onError);
  });

  it('handles onSetRoom event when form is not locked', () => {
    const room = 'newRoom';
    const component = mount(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={() => {}}
      onLogin={() => {}}
    />);

    component.find('input[name="room"]').simulate('change', { target: { value: room } });
    const componentState = component.state();

    expect(componentState).toMatchObject({
      errorMessage: '',
      room,
    });
  });

  it('handles onSetRoom event when form is locked', () => {
    const room = 'newRoom';
    const component = mount(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={() => {}}
      onLogin={() => {}}
    />);

    component.setState({ locked: true });
    component.find('input[name="room"]').simulate('change', { target: { value: room } });
    const componentState = component.state();

    expect(componentState).not.toMatchObject({
      errorMessage: '',
      room,
    });
  });

  it('handles onLogin event when form is not locked', () => {
    const room = 'newRoom';
    const onLoginMock = jest.fn();
    const component = mount(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={() => {}}
      onLogin={onLoginMock}
    />);

    component.setState({ room });
    component.find('button[name="enter"]').simulate('click');
    const componentState = component.state();

    expect(componentState).toMatchObject({
      locked: true,
      errorMessage: '',
    });
    expect(onLoginMock).toHaveBeenCalledWith(room);
  });

  it('handles onLogin event when form is locked', () => {
    const room = 'newRoom';
    const onLoginMock = jest.fn();
    const component = mount(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={() => {}}
      onLogin={onLoginMock}
    />);

    component.setState({ locked: true, room });
    component.find('button[name="enter"]').simulate('click');
    const componentState = component.state();

    expect(componentState).toMatchObject({
      locked: true,
    });
    expect(onLoginMock).not.toHaveBeenCalled();
  });

  it('handles onError', () => {
    const errorMessage = 'An error occurred';
    let errorCb;
    const component = mount(<LoginPageContainer
      isLoggedIn={false}
      registerErrorHandlers={(cb) => { errorCb = cb; }}
      onLogin={() => {}}
    />);

    errorCb(errorMessage);
    const componentState = component.state();

    expect(componentState).toMatchObject({
      locked: false,
      errorMessage,
    });
  });
});

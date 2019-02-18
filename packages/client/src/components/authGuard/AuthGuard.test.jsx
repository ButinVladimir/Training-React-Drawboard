import React from 'react';
import { shallow } from 'enzyme';
import AuthGuard from './AuthGuard';

describe('AuthGuard', () => {
  it('renders properly when not logged in', () => {
    const component = shallow(<AuthGuard isLoggedIn={false}><div /></AuthGuard>);

    expect(component).toMatchSnapshot();
  });

  it('renders properly when logged in', () => {
    const component = shallow(<AuthGuard isLoggedIn><div /></AuthGuard>);

    expect(component).toMatchSnapshot();
  });
});

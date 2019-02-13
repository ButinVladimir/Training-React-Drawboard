import React from 'react';
import { shallow } from 'enzyme';
import BaseLineToolOptions from './BaseLineToolOptions';

const widths = [1, 2, 3, 4, 5];

describe('BaseLineToolOptions', () => {
  it('renders properly', () => {
    const component = shallow(<BaseLineToolOptions
      width={1}
      color="#123"
      widths={widths}
      onSelectWidth={() => {}}
      onSelectColor={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('handles onSelectWidth event', () => {
    const mock = jest.fn();
    const component = shallow(<BaseLineToolOptions
      width={1}
      color="#123"
      widths={widths}
      onSelectWidth={mock}
      onSelectColor={() => {}}
    />);

    component.find('select[name="width"]').simulate('change', { target: { value: 3 } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(3);
  });

  it('handles onSelectColor event', () => {
    const mock = jest.fn();
    const component = shallow(<BaseLineToolOptions
      width={1}
      color="#123"
      widths={widths}
      onSelectWidth={() => {}}
      onSelectColor={mock}
    />);

    component.find('input[name="color"]').simulate('change', { target: { value: '#456' } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('#456');
  });
});

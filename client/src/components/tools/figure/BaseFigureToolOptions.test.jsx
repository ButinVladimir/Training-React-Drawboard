import React from 'react';
import { shallow } from 'enzyme';
import BaseFigureToolOptions from './BaseFigureToolOptions';

describe('HelpToolOptions', () => {
  const widths = [1, 2, 3, 4, 5];

  it('renders properly', () => {
    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={() => {}}
      onSelectBorderWidth={() => {}}
      onSelectBorderColor={() => {}}
      onChangeAddFill={() => {}}
      onSelectFillColor={() => {}}
    />);

    expect(component).toMatchSnapshot();
  });

  it('handles onChangeAddBorder event', () => {
    const mock = jest.fn();

    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={mock}
      onSelectBorderWidth={() => {}}
      onSelectBorderColor={() => {}}
      onChangeAddFill={() => {}}
      onSelectFillColor={() => {}}
    />);

    component.find('input[name="add-border"]').simulate('change');

    expect(mock).toHaveBeenCalled();
  });

  it('handles onSelectBorderWidth event', () => {
    const mock = jest.fn();

    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={() => {}}
      onSelectBorderWidth={mock}
      onSelectBorderColor={() => {}}
      onChangeAddFill={() => {}}
      onSelectFillColor={() => {}}
    />);

    component.find('select[name="border-width"]').simulate('change', { target: { value: 5 } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(5);
  });

  it('handles onSelectBorderColor event', () => {
    const mock = jest.fn();

    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={() => {}}
      onSelectBorderWidth={() => {}}
      onSelectBorderColor={mock}
      onChangeAddFill={() => {}}
      onSelectFillColor={() => {}}
    />);

    component.find('input[name="border-color"]').simulate('change', { target: { value: '#789' } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('#789');
  });

  it('handles onChangeAddFill event', () => {
    const mock = jest.fn();

    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={() => {}}
      onSelectBorderWidth={() => {}}
      onSelectBorderColor={() => {}}
      onChangeAddFill={mock}
      onSelectFillColor={() => {}}
    />);

    component.find('input[name="add-fill"]').simulate('change');

    expect(mock).toHaveBeenCalled();
  });

  it('handles onSelectFillColor event', () => {
    const mock = jest.fn();

    const component = shallow(<BaseFigureToolOptions
      addBorder
      borderColor="#123"
      borderWidth={3}
      addFill
      fillColor="#456"
      widths={widths}
      onChangeAddBorder={() => {}}
      onSelectBorderWidth={() => {}}
      onSelectBorderColor={() => {}}
      onChangeAddFill={() => {}}
      onSelectFillColor={mock}
    />);

    component.find('input[name="fill-color"]').simulate('change', { target: { value: '#abc' } });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('#abc');
  });
});

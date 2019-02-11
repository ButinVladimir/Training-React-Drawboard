import BaseToolState from './BaseToolState';
import BaseFigureToolState from './BaseFigureToolState';

describe('BaseFigureToolState', () => {
  it('instantiated properly', () => {
    const toolState = new BaseFigureToolState();

    expect(toolState).toMatchObject({
      addBorder: true,
      borderWidth: 1,
      borderColor: '#000000',
      addFill: true,
      fillColor: '#ff0000',
    });
  });

  it('implements BaseToolState', () => {
    const toolState = new BaseFigureToolState();

    expect(toolState).toBeInstanceOf(BaseToolState);
  });
});

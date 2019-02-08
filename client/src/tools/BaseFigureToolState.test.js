import BaseToolState from './BaseToolState';
import BaseFigureToolState from './BaseFigureToolState';

describe('BaseFigureToolState', () => {
  it('instantiated properly', () => {
    const tool = new BaseFigureToolState();
    expect(tool).toMatchObject({
      addBorder: true,
      borderWidth: 1,
      borderColor: '#000000',
      addFill: true,
      fillColor: '#ff0000',
    });
  });

  it('implements BaseToolState', () => {
    const tool = new BaseFigureToolState();
    expect(tool).toBeInstanceOf(BaseToolState);
  });
});

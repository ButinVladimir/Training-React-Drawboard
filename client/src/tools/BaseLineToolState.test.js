import BaseToolState from './BaseToolState';
import BaseLineToolState from './BaseLineToolState';

describe('BaseLineToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new BaseLineToolState();
    expect(toolState).toMatchObject({
      width: 1,
      color: '#000000',
    });
  });

  it('implements BaseToolState', () => {
    const toolState = new BaseLineToolState();
    expect(toolState).toBeInstanceOf(BaseToolState);
  });
});

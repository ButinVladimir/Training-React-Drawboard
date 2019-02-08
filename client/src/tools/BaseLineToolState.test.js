import BaseToolState from './BaseToolState';
import BaseLineToolState from './BaseLineToolState';

describe('BaseLineToolState', () => {
  it('instantiated properly', () => {
    const tool = new BaseLineToolState();
    expect(tool).toMatchObject({
      width: 1,
      color: '#000000',
    });
  });

  it('implements BaseToolState', () => {
    const tool = new BaseLineToolState();
    expect(tool).toBeInstanceOf(BaseToolState);
  });
});

import BaseToolState from './BaseToolState';

describe('BaseToolState', () => {
  it('throws an error because onMouseDown is not implemented', () => {
    const tool = new BaseToolState();
    expect(tool.onMouseDown).toThrow('Method is not implemented');
  });

  it('throws an error because onMouseMove is not implemented', () => {
    const tool = new BaseToolState();
    expect(tool.onMouseMove).toThrow('Method is not implemented');
  });

  it('throws an error because onMouseUp is not implemented', () => {
    const tool = new BaseToolState();
    expect(tool.onMouseUp).toThrow('Method is not implemented');
  });

  it('throws an error because serialize is not implemented', () => {
    const tool = new BaseToolState();
    expect(tool.serialize).toThrow('Method is not implemented');
  });

  it('throws an error because unserialize is not implemented', () => {
    expect(BaseToolState.unserialize).toThrow('Method is not implemented');
  });
});

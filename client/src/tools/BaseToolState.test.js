import BaseToolState from './BaseToolState';

describe('BaseToolState', () => {
  it('throws an error because onMouseDown is not implemented', () => {
    const toolState = new BaseToolState();
    expect(toolState.onMouseDown).toThrow('Method is not implemented');
  });

  it('throws an error because onMouseMove is not implemented', () => {
    const toolState = new BaseToolState();
    expect(toolState.onMouseMove).toThrow('Method is not implemented');
  });

  it('throws an error because onMouseUp is not implemented', () => {
    const toolState = new BaseToolState();
    expect(toolState.onMouseUp).toThrow('Method is not implemented');
  });

  it('throws an error because serialize is not implemented', () => {
    const toolState = new BaseToolState();
    expect(toolState.serialize).toThrow('Method is not implemented');
  });

  it('throws an error because deserialize is not implemented', () => {
    expect(BaseToolState.deserialize).toThrow('Method is not implemented');
  });
});

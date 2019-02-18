import HelpToolState from './HelpToolState';

describe('HelpToolState', () => {
  it('is instantiated properly', () => {
    const helpToolState = new HelpToolState();

    expect(helpToolState).toBeInstanceOf(HelpToolState);
    expect(helpToolState).toMatchObject({
      anchorX: 0,
      anchorY: 0,
      clientX: 0,
      clientY: 0,
      speed: 0,
    });
  });

  it('throws an error when tries to restore state', () => {
    const helpToolState = new HelpToolState();

    expect(helpToolState.restore).toThrow('Method is not implemented');
  });

  it('throws an error when tries to set speed to default', () => {
    const helpToolState = new HelpToolState();

    expect(helpToolState.setDefaultSpeed).toThrow('Method is not implemented');
  });

  it('handles OnMouseDown event', () => {
    const helpToolState = new HelpToolState();
    helpToolState.onMouseDown({ clientX: 1, clientY: 2 });

    expect(helpToolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 1,
      clientY: 2,
    });
  });

  it('handles OnMouseMove event', () => {
    const helpToolState = new HelpToolState();
    helpToolState.onMouseDown({ clientX: 1, clientY: 2 });
    helpToolState.onMouseMove({ clientX: 3, clientY: 4 });

    expect(helpToolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
    });
  });

  it('handles OnMouseUp event', () => {
    const helpToolState = new HelpToolState();
    helpToolState.onMouseDown({ clientX: 1, clientY: 2 });
    helpToolState.onMouseMove({ clientX: 3, clientY: 4 });
    helpToolState.onMouseUp();

    expect(helpToolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 1,
      clientY: 2,
    });
  });

  it('return null when is serialized', () => {
    const helpToolState = new HelpToolState();

    expect(helpToolState.serialize()).toBeNull();
  });

  it('return null when is deserialized', () => {
    expect(HelpToolState.deserialize()).toBeNull();
  });
});

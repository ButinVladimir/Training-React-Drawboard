import LineToolState from './LineToolState';

describe('LineToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new LineToolState();

    expect(toolState).toBeInstanceOf(LineToolState);
    expect(toolState).toMatchObject({
      width: 1,
      color: '#000000',
      anchorX: 0,
      anchorY: 0,
      clientX: 0,
      clientY: 0,
    });
  });

  it('handles OnMouseDown event', () => {
    const toolState = new LineToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });

    expect(toolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 1,
      clientY: 2,
    });
  });

  it('handles OnMouseMove event', () => {
    const toolState = new LineToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });

    expect(toolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
    });
  });

  it('handles OnMouseUp event', () => {
    const toolState = new LineToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });
    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      anchorX: 1,
      anchorY: 2,
      clientX: 1,
      clientY: 2,
    });
  });

  it('fixes relative coordinates', () => {
    const toolState = new LineToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });
    toolState.fixRelativeCoords(1, 2);

    expect(toolState).toMatchObject({
      anchorX: 0,
      anchorY: 0,
      clientX: 2,
      clientY: 2,
    });
  });

  it('can be serialized', () => {
    const toolState = new LineToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });
    toolState.width = 7;
    toolState.color = '#123456';

    const serializedObject = toolState.serialize();

    expect(serializedObject).toEqual({
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      width: 7,
      color: '#123456',
    });
  });

  it('can be deserialized', () => {
    const serializedObject = {
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      width: 7,
      color: '#123456',
    };

    const toolState = LineToolState.deserialize(serializedObject);

    expect(toolState).toBeInstanceOf(LineToolState);
    expect(toolState).toMatchObject(serializedObject);
  });
});

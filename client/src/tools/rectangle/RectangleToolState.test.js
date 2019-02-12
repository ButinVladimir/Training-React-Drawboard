import RectangleToolState from './RectangleToolState';

describe('RectangleToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new RectangleToolState();

    expect(toolState).toBeInstanceOf(RectangleToolState);
    expect(toolState).toMatchObject({
      addBorder: true,
      borderWidth: 1,
      borderColor: '#000000',
      addFill: true,
      fillColor: '#ff0000',
      anchorX: 0,
      anchorY: 0,
      clientX: 0,
      clientY: 0,
    });
  });

  it('handles OnMouseDown event', () => {
    const toolState = new RectangleToolState();
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
    const toolState = new RectangleToolState();
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
    const toolState = new RectangleToolState();
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
    const toolState = new RectangleToolState();
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
    const toolState = new RectangleToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });
    toolState.addBorder = false;
    toolState.borderColor = '#123456';
    toolState.borderWidth = 6;
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';

    const serializedObject = toolState.serialize();

    expect(serializedObject).toEqual({
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      addBorder: false,
      borderColor: '#123456',
      borderWidth: 6,
      addFill: true,
      fillColor: '#abcdef',
    });
  });

  it('can be deserialized', () => {
    const serializedObject = {
      anchorX: 1,
      anchorY: 2,
      clientX: 3,
      clientY: 4,
      addBorder: false,
      borderColor: '#123456',
      borderWidth: 6,
      addFill: true,
      fillColor: '#abcdef',
    };

    const toolState = RectangleToolState.deserialize(serializedObject);

    expect(toolState).toBeInstanceOf(RectangleToolState);
    expect(toolState).toMatchObject(serializedObject);
  });
});

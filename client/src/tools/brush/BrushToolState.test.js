import BrushToolState from './BrushToolState';

describe('BrushToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new BrushToolState();

    expect(toolState).toBeInstanceOf(BrushToolState);
    expect(toolState).toMatchObject({
      width: 1,
      color: '#000000',
      isAddingPoints: false,
      points: [],
    });
  });

  it('handles OnMouseDown event', () => {
    const toolState = new BrushToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2]],
    });
  });

  it('handles OnMouseMove event', () => {
    const toolState = new BrushToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 3,
      clientY: 4,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [3, 4]],
    });
  });

  it('handles OnMouseUp event', () => {
    const toolState = new BrushToolState();
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
      isAddingPoints: false,
      points: [[1, 2], [3, 4]],
    });
  });

  it('fixes relative coordinates', () => {
    const toolState = new BrushToolState();
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
      isAddingPoints: true,
      points: [[0, 0], [2, 2]],
    });
  });

  it('can be serialized', () => {
    const toolState = new BrushToolState();
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
      points: [[1, 2], [3, 4]],
      width: 7,
      color: '#123456',
    });
  });

  it('can be deserialized', () => {
    const serializedObject = {
      points: [[1, 2], [3, 4]],
      width: 7,
      color: '#123456',
    };

    const toolState = BrushToolState.deserialize(serializedObject);

    expect(toolState).toBeInstanceOf(BrushToolState);
    expect(toolState).toMatchObject(serializedObject);
  });
});

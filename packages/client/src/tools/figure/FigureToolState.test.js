import FigureToolState from './FigureToolState';

describe('FigureToolState', () => {
  it('is instantiated properly', () => {
    const toolState = new FigureToolState();

    expect(toolState).toBeInstanceOf(FigureToolState);
    expect(toolState).toMatchObject({
      addBorder: true,
      borderWidth: 1,
      borderColor: '#000000',
      addFill: true,
      fillColor: '#ff0000',
      isAddingPoints: false,
      points: [],
      clientX: 0,
      clientY: 0,
    });
  });

  it('handles OnMouseDown event when path has been started', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2]],
      clientX: 1,
      clientY: 2,
    });
  });

  it('handles OnMouseMove event when path has been started', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2]],
      clientX: 10,
      clientY: 20,
    });
  });

  it('handles OnMouseUp event when path has been started', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20]],
      clientX: 10,
      clientY: 20,
    });
  });

  it('handles OnMouseDown event when in the middle of path', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20]],
      clientX: 5,
      clientY: 40,
    });
  });

  it('handles OnMouseMove event when in the middle of path', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 50,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20]],
      clientX: 5,
      clientY: 50,
    });
  });

  it('handles OnMouseUp event when in the middle of path', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20], [5, 50]],
      clientX: 5,
      clientY: 50,
    });
  });

  it('handles OnMouseDown event when path has been ended', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 50,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20], [5, 50]],
      clientX: 5,
      clientY: 50,
    });
  });

  it('handles OnMouseMove event when path has been ended', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 55,
    });

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2], [10, 20], [5, 50]],
      clientX: 5,
      clientY: 55,
    });
  });

  it('handles OnMouseUp event when path has been ended', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 10,
      clientY: 20,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 40,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseUp();
    toolState.onMouseDown({
      clientX: 5,
      clientY: 50,
    });
    toolState.onMouseMove({
      clientX: 5,
      clientY: 55,
    });
    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      isAddingPoints: false,
      points: [[1, 2], [10, 20], [5, 55]],
      clientX: 5,
      clientY: 55,
    });
  });

  it('handles OnMouseUp event when path has been started and cursor near start point', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 1,
      clientY: 3,
    });
    toolState.onMouseUp();

    expect(toolState).toMatchObject({
      isAddingPoints: true,
      points: [[1, 2]],
      clientX: 1,
      clientY: 3,
    });
  });

  it('fixes relative coordinates', () => {
    const toolState = new FigureToolState();
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
      points: [[0, 0]],
      isAddingPoints: true,
      clientX: 3,
      clientY: 4,
    });
  });

  it('can be restored', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 30,
      clientY: 44,
    });
    toolState.onMouseUp();
    toolState.restore();

    expect(toolState).toMatchObject({
      points: [],
      isAddingPoints: false,
    });
  });

  it('can be serialized', () => {
    const toolState = new FigureToolState();
    toolState.onMouseDown({
      clientX: 1,
      clientY: 2,
    });
    toolState.onMouseMove({
      clientX: 30,
      clientY: 44,
    });
    toolState.onMouseUp();
    toolState.addBorder = false;
    toolState.borderColor = '#123456';
    toolState.borderWidth = 6;
    toolState.addFill = true;
    toolState.fillColor = '#abcdef';

    const serializedObject = toolState.serialize();

    expect(serializedObject).toEqual({
      points: [[1, 2], [30, 44]],
      addBorder: false,
      borderColor: '#123456',
      borderWidth: 6,
      addFill: true,
      fillColor: '#abcdef',
    });
  });

  it('can be deserialized', () => {
    const serializedObject = {
      points: [[1, 2], [30, 44]],
      addBorder: false,
      borderColor: '#123456',
      borderWidth: 6,
      addFill: true,
      fillColor: '#abcdef',
    };

    const toolState = FigureToolState.deserialize(serializedObject);

    expect(toolState).toBeInstanceOf(FigureToolState);
    expect(toolState).toMatchObject(serializedObject);
  });
});

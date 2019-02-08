import ViewState, {
  DEFAULT_DELTA_X,
  DEFAULT_DELTA_Y,
  DEFAULT_ROTATION,
  DEFAULT_ZOOM,
} from './ViewState';

const deltaX = 1;
const deltaY = 2;
const rotation = 3;
const zoom = 4;

describe('ViewState', () => {
  it('is instantiated with default parameters', () => {
    const viewState = new ViewState();

    expect(viewState).toMatchObject({
      deltaX: DEFAULT_DELTA_X,
      deltaY: DEFAULT_DELTA_Y,
      zoom: DEFAULT_ZOOM,
      rotation: DEFAULT_ROTATION,
    });
  });

  it('is instantiated with custom parameters', () => {
    const viewState = new ViewState(deltaX, deltaY, zoom, rotation);

    expect(viewState).toMatchObject({
      deltaX,
      deltaY,
      zoom,
      rotation,
    });
  });

  it('changes delta', () => {
    const viewState = new ViewState();
    viewState.changeDelta(deltaX, deltaY);

    expect(viewState).toMatchObject({
      deltaX,
      deltaY,
      zoom: DEFAULT_ZOOM,
      rotation: DEFAULT_ROTATION,
    });
  });

  it('changes zoom', () => {
    const viewState = new ViewState();
    viewState.changeZoom(zoom);

    expect(viewState).toMatchObject({
      deltaX: DEFAULT_DELTA_X,
      deltaY: DEFAULT_DELTA_Y,
      zoom,
      rotation: DEFAULT_ROTATION,
    });
  });

  it('changes rotation', () => {
    const viewState = new ViewState();
    viewState.changeRotation(rotation);

    expect(viewState).toMatchObject({
      deltaX: DEFAULT_DELTA_X,
      deltaY: DEFAULT_DELTA_Y,
      zoom: DEFAULT_ZOOM,
      rotation,
    });
  });

  it('serializes', () => {
    const viewState = new ViewState(deltaX, deltaY, zoom, rotation);

    expect(viewState.serialize()).toEqual({
      deltaX,
      deltaY,
      zoom,
      rotation,
    });
  });

  it('unserializes', () => {
    const viewStateObject = {
      deltaX,
      deltaY,
      zoom,
      rotation,
    };
    const viewState = ViewState.unserialize(viewStateObject);

    expect(viewState).toMatchObject({
      deltaX,
      deltaY,
      zoom,
      rotation,
    });
  });
});

describe('ViewState transformation', () => {
  let operations;
  let context;
  let viewState;

  beforeEach(() => {
    operations = [];
    context = {
      resetTransform: () => operations.push(['resetTransform']),
      translate: (...args) => operations.push(['translate', ...args]),
      scale: (...args) => operations.push(['scale', ...args]),
      rotate: (...args) => operations.push(['rotate', ...args]),
    };
    viewState = new ViewState(deltaX, deltaY, zoom, rotation);
  });

  it('applied', () => {
    viewState.applyTransformations(context);

    expect(operations.length).toBe(4);
    expect(operations[0]).toEqual(['resetTransform']);
    expect(operations[1]).toEqual(['translate', deltaX, deltaY]);
    expect(operations[2]).toEqual(['rotate', rotation]);
    expect(operations[3]).toEqual(['scale', zoom, zoom]);
  });

  it('applied reversely', () => {
    viewState.applyReverseTransformations(context);

    expect(operations.length).toBe(4);
    expect(operations[0]).toEqual(['resetTransform']);
    expect(operations[1]).toEqual(['scale', 1 / zoom, 1 / zoom]);
    expect(operations[2]).toEqual(['rotate', -rotation]);
    expect(operations[3]).toEqual(['translate', -deltaX, -deltaY]);
  });
});

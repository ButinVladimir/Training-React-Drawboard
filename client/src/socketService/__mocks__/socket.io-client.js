const Socket = jest.genMockFromModule('socket.io-client');

/* eslint-disable func-names */

Socket.prototype.on = function (event, handler) {
  this.mockHandlers = this.mockHandlers || new Map();
  this.mockHandlers.set(event, handler);

  return this;
};

Socket.prototype.off = function (event) {
  this.mockHandlers = this.mockHandlers || new Map();
  this.mockHandlers.delete(event);

  return this;
};

/* eslint-enable func-names */

const factoryFn = (url, options) => {
  const result = new Socket(url, options);
  Object.assign(result, {
    url,
    options,
    emit: jest.fn(),
    connect: jest.fn(),
  });

  return result;
};

export { Socket };
export default factoryFn;

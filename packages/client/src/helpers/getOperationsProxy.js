export default (target, operations) => new Proxy(target, {
  get: (object, property) => {
    if (typeof object[property] === 'function') {
      return (...args) => {
        operations.push([object, property, ...args]);

        return object[property](...args);
      };
    }

    return target[property];
  },
});

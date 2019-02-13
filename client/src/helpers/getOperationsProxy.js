export default (target, operations) => new Proxy(target, {
  get: (object, property) => {
    if (typeof object[property] === 'function') {
      return (...args) => { operations.push([property, ...args]); };
    }

    return Reflect.get(object, property);
  },
});

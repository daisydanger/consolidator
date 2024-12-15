export const handledEvents = {
  log: 'log',
  info: 'info',
  warn: 'warn',
  error: 'error',
  noop: 'noop',
};
export const events = new Proxy(handledEvents, {
  get(target, propKey) {
    return target[propKey] || target.noop;
  }
});
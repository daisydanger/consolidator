import { events } from './events.js';
/**
 * Dispatches captured console events to the 
 * Consolidator.
 */
export class ConsoleHandler {
  consolidator;
  constructor(consolidator) {
    this.consolidator = consolidator;
  }
  get(target, propKey) {
    if (typeof target[propKey] !== 'function') {
      return target[propKey];
    }
    return (function() {
      const result = target[propKey]
        .apply(target, arguments);
      const stack = new Error().stack;
      this.consolidator.dispatchEvent(
        new CustomEvent(
          events[propKey], 
          { 
            detail: {
              type: propKey,
              args: [...arguments],
              stack,
              result,
            }
          }
        )
      );
      return result;
    }).bind(this);
  }
}
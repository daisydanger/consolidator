import { events } from './events.js';

declare global {
  interface Window { consold: any; }
}

/**
 * Dispatches captured console events to the 
 * Consolidator.
 */
class ConsoleHandler {
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
/** 
 * Proxy that connects the Consolidator to the
 * current window.console via a ConsoleHandler
 */
class ConsoleProxy {
  assert;
  clear;
  count;
  countReset;
  debug;
  dir;
  dirxml;
  error;
  group;
  groupCollapsed;
  groupEnd;
  info;
  log;
  table;
  time;
  timeEnd;
  timeLog;
  timeStamp;
  trace;
  warn;
  constructor(consolidator) {
    return new Proxy(
      console, 
      new ConsoleHandler(
        consolidator
      )
    );
  }
}
/**
 * Captures and broadcasts console events
 * @extends EventTarget
 */
export class Consolidator extends EventTarget {
  constructor() {
    super();
    if (!window.consold) {
      window.consold = [console];
    } else {
      window.consold.push(console);
    }
    window.console = new ConsoleProxy(this);
    window.onerror = (
      message, source, lineno, colno, error
    ) => {
      // todo: replicate in Consolidator, 
      //   but don't suppress original
      console.error('Uncaught', error);
      // return true;
    }
  }
}
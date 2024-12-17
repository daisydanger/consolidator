import { ConsoleHandler } from './ConsoleHandler.js';
/** 
 * Proxy that connects the Consolidator to the
 * current window.console via a ConsoleHandler
 */
export class ConsoleProxy {
  assert;clear;count;countReset;debug;dir;dirxml;
  error;group;groupCollapsed;groupEnd;info;log;
  table;time;timeEnd;timeLog;timeStamp;trace;warn;
  constructor(consolidator) {
    return new Proxy(
      console, 
      new ConsoleHandler(
        consolidator
      )
    );
  }
}
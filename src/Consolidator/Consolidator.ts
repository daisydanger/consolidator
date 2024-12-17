import { events } from './events.js';
import { ConsoleProxy } from './ConsoleProxy.js';
declare global {
  interface Window { consold: Array<Console>; }
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
      this.dispatchEvent(
        new CustomEvent(
          events.error, {
            detail: {
              type: events.error,
              args: ['Uncaught', error],
              meta: {
                message, 
                source, 
                lineno, 
                colno,
              }
            }
          }
        )
      );
    }
  }
}
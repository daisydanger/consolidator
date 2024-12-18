import { events } from '../Consolidator/events.js';

export class ConsolidatorUI {
  dialog;
  constructor(consolidator) {
    this.dialog = document.createElement('dialog');
    this.dialog.setAttribute('id', 'consolidator');
    this.handleLog = this.handleLog.bind(this);
    this.formatArg = this.formatArg.bind(this);
    consolidator.addEventListener(events.log, this.handleLog);
    consolidator.addEventListener(events.error, this.handleLog);
    consolidator.addEventListener(events.warn, this.handleLog);
    consolidator.addEventListener(events.info, this.handleLog);
    consolidator.addEventListener(events.noop, this.handleLog);
  }
  appendToDOM(element) {
    const node = element || document.querySelector('body');
    node.append(this.dialog)
  }
  append(content, type) {
    const consolidateLog = document.createElement('consolidate-log');
    const p = document.createElement('p');
    p.setAttribute('data-type', type);
    p.innerHTML = content;
    this.dialog.append(p);
    this.dialog.append(consolidateLog);
  }
  handleLog(event) {
    this.append(
      event.detail.args.map(this.formatArg).join(' '), 
      event.detail.type
    );
    this.dialog.show();
  }
  formatArg(arg) {
    if ([
      'string','number','boolean','undefined','function'
    ].includes(typeof arg)) return arg;
    return `<details><summary>${arg.constructor.name} {}</summary><ul>${
      Object.entries(arg).map(
        ([key, value]) => `<li>${key}: ${this.formatArg(value)}</li>`
    ).join('')}</ul></details>`;
  }
}
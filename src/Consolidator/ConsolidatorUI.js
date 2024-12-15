import { events } from './events.js';
export class ConsolidatorUI {
  constructor(consolidator) {
    this.dialog = document.createElement('dialog');
    this.dialog.setAttribute('id', 'consolidator');
    this.handleLog = this.handleLog.bind(this);
    consolidator.addEventListener(events.log, this.handleLog);
    consolidator.addEventListener(events.error, this.handleLog);
    consolidator.addEventListener(events.warn, this.handleLog);
    consolidator.addEventListener(events.info, this.handleLog);
    consolidator.addEventListener(events.noop, this.handleLog);
  }
  appendToDOM(element) {
    const node = element || document.querySelector('body');
    node.append(this.dialog);
  }
  append(content, type) {
    const p = document.createElement('p');
    p.setAttribute('data-type', type);
    p.innerHTML = content;
    this.dialog.append(p);
  }
  handleLog(event) {
    this.append(
      event.detail.args.join(' '), 
      event.detail.type
    );
    this.dialog.show();
  }
}
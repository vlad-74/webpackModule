'use strict';

import './table.styl';
import template from './table.jade';

export default class Table {
  constructor(options) {
    this.elem = document.createElement('div');
    this.elem.className = 'tablewrap';
    this.elem.innerHTML = template(options);
  }
}


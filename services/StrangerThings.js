'use strict';

const flipout = require('flipout');

class StrangerThingsService {
  constructor(repository) {
    this.repository = repository;
  }

  search({ page, size, ...params }, upsideDownMode) {
    const characters = this.repository.search(params, { page, size });
    let inverted = false;
    if (upsideDownMode === 'true') inverted = true;

    if (inverted) {
      return characters.map(({ name, origin, status }) => ({
        name: flipout(name),
        origin: flipout(origin),
        status: flipout(status),
      }));
    }

    return characters;
  }
}

module.exports = StrangerThingsService;

'use strict';
const checkLength = (str = '') => str.length > 255;

/**
   * Cache Constructor
   * This is Application Level Memory Caching
   * TODO: implementing expiration time ?
   * NOTE: The Data should be be change through sistem, not directly to db.
*/
function Cache() {
  const _cache = {};

  this.put = function(key, value) {
    if (!key || !value || typeof key != 'string' || checkLength(key)) return null;
    _cache[key] = JSON.stringify(value);
    return value;
  };

  this.get = function(key) {
    if (!key || typeof key != 'string') return null;

    const val = _cache[key];
    if (!val) return null;

    return JSON.parse(val);
  };

  this.del = function(key) {
    if (!key || typeof key != 'string') return null;

    const data = _cache[key];
    if (!data) return null;
    delete _cache[key]

    return JSON.parse(data);
  };

  this.clear = function() {
    for (const key in _cache) {
      if (_cache.hasOwnProperty(key)) delete _cache[key];
    }
  };
}

module.exports = new Cache();

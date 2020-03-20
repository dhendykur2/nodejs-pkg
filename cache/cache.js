'use strict';
const checkLength = (str = '') => str.length > 255;

/**
   * Cache Constructor
   * This is Application Level Memory Caching
*/
function Cache() {
  const _cache = {};

  /**
   * Put Function
   * @param {String} key
   * @param {any} value
   * @param {Number} ex Number in seconds
   * @return {any}
   */
  this.put = function(key, value, ex) {
    if (!key || !value || typeof key != 'string' || checkLength(key)) return null;
    if (ex && typeof ex === 'number') {
      let a = new Date()
      ex = a.setSeconds(a.getSeconds() + ex);
    }
    _cache[key] = JSON.stringify([value, ex]);
    return value;
  };

  /**
   * Get Function
   * @param {String} key
   * @return {any}
   */
  this.get = function(key) {
    if (!key || typeof key != 'string') return null;

    const val = _cache[key];
    if (!val) return null;
    const [value, ex] = JSON.parse(val);
    if (ex && Date.now() - ex > 0) {
      _cache[key] = null;
      delete _cache[key];
      return null;
    }

    return value
  };

  /**
   * Del Function
   * @param {String} key
   * @return {any}
   */
  this.del = function(key) {
    if (!key || typeof key != 'string') return null;

    const data = _cache[key];
    if (!data) return null;
    // Set null to clear the memory also
    _cache[key] = null;
    delete _cache[key];

    return JSON.parse(data);
  };

  /**
   * Clear all the cache
   */
  this.clear = function() {
    for (const key in _cache) {
      if (_cache.hasOwnProperty(key)) {
        // Set null to clear the memory also
        _cache[key] = null;
        delete _cache[key];
      }
    }
  };
}

module.exports = new Cache();

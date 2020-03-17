'use strict';

const dateGMT = (date = new Date()) => {
  date = new Date(date);
  date.setHours(date.getHours() + 7);
  return date;
};
const lessThan = (a, b) => dateGMT(a) < dateGMT(b);

/**
   * Moment Lite Constructor
   * This is light weight moment.js
*/
function MomentLite() {
  /**
   * now
   * @return {Date} GMT Date Object
   */
  this.now = function() {
    return dateGMT();
  };

  /**
   * @param {Date | String} date is the object of date or string
   * @return {String} Date with Format (YYYY-MM-DD)
   */
  this.toDate = function(date) {
    date = dateGMT(date);
    return date.toISOString().slice(0, 10);
  };

  /**
   * @param {Date | String} date is the object of date or string
   * @return {String} Date with Format (YYYY-MM-DDTHH:mm:ssZ)
   */
  this.toDatetime = function(date) {
    date = dateGMT(date);
    return date.toISOString();
  };

  /**
   * @param {date} a is firstDate
   * @param {date} b is secondDate
   * @return {boolean} return True if firstDate < secondDate | False if firstDate > secondDate
   */
  this.isBefore = function(a, b) {
    if (!a || !b) return false;
    return lessThan(a, b);
  };

  /**
   * @param {date} a is first date
   * @param {date} b is second date
   * @return {boolean} return True if firstDate > secondDate or False if firstDate < secondDate
   */
  this.isAfter = function(a, b) {
    if (!a || !b) return false;
    return lessThan(b, a);
  };

  /**
   * @param {date} a is first date
   * @param {date} b is second date
   * @param {date} c is the date between first date and second date
   * @return {boolean} return True if a < c AND c < b
   */
  this.isBetween = function(a, b, c = dateGMT()) {
    if (!a || !b || !c) return false;
    return lessThan(a, c) && lessThan(c, b);
  };

  /**
   * @param {date} date is the base date
   * @param {("h"|"m"|"d")} type can be h=hour, m=month, d=days
   * @param {Number} number is the number of integer that we want to add
   * @return {date} object Date
   */
  this.add = function(date, type, number) {
    date = dateGMT(date);
    number = Number(number);
    if (type === 'h') {
      date.setHours(date.getHours() + number);
    } else if (type === 'm') {
      date.setMonth(date.getMonth() + number);
    } else if (type === 'd') {
      date.setDate(date.getDate() + number);
    } else {
      return false;
    }
    return date;
  };
}

module.exports = new MomentLite();

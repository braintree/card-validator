'use strict';

var isArray = require('../../../src/lib/is-array');
var expect = require('chai').expect;

describe('isArray', function () {
  it('returns true for arrays', function () {
    expect(isArray([])).to.equal(true);
    expect(isArray([1, 2])).to.equal(true);
    expect(isArray([null])).to.equal(true);
  });

  it('returns false for non-arrays', function () {
    expect(isArray()).to.equal(false);
    expect(isArray(undefined)).to.equal(false);  // eslint-disable-line no-undefined
    expect(isArray(null)).to.equal(false);
    expect(isArray(true)).to.equal(false);
    expect(isArray(false)).to.equal(false);
    expect(isArray(0)).to.equal(false);
    expect(isArray(1)).to.equal(false);
    expect(isArray('arr')).to.equal(false);
    expect(isArray({})).to.equal(false);
    expect(isArray({length: 2})).to.equal(false);
  });
});

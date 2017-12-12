'use strict';

var expect = require('chai').expect;
var expirationDate = require('../../src/expiration-date');

var date = new Date();
var currentYear = date.getFullYear();
var twoDigitYear = Number(String(currentYear).substr(2, 2));
var nextYear = currentYear + 1;
var currentMonth = date.getMonth() + 1;
var previousMonth = currentMonth - 1 || currentMonth;
var nextMonth = currentMonth === 12 ? currentMonth : currentMonth + 1;

function yearsFromNow(fromNow) {
  return String(currentYear + fromNow);
}

describe('expirationDate validates', function () {
  context('String Argument', function () {
    var describes = {
      'within current year': [
        [
          previousMonth + ' / ' + nextYear,
          {
            isValid: true,
            isPotentiallyValid: true,
            month: previousMonth.toString(),
            year: nextYear.toString()
          }
        ],
        [
          currentMonth + ' / ' + currentYear,
          {
            isValid: true,
            isPotentiallyValid: true,
            month: currentMonth.toString(),
            year: currentYear.toString()
          }
        ],
        [
          nextMonth + ' / ' + currentYear,
          {
            isValid: true,
            isPotentiallyValid: true,
            month: nextMonth.toString(),
            year: currentYear.toString()
          }
        ]
      ],

      'valid expiration dates with slashes': [
        [currentMonth + ' / ' + currentYear, {isValid: true, isPotentiallyValid: true, month: currentMonth.toString(), year: currentYear.toString()}],
        ['10 / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '10', year: nextYear.toString()}],
        ['10/' + nextYear, {isValid: true, isPotentiallyValid: true, month: '10', year: nextYear.toString()}],
        ['12 / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '12', year: nextYear.toString()}],
        ['01 / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '01', year: nextYear.toString()}],
        ['1 / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '1', year: nextYear.toString()}],
        ['09 / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '09', year: nextYear.toString()}],
        ['01 / ' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '01', year: (twoDigitYear + 1).toString()}],
        ['1 / ' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '1', year: (twoDigitYear + 1).toString()}],
        ['01  / ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '01', year: nextYear.toString()}],
        ['01 /  ' + nextYear, {isValid: true, isPotentiallyValid: true, month: '01', year: nextYear.toString()}]
      ],

      'invalid expiration dates with slashes': [
        ['11 / 11', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['00 / ' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['13 / ' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01/1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 2100', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['10/123', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'ambiguous expiration dates with slashes': [
        ['11 / 1', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['01 / 201', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['01 / 211', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 199', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01/199', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'valid expiration dates with no slashes': [
        ['10' + nextYear, {isValid: true, isPotentiallyValid: true, month: '10', year: nextYear.toString()}],
        ['10' + nextYear, {isValid: true, isPotentiallyValid: true, month: '10', year: nextYear.toString()}],
        ['12' + nextYear, {isValid: true, isPotentiallyValid: true, month: '12', year: nextYear.toString()}],
        ['01' + nextYear, {isValid: true, isPotentiallyValid: true, month: '01', year: nextYear.toString()}],
        ['09' + nextYear, {isValid: true, isPotentiallyValid: true, month: '09', year: nextYear.toString()}],
        ['1' + nextYear, {isValid: true, isPotentiallyValid: true, month: '1', year: nextYear.toString()}],
        ['9' + nextYear, {isValid: true, isPotentiallyValid: true, month: '9', year: nextYear.toString()}],
        ['1' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '1', year: (twoDigitYear + 1).toString()}],
        ['9' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '9', year: (twoDigitYear + 1).toString()}],
        ['12' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '12', year: (twoDigitYear + 1).toString()}],
        ['01' + (twoDigitYear + 1), {isValid: true, isPotentiallyValid: true, month: '01', year: (twoDigitYear + 1).toString()}]
      ],

      'valid space separated month and year': [
        ['01 ' + (currentYear + 4), {isValid: true, isPotentiallyValid: true, month: '01', year: (currentYear + 4).toString()}],
        ['01 ' + (currentYear + 5), {isValid: true, isPotentiallyValid: true, month: '01', year: (currentYear + 5).toString()}],
        ['01 ' + (twoDigitYear + 4), {isValid: true, isPotentiallyValid: true, month: '01', year: (twoDigitYear + 4).toString()}],
        ['01 ' + (twoDigitYear + 6), {isValid: true, isPotentiallyValid: true, month: '01', year: (twoDigitYear + 6).toString()}],
        ['1 ' + (currentYear + 4), {isValid: true, isPotentiallyValid: true, month: '1', year: (currentYear + 4).toString()}],
        ['1 ' + (currentYear + 5), {isValid: true, isPotentiallyValid: true, month: '1', year: (currentYear + 5).toString()}],
        ['1 ' + (twoDigitYear + 4), {isValid: true, isPotentiallyValid: true, month: '1', year: (twoDigitYear + 4).toString()}],
        ['1 ' + (twoDigitYear + 5), {isValid: true, isPotentiallyValid: true, month: '1', year: (twoDigitYear + 5).toString()}],
        ['9 ' + (currentYear + 4), {isValid: true, isPotentiallyValid: true, month: '9', year: (currentYear + 4).toString()}],
        ['9 ' + (currentYear + 5), {isValid: true, isPotentiallyValid: true, month: '9', year: (currentYear + 5).toString()}]
      ],

      'ambiguous space separated month and year': [
        ['1 2', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['1 202', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['1 ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['12 2', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['12 202', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['12 ', {isValid: false, isPotentiallyValid: true, month: null, year: null}]
      ],

      'invalid space separated month and year': [
        ['11 11', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['00 ' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['13 ' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 1999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 2100', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'invalid expiration dates with no slashes': [
        [' ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['  ', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['1111', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['00' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['13' + nextYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['011999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['011999', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['012100', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'ambiguous expiration dates with no slashes': [
        ['011', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['111', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['2202', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['1202', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['01201', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['01211', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01199', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01199', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'empty strings': [
        ['', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['/', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        [' / ', {isValid: false, isPotentiallyValid: true, month: null, year: null}]
      ],

      'non-strings': [
        [[], {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [null, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [undefined, {isValid: false, isPotentiallyValid: false, month: null, year: null}], // eslint-disable-line no-undefined
        [Infinity, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [0 / 0, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [0, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [1, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [2, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [12, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [-1, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [-12, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [2015, {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'malformed strings': [
        ['foo', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['0120197', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['1.2', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [' 1', {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        ['01 / 20015', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['15  / ' + currentYear, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 2016 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 16/2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        ['01 / 2016 / 01 / 2016', {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ]
    };

    if (currentMonth !== 1) {
      describes['within current year'].push([
        previousMonth + ' / ' + currentYear,
        {
          isValid: false,
          isPotentiallyValid: false,
          month: previousMonth.toString(),
          year: currentYear.toString()
        }
      ]);

      describes['valid expiration dates with slashes'].push([
        previousMonth + ' / ' + currentYear,
        {
          isValid: false,
          isPotentiallyValid: false,
          month: previousMonth.toString(),
          year: currentYear.toString()
        }
      ]);
    }

    Object.keys(describes).forEach(function (key) {
      var tests = describes[key];

      describe(key, function () {
        tests.forEach(function (test) {
          var arg = test[0];
          var output = test[1];

          it('and returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
            expect(expirationDate(arg)).to.deep.equal(output);
          });
        });
      });
    });
  });

  context('Object Argument', function () {
    var describes = {
      'within current year with number values': [
        [
          {month: previousMonth, year: nextYear},
          {
            isValid: true,
            isPotentiallyValid: true,
            month: previousMonth.toString(),
            year: nextYear.toString()
          }
        ],
        [
          {month: currentMonth, year: currentYear},
          {
            isValid: true,
            isPotentiallyValid: true,
            month: currentMonth.toString(),
            year: currentYear.toString()
          }
        ],
        [
          {month: nextMonth, year: currentYear},
          {
            isValid: true,
            isPotentiallyValid: true,
            month: nextMonth.toString(),
            year: currentYear.toString()
          }
        ]
      ],

      'valid expiration dates': [
        [{month: currentMonth, year: currentYear}, {isValid: true, isPotentiallyValid: true, month: currentMonth.toString(), year: currentYear.toString()}],
        [{month: '10', year: nextYear}, {isValid: true, isPotentiallyValid: true, month: '10', year: nextYear.toString()}],
        [{month: '01', year: twoDigitYear + 1}, {isValid: true, isPotentiallyValid: true, month: '01', year: (twoDigitYear + 1).toString()}],
        [{month: '1', year: twoDigitYear + 1}, {isValid: true, isPotentiallyValid: true, month: '1', year: (twoDigitYear + 1).toString()}]
      ],

      'invalid expiration dates': [
        [{month: '11', year: '11'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '00', year: nextYear}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '13', year: nextYear}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '01', year: '1999'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '0', year: '1999'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '01', year: '2100'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '1', year: '123'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'ambiguous expiration dates': [
        [{month: '11', year: '1'}, {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        [{month: '01', year: '201'}, {isValid: false, isPotentiallyValid: true, month: null, year: null}],
        [{month: '01', year: '211'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}],
        [{month: '0', year: '199'}, {isValid: false, isPotentiallyValid: false, month: null, year: null}]
      ],

      'empty strings': [
        [{month: '', year: ''}, {isValid: false, isPotentiallyValid: true, month: null, year: null}]
      ]
    };

    if (currentMonth !== 1) {
      describes['within current year with number values'].push([
        {
          month: previousMonth,
          year: currentYear
        },
        {
          isValid: false,
          isPotentiallyValid: false,
          month: previousMonth.toString(),
          year: currentYear.toString()
        }
      ]);
    }

    Object.keys(describes).forEach(function (key) {
      var tests = describes[key];

      describe(key, function () {
        tests.forEach(function (test) {
          var arg = test[0];
          var output = test[1];

          it('and returns ' + JSON.stringify(output) + ' for "' + arg + '"', function () {
            expect(expirationDate(arg)).to.deep.equal(output);
          });
        });
      });
    });
  });

  context('maxElapsedYear', function () {
    it('defaults maxElapsedYear is 19', function () {
      expect(expirationDate(currentMonth + ' / ' + yearsFromNow(19))).to.deep.equal({isValid: true, isPotentiallyValid: true, month: currentMonth.toString(), year: yearsFromNow(19).toString()});
      expect(expirationDate(currentMonth + ' / ' + yearsFromNow(20))).to.deep.equal({isValid: false, isPotentiallyValid: false, month: null, year: null});
    });

    it('accepts maxElapsedYear', function () {
      expect(expirationDate(currentMonth + ' / ' + yearsFromNow(20), 20)).to.deep.equal({isValid: true, isPotentiallyValid: true, month: currentMonth.toString(), year: yearsFromNow(20).toString()});
      expect(expirationDate(currentMonth + ' / ' + yearsFromNow(21), 20)).to.deep.equal({isValid: false, isPotentiallyValid: false, month: null, year: null});
    });
  });
});

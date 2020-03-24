var parseDate = require('../../src/parse-date');

describe('parse-date', function () {
  var describes = {
    'wth empty month and empty year': [
      ['', {month: '', year: ''}],
      [' ', {month: '', year: ''}],
      ['/', {month: '', year: ''}],
      [[], {month: '', year: ''}]
    ],
    'wth deliminators': [
      ['12 21', {month: '12', year: '21'}],
      ['12 / 21', {month: '12', year: '21'}],
      ['12/21', {month: '12', year: '21'}],
      ['2020-10', {month: '10', year: '2020'}]
    ],
    'when the datestrings starts with "0"': [
      ['0', {month: '0', year: ''}],
      ['01', {month: '01', year: ''}],
      ['052', {month: '05', year: '2'}],
      ['0529', {month: '05', year: '29'}],
      ['052900', {month: '05', year: '2900'}]
    ],
    'when the datestrings starts with "2-9"': [
      ['2', {month: '2', year: ''}],
      ['31', {month: '3', year: '1'}],
      ['452', {month: '4', year: '52'}],
      ['8529', {month: '8', year: '529'}],
      ['952900', {month: '9', year: '52900'}]
    ],
    'when the datestring starts with 13-19': [
      ['13', {month: '1', year: '3'}],
      ['145', {month: '1', year: '45'}],
      ['1580', {month: '1', year: '580'}],
      ['16701', {month: '1', year: '6701'}],
      ['17701', {month: '1', year: '7701'}],
      ['18701', {month: '1', year: '8701'}],
      ['19701', {month: '1', year: '9701'}]
    ],
    'when the datestring has exactly 5 characters': [
      ['52019', {month: '5', year: '2019'}],
      ['39876', {month: '3', year: '9876'}]
    ],
    'when the datestring is greater than 5 characters': [
      ['122039', {month: '12', year: '2039'}],
      ['108760', {month: '10', year: '8760'}],
      ['1187601234', {month: '11', year: '87601234'}],
      ['520190', {month: '5', year: '20190'}],
      ['398760', {month: '3', year: '98760'}]
    ]
  };

  Object.keys(describes).forEach(function (key) {
    var tests = describes[key];

    describe(key, function () {
      tests.forEach(function (test) {
        var arg = test[0];
        var output = test[1];

        it('"' + arg + '" returns ' + JSON.stringify(output), function () {
          expect(parseDate(arg)).toEqual(output);
        });
      });
    });
  });

  describe('datestrings starting with 10-12', function () {
    let savedDateObject;

    beforeEach(function () {
      savedDateObject = Date;
      // because there's some internal logic to whether or not
      // an expiration date is potentially valid, we must
      // freeze time at the year 2019 for these tests to
      // keep working once the year is over
      const fixedDate = new Date('2019', '9');

      global.Date = jest.fn(() => fixedDate);
    });

    afterEach(function () {
      global.Date = savedDateObject;
    });

    it('parses month with 2 digits when it starts with 1 and the remaining year is not potentially valid', function () {
      expect(parseDate('100')).toEqual({month: '10', year: '0'});
      expect(parseDate('104')).toEqual({month: '10', year: '4'});
      expect(parseDate('109')).toEqual({month: '10', year: '9'});
      expect(parseDate('110')).toEqual({month: '11', year: '0'});
      expect(parseDate('115')).toEqual({month: '11', year: '5'});
      expect(parseDate('118')).toEqual({month: '11', year: '8'});
    });

    it('parses month with 1 digit when it starts with 1 and the remaining year is potentially valid', function () {
      expect(parseDate('119')).toEqual({month: '1', year: '19'});
      expect(parseDate('120')).toEqual({month: '1', year: '20'});
      expect(parseDate('125')).toEqual({month: '1', year: '25'});
      expect(parseDate('129')).toEqual({month: '1', year: '29'});
    });
  });
});

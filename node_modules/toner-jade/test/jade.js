'use strict';

var should = require('should'),
    tonerJade = require('../src/jade');

/* eslint padded-blocks: [0] */
describe('jade', function() {

  it('should render html', function() {
    var html = tonerJade('h1', null, null);
    should(html).be.eql('<h1></h1>');
  });

  it('should be able to use helpers', function() {
    var html = tonerJade('h1 #{templateHelpers.sayHello()}', {
      sayHello: function() { return 'Hello from nodejs'; }
    }, null);

    should(html).be.eql('<h1>Hello from nodejs</h1>');
  });

  it('should be able to use data', function() {
    var html = tonerJade('h1= a', null, { a: 'Hey' });
    should(html).be.eql('<h1>Hey</h1>');
  });

  it('should throw when syntax error', function() {
    should(function() {
      tonerJade('h1?', null, {});
    }).throw();
  });

  it('should work with jsreport syntax', function () {
    var html = tonerJade('img(src="{#image #{b}}")', null, { b: 'foo' });
    should(html).be.eql('<img src="{#image foo}"/>');
  });

});

'use strict';

var assign = require('object-assign'),
    jade = require('jade');

module.exports = function(html, helpers, data) {
  var locals,
      templateHelpers,
      compiledTemplate;

  // helpers will be available as `templateHelpers` inside templates
  templateHelpers = helpers ? { templateHelpers: helpers } : { templateHelpers: {} };
  locals = assign({}, data, templateHelpers);
  compiledTemplate = jade.compile(html);

  return compiledTemplate(locals);
};

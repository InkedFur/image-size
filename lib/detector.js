'use strict';

// To ensure Browserify bundles these otherwise- dynamically-required modules
// https://github.com/image-size/image-size/issues/39#issuecomment-351431024
require("./types/bmp");
require("./types/cur");
require("./types/dds");
require("./types/gif");
require("./types/ico");
require("./types/jpg");
require("./types/png");
require("./types/psd");
require("./types/svg");
require("./types/tiff");
require("./types/webp");

var typeMap = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  typeMap[type] = require('./types/' + type).detect;
});

module.exports = function (buffer, filepath) {
  var type, result;
  for (type in typeMap) {
    result = typeMap[type](buffer, filepath);
    if (result) {
      return type;
    }
  }
};

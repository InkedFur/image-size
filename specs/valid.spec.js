var expect = require('expect.js');
var glob = require('glob');
var path = require('path');

var libpath = process.env.TEST_COV ? '../lib-cov/' : '../lib/';
var imageSize = require(libpath);
var detector = require(libpath + 'detector');

// Helper method for tests
var fs = require('fs');
function fileToBuffer (file, size) {
  var buffer = new Buffer(size);
  fs.readSync(fs.openSync(file, 'r'), buffer, 0, size, 0);
  return buffer;
}

var sizes = {
  'default': {
    'width': 123,
    'height': 456
  },
  'specs/images/valid/jpg/large.jpg': {
    'width': 1600,
    'height': 1200
  },
  'specs/images/valid/jpg/very-large.jpg': {
    'width': 4800,
    'height': 3600
  }
};

// Test all valid files
describe('Valid images', function () {

  var validFiles = glob.sync('specs/images/valid/**/*.*');
  validFiles.forEach(function (file) {

    describe(file, function() {

      var asyncDimensions;
      var bufferSize = 0x4000;

      beforeEach(function (done) {

        imageSize(file, function (err, _dim) {
          asyncDimensions = _dim;
          done();
        });
      });

      it('should return correct size for ' + file, function() {
        var expected = sizes[file] || sizes.default;
        expect(asyncDimensions.width).to.be(expected.width);
        expect(asyncDimensions.height).to.be(expected.height);

        if (type !== 'tiff') {
          expect(bufferDimensions.width).to.be(expected.width);
          expect(bufferDimensions.height).to.be(expected.height);
        }
      });
    });
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConsensus = exports.getConservation = exports.getEntropy = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Get Log e entropy of a distribution
var getEntropy = function getEntropy(input) {
  var arr;

  if (_lodash["default"].isString(input)) {
    arr = input.split('');
  } else {
    arr = input;
  }

  var set = {};
  arr.forEach(function (c) {
    return set[c] ? set[c]++ : set[c] = 1;
  });
  return Object.keys(set).reduce(function (acc, c) {
    var p = set[c] / arr.length;
    return acc - p * Math.log(p);
  }, 0);
}; // Get MLE of a distribution


exports.getEntropy = getEntropy;

var getConservation = function getConservation(input) {
  var arr;

  if (_lodash["default"].isString(input)) {
    arr = input.split('');
  } else {
    arr = input;
  }

  var conservationArr = (0, _lodash["default"])(arr).countBy().entries().maxBy('[1]')[1];
  return conservationArr;
}; // Get consensus sequence from 2D array


exports.getConservation = getConservation;

var getConsensus = function getConsensus(sequencesTranspose) {
  return sequencesTranspose.map(function (sequenceTranspose) {
    return (0, _lodash["default"])(sequenceTranspose).countBy().entries().maxBy('[1]')[0];
  });
};

exports.getConsensus = getConsensus;
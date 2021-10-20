"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeSequences = exports.parseSequences = exports.importSequences = void 0;

var _bio = require("bio.io");

var _lodash = _interopRequireDefault(require("lodash"));

var _metrics = require("./metrics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import sequence in FASTA/Clustal format
var importSequences = function importSequences(inputData, extension) {
  var sequences;

  if (extension === 'fasta') {
    sequences = _bio.fasta.parse(inputData);
  } else if (extension === 'clustal') {
    sequences = _bio.clustal.parse(inputData);
  } else {
    sequences = '';
    console.log("Invalid format");
  }

  return sequences;
}; // Get sequence and associated info


exports.importSequences = importSequences;

var parseSequences = function parseSequences(sequences, length) {
  var sequencesArray = [];
  var sequencesInfo = [];
  sequences.forEach(function (sequence) {
    // Pad end if sequences not same length
    var sequenceString = _lodash["default"].padEnd(sequence.seq, length, "-");

    var sequenceArray = _lodash["default"].split(sequenceString, '');

    var sequenceInfo = _objectSpread(_objectSpread({
      'id': sequence.id,
      'name': sequence.name
    }, sequence.details), sequence.ids);

    sequencesArray.push(sequenceArray);
    sequencesInfo.push(sequenceInfo);
  });
  return {
    sequencesArray: sequencesArray,
    sequencesInfo: sequencesInfo
  };
}; // Merge sequences w/ consensus sequence


exports.parseSequences = parseSequences;

var mergeSequences = function mergeSequences(inputTranspose, inputArray, inputInfo, showconsensus) {
  var sequencesArray = inputArray;
  var sequencesInfo = inputInfo;

  if (showconsensus) {
    var consensusObj = {
      name: '<b>Consensus</b>',
      en: '<b>Consensus</b>',
      id: "<b>".concat(_lodash["default"].maxBy(inputInfo, "id").id + 1, "</b>")
    };
    var consensus = (0, _metrics.getConsensus)(inputTranspose);
    sequencesArray = [].concat(_toConsumableArray(inputArray), [consensus]);
    sequencesInfo = [].concat(_toConsumableArray(inputInfo), [consensusObj]);
  }

  return {
    sequencesArray: sequencesArray,
    sequencesInfo: sequencesInfo
  };
};

exports.mergeSequences = mergeSequences;
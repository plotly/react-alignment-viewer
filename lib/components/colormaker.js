"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorscale = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _buried = _interopRequireDefault(require("./colorscales/buried"));

var _cinema = _interopRequireDefault(require("./colorscales/cinema"));

var _clustal = _interopRequireDefault(require("./colorscales/clustal"));

var _clustal2 = _interopRequireDefault(require("./colorscales/clustal2"));

var _helix = _interopRequireDefault(require("./colorscales/helix"));

var _hydrophobicity = _interopRequireDefault(require("./colorscales/hydrophobicity"));

var _lesk = _interopRequireDefault(require("./colorscales/lesk"));

var _mae = _interopRequireDefault(require("./colorscales/mae"));

var _nucleotide = _interopRequireDefault(require("./colorscales/nucleotide"));

var _purine = _interopRequireDefault(require("./colorscales/purine"));

var _strand = _interopRequireDefault(require("./colorscales/strand"));

var _taylor = _interopRequireDefault(require("./colorscales/taylor"));

var _turn = _interopRequireDefault(require("./colorscales/turn"));

var _zappo = _interopRequireDefault(require("./colorscales/zappo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ALL_COLORSCALES = {
  buried: _buried["default"],
  buried_index: _buried["default"],
  cinema: _cinema["default"],
  clustal2: _clustal2["default"],
  clustal: _clustal["default"],
  helix: _helix["default"],
  helix_propensity: _helix["default"],
  hydro: _hydrophobicity["default"],
  hydrophobicity: _hydrophobicity["default"],
  lesk: _lesk["default"],
  mae: _mae["default"],
  nucleotide: _nucleotide["default"],
  purine: _purine["default"],
  purine_pyrimidine: _purine["default"],
  strand: _strand["default"],
  strand_propensity: _strand["default"],
  taylor: _taylor["default"],
  turn: _turn["default"],
  turn_propensity: _turn["default"],
  zappo: _zappo["default"]
};
var DARK_COLORSCALES = ['buried', 'buried_index', 'helix', 'helix_propensity', 'hydro', 'hydrophobicity', 'strand', 'strand_propensity', 'turn', 'turn_propensity'];

var convertColorscale = function convertColorscale(inputColorscale) {
  // Add filler white for blanks
  if (!inputColorscale['-']) {
    inputColorscale['-'] = '#ffffff';
  } // Increment based on number of keys in colorscale


  var length = _lodash["default"].size(inputColorscale);

  var increment = 1 / length;
  var offset = 0;
  var safety = 0.005;
  var colormap = {};
  var colorscale = [];

  _lodash["default"].forEach(inputColorscale, function (val, key) {
    // Pre-increment
    colormap[key] = offset + safety;
    colorscale.push([offset, val]); // Increment

    offset += increment; // Post-increment

    colorscale.push([offset, val]);
  }); // To remove floating point error


  colorscale[colorscale.length - 1][0] = 1;
  return {
    colormap: colormap,
    colorscale: colorscale
  };
}; // Return colorscale and other params for given input string/object


var getColorscale = function getColorscale(inputColorscale) {
  var inputTextcolor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var inputOpacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var chosenColorscale, textcolor, opacity;

  if (_lodash["default"].isString(inputColorscale)) {
    // Default colorscale
    chosenColorscale = ALL_COLORSCALES[inputColorscale] || _taylor["default"];

    if (DARK_COLORSCALES.includes(inputColorscale)) {
      textcolor = '#ffffff';
      opacity = 1;
    } else {
      textcolor = '#444444';
      opacity = 0.75;
    }
  } else {
    // Custom colorscale
    chosenColorscale = inputColorscale;
    textcolor = '#ffffff';
    opacity = 1;
  } // Custom overrride


  if (inputTextcolor) {
    textcolor = inputTextcolor;
  }

  if (inputOpacity) {
    opacity = inputOpacity;
  }

  var _convertColorscale = convertColorscale(chosenColorscale),
      colormap = _convertColorscale.colormap,
      colorscale = _convertColorscale.colorscale;

  return {
    colormap: colormap,
    colorscale: colorscale,
    textcolor: textcolor,
    opacity: opacity
  };
};

exports.getColorscale = getColorscale;
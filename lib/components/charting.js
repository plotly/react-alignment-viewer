"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisualizations = exports.getTicks = exports.getHovertext = exports.getWidth = exports.SUBPLOT_RATIOS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Subplot ratios
var SUBPLOT_RATIOS = {
  1: 1,
  2: 0.75,
  3: 0.65
}; // Get width

exports.SUBPLOT_RATIOS = SUBPLOT_RATIOS;

var getWidth = function getWidth(inputWidth) {
  var width;

  if (_lodash["default"].isNumber(inputWidth)) {
    width = inputWidth;
  } else {
    // Only supports % and px for now
    // Need react-sizeme for container support if user chooses half-grid, etc
    if (inputWidth.includes('%')) {
      width = parseFloat(inputWidth) / 100 * window.innerWidth;
    } else {
      width = parseFloat(inputWidth);
    }
  }

  return width;
}; // Format hover text


exports.getWidth = getWidth;

var getHovertext = function getHovertext(sequencesArray, sequencesInfo) {
  var formattedTextsArray = [];

  var _loop = function _loop(i) {
    var formattedTexts = [];
    var position = 0;
    sequencesArray[i].forEach(function (letter) {
      position += 1;
      var formattedText = ["<b>Name</b>: ".concat(sequencesInfo[i].name), "<b>Organism</b>: ".concat(sequencesInfo[i].os ? sequencesInfo[i].os : 'N/A'), "<b>ID</b>: ".concat(sequencesInfo[i].id, "<br>"), "<b>Position</b>: (".concat(position, ", ").concat(i, ")"), "<b>Letter</b>: ".concat(letter)].join('<br>');
      formattedTexts.push(formattedText);
    });
    formattedTextsArray.push(formattedTexts);
  };

  for (var i = 0; i < sequencesArray.length; i++) {
    _loop(i);
  }

  return _lodash["default"].flatten(formattedTextsArray);
}; // Get label and tick properties


exports.getHovertext = getHovertext;

var getTicks = function getTicks(sequencesInfo, showlabel, showid) {
  var offset = _lodash["default"].toString(_lodash["default"].maxBy(sequencesInfo, "id").id).length;

  var labels, tick;

  if (showlabel && showid) {
    labels = sequencesInfo.map(function (sequence) {
      return sequence.name + "     " + _lodash["default"].padStart(sequence.id, offset, "0");
    });
    tick = '';
  } else if (showlabel) {
    labels = sequencesInfo.map(function (sequence) {
      return sequence.name;
    });
    tick = 'outside';
  } else if (showid) {
    labels = sequencesInfo.map(function (sequence) {
      return sequence.id;
    });
    tick = 'outside';
  } else {
    labels = sequencesInfo.map(function () {
      return "";
    });
    tick = '';
  }

  return {
    labels: labels,
    tick: tick
  };
}; // Pasrse visualization settings for AlignmentViewer


exports.getTicks = getTicks;

var getVisualizations = function getVisualizations(visualizationsVal) {
  var showconservation = false;
  var showgap = false;
  var showlabel = false;
  var showid = false;
  var showconsensus = false;

  if (_lodash["default"].includes(visualizationsVal, 'showconservation')) {
    showconservation = true;
  }

  if (_lodash["default"].includes(visualizationsVal, 'showgap')) {
    showgap = true;
  }

  if (_lodash["default"].includes(visualizationsVal, 'showlabel')) {
    showlabel = true;
  }

  if (_lodash["default"].includes(visualizationsVal, 'showid')) {
    showid = true;
  }

  if (_lodash["default"].includes(visualizationsVal, 'showconsensus')) {
    showconsensus = true;
  }

  return {
    showconservation: showconservation,
    showgap: showgap,
    showlabel: showlabel,
    showid: showid,
    showconsensus: showconsensus
  };
};

exports.getVisualizations = getVisualizations;
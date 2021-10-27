"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactPlotly = _interopRequireDefault(require("react-plotly.js"));

var _sequences = require("./sequences");

var _metrics = require("./metrics");

var _charting = require("./charting");

var _colormaker = require("./colormaker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The Alignment Viewer (MSA) component is used to align multiple genomic
 * or proteomic sequences from a FASTA or Clustal file. Among its
 * extensive set of features, the multiple sequence alignment viewer
 * can display multiple subplots showing gap and conservation info,
 * alongside industry standard colorscale support and consensus sequence.
 * No matter what size your alignment is, Aligment Viewer is able to display
 * your genes or proteins snappily thanks to the underlying WebGL architecture
 * powering the component. You can quickly scroll through your long sequence
 * with a slider or a heatmap overview.
 * Note that the AlignmentChart only returns a chart of the sequence, while
 * AlignmentViewer has integrated controls for colorscale, heatmaps, and subplots
 * allowing the user to interactively control their sequences.
 * Read more about the component here:
 * https://github.com/plotly/react-alignment-viewer
 */
var AlignmentChart = /*#__PURE__*/function (_PureComponent) {
  _inherits(AlignmentChart, _PureComponent);

  var _super = _createSuper(AlignmentChart);

  // Constructor
  function AlignmentChart(props) {
    var _this;

    _classCallCheck(this, AlignmentChart);

    _this = _super.call(this, props);
    _this.state = {
      xStart: null,
      xEnd: null,
      dragmode: null
    };
    _this.resetWindowing = _this.resetWindowing.bind(_assertThisInitialized(_this));
    _this.handleChange = _lodash["default"].debounce(_this.handleChange.bind(_assertThisInitialized(_this)), 250);
    return _this;
  } // Reset windowing to user preset on init or data change


  _createClass(AlignmentChart, [{
    key: "resetWindowing",
    value: function resetWindowing(props) {
      var tilewidth = props.tilewidth,
          inputNumtiles = props.numtiles,
          inputWidth = props.width; // Get sizing

      var width, pixelWidth; // Width

      if (inputWidth) {
        width = inputWidth;
        pixelWidth = (0, _charting.getWidth)(inputWidth);
      } else if (tilewidth && inputNumtiles) {
        width = _lodash["default"].toInteger(tilewidth) * _lodash["default"].toInteger(inputNumtiles);
        pixelWidth = width;
      } else {
        width = '100%';
        pixelWidth = (0, _charting.getWidth)(width);
      } // Number of horizontal tiles


      var numtiles;

      if (inputNumtiles) {
        numtiles = inputNumtiles;
      } else if (tilewidth) {
        numtiles = _lodash["default"].toInteger(pixelWidth / tilewidth);
      } else {
        numtiles = 50;
      }

      return {
        xStart: -0.5,
        xEnd: numtiles + 0.5
      };
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(event) {
      var range = event.range || {};
      var x = range.x;

      if (!x) {
        return;
      }

      this.setState({
        xStart: x[0],
        xEnd: x[1]
      });
    } // Handle plot events

  }, {
    key: "handleChange",
    value: function handleChange(event) {
      // We need to save dragmode even if onChange is not defined
      if (event.dragmode) {
        this.setState({
          dragmode: event.dragmode
        });
      }

      if (!this.props.onChange) {
        return;
      } // CLick (mousedown) or hover (mousemove)


      if (event.points) {
        var eventType;

        if (event.event.type === "mousedown") {
          eventType = 'Click';
        } else if (event.event.type === "mousemove") {
          eventType = 'Hover';
        } else {
          eventType = 'Other';
        }

        this.props.onChange({
          eventType: eventType,
          name: event.points[0].data.name,
          text: event.points[0].text,
          curveNumber: event.points[0].curveNumber,
          x: event.points[0].x,
          y: event.points[0].y
        });
      } // Zoom
      else if (event['xaxis.range[0]'] || event['xaxis.range']) {
        this.setState({
          xStart: event['xaxis.range[0]'] || event['xaxis.range'][0],
          xEnd: event['xaxis.range[1]'] || event['xaxis.range'][1]
        });
        this.props.onChange({
          eventType: 'Zoom',
          xStart: event['xaxis.range[0]'] || event['xaxis.range'][0],
          xEnd: event['xaxis.range[1]'] || event['xaxis.range'][1]
        });
      } // Autozoom
      else if (event['xaxis.autorange'] === true) {
        this.setState({
          xStart: null,
          xEnd: null
        });
        this.props.onChange({
          eventType: 'Autoscale'
        });
      } // Guard
      else {
        this.props.onChange(event);
      }
    }
  }, {
    key: "getData",
    value: // Fetch data
    function getData() {
      var _this$props = this.props,
          inputData = _this$props.data,
          extension = _this$props.extension,
          inputColorscale = _this$props.colorscale,
          inputOpacity = _this$props.opacity,
          inputTextColor = _this$props.textcolor,
          textsize = _this$props.textsize,
          showlabel = _this$props.showlabel,
          showid = _this$props.showid,
          showconservation = _this$props.showconservation,
          conservationcolor = _this$props.conservationcolor,
          conservationcolorscale = _this$props.conservationcolorscale,
          conservationopacity = _this$props.conservationopacity,
          conservationmethod = _this$props.conservationmethod,
          correctgap = _this$props.correctgap,
          showgap = _this$props.showgap,
          gapcolor = _this$props.gapcolor,
          gapcolorscale = _this$props.gapcolorscale,
          gapopacity = _this$props.gapopacity,
          groupbars = _this$props.groupbars,
          showconsensus = _this$props.showconsensus,
          sequenceIds = _this$props.sequenceIds; // Import sequence in FASTA/Clustal format

      var sequences = (0, _sequences.importSequences)(inputData, extension);

      if (sequenceIds) {
        sequences = sequences.filter(function (sequence) {
          return sequenceIds.includes(sequence.id);
        });
      } // Fill sequence gaps if any


      var length = _lodash["default"].maxBy(sequences, function (sequence) {
        return sequence.seq.length;
      }).seq.length;

      var _parseSequences = (0, _sequences.parseSequences)(sequences, length),
          sequencesArray = _parseSequences.sequencesArray,
          sequencesInfo = _parseSequences.sequencesInfo;

      var sequencesTranspose = _lodash["default"].zip.apply(_lodash["default"], _toConsumableArray(sequencesArray));

      var preCount = sequencesInfo.length; // Make consensus sequence

      var _mergeSequences = (0, _sequences.mergeSequences)(sequencesTranspose, sequencesArray, sequencesInfo, showconsensus);

      sequencesArray = _mergeSequences.sequencesArray;
      sequencesInfo = _mergeSequences.sequencesInfo;
      var count = sequencesInfo.length; // TODO export to main plot
      // Get colorscale

      var _getColorscale = (0, _colormaker.getColorscale)(inputColorscale, inputTextColor, inputOpacity),
          colormap = _getColorscale.colormap,
          colorscale = _getColorscale.colorscale,
          textcolor = _getColorscale.textcolor,
          opacity = _getColorscale.opacity; // Get heatmap z, and annotations x, y, text, hoverText


      var z = sequencesArray.map(function (sequenceText) {
        return sequenceText.map(function (letter) {
          return colormap[letter] || 1;
        });
      });

      var x = _lodash["default"].range(length * count).map(function (i) {
        return i % length;
      });

      var y = _lodash["default"].range(length * count).map(function (i) {
        return _lodash["default"].floor(i / length);
      });

      var text = _lodash["default"].flatten(sequencesArray);

      var hoverText = (0, _charting.getHovertext)(sequencesArray, sequencesInfo); // Get labels, tick

      var _getTicks = (0, _charting.getTicks)(sequencesInfo, showlabel, showid),
          labels = _getTicks.labels,
          tick = _getTicks.tick; // return { sequencesInfo, sequencesArray };
      // TODO export to secondary plots
      // Make conservation and gap bars


      var conservationBars = false;
      var gapBars = false;
      var maxEntropy = 0;

      if (showconservation) {
        conservationBars = sequencesTranspose.map(function (sequenceTranspose) {
          var val;

          if (conservationmethod === 'entropy') {
            val = (0, _metrics.getEntropy)(sequenceTranspose);

            if (val > maxEntropy) {
              maxEntropy = val;
            }
          } else {
            val = (0, _metrics.getConservation)(sequenceTranspose);
          }

          return val;
        });

        if (conservationmethod === 'entropy') {
          conservationBars = conservationBars.map(function (conservationBar) {
            return 1 - conservationBar / maxEntropy;
          });
        } else {
          conservationBars = conservationBars.map(function (conservationBar) {
            return conservationBar / preCount;
          });
        }
      }

      if (showgap) {
        gapBars = sequencesTranspose.map(function (sequenceTranspose) {
          return _lodash["default"].countBy(sequenceTranspose)['-'] / preCount;
        });
      }

      if (correctgap) {
        for (var i = 0; i < conservationBars.length; i++) {
          conservationBars[i] = conservationBars[i] * (1 - (gapBars[i] ? gapBars[i] : 0));
        }
      } // Get data


      var data = [// Heatmap
      {
        type: 'heatmap',
        name: 'Heatmap',
        z: z,
        hoverinfo: 'none',
        colorscale: colorscale,
        opacity: opacity,
        showscale: false
      }, // Heatmap annotations
      {
        type: 'scattergl',
        name: 'Text',
        mode: 'text',
        x: x,
        y: y,
        text: text,
        hoverinfo: 'none',
        textfont: {
          color: textcolor,
          size: textsize
        }
      }, // Hoverinfo label (hacky)
      {
        type: 'scatter',
        name: 'Annotations',
        x: x,
        y: y,
        marker: {
          color: 'transparent'
        },
        text: hoverText,
        hoverinfo: 'text+name',
        textfont: {
          color: textcolor,
          size: textsize
        }
      }]; // Append secondary plots

      var plotCount = 1; // Conservation

      if (conservationBars) {
        plotCount += 1;
        var dataArr = {
          type: 'bar',
          name: 'Conservation',
          x: _lodash["default"].range(length),
          y: conservationBars,
          marker: {
            color: conservationcolor,
            opacity: conservationopacity
          },
          yaxis: "y".concat(plotCount)
        };

        if (conservationcolorscale) {
          dataArr.marker.color = conservationBars;
          dataArr.marker.colorscale = conservationcolorscale;
          dataArr.marker.reversescale = true;
        }

        data.push(dataArr);
      } // Gap


      if (gapBars) {
        if (groupbars === false) {
          plotCount += 1;
        }

        var _dataArr = {
          type: 'bar',
          name: 'Gap',
          x: _lodash["default"].range(length),
          y: gapBars,
          marker: {
            color: gapcolor,
            opacity: gapopacity
          },
          yaxis: "y".concat(plotCount)
        };

        if (gapcolorscale) {
          _dataArr.marker.color = gapBars;
          _dataArr.marker.colorscale = gapcolorscale;
          _dataArr.marker.reversescale = true;
        }

        data.push(_dataArr);
      }

      return {
        data: data,
        length: length,
        count: count,
        labels: labels,
        tick: tick,
        plotCount: plotCount
      };
    }
  }, {
    key: "getLayout",
    value: // Fetch layout
    function getLayout(_ref) {
      var length = _ref.length,
          count = _ref.count,
          labels = _ref.labels,
          tick = _ref.tick,
          plotCount = _ref.plotCount;
      var _this$props2 = this.props,
          tilewidth = _this$props2.tilewidth,
          tileheight = _this$props2.tileheight,
          inputNumtiles = _this$props2.numtiles,
          overview = _this$props2.overview,
          inputScrollskip = _this$props2.scrollskip,
          tickstart = _this$props2.tickstart,
          ticksteps = _this$props2.ticksteps,
          inputWidth = _this$props2.width,
          inputHeight = _this$props2.height;
      var _this$state = this.state,
          xStart = _this$state.xStart,
          xEnd = _this$state.xEnd,
          dragmode = _this$state.dragmode; // Initial width and range handled by constructor

      var initialRange = [xStart, xEnd]; // Get sizing

      var width, pixelWidth, height; // Width

      if (inputWidth) {
        width = inputWidth;
        pixelWidth = (0, _charting.getWidth)(inputWidth);
      } else if (tilewidth && inputNumtiles) {
        width = _lodash["default"].toInteger(tilewidth) * _lodash["default"].toInteger(inputNumtiles);
        pixelWidth = width;
      } else {
        width = '100%';
        pixelWidth = (0, _charting.getWidth)(width);
      } // Height


      if (inputHeight) {
        height = inputHeight;
      } else if (tileheight) {
        // Adjust for subplots
        var ratio = _charting.SUBPLOT_RATIOS[plotCount] * (overview === 'heatmap' || overview === 'bar' ? 0.85 : 1);
        height = _lodash["default"].toInteger(_lodash["default"].toInteger(tileheight) * count / ratio) + 50;
      } else {
        height = '100%';
      } // Number of horizontal tiles


      var numtiles;

      if (inputNumtiles) {
        numtiles = inputNumtiles;
      } else if (tilewidth) {
        numtiles = _lodash["default"].toInteger(pixelWidth / tilewidth);
      } else {
        numtiles = 50;
      } // Get slider


      var steps;

      if (overview === 'slider') {
        var scrollskip = inputScrollskip ? inputScrollskip : 1;

        var possibleSteps = _lodash["default"].range(length);

        steps = (0, _lodash["default"])(possibleSteps).filter(function (i) {
          return i % _lodash["default"].toInteger(scrollskip) === 0;
        }).map(function (j) {
          return {
            'method': 'relayout',
            'label': j,
            'args': ['xaxis', {
              'range': [-0.5 + j, numtiles + 0.5 + j]
            }]
          };
        }).value();
      } // Get layout


      var layout = {
        hovermode: 'closest',
        dragmode: dragmode || 'pan',
        showlegend: false,
        xaxis: {
          showgrid: false,
          zeroline: false,
          range: initialRange,
          automargin: true
        },
        yaxis: {
          ticks: tick,
          ticktext: labels,
          tickvals: _lodash["default"].range(labels.length),
          showgrid: false,
          zeroline: false,
          autorange: 'reversed',
          automargin: true
        },
        margin: {
          t: 20,
          r: 20
        }
      }; // Append secondary plots

      if (plotCount === 2) {
        layout.yaxis.domain = [0.0, 0.74];
        layout.yaxis2 = {
          title: '<b>Bar weights</b>',
          titlefont: {
            size: 12
          },
          showgrid: false,
          zeroline: false,
          domain: [0.75, 1]
        };
      } else if (plotCount === 3) {
        layout.yaxis.domain = [0.0, 0.64];
        layout.yaxis2 = {
          title: '<b>Conservation</b>',
          titlefont: {
            size: 12
          },
          showgrid: false,
          zeroline: false,
          domain: [0.65, 0.89]
        };
        layout.yaxis3 = {
          title: '<b>Gap</b>',
          titlefont: {
            size: 12
          },
          showgrid: false,
          zeroline: false,
          domain: [0.90, 1]
        };
      } else {
        layout.yaxis.domain = [0.0, 1.0];
      } // Get overview plot


      if (overview === 'heatmap') {
        layout.xaxis.rangeslider = {
          autorange: true
        };
        layout.xaxis.tick0 = tickstart;
        layout.xaxis.dtick = ticksteps;
        layout.margin = {
          t: 20,
          r: 20,
          b: 20
        };
      } else if (overview === 'slider') {
        layout.sliders = [{
          // Wrap in bold hack
          currentvalue: {
            "prefix": "<b>Position </b><b>",
            "suffix": "</b>"
          },
          steps: steps
        }];
      } else {
        layout.xaxis.tick0 = tickstart;
        layout.xaxis.dtick = ticksteps;
        layout.margin = {
          t: 20,
          r: 20,
          b: 20
        };
      }

      return {
        layout: layout,
        width: width,
        height: height
      };
    }
  }, {
    key: "componentDidMount",
    value: // Set xStart and xEnd on load
    function componentDidMount() {
      var _this$resetWindowing = this.resetWindowing(this.props),
          xStart = _this$resetWindowing.xStart,
          xEnd = _this$resetWindowing.xEnd;

      this.setState({
        xStart: xStart,
        xEnd: xEnd
      });
    } // Reset xStart and xEnd on data change

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.data !== prevProps.data) {
        var _this$resetWindowing2 = this.resetWindowing(this.props),
            xStart = _this$resetWindowing2.xStart,
            xEnd = _this$resetWindowing2.xEnd;

        this.setState({
          xStart: xStart,
          xEnd: xEnd
        });
      }
    } // Main

  }, {
    key: "render",
    value: function render() {
      var _this$getData = this.getData(),
          data = _this$getData.data,
          length = _this$getData.length,
          count = _this$getData.count,
          labels = _this$getData.labels,
          tick = _this$getData.tick,
          plotCount = _this$getData.plotCount;

      var _this$getLayout = this.getLayout({
        length: length,
        count: count,
        labels: labels,
        tick: tick,
        plotCount: plotCount
      }),
          layout = _this$getLayout.layout,
          width = _this$getLayout.width,
          height = _this$getLayout.height;

      var other = {
        style: {
          width: width,
          height: height
        },
        useResizeHandler: true
      };
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactPlotly["default"], _extends({
        data: data,
        layout: layout,
        onClick: this.handleChange,
        onHover: this.handleChange,
        onSelected: this.handleSelect.bind(this),
        onRelayout: this.handleChange
      }, other)));
    }
  }]);

  return AlignmentChart;
}(_react.PureComponent);

exports["default"] = AlignmentChart;
AlignmentChart.propTypes = {
  /**
   * Input data, either in FASTA or Clustal format.
   */
  data: _propTypes["default"].string,

  /**
   *Format type of the input data, either in FASTA or Clustal.
   */
  extension: _propTypes["default"].string,

  /**
   * Colorscale in 'buried', 'cinema', 'clustal', 'clustal2', 'helix', 'hydrophobicity'
   * 'lesk', 'mae', 'nucleotide', 'purine', 'strand', 'taylor', 'turn', 'zappo',
   * or your own colorscale as a {'nucleotide': COLOR} dict.
   * Note that this is NOT a standard plotly colorscale.
   */
  colorscale: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),

  /**
   * Opacity of the main plot as a value between 0 and 1.
   */
  opacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Color of the nucleotide labels, in common name, hex, rgb or rgba format.
   * If left blank, handled by the colorscale automatically.
   */
  textcolor: _propTypes["default"].string,

  /**
   * Size of the nucleotide labels, as a number.
   */
  textsize: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Toggles displaying sequence labels at left of alignment
   */
  showlabel: _propTypes["default"].bool,

  /**
   * Toggles displaying sequence IDs at left of alignment.
   */
  showid: _propTypes["default"].bool,

  /**
   * Enables the display of conservation secondary barplot where the most conserved
   * nucleotides or amino acids get greater bars.
   */
  showconservation: _propTypes["default"].bool,

  /**
   * Color of the conservation secondary barplot, in common name, hex, rgb or rgba format.
   */
  conservationcolor: _propTypes["default"].string,

  /**
   * Colorscale of the conservation barplot, in Plotly colorscales (e.g. 'Viridis')
   * or as custom Plotly colorscale under a list format.
   * Note that this conservationcolorscale argument
   * does NOT follow the same format as the colorscale argument.
   */
  conservationcolorscale: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array]),

  /**
   * Opacity of the conservation secondary barplot as a value between 0 and 1.
   */
  conservationopacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Whether to use most conserved ratio (MLE) 'conservation'
   * or normalized entropy 'entropy' to determine conservation,
   * which is a value between 0 and 1 where 1 is most conserved.
   */
  conservationmethod: _propTypes["default"].oneOf(['conservation', 'entropy']),

  /**
   * Whether to normalize the conservation barchart
   * By multiplying it elementwise with the gap barchart, as to
   * lower the conservation values across sequences regions with many gaps.
   */
  correctgap: _propTypes["default"].bool,

  /**
   * Enables the display of gap secondary barplot where the sequence regions
   * with the fewest gaps get the greatest bars.
   */
  showgap: _propTypes["default"].bool,

  /**
   * Color of the gap secondary barplot, in common name, hex, rgb or rgba format.
   */
  gapcolor: _propTypes["default"].string,

  /**
   * Colorscale of the gap barplot, in Plotly colorscales (e.g. 'Viridis')
   * or as custom Plotly colorscale under a list format.
   * Note that this conservationcolorscale argument
   * does NOT follow the same format as the colorscale argument.
   */
  gapcolorscale: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array]),

  /**
   * Opacity of the gap secondary barplot as a value between 0 and 1.
   */
  gapopacity: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * If both conservation and gap are enabled,
   * toggles whether to group bars or to stack them as separate subplots.
   * No effect if not both gap and conservation are shown.
   */
  groupbars: _propTypes["default"].bool,

  /**
   * Displays toggling the consensus sequence, where each nucleotide in the
   * consensus sequence is the argmax of its distribution at a set nucleotide.
   */
  showconsensus: _propTypes["default"].bool,

  /**
   * Sets how many pixels each nucleotide/amino acid on the Alignment Viewer
   * takes up horizontally. The total number of tiles (numtiles) seen
   * horizontally is automatically determined by rounding
   * the Viewer width divided by the tile width.
   * the Viewwer width divided by the tile witdth.
   */
  tilewidth: _propTypes["default"].number,

  /**
   * Sets how many pixels each nucleotide/amino acid on the Alignment Viewer
   * takes up vertically.
   * If enabled, set height dynamically.
   */
  tileheight: _propTypes["default"].number,

  /**
   * Toggles whether the overview should be a heatmap, a slider, or none.
   */
  overview: _propTypes["default"].oneOf(['heatmap', 'slider', 'none']),

  /**
   * Sets how many tiles to display across horitontally. If enabled,
   * overrides tilewidth and sets the amount of tiles directly based off
   * that value.
   */
  numtiles: _propTypes["default"].number,

  /**
   * If overview is set to 'scroll', determines how many tiles to skip
   * with each slider movement.
   * Has no effect if scroll is not enabled (such as with overview or none).
   */
  scrollskip: _propTypes["default"].number,

  /**
   * Determines where to start annotating the first tile.
   * If let blank will be automatically determined by Plotly.
   * Equivalent to Plotly's tick0 property.
   * Does not function if overview mode 'slider' is applied. (Current bug)
   */
  tickstart: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Determines at what interval to keep annotating the tiles.
   * If left blank will be automatially determined by Plotly.
   * Equivalent to Plotly's dtick property.
   * Does not function if overview mode 'slider' is applied. (Current bug)
   */
  ticksteps: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Width of the Viewer.
   * Property takes precedence over tileswidth and numtiles
   * if either of them is set.
   */
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Width of the Viewer.
   * Property takes precedence over tilesheight if both
   * are set.
   */
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /**
   * Sequences ids to display
   */
  sequenceIds: _propTypes["default"].array
};
AlignmentChart.defaultProps = {
  // Data
  extension: 'fasta',
  colorscale: 'clustal2',
  opacity: null,
  textcolor: null,
  textsize: 10,
  showlabel: true,
  showid: true,
  showconservation: true,
  conservationcolor: null,
  conservationcolorscale: 'Viridis',
  conservationopacity: null,
  conservationmethod: 'entropy',
  correctgap: true,
  showgap: true,
  gapcolor: 'grey',
  gapcolorscale: null,
  gapopacity: null,
  groupbars: false,
  showconsensus: true,
  // Layout
  tilewidth: 16,
  tileheight: 16,
  numtiles: null,
  overview: 'heatmap',
  scrollskip: 10,
  tickstart: null,
  ticksteps: null,
  // Other
  width: null,
  height: 900,
  sequenceIds: null
};
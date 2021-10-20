"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AlignmentChart = _interopRequireDefault(require("./AlignmentChart"));

var _Components = require("./Components");

var _charting = require("./charting");

var _options = require("./options");

var _excluded = ["data", "colorscale", "overview", "showconservation", "showgap", "showlabel", "showid", "showconsensus"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var AlignmentViewer = /*#__PURE__*/function (_PureComponent) {
  _inherits(AlignmentViewer, _PureComponent);

  var _super = _createSuper(AlignmentViewer);

  function AlignmentViewer(props) {
    var _this;

    _classCallCheck(this, AlignmentViewer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (key) {
      return function (event) {
        _this.setState(_defineProperty({}, key, event));
      };
    });

    _this.state = {
      overview: {
        value: 'heatmap',
        label: 'Heatmap overview'
      },
      colorscale: {
        value: 'clustal',
        label: 'Clustal'
      },
      visualizations: [{
        value: 'showconservation',
        label: 'Show conservation weights'
      }, {
        value: 'showgap',
        label: 'Show gap weights'
      }, {
        value: 'showlabel',
        label: 'Show labels'
      }, {
        value: 'showid',
        label: 'Show ID'
      }, {
        value: 'showconsensus',
        label: 'Show consensus'
      }]
    };
    return _this;
  }

  _createClass(AlignmentViewer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          precolorscale = _this$props.colorscale,
          preoverview = _this$props.overview,
          preshowconservation = _this$props.showconservation,
          preshowgap = _this$props.showgap,
          preshowlabel = _this$props.showlabel,
          preshowid = _this$props.showid,
          preshowconsensus = _this$props.showconsensus,
          other = _objectWithoutProperties(_this$props, _excluded);

      var _this$state = this.state,
          colorscale = _this$state.colorscale,
          overview = _this$state.overview,
          visualizations = _this$state.visualizations; // Parse state

      var colorscaleVal = colorscale.value;
      var overviewVal = overview.value;
      var visualizationsVal = visualizations.map(function (visualization) {
        return visualization.value;
      });

      var _getVisualizations = (0, _charting.getVisualizations)(visualizationsVal),
          showconservation = _getVisualizations.showconservation,
          showgap = _getVisualizations.showgap,
          showlabel = _getVisualizations.showlabel,
          showid = _getVisualizations.showid,
          showconsensus = _getVisualizations.showconsensus;

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Components.DropdownSelect, {
        outerStyle: {
          width: '25%'
        },
        caption: 'Select colorscale',
        value: colorscale,
        onChange: this.handleSelect('colorscale'),
        options: _options.COLORSCALE_OPTIONS
      }), /*#__PURE__*/_react["default"].createElement(_Components.DropdownSelect, {
        outerStyle: {
          width: '25%'
        },
        caption: 'Select overview',
        value: overview,
        onChange: this.handleSelect('overview'),
        options: _options.OVERVIEW_OPTIONS
      }), /*#__PURE__*/_react["default"].createElement(_Components.DropdownSelect, {
        outerStyle: {
          width: '75%'
        },
        caption: 'Toggle visualizations',
        value: visualizations,
        onChange: this.handleSelect('visualizations'),
        options: _options.VISUALIZATION_OPTIONS,
        isMulti: true
      })), /*#__PURE__*/_react["default"].createElement(_AlignmentChart["default"], _extends({
        data: data,
        colorscale: colorscaleVal,
        overview: overviewVal,
        showconservation: showconservation,
        showgap: showgap,
        showlabel: showlabel,
        showid: showid,
        showconsensus: showconsensus
      }, other)));
    }
  }]);

  return AlignmentViewer;
}(_react.PureComponent);

exports["default"] = AlignmentViewer;
AlignmentViewer.propTypes = {
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
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
};
AlignmentViewer.defaultProps = {
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
  height: 900
};
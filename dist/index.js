"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("./helpers");

var _constants = require("./constants");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Picture =
  /*#__PURE__*/
  (function(_React$PureComponent) {
    _inheritsLoose(Picture, _React$PureComponent);

    function Picture(props) {
      var _this;

      _this = _React$PureComponent.call(this, props) || this;

      _defineProperty(
        _assertThisInitialized(_this),
        "_checkWebpSupport",
        function() {
          _this.setState({
            isWebpSupported:
              window.__WEBPSUPPORT__ ||
              (document.body &&
                document.body.classList.contains("webp-support"))
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), "_sources", function() {
        var isWebpSupported = _this.state.isWebpSupported;
        var _this$props = _this.props,
          name = _this$props.name,
          path = _this$props.path,
          type = _this$props.type,
          pixelDensity = _this$props.pixelDensity,
          extraResolutions = _this$props.extraResolutions;
        var sourcesArr = [];
        var responsiveSourcesArray =
          (extraResolutions && Object.keys(extraResolutions)) || [];

        var configGenerator = function configGenerator(key) {
          return {
            name: name,
            path: path,
            pixelDensity: pixelDensity,
            isWebpSupported: isWebpSupported,
            mediaBreakpoint: extraResolutions[key],
            layout: key,
            type: type
          };
        };

        if (responsiveSourcesArray.length > 0) {
          responsiveSourcesArray.forEach(function(key) {
            var configuration = configGenerator(key);
            sourcesArr.push((0, _helpers.sourcesGenerator)(configuration));
          });
        } else {
          var configuration = configGenerator(responsiveSourcesArray[0]);
          sourcesArr.push((0, _helpers.sourcesGenerator)(configuration));
        }

        return sourcesArr;
      });

      _defineProperty(_assertThisInitialized(_this), "_img", function() {
        var _this$props2 = _this.props,
          classes = _this$props2.classes,
          alt = _this$props2.alt,
          name = _this$props2.name,
          path = _this$props2.path,
          type = _this$props2.type,
          pixelDensity = _this$props2.pixelDensity;

        var mainSrcSet = function mainSrcSet() {
          return (0, _helpers.srcIterator)({
            name: name,
            path: path,
            pixelDensity: pixelDensity,
            type: type,
            isMain: true
          });
        };

        var mainSrc = function mainSrc() {
          return (0, _helpers.srcCreator)({
            name: name,
            path: path,
            type: type,
            srcWithPixelsPostfic: false
          });
        };

        return _react.default.createElement("img", {
          alt: alt,
          className: classes.img,
          src: mainSrc(),
          srcSet: mainSrcSet()
        });
      });

      _this.state = {
        isWebpSupported: false
      };
      return _this;
    }

    var _proto = Picture.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._checkWebpSupport();
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
        classes = _this$props3.classes,
        path = _this$props3.path,
        name = _this$props3.name,
        type = _this$props3.type,
        pixelDensity = _this$props3.pixelDensity;

      if (!path || !pixelDensity || !name || !type) {
        console.error(
          "REACT-PICTURE ERROR - YOUR MUST PROVIDE THE PIXELDENSITY, NAME, PATH AND TYPE OF THE IMAGES FIRST!"
        );
        return null;
      }

      return _react.default.createElement(
        "picture",
        {
          className: classes.picture
        },
        this._sources(),
        this._img()
      );
    };

    return Picture;
  })(_react.default.PureComponent);

_defineProperty(Picture, "defaultProps", {
  alt: "",
  type: "",
  path: "",
  name: "",
  pixelDensity: _constants.DESKTOP_PIXEL_DESTINY,
  extraResolutions: {
    desktop: "min-width: 1001px",
    tablet: "max-width: 1000px",
    mobile: "max-width: 600px"
  },
  classes: {
    picture: "",
    img: ""
  }
});

var _default = Picture;
exports.default = _default;

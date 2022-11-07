
import React from 'react';
const { useRef, useState, useCallback, useEffect, useLayoutEffect, useMemo } = React;

import { debounce, throttle } from 'lodash-es';

function useLatest(value) {
  var ref = useRef(value);
  ref.current = value;
  return ref;
}

function useReactive() {}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function useUpdate() {
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    var setState = _useState2[1];
  return useCallback(function () {
    return setState({});
  }, []);
}

function tryOnMounted(fn) {
  useEffect(function () {
    fn === null || fn === void 0 ? void 0 : fn();
  }, []);
}

function tryOnUnmounted(fn) {
  var ref = useRef(fn);
  ref.current = fn;
  useEffect(function () {
    return function () {
      fn === null || fn === void 0 ? void 0 : fn();
    };
  }, []);
}

function useMounted() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMounted = _useState2[0],
    update = _useState2[1];
  tryOnMounted(function () {
    update(true);
  });
  return isMounted;
}

function useSupported(callback) {
  var isSupported = useRef(false);
  var update = useCallback(function () {
    return isSupported.current = Boolean(callback());
  }, [callback]);
  update();
  tryOnMounted(update);
  return isSupported.current;
}

function depsAreSame(deps, oldDeps) {
  if (oldDeps === deps) return true;
  for (var i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}

function useDebounceFn(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fnRef = useLatest(fn);
  var debounced = useCallback(debounce(function () {
    return fnRef.current.apply(fnRef, arguments);
  }, wait, options), []);
  tryOnUnmounted(debounced.cancel);
  return debounced;
}

function useEventHook() {
  var fns = [];
  var _off = function off(fn) {
    var index = fns.indexOf(fn);
    if (index !== -1) fns.splice(index, 1);
  };
  var on = function on(fn) {
    fns.push(fn);
    return {
      off: function off() {
        return _off(fn);
      }
    };
  };
  var trigger = function trigger(param) {
    fns.forEach(function (fn) {
      return fn(param);
    });
  };
  return {
    on: on,
    off: _off,
    trigger: trigger
  };
}

function useThrottleFn(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var trailing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var leading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var fnRef = useLatest(fn);
  var throttled = useCallback(throttle(function () {
    return fnRef.current.apply(fnRef, arguments);
  }, wait, {
    trailing: trailing,
    leading: leading
  }), []);
  tryOnUnmounted(throttled.cancel);
  return throttled;
}

function bypassFilter() {
  return function (invoke) {
    return invoke;
  };
}
function debounceFilter(ms) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (invoke) {
    return useDebounceFn(invoke, typeof ms === "number" ? ms : ms.current, options);
  };
}
function throttleFilter(ms) {
  var trailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (invoke) {
    return useThrottleFn(invoke, typeof ms === "number" ? ms : ms.current, trailing, leading);
  };
}

var noop = function noop() {};

function watchRef(source, callback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$immediate = options.immediate,
    immediate = _options$immediate === void 0 ? false : _options$immediate,
    _options$deps = options.deps,
    deps = _options$deps === void 0 ? [] : _options$deps;
  var stopRef = useRef(false);
  var initRef = useRef(false);
  var oldSourceRef = useRef(source.current);
  var oldDepsRef = useRef([]);
  var exec = function exec() {
    callback(source.current, oldSourceRef.current);
    oldSourceRef.current = source.current;
    oldDepsRef.current = deps;
    initRef.current = true;
  };
  immediate && !initRef.current && exec();
  useLayoutEffect(function () {
    if (stopRef.current) return;
    if (depsAreSame([source.current], [oldSourceRef.current]) && depsAreSame(deps, oldDepsRef.current)) return;
    exec();
  });
  return function () {
    stopRef.current = true;
  };
}

function watchState(source, callback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$immediate = options.immediate,
    immediate = _options$immediate === void 0 ? false : _options$immediate,
    _options$eventFilter = options.eventFilter,
    eventFilter = _options$eventFilter === void 0 ? bypassFilter() : _options$eventFilter;
  var oldRef = useRef(source);
  var initRef = useRef(false);
  var stopRef = useRef(false);
  var effectCallback = function effectCallback() {
    var exec = function exec() {
      return callback(source, oldRef.current);
    };
    if (stopRef.current) return;
    if (!initRef.current) {
      initRef.current = true;
      immediate && exec();
    } else {
      exec();
    }
    oldRef.current = source;
  };
  useEffect(eventFilter(effectCallback), Array.isArray(source) ? source : [source]);
  return {
    pause: function pause() {
      stopRef.current = true;
    },
    resume: function resume() {
      stopRef.current = false;
    }
  };
}

function useEventListener() {
  var argsOffset = typeof (arguments.length <= 0 ? undefined : arguments[0]) !== "string";
  var observeTarget = argsOffset ? (arguments.length <= 0 ? undefined : arguments[0]) && "current" in (arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : useRef(arguments.length <= 0 ? undefined : arguments[0]) : useRef(window);
  var event = +argsOffset < 0 || arguments.length <= +argsOffset ? undefined : arguments[+argsOffset];
  var listenerRef = useLatest(+argsOffset + 1 < 0 || arguments.length <= +argsOffset + 1 ? undefined : arguments[+argsOffset + 1]);
  var options = useRef(+argsOffset + 2 < 0 || arguments.length <= +argsOffset + 2 ? undefined : arguments[+argsOffset + 2]);
  var handler = useCallback(function (event2) {
    return listenerRef.current(event2);
  }, [listenerRef]);
  var _clear = noop;
  var stopWatch = watchRef(observeTarget, function (el) {
    _clear();
    if (el) {
      el.addEventListener(event, handler, options.current);
      _clear = function clear() {
        el.removeEventListener(event, handler, options.current);
        _clear = noop;
      };
    }
  }, {
    immediate: true,
    deps: [event, options]
  });
  var stop = function stop() {
    _clear();
    stopWatch();
  };
  tryOnUnmounted(stop);
  return stop;
}

function useResizeObserver(target, callback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var observeTarget = target && "current" in target ? target : useRef(target);
  var ob = null;
  var isSupported = useSupported(function () {
    return window && "ResizeObserver" in window;
  });
  var clear = function clear() {
    if (ob) {
      ob.disconnect();
      ob = null;
    }
  };
  var stopWatch = watchRef(observeTarget, function (el) {
    clear();
    if (el) {
      ob = new ResizeObserver(callback);
      ob.observe(el, options);
    }
  }, {
    immediate: true
  });
  var stop = function stop() {
    clear();
    stopWatch();
  };
  tryOnUnmounted(stop);
  return {
    isSupported: isSupported,
    stop: stop
  };
}

function useElementBounding(target) {
  var _useState = useState({
      width: NaN,
      height: NaN,
      top: NaN,
      right: NaN,
      bottom: NaN,
      left: NaN,
      x: NaN,
      y: NaN
    }),
    _useState2 = _slicedToArray(_useState, 2),
    bounding = _useState2[0],
    setBounding = _useState2[1];
  var update = function update() {
    var el = target && "current" in target ? target.current : target;
    if (el) {
      var _el$getBoundingClient = el.getBoundingClientRect(),
        width = _el$getBoundingClient.width,
        height = _el$getBoundingClient.height,
        top = _el$getBoundingClient.top,
        right = _el$getBoundingClient.right,
        bottom = _el$getBoundingClient.bottom,
        left = _el$getBoundingClient.left,
        x = _el$getBoundingClient.x,
        y = _el$getBoundingClient.y;
      setBounding({
        width: width,
        height: height,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        x: x,
        y: y
      });
    }
  };
  useResizeObserver(target, update);
  useEventListener("scroll", update, {
    passive: true
  });
  useEventListener("resize", update, {
    passive: true
  });
  return bounding;
}

function useElementSize(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$box = options.box,
    box = _options$box === void 0 ? "content-box" : _options$box;
  var _useState = useState({
      width: NaN,
      height: NaN
    }),
    _useState2 = _slicedToArray(_useState, 2),
    size = _useState2[0],
    setSize = _useState2[1];
  useResizeObserver(target, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      entry = _ref2[0];
    var boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
    if (boxSize) {
      setSize({
        width: boxSize.reduce(function (acc, _ref3) {
          var inlineSize = _ref3.inlineSize;
          return acc + inlineSize;
        }, 0),
        height: boxSize.reduce(function (acc, _ref4) {
          var blockSize = _ref4.blockSize;
          return acc + blockSize;
        }, 0)
      });
    } else {
      var _entry$contentRect = entry.contentRect,
        width = _entry$contentRect.width,
        height = _entry$contentRect.height;
      setSize({
        width: width,
        height: height
      });
    }
  }, options);
  return size;
}

function useDeviceOrientation() {
  var _useState = useState({
      isAbsolute: false,
      alpha: null,
      beta: null,
      gamma: null
    }),
    _useState2 = _slicedToArray(_useState, 2),
    orientationState = _useState2[0],
    setOrientationState = _useState2[1];
  var isSupported = useSupported(function () {
    return window && "DeviceOrientationEvent" in window;
  });
  if (isSupported) {
    useEventListener("deviceorientation", function (event) {
      var absolute = event.absolute,
        alpha = event.alpha,
        beta = event.beta,
        gamma = event.gamma;
      setOrientationState({
        isAbsolute: absolute,
        alpha: alpha,
        beta: beta,
        gamma: gamma
      });
    });
  }
  return _objectSpread2({
    isSupported: isSupported
  }, orientationState);
}

function useMouse() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$type = options.type,
    type = _options$type === void 0 ? "page" : _options$type,
    _options$touch = options.touch,
    touch = _options$touch === void 0 ? true : _options$touch,
    _options$eventFilter = options.eventFilter,
    eventFilter = _options$eventFilter === void 0 ? bypassFilter() : _options$eventFilter,
    _options$initialValue = options.initialValue,
    initialValue = _options$initialValue === void 0 ? {
      x: NaN,
      y: NaN
    } : _options$initialValue;
  var _useState = useState({
      x: initialValue.x,
      y: initialValue.y
    }),
    _useState2 = _slicedToArray(_useState, 2),
    cursor = _useState2[0],
    setCursor = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    sourceType = _useState4[0],
    setSourceType = _useState4[1];
  var mouseEvent = function mouseEvent(event) {
    if (type === "page") {
      var x = event.pageX,
        y = event.pageY;
      setCursor({
        x: x,
        y: y
      });
    } else if (type === "client") {
      var _x = event.clientX,
        _y = event.clientY;
      setCursor({
        x: _x,
        y: _y
      });
    }
    setSourceType("mouse");
  };
  var touchEvent = function touchEvent(event) {
    if (event.touches.length > 0) {
      var touch2 = event.touches[0];
      if (type === "page") {
        var x = touch2.pageX,
          y = touch2.pageY;
        setCursor({
          x: x,
          y: y
        });
      } else if (type === "client") {
        var _x2 = touch2.clientX,
          _y2 = touch2.clientY;
        setCursor({
          x: _x2,
          y: _y2
        });
      }
      setSourceType("touch");
    }
  };
  useEventListener("mousemove", eventFilter(mouseEvent), {
    passive: true
  });
  useEventListener("dragover", eventFilter(mouseEvent), {
    passive: true
  });
  touch && useEventListener("touchmove", eventFilter(touchEvent), {
    passive: true
  });
  return _objectSpread2(_objectSpread2({}, cursor), {}, {
    sourceType: sourceType
  });
}

function useParallax(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$deviceOrient = options.deviceOrientationTiltAdjust,
    deviceOrientationTiltAdjust = _options$deviceOrient === void 0 ? function (i) {
      return i;
    } : _options$deviceOrient,
    _options$deviceOrient2 = options.deviceOrientationRollAdjust,
    deviceOrientationRollAdjust = _options$deviceOrient2 === void 0 ? function (i) {
      return i;
    } : _options$deviceOrient2,
    _options$mouseTiltAdj = options.mouseTiltAdjust,
    mouseTiltAdjust = _options$mouseTiltAdj === void 0 ? function (i) {
      return i;
    } : _options$mouseTiltAdj,
    _options$mouseRollAdj = options.mouseRollAdjust,
    mouseRollAdjust = _options$mouseRollAdj === void 0 ? function (i) {
      return i;
    } : _options$mouseRollAdj;
  var _useDeviceOrientation = useDeviceOrientation(),
    isSupported = _useDeviceOrientation.isSupported,
    alpha = _useDeviceOrientation.alpha,
    gamma = _useDeviceOrientation.gamma,
    beta = _useDeviceOrientation.beta;
  var _useElementSize = useElementSize(target),
    width = _useElementSize.width,
    height = _useElementSize.height;
  var _useMouseInElement = useMouseInElement(target),
    x = _useMouseInElement.x,
    y = _useMouseInElement.y;
  var source = useMemo(function () {
    if (isSupported && (alpha !== null && alpha !== 0 || gamma !== null && gamma !== 0)) return "deviceOrientation";
    return "mouse";
  }, [isSupported, alpha, gamma]);
  var roll = useMemo(function () {
    if (source === "deviceOrientation") {
      return deviceOrientationRollAdjust(-beta / 90);
    } else {
      return mouseRollAdjust(-(y - height / 2) / height);
    }
  }, [source, beta, y, height, deviceOrientationRollAdjust, mouseRollAdjust]);
  var tilt = useMemo(function () {
    if (source === "deviceOrientation") {
      return deviceOrientationTiltAdjust(gamma / 90);
    } else {
      return mouseTiltAdjust((x - width / 2) / width);
    }
  }, [source, gamma, x, width, deviceOrientationTiltAdjust, mouseTiltAdjust]);
  return {
    roll: roll,
    tilt: tilt,
    source: source
  };
}

function useMouseInElement(target) {
  var _useMouse = useMouse(),
    x = _useMouse.x,
    y = _useMouse.y;
  var _useElementBounding = useElementBounding(target),
    top = _useElementBounding.top,
    left = _useElementBounding.left,
    width = _useElementBounding.width,
    height = _useElementBounding.height;
  var elementX = useMemo(function () {
    return x - left;
  }, [x, left]);
  var elementY = useMemo(function () {
    return y - top;
  }, [y, top]);
  var isOutside = useMemo(function () {
    return width === 0 || height === 0 || elementX < 0 || elementY < 0 || elementX > width || elementY > height || isNaN(elementX) || isNaN(elementY);
  }, [width, height, elementX, elementY]);
  return {
    x: elementX,
    y: elementY,
    isOutside: isOutside
  };
}

function useMutationObserver(target, callback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var observeTarget = target && "current" in target ? target : useRef(target);
  var ob = null;
  var isSupported = useSupported(function () {
    return window && "MutationObserver" in window;
  });
  var clear = function clear() {
    if (ob) {
      ob.disconnect();
      ob = null;
    }
  };
  var stopWatch = watchRef(observeTarget, function (el) {
    clear();
    if (el) {
      ob = new MutationObserver(callback);
      ob.observe(el, options);
    }
  }, {
    immediate: true
  });
  var stop = function stop() {
    clear();
    stopWatch();
  };
  tryOnUnmounted(stop);
  return {
    isSupported: isSupported,
    stop: stop
  };
}

function useWindowSize() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$initialWidth = options.initialWidth,
    initialWidth = _options$initialWidth === void 0 ? NaN : _options$initialWidth,
    _options$initialHeigh = options.initialHeight,
    initialHeight = _options$initialHeigh === void 0 ? NaN : _options$initialHeigh,
    _options$listenOrient = options.listenOrientation,
    listenOrientation = _options$listenOrient === void 0 ? true : _options$listenOrient,
    _options$includeScrol = options.includeScrollbar,
    includeScrollbar = _options$includeScrol === void 0 ? true : _options$includeScrol;
  var _useState = useState({
      width: initialWidth,
      height: initialHeight
    }),
    _useState2 = _slicedToArray(_useState, 2),
    size = _useState2[0],
    setSize = _useState2[1];
  var update = function update() {
    if (window) {
      setSize({
        width: includeScrollbar ? window.innerWidth : window.document.documentElement.clientWidth,
        height: includeScrollbar ? window.innerHeight : window.document.documentElement.clientHeight
      });
    }
  };
  useEventListener("resize", update, {
    passive: true
  });
  listenOrientation && useEventListener("orientationchange", update, {
    passive: true
  });
  tryOnMounted(update);
  return size;
}

function useTitle() {
  var initialTitle = document.title;
  var options = {};
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    if (typeof args[0] === "string") {
      initialTitle = args[0];
    } else {
      options = args[0];
    }
  } else if (args.length === 2) {
    initialTitle = args[0];
    options = args[1];
  }
  var _options = options,
    _options$observe = _options.observe,
    observe = _options$observe === void 0 ? false : _options$observe;
  var _useState = useState(initialTitle),
    _useState2 = _slicedToArray(_useState, 2),
    title = _useState2[0],
    setTitle = _useState2[1];
  watchState(title, function (val) {
    document.title = val;
  }, {
    immediate: true
  });
  if (observe && document) {
    var titleElement = useRef(document.head.querySelector("title"));
    useMutationObserver(titleElement, function () {
      if (document.title !== title) {
        setTitle(document.title);
      }
    }, {
      childList: true
    });
  }
  return {
    title: title,
    setTitle: setTitle
  };
}

export { bypassFilter, debounceFilter, depsAreSame, noop, throttleFilter, tryOnMounted, tryOnUnmounted, useDebounceFn, useDeviceOrientation, useElementBounding, useElementSize, useEventHook, useEventListener, useLatest, useMounted, useMouse, useMouseInElement, useMutationObserver, useParallax, useReactive, useResizeObserver, useSupported, useThrottleFn, useTitle, useUpdate, useWindowSize, watchRef, watchState };
//# sourceMappingURL=reactuse.js.map

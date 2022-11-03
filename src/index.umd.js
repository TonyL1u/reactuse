(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactUse = {}, global.react, global.reactRouterDom));
})(this, (function (exports, react, reactRouterDom) { 'use strict';

    function useLatest(value) {
      const ref = react.useRef(value);
      ref.current = value;
      return ref;
    }

    function tryOnMounted(fn) {
      react.useEffect(() => {
        fn?.();
      }, []);
    }

    function tryOnUnmounted(fn) {
      const ref = react.useRef(fn);
      ref.current = fn;
      react.useEffect(
        () => () => {
          fn?.();
        },
        []
      );
    }

    function useMounted() {
      const [isMounted, update] = react.useState(false);
      tryOnMounted(() => {
        update(true);
      });
      return isMounted;
    }

    function useSupported(callback) {
      const isSupported = react.useRef(false);
      const update = react.useCallback(() => isSupported.current = Boolean(callback()), [callback]);
      update();
      tryOnMounted(update);
      return isSupported.current;
    }

    function depsAreSame(deps, oldDeps) {
      if (oldDeps === deps)
        return true;
      for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i]))
          return false;
      }
      return true;
    }

    const noop = () => {
    };

    function watchRef(source, callback, options = {}) {
      const { immediate = false, deps = [] } = options;
      const stopRef = react.useRef(false);
      const initRef = react.useRef(false);
      const oldSourceRef = react.useRef(source.current);
      const oldDepsRef = react.useRef([]);
      const exec = () => {
        callback(source.current, oldSourceRef.current);
        oldSourceRef.current = source.current;
        oldDepsRef.current = deps;
        initRef.current = true;
      };
      immediate && !initRef.current && exec();
      react.useLayoutEffect(() => {
        if (stopRef.current)
          return;
        if (depsAreSame([source.current], [oldSourceRef.current]) && depsAreSame(deps, oldDepsRef.current))
          return;
        exec();
      });
      return () => {
        stopRef.current = true;
      };
    }

    function watchState(source, callback, options = {}) {
      const { immediate = false } = options;
      const oldRef = react.useRef(source);
      const initRef = react.useRef(false);
      const stopRef = react.useRef(false);
      react.useEffect(() => {
        const exec = () => callback(source, oldRef.current);
        if (stopRef.current)
          return;
        if (!initRef.current) {
          initRef.current = true;
          immediate && exec();
        } else {
          exec();
        }
        oldRef.current = source;
      }, [source]);
      return {
        pause() {
          stopRef.current = true;
        },
        resume() {
          stopRef.current = false;
        }
      };
    }

    function useEventListener(...args) {
      const argsOffset = typeof args[0] !== "string";
      const observeTarget = argsOffset ? args[0] && "current" in args[0] ? args[0] : react.useRef(args[0]) : react.useRef(window);
      const event = args[+argsOffset];
      const listenerRef = useLatest(args[+argsOffset + 1]);
      const options = react.useRef(args[+argsOffset + 2]);
      const handler = react.useCallback((event2) => listenerRef.current(event2), [listenerRef]);
      let clear = noop;
      const stopWatch = watchRef(
        observeTarget,
        (el) => {
          clear();
          if (el) {
            el.addEventListener(event, handler, options.current);
            clear = () => {
              el.removeEventListener(event, handler, options.current);
              clear = noop;
            };
          }
        },
        { immediate: true, deps: [event, options] }
      );
      const stop = () => {
        clear();
        stopWatch();
      };
      tryOnUnmounted(stop);
      return stop;
    }

    function useResizeObserver(target, callback, options = {}) {
      const observeTarget = target && "current" in target ? target : react.useRef(target);
      let ob = null;
      const isSupported = useSupported(() => window && "ResizeObserver" in window);
      const clear = () => {
        if (ob) {
          ob.disconnect();
          ob = null;
        }
      };
      const stopWatch = watchRef(
        observeTarget,
        (el) => {
          clear();
          if (el) {
            ob = new ResizeObserver(callback);
            ob.observe(el, options);
          }
        },
        { immediate: true }
      );
      const stop = () => {
        clear();
        stopWatch();
      };
      tryOnUnmounted(stop);
      return { isSupported, stop };
    }

    function useElementSize(target, options = {}) {
      const { box = "content-box" } = options;
      const [size, setSize] = react.useState({ width: NaN, height: NaN });
      useResizeObserver(
        target,
        ([entry]) => {
          const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
          if (boxSize) {
            setSize({
              width: boxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0),
              height: boxSize.reduce((acc, { blockSize }) => acc + blockSize, 0)
            });
          } else {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
          }
        },
        options
      );
      return size;
    }

    function useElementBounding(target) {
      const [bounding, setBounding] = react.useState({ width: NaN, height: NaN, top: NaN, right: NaN, bottom: NaN, left: NaN, x: NaN, y: NaN });
      const update = () => {
        const el = target && "current" in target ? target.current : target;
        if (el) {
          const { width, height, top, right, bottom, left, x, y } = el.getBoundingClientRect();
          setBounding({ width, height, top, right, bottom, left, x, y });
        }
      };
      useResizeObserver(target, update);
      useEventListener("scroll", update, { passive: true });
      useEventListener("resize", update, { passive: true });
      return bounding;
    }

    function useMutationObserver(target, callback, options = {}) {
      const observeTarget = target && "current" in target ? target : react.useRef(target);
      let ob = null;
      const isSupported = useSupported(() => window && "MutationObserver" in window);
      const clear = () => {
        if (ob) {
          ob.disconnect();
          ob = null;
        }
      };
      const stopWatch = watchRef(
        observeTarget,
        (el) => {
          clear();
          if (el) {
            ob = new MutationObserver(callback);
            ob.observe(el, options);
          }
        },
        {
          immediate: true
        }
      );
      const stop = () => {
        clear();
        stopWatch();
      };
      tryOnUnmounted(stop);
      return { isSupported, stop };
    }

    function useWindowSize(options = {}) {
      const { initialWidth = NaN, initialHeight = NaN, listenOrientation = true, includeScrollbar = true } = options;
      const [size, setSize] = react.useState({ width: initialWidth, height: initialHeight });
      const update = () => {
        if (window) {
          setSize({
            width: includeScrollbar ? window.innerWidth : window.document.documentElement.clientWidth,
            height: includeScrollbar ? window.innerHeight : window.document.documentElement.clientHeight
          });
        }
      };
      useEventListener("resize", update, { passive: true });
      listenOrientation && useEventListener("orientationchange", update, { passive: true });
      tryOnMounted(update);
      return size;
    }

    function useTitle(...args) {
      let initialTitle = document.title;
      let options = {};
      if (args.length === 1) {
        if (typeof args[0] === "string") {
          initialTitle = args[0];
        } else {
          options = args[0];
        }
      } else if (args.length === 2) {
        [initialTitle, options] = args;
      }
      const { observe = false } = options;
      const [title, setTitle] = react.useState(initialTitle);
      watchState(
        title,
        (val) => {
          document.title = val;
        },
        { immediate: true }
      );
      if (observe && document) {
        const titleElement = react.useRef(document.head.querySelector("title"));
        useMutationObserver(
          titleElement,
          () => {
            if (document.title !== title) {
              setTitle(document.title);
            }
          },
          { childList: true }
        );
      }
      return { title, setTitle };
    }

    function useEventHook() {
      const fns = [];
      const off = (fn) => {
        const index = fns.indexOf(fn);
        if (index !== -1)
          fns.splice(index, 1);
      };
      const on = (fn) => {
        fns.push(fn);
        return {
          off: () => off(fn)
        };
      };
      const trigger = (param) => {
        fns.forEach((fn) => fn(param));
      };
      return { on, off, trigger };
    }

    function useRouter() {
      const location = reactRouterDom.useLocation();
      const hooksMap = /* @__PURE__ */ new Map();
      const createChangeHook = (key) => {
        if (!hooksMap.get(key)) {
          const hook = useEventHook();
          hooksMap.set(key, hook);
          return hook;
        }
        return hooksMap.get(key);
      };
      watchState(location, (to, from) => {
        for (const [key, hook] of hooksMap) {
          if (to[key] !== from[key]) {
            hook?.trigger({ [key]: to[key], location });
          }
        }
      });
      tryOnUnmounted(() => {
        hooksMap.clear();
      });
      return {
        onLocationChange(key, callback, options = {}) {
          const { immediately = false } = options;
          const { on, trigger } = createChangeHook(key);
          const { off } = on(callback);
          tryOnMounted(() => {
            immediately && trigger({ [key]: location[key], location });
          });
          tryOnUnmounted(off);
          return off;
        }
      };
    }

    function useMouse(options = {}) {
      const { type = "page", touch = true, eventFilter, initialValue = { x: NaN, y: NaN } } = options;
      const [cursor, setCursor] = react.useState({ x: initialValue.x, y: initialValue.y });
      const [sourceType, setSourceType] = react.useState(null);
      const mouseHandlerWrapper = react.useCallback((event) => eventFilter === void 0 ? mouseEvent(event) : eventFilter(() => mouseEvent(event), {}), [type, eventFilter]);
      const touchHandleWrapper = react.useCallback((event) => eventFilter === void 0 ? touchEvent(event) : eventFilter(() => touchEvent(event), {}), [type, eventFilter]);
      const mouseEvent = (event) => {
        if (type === "page") {
          const { pageX: x, pageY: y } = event;
          setCursor({ x, y });
        } else if (type === "client") {
          const { clientX: x, clientY: y } = event;
          setCursor({ x, y });
        }
        setSourceType("mouse");
      };
      const touchEvent = (event) => {
        if (event.touches.length > 0) {
          const touch2 = event.touches[0];
          if (type === "page") {
            const { pageX: x, pageY: y } = touch2;
            setCursor({ x, y });
          } else if (type === "client") {
            const { clientX: x, clientY: y } = touch2;
            setCursor({ x, y });
          }
          setSourceType("touch");
        }
      };
      useEventListener("mousemove", mouseHandlerWrapper, { passive: true });
      useEventListener("dragover", mouseHandlerWrapper, { passive: true });
      touch && useEventListener("touchmove", touchHandleWrapper, { passive: true });
      return { ...cursor, sourceType };
    }

    exports.tryOnMounted = tryOnMounted;
    exports.tryOnUnmounted = tryOnUnmounted;
    exports.useElementBounding = useElementBounding;
    exports.useElementSize = useElementSize;
    exports.useEventHook = useEventHook;
    exports.useEventListener = useEventListener;
    exports.useMounted = useMounted;
    exports.useMouse = useMouse;
    exports.useMutationObserver = useMutationObserver;
    exports.useResizeObserver = useResizeObserver;
    exports.useRouter = useRouter;
    exports.useSupported = useSupported;
    exports.useTitle = useTitle;
    exports.useWindowSize = useWindowSize;
    exports.watchRef = watchRef;
    exports.watchState = watchState;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

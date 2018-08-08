(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.f7c = {})));
}(this, (function (exports) { 'use strict';

  function h(name, attributes) {
    var rest = [];
    var children = [];
    var length = arguments.length;

    while (length-- > 2) rest.push(arguments[length]);

    while (rest.length) {
      var node = rest.pop();
      if (node && node.pop) {
        for (length = node.length; length--; ) {
          rest.push(node[length]);
        }
      } else if (node != null && node !== true && node !== false) {
        children.push(node);
      }
    }

    return typeof name === "function"
      ? name(attributes || {}, children)
      : {
          nodeName: name,
          attributes: attributes || {},
          children: children,
          key: attributes && attributes.key
        }
  }

  function app(state, actions, view, container) {
    var map = [].map;
    var rootElement = (container && container.children[0]) || null;
    var oldNode = rootElement && recycleElement(rootElement);
    var lifecycle = [];
    var skipRender;
    var isRecycling = true;
    var globalState = clone(state);
    var wiredActions = wireStateToActions([], globalState, clone(actions));

    scheduleRender();

    return wiredActions

    function recycleElement(element) {
      return {
        nodeName: element.nodeName.toLowerCase(),
        attributes: {},
        children: map.call(element.childNodes, function(element) {
          return element.nodeType === 3 // Node.TEXT_NODE
            ? element.nodeValue
            : recycleElement(element)
        })
      }
    }

    function resolveNode(node) {
      return typeof node === "function"
        ? resolveNode(node(globalState, wiredActions))
        : node != null
          ? node
          : ""
    }

    function render() {
      skipRender = !skipRender;

      var node = resolveNode(view);

      if (container && !skipRender) {
        rootElement = patch(container, rootElement, oldNode, (oldNode = node));
      }

      isRecycling = false;

      while (lifecycle.length) lifecycle.pop()();
    }

    function scheduleRender() {
      if (!skipRender) {
        skipRender = true;
        setTimeout(render);
      }
    }

    function clone(target, source) {
      var out = {};

      for (var i in target) out[i] = target[i];
      for (var i in source) out[i] = source[i];

      return out
    }

    function setPartialState(path, value, source) {
      var target = {};
      if (path.length) {
        target[path[0]] =
          path.length > 1
            ? setPartialState(path.slice(1), value, source[path[0]])
            : value;
        return clone(source, target)
      }
      return value
    }

    function getPartialState(path, source) {
      var i = 0;
      while (i < path.length) {
        source = source[path[i++]];
      }
      return source
    }

    function wireStateToActions(path, state, actions) {
      for (var key in actions) {
        typeof actions[key] === "function"
          ? (function(key, action) {
              actions[key] = function(data) {
                var result = action(data);

                if (typeof result === "function") {
                  result = result(getPartialState(path, globalState), actions);
                }

                if (
                  result &&
                  result !== (state = getPartialState(path, globalState)) &&
                  !result.then // !isPromise
                ) {
                  scheduleRender(
                    (globalState = setPartialState(
                      path,
                      clone(state, result),
                      globalState
                    ))
                  );
                }

                return result
              };
            })(key, actions[key])
          : wireStateToActions(
              path.concat(key),
              (state[key] = clone(state[key])),
              (actions[key] = clone(actions[key]))
            );
      }

      return actions
    }

    function getKey(node) {
      return node ? node.key : null
    }

    function eventListener(event) {
      return event.currentTarget.events[event.type](event)
    }

    function updateAttribute(element, name, value, oldValue, isSvg) {
      if (name === "key") ; else if (name === "style") {
        for (var i in clone(oldValue, value)) {
          var style = value == null || value[i] == null ? "" : value[i];
          if (i[0] === "-") {
            element[name].setProperty(i, style);
          } else {
            element[name][i] = style;
          }
        }
      } else {
        if (name[0] === "o" && name[1] === "n") {
          name = name.slice(2);

          if (element.events) {
            if (!oldValue) oldValue = element.events[name];
          } else {
            element.events = {};
          }

          element.events[name] = value;

          if (value) {
            if (!oldValue) {
              element.addEventListener(name, eventListener);
            }
          } else {
            element.removeEventListener(name, eventListener);
          }
        } else if (name in element && name !== "list" && !isSvg) {
          element[name] = value == null ? "" : value;
        } else if (value != null && value !== false) {
          element.setAttribute(name, value);
        }

        if (value == null || value === false) {
          element.removeAttribute(name);
        }
      }
    }

    function createElement(node, isSvg) {
      var element =
        typeof node === "string" || typeof node === "number"
          ? document.createTextNode(node)
          : (isSvg = isSvg || node.nodeName === "svg")
            ? document.createElementNS(
                "http://www.w3.org/2000/svg",
                node.nodeName
              )
            : document.createElement(node.nodeName);

      var attributes = node.attributes;
      if (attributes) {
        if (attributes.oncreate) {
          lifecycle.push(function() {
            attributes.oncreate(element);
          });
        }

        for (var i = 0; i < node.children.length; i++) {
          element.appendChild(
            createElement(
              (node.children[i] = resolveNode(node.children[i])),
              isSvg
            )
          );
        }

        for (var name in attributes) {
          updateAttribute(element, name, attributes[name], null, isSvg);
        }
      }

      return element
    }

    function updateElement(element, oldAttributes, attributes, isSvg) {
      for (var name in clone(oldAttributes, attributes)) {
        if (
          attributes[name] !==
          (name === "value" || name === "checked"
            ? element[name]
            : oldAttributes[name])
        ) {
          updateAttribute(
            element,
            name,
            attributes[name],
            oldAttributes[name],
            isSvg
          );
        }
      }

      var cb = isRecycling ? attributes.oncreate : attributes.onupdate;
      if (cb) {
        lifecycle.push(function() {
          cb(element, oldAttributes);
        });
      }
    }

    function removeChildren(element, node) {
      var attributes = node.attributes;
      if (attributes) {
        for (var i = 0; i < node.children.length; i++) {
          removeChildren(element.childNodes[i], node.children[i]);
        }

        if (attributes.ondestroy) {
          attributes.ondestroy(element);
        }
      }
      return element
    }

    function removeElement(parent, element, node) {
      function done() {
        parent.removeChild(removeChildren(element, node));
      }

      var cb = node.attributes && node.attributes.onremove;
      if (cb) {
        cb(element, done);
      } else {
        done();
      }
    }

    function patch(parent, element, oldNode, node, isSvg) {
      if (node === oldNode) ; else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
        var newElement = createElement(node, isSvg);
        parent.insertBefore(newElement, element);

        if (oldNode != null) {
          removeElement(parent, element, oldNode);
        }

        element = newElement;
      } else if (oldNode.nodeName == null) {
        element.nodeValue = node;
      } else {
        updateElement(
          element,
          oldNode.attributes,
          node.attributes,
          (isSvg = isSvg || node.nodeName === "svg")
        );

        var oldKeyed = {};
        var newKeyed = {};
        var oldElements = [];
        var oldChildren = oldNode.children;
        var children = node.children;

        for (var i = 0; i < oldChildren.length; i++) {
          oldElements[i] = element.childNodes[i];

          var oldKey = getKey(oldChildren[i]);
          if (oldKey != null) {
            oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
          }
        }

        var i = 0;
        var k = 0;

        while (k < children.length) {
          var oldKey = getKey(oldChildren[i]);
          var newKey = getKey((children[k] = resolveNode(children[k])));

          if (newKeyed[oldKey]) {
            i++;
            continue
          }

          if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
            if (oldKey == null) {
              removeElement(element, oldElements[i], oldChildren[i]);
            }
            i++;
            continue
          }

          if (newKey == null || isRecycling) {
            if (oldKey == null) {
              patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
              k++;
            }
            i++;
          } else {
            var keyedNode = oldKeyed[newKey] || [];

            if (oldKey === newKey) {
              patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
              i++;
            } else if (keyedNode[0]) {
              patch(
                element,
                element.insertBefore(keyedNode[0], oldElements[i]),
                keyedNode[1],
                children[k],
                isSvg
              );
            } else {
              patch(element, oldElements[i], null, children[k], isSvg);
            }

            newKeyed[newKey] = children[k];
            k++;
          }
        }

        while (i < oldChildren.length) {
          if (getKey(oldChildren[i]) == null) {
            removeElement(element, oldElements[i], oldChildren[i]);
          }
          i++;
        }

        for (var i in oldKeyed) {
          if (!newKeyed[i]) {
            removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
          }
        }
      }
      return element
    }
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var classnames = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  /* global define */

  (function () {

  	var hasOwn = {}.hasOwnProperty;

  	function classNames () {
  		var classes = [];

  		for (var i = 0; i < arguments.length; i++) {
  			var arg = arguments[i];
  			if (!arg) continue;

  			var argType = typeof arg;

  			if (argType === 'string' || argType === 'number') {
  				classes.push(arg);
  			} else if (Array.isArray(arg) && arg.length) {
  				var inner = classNames.apply(null, arg);
  				if (inner) {
  					classes.push(inner);
  				}
  			} else if (argType === 'object') {
  				for (var key in arg) {
  					if (hasOwn.call(arg, key) && arg[key]) {
  						classes.push(key);
  					}
  				}
  			}
  		}

  		return classes.join(' ');
  	}

  	if (module.exports) {
  		classNames.default = classNames;
  		module.exports = classNames;
  	} else {
  		window.classNames = classNames;
  	}
  }());
  });

  /**
   * https://github.com/dojo/widget-core/blob/master/src/animations/cssTransitions.ts
   */

  var transitionEndName = '';
  var animationEndName = '';

  var requestAnimationFrame = window.requestAnimationFrame;

  function determineNames(element) {
    if ('WebkitTransition' in element.style) {
      transitionEndName = 'webkitTransitionEnd';
      animationEndName = 'webkitAnimationEnd';
    } else if ('transition' in element.style || 'MozTransition' in element.style) {
      transitionEndName = 'transitionend';
      animationEndName = 'animationend';
    } else {
      throw new Error('Your browser is not supported');
    }
  }

  function initialize(element) {
    if (animationEndName === '') {
      determineNames(element);
    }
  }

  function runAndCleanUp(element, startAnimation, finishAnimation) {
    initialize(element);

    var finished = false;

    var transitionEnd = function transitionEnd() {
      if (!finished) {
        finished = true;
        element.removeEventListener(transitionEndName, transitionEnd);
        element.removeEventListener(animationEndName, transitionEnd);

        finishAnimation();
      }
    };

    startAnimation();

    element.addEventListener(animationEndName, transitionEnd);
    element.addEventListener(transitionEndName, transitionEnd);
  }

  function runExit(node, exitAnimationActive, exitAnimation, removeNode, afterExit) {
    var activeClass = exitAnimationActive || exitAnimation + '-active';

    runAndCleanUp(node, function () {
      node.classList.add(exitAnimation);

      requestAnimationFrame(function () {
        node.classList.add(activeClass);
      });
    }, function () {
      removeNode();
      if (afterExit) {
        afterExit(node);
      }
    });
  }

  function runEnter(node, enterAnimationActive, enterAnimation, afterEnter) {
    var activeClass = enterAnimationActive || enterAnimation + '-active';

    runAndCleanUp(node, function () {
      node.classList.add(enterAnimation);

      requestAnimationFrame(function () {
        // bug: add active-class in this frome won't perform transition as expected, but add in next frame will
        requestAnimationFrame(function () {
          node.classList.add(activeClass);
        });
      });
    }, function () {
      node.classList.remove(enterAnimation);
      node.classList.remove(activeClass);
      if (afterEnter) {
        afterEnter(node);
      }
    });
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  /**
   * @typedef {Object} TransitionProps
   * @prop {string} [enter]
   * @prop {string} [enterActive]
   * @prop {(el: HTMLElement) => void} [onEnter]
   * @prop {(el: HTMLElement) => void} [afterEnter]
   * @prop {string} [exit]
   * @prop {string} [exitActive]
   * @prop {(el: HTMLElement, removeNode: () => void) => void} [onExit]
   * @prop {(el: HTMLElement, removeNode: () => void) => void} [afterExit]
   *
   * @param {TransitionProps} props
   * @param {JSX.Element[]} children
   */
  function makeTransition(props, children) {
    var child = children[0];
    if (!child.attributes) {
      return child;
    }
    var attributes = child.attributes,
        rest = objectWithoutProperties(child, ['attributes']);


    return _extends({}, rest, {
      attributes: _extends({}, attributes, {
        oncreate: function oncreate(el) {
          transitionEnter(el, props, attributes);
        },
        onremove: function onremove(el, done) {
          transitionExit(el, props, attributes, done);
        }
      })
    });
  }

  function transitionEnter(el, props, attributes) {
    if (props.enter) {
      runEnter(el, props.enterActive, props.enter, props.afterEnter);
    }

    if (props.onEnter) {
      props.onEnter(el);
    }

    if (attributes.oncreate) {
      attributes.oncreate(el);
    }
  }

  function transitionExit(el, props, attributes, removeNode) {
    var directlyRemove = true;

    if (props.exit) {
      runExit(el, props.exitActive, props.exit, removeNode, props.afterExit);
      directlyRemove = false;
    }

    if (props.onExit) {
      props.onExit(el, removeNode);
      directlyRemove = false;
    }

    if (attributes.onremove) {
      attributes.onremove(el, removeNode);
      directlyRemove = false;
    }

    if (directlyRemove) {
      removeNode();
    }
  }

  var Transition = (function (props, children) {
    if (typeof children === 'function') {
      return function (state, actions) {
        return makeTransition(props, children(state, actions));
      };
    } else {
      return makeTransition(props, children);
    }
  });

  Transition.runAndCleanUp = runAndCleanUp;
  Transition.runEnter = runEnter;
  Transition.runExit = runExit;

  function install(_ref) {
    var state = _ref.state,
        actions = _ref.actions,
        view = _ref.view,
        api = _ref.api;

    var el = document.createElement('div');
    var appActions = app(state, actions, view, el);
    document.body.appendChild(el);

    return api(appActions);
  }

  function apiMixin(Component, apis) {
    var newComponent = Component;
    for (var name in apis) {
      newComponent[name] = apis[name];
    }

    return newComponent;
  }

  /**
   * 修改样式
   * @param {HTMLElement} el
   * @param {object<string>} obj
   */
  function css(el, obj) {
    for (var key in obj) {
      el.style[key] = obj[key];
    }
  }

  var requestAnimationFrame$1 = window.requestAnimationFrame;

  /**
   * Animation names
   */
  var ANIM_NAMES = {
    fadeIn: 'anim-fadein',
    fadeOut: 'anim-fadeout',
    slideIn: 'anim-slidein',
    slideOut: 'anim-slideOut',
    bounceIn: 'anim-bouncein',
    bounceOut: 'anim-bounceout'

    /**
     * Size element make it center
     * @param {HTMLElement} el
     */
  };function sizeEl(el, sizeTop, sizeLeft) {
    var size = {};

    if (sizeTop) {
      size['margin-top'] = el.offsetHeight / -2 + 'px';
    }

    if (sizeLeft) {
      size['margin-left'] = el.offsetWidth / -2 + 'px';
    }

    css(el, size);
  }

  // eslint-disable-next-line

  var TYPES = {
    modal: 'modal',
    preloader: 'preloader-indicator',
    popup: 'popup',
    picker: 'picker-modal'

    /**
     * @typedef {Object} OverlayProps
     * @prop {'modal' | 'preloader-indicator' | 'popup' | 'picker-modal'} [type='modal']
     * @prop {boolean} [notAnimated=false]
     * @prop {(e) => void} [onOverlayClick]
     * @prop {string} [key]
     * @prop {string} [overlayClass]
     * @prop {string} [enterClass='anim-fadein']
     * @prop {string} [exitClass='anim-fadeout']
     *
     * @param {OverlayProps} props
     */
  };var Overlay = function Overlay(props) {
    var _props$type = props.type,
        type = _props$type === undefined ? TYPES.modal : _props$type,
        notAnimated = props.notAnimated,
        onOverlayClick = props.onOverlayClick,
        key = props.key,
        overlayClass = props.overlayClass,
        _props$enterClass = props.enterClass,
        enterClass = _props$enterClass === undefined ? ANIM_NAMES.fadeIn : _props$enterClass,
        _props$exitClass = props.exitClass,
        exitClass = _props$exitClass === undefined ? ANIM_NAMES.fadeOut : _props$exitClass;


    var noAnim = notAnimated || type === TYPES.preloader;

    return h(
      Transition,
      {
        enter: !noAnim && enterClass,
        exit: !noAnim && exitClass
      },
      h('div', {
        key: key,
        'class': classnames(type + '-overlay', overlayClass),
        onclick: onOverlayClick
      })
    );
  };

  Overlay.TYPES = TYPES;

  // eslint-disable-next-line

  /**
   *
   * @param {HTMLElement} el
   */
  function sizeModal(el) {
    sizeEl(el, true);
  }

  /**
   * 按钮
   * @typedef {Object} DialogButtonProps
   * @prop {string} text
   * @prop {(e) => void} onclick
   * @prop {boolean} [bold=false]
   * 弹框
   * @typedef {Object} DialogProps
   * @prop {boolean} show
   * @prop {string} [wraperClass]
   * @prop {string} title
   * @prop {string} text
   * @prop {string} [afterText]
   * @prop {DialogButtonProps[]} [buttons=[]]
   * @prop {() => void} [onButtonsClick]
   * @prop {() => void} [onMaskClick]
   * @prop {boolean} [verticalButtons=false]
   * @prop {string} [enterClass='anim-bouncein']
   * @prop {string} [exitClass='anim-bouncout]
   * @prop {string} [wraperKey]
   *
   * @param {DialogProps} props
   */
  var Dialog = function Dialog(props) {
    var title = props.title,
        text = props.text,
        afterText = props.afterText,
        _props$buttons = props.buttons,
        buttons = _props$buttons === undefined ? [] : _props$buttons,
        onButtonsClick = props.onButtonsClick,
        onOverlayClick = props.onOverlayClick,
        verticalButtons = props.verticalButtons,
        show = props.show,
        _props$wraperClass = props.wraperClass,
        wraperClass = _props$wraperClass === undefined ? 'dialog-wraper' : _props$wraperClass,
        wraperKey = props.wraperKey,
        _props$enterClass = props.enterClass,
        enterClass = _props$enterClass === undefined ? ANIM_NAMES.bounceIn : _props$enterClass,
        _props$exitClass = props.exitClass,
        exitClass = _props$exitClass === undefined ? ANIM_NAMES.bounceOut : _props$exitClass;


    var buttonWraperCls = classnames('modal-buttons', {
      'modal-buttons-vertical': verticalButtons
    });

    return h(
      'div',
      { key: wraperKey, 'class': wraperClass },
      show && [h(Overlay, { onOverlayClick: onOverlayClick }), h(
        Transition,
        {
          enter: enterClass,
          exit: exitClass
        },
        h(
          'div',
          { 'class': 'modal', oncreate: sizeModal },
          h(
            'div',
            { 'class': 'modal-inner' },
            h(
              'div',
              { 'class': 'modal-title' },
              title
            ),
            h(
              'div',
              { 'class': 'modal-text' },
              text
            ),
            afterText
          ),
          h(
            'div',
            { 'class': buttonWraperCls, onclick: onButtonsClick },
            buttons.map(function (button) {
              return h(
                'span',
                {
                  'class': classnames('modal-button', { 'modal-button-bold': button.bold }),
                  onclick: button.onclick
                },
                button.text
              );
            })
          )
        )
      )]
    );
  };

  // eslint-disable-next-line

  var defaultState = {
    show: false,
    title: '',
    text: '',
    buttons: [],
    afterText: '',
    verticalButtons: false
  };

  var OPTIONS = {
    title: 'Message',
    okText: 'OK',
    cancleText: 'Cancle'
  };

  var setDefault = function setDefault(newOptions) {
    OPTIONS = _extends({}, OPTIONS, newOptions);
  };

  var actions = {
    alert: function alert(_ref) {
      var text = _ref.text,
          _ref$title = _ref.title,
          title = _ref$title === undefined ? OPTIONS.title : _ref$title,
          onOk = _ref.onOk;

      return {
        show: true,
        title: title,
        text: text,
        buttons: [{ text: OPTIONS.okText, onclick: onOk }]
      };
    },

    confirm: function confirm(_ref2) {
      var text = _ref2.text,
          _ref2$title = _ref2.title,
          title = _ref2$title === undefined ? OPTIONS.title : _ref2$title,
          onOk = _ref2.onOk,
          onCancel = _ref2.onCancel;

      return {
        show: true,
        title: title,
        text: text,
        buttons: [{ text: OPTIONS.cancleText, onclick: onCancel }, { text: OPTIONS.okText, onclick: onOk }]
      };
    },

    dialog: function dialog(_ref3) {
      var text = _ref3.text,
          _ref3$title = _ref3.title,
          title = _ref3$title === undefined ? OPTIONS.title : _ref3$title,
          buttons = _ref3.buttons;

      return {
        show: true,
        title: title,
        text: text,
        buttons: buttons
      };
    },

    open: function open(props) {
      return _extends({}, props, {
        show: true
      });
    },

    close: function close() {
      return defaultState;
    }
  };

  var view = function view(state, actions) {
    var onButtonsClick = state.onButtonsClick,
        rest = objectWithoutProperties(state, ['onButtonsClick']);


    return h(Dialog, _extends({}, rest, {
      onButtonsClick: onButtonsClick || actions.close
    }));
  };

  var api = function api(actions) {
    return {
      alert: function alert(text, title, onOk) {
        if (typeof title === 'function') {
          onOk = title;
          title = undefined;
        }

        actions.alert({ text: text, title: title, onOk: onOk });
        return actions.close;
      },

      confirm: function confirm(text, title, onOk, onCancel) {
        if (typeof title === 'function') {
          onCancel = onOk;
          onOk = title;
          title = undefined;
        }

        actions.confirm({ text: text, title: title, onOk: onOk, onCancel: onCancel });
        return actions.close;
      },

      action: function action(text, title, buttons) {
        if (Array.isArray(title)) {
          buttons = title;
          title = undefined;
        }

        actions.dialog({ text: text, title: title, buttons: buttons });
        return actions.close;
      },

      custom: function custom(props) {
        actions.open(props);
        return actions.close;
      },

      setDefault: setDefault
    };
  };

  var plugin = {
    state: defaultState,
    actions: actions,
    view: view,
    api: api
  };

  var apis = install(plugin);
  var Dialog$1 = apiMixin(Dialog, apis);

  // eslint-disable-next-line

  /**
   * @typedef {Object} PreloaderProps
   * @prop {boolean} [white]
   * @prop {string} [class]
   *
   * @param {PreloaderProps} props
   */
  var Preloader = function Preloader(props) {
    var white = props.white,
        rest = objectWithoutProperties(props, ['white']);


    return h('span', _extends({}, rest, { 'class': classnames('preloader', rest.class, { 'preloader-white': white }) }));
  };

  // eslint-disable-next-line

  /**
   * @typedef {Object} LoadingProps
   * @prop {boolean} show
   * @prop {string} [wraperClass='loading-wraper']
   * @prop {string} [wraperKey]
   *
   * @param {LoadingProps} props
   */
  var Loading = function Loading(props) {
    var show = props.show,
        _props$wraperClass = props.wraperClass,
        wraperClass = _props$wraperClass === undefined ? 'loading-wraper' : _props$wraperClass,
        wraperKey = props.wraperKey;


    return h(
      'div',
      { key: wraperKey, 'class': wraperClass },
      show && [h(Overlay, {
        type: Overlay.TYPES.preloader,
        notAnimated: true
      }), h(
        'div',
        { 'class': 'preloader-indicator-modal' },
        h(Preloader, { white: true })
      )]
    );
  };

  // eslint-disable-next-line

  var state = {
    show: false
  };

  var actions$1 = {
    loading: function loading(show) {
      return { show: show };
    }
  };

  var view$1 = function view(state, actions) {
    return h(Loading, { show: state.show });
  };

  var api$1 = function api(_ref) {
    var loading = _ref.loading;

    return {
      show: function show() {
        return loading(true);
      },
      hide: function hide() {
        return loading(false);
      }
    };
  };

  var plugin$1 = {
    state: state,
    actions: actions$1,
    view: view$1,
    api: api$1
  };

  var apis$1 = install(plugin$1);
  var Loading$1 = apiMixin(Loading, apis$1);

  // eslint-disable-next-line

  var WRAPER = 'toast-wraper';

  function sizeToast(el) {
    sizeEl(el, true, true);
  }

  /**
   * @typedef {Object} ToastProps
   * @prop {boolean} show
   * @prop {string} msg
   * @prop {Function} [onToastClick]
   * @prop {string} [toastClass]
   * @prop {string | false} [enterClass="anim-fadein"]
   * @prop {string | false} [exitClass="anim-fadeout"]
   * @prop {string} [wraperClass='toast-wraper']
   * @prop {string} [wraperKey]
   *
   * @param {ToastProps} props
   */
  var Toast = function Toast(props) {
    var show = props.show,
        msg = props.msg,
        toastClass = props.toastClass,
        onToastClick = props.onToastClick,
        _props$enterClass = props.enterClass,
        enterClass = _props$enterClass === undefined ? ANIM_NAMES.fadeIn : _props$enterClass,
        _props$exitClass = props.exitClass,
        exitClass = _props$exitClass === undefined ? ANIM_NAMES.fadeOut : _props$exitClass,
        _props$wraperClass = props.wraperClass,
        wraperClass = _props$wraperClass === undefined ? WRAPER : _props$wraperClass,
        wraperKey = props.wraperKey;


    return h(
      'div',
      { key: wraperKey, 'class': wraperClass },
      show && [h(Overlay, {
        type: Overlay.TYPES.preloader,
        notAnimated: true
      }), h(
        Transition,
        {
          enter: enterClass,
          exit: exitClass
        },
        h(
          'div',
          {
            'class': classnames('toast toast-transition', toastClass),
            onclick: onToastClick,
            oncreate: sizeToast
          },
          msg
        )
      )]
    );
  };

  // eslint-disable-next-line

  var defaultDuration = 1500;

  var defaultState$1 = {
    show: false,
    msg: '',
    duration: defaultDuration
  };

  var actions$2 = {
    toast: function toast(_ref) {
      var msg = _ref.msg,
          _ref$duration = _ref.duration,
          duration = _ref$duration === undefined ? defaultDuration : _ref$duration;
      return function (state, actions) {
        actions.set({ show: true, msg: msg, duration: duration });
        actions.scheduleClose();
      };
    },

    scheduleClose: function scheduleClose() {
      return function (state, actions) {
        setTimeout(function () {
          actions.set(defaultState$1);
        }, state.duration);
      };
    },

    set: function set(state) {
      return state;
    }
  };

  var view$2 = function view(state, actions) {
    return h(Toast, { show: state.show, msg: state.msg });
  };

  var api$2 = function api(_ref2) {
    var toast = _ref2.toast;

    return {
      text: function text(msg, duration) {
        return toast({ msg: msg, duration: duration });
      }
    };
  };

  var plugin$2 = {
    state: defaultState$1,
    actions: actions$2,
    view: view$2,
    api: api$2
  };

  var apis$2 = install(plugin$2);
  var Toast$1 = apiMixin(Toast, apis$2);

  exports.h = h;
  exports.app = app;
  exports.classnames = classnames;
  exports.Dialog = Dialog$1;
  exports.Loading = Loading$1;
  exports.Toast = Toast$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

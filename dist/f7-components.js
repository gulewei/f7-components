(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hyperapp')) :
	typeof define === 'function' && define.amd ? define(['exports', 'hyperapp'], factory) :
	(factory((global.F7Components = {}),global.hyperapp));
}(this, (function (exports,hyperapp) { 'use strict';

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
		} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
			// register as 'classnames', consistent with npm package name
			undefined('classnames', [], function () {
				return classNames;
			});
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

	function runExit(node, exitAnimationActive, exitAnimation, removeNode) {
	  var activeClass = exitAnimationActive || exitAnimation + '-active';

	  runAndCleanUp(node, function () {
	    node.classList.add(exitAnimation);

	    requestAnimationFrame(function () {
	      node.classList.add(activeClass);
	    });
	  }, function () {
	    removeNode();
	  });
	}

	function runEnter(node, enterAnimationActive, enterAnimation) {
	  var activeClass = enterAnimationActive || enterAnimation + '-active';

	  runAndCleanUp(node, function () {
	    // node.classList.add(enterAnimation)

	    requestAnimationFrame(function () {
	      node.classList.add(activeClass);
	    });
	  }, function () {
	    node.classList.remove(enterAnimation);
	    node.classList.remove(activeClass);
	  });
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty = function (obj, key, value) {
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
	};

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

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var toArray = function (arr) {
	  return Array.isArray(arr) ? arr : Array.from(arr);
	};

	/**
	 * @typedef {Object} CSSTransitionProps
	 * @prop {string} [enter]
	 * @prop {string} [enterActive]
	 * @prop {string} [exit]
	 * @prop {string} [exitActive]
	 *
	 * @param {CSSTransitionProps} props
	 * @param {JSX.Element[]} children
	 */
	var CSSTransition = function CSSTransition(props, children) {
	  var enter = props.enter,
	      _props$enterActive = props.enterActive,
	      enterActive = _props$enterActive === undefined ? enter + '-active' : _props$enterActive,
	      exit = props.exit,
	      _props$exitActive = props.exitActive,
	      exitActive = _props$exitActive === undefined ? exit + '-active' : _props$exitActive;


	  var child = children[0];

	  if (!child.attributes) {
	    return child;
	  }

	  var attr = child.attributes;
	  var replaceAttr = {};

	  if (enter) {
	    replaceAttr.class = classnames(attr.class, defineProperty({}, enter, enter));
	    replaceAttr.oncreate = function (el) {
	      if (enter) {
	        runEnter(el, enterActive, enter);
	      }
	      if (attr.oncreate) {
	        attr.oncreate(el);
	      }
	    };
	  }

	  if (exit) {
	    replaceAttr.onremove = function (el, done) {
	      if (exit) {
	        runExit(el, exitActive, exit, done);
	      }
	      if (attr.onremove) {
	        attr.onremove(el, function () {});
	      }
	    };
	  }

	  return _extends({}, child, {
	    attributes: _extends({}, attr, replaceAttr)
	  });
	};

	// eslint-disable-next-line no-unused-vars

	/**
	 * @typedef {Object} ButtonProps
	 * @prop {boolean} [fill=false]
	 * @prop {boolean} [big=false]
	 * @prop {boolean} [round=false]
	 * @prop {boolean} [disabled=false]
	 * @prop {string | JSX.Element} [text]
	 * @prop {(e) => void} [onclick]
	 * @prop {string} [class]
	 * @prop {string} [key]
	 *
	 * @param {ButtonProps} props
	 * @param {JSX.Element[]} children
	 */
	var index = (function (props, children) {
	  var fill = props.fill,
	      big = props.big,
	      round = props.round,
	      text = props.text,
	      restProps = objectWithoutProperties(props, ['fill', 'big', 'round', 'text']);


	  return hyperapp.h(
	    'a',
	    _extends({}, restProps, {
	      'class': classnames(restProps.class, 'hm-button', {
	        'hm-button-big': big,
	        'hm-button-fill': fill,
	        'hm-button-round': round
	      })
	    }),
	    text || children
	  );
	});

	// eslint-disable-next-line

	var Icon = function Icon(_ref) {
	  var name = _ref.name,
	      r = objectWithoutProperties(_ref, ['name']);

	  return hyperapp.h('i', _extends({}, r, { 'class': classnames('icon', 'icon-' + name, r.class) }));
	};

	var IconBack = hyperapp.h(Icon, { name: 'back' });

	var IconForward = hyperapp.h(Icon, { name: 'forward' });

	// eslint-disable-next-line

	/**
	 * List block
	 * @typedef {Object} ListProps
	 * @prop {boolean} [inset=false]
	 * @prop {string} [label]
	 * @prop {boolean} [useForm]
	 * @prop {boolean} [noHairlines]
	 * @prop {boolean} [noHairlinesBetween]
	 *
	 * @param {ListProps} props
	 * @param {JSX.Element[]} children
	 */
	var List = function List(props, children) {
	  var inset = props.inset,
	      label = props.label,
	      noHairlines = props.noHairlines,
	      noHairlinesBetween = props.noHairlinesBetween,
	      useForm = props.useForm,
	      rests = objectWithoutProperties(props, ['inset', 'label', 'noHairlines', 'noHairlinesBetween', 'useForm']);


	  var wraperCls = classnames(rests.class, 'list-block', {
	    inset: inset,
	    'no-hairlines': noHairlines,
	    'no-hairlines-between': noHairlinesBetween
	  });
	  var WraperEl = useForm ? 'form' : 'div'; // eslint-disable-line

	  return hyperapp.h(
	    WraperEl,
	    _extends({}, rests, { 'class': wraperCls }),
	    hyperapp.h(
	      'ul',
	      null,
	      children.map(function (child) {
	        return hyperapp.h(
	          'li',
	          { key: child.key },
	          child
	        );
	      })
	    ),
	    label && hyperapp.h(
	      'div',
	      { 'class': 'list-block-label' },
	      label
	    )
	  );
	};

	/**
	 * @typedef {Object} ItemWraperProps
	 * @prop {boolean} [isLink]
	 * @prop {boolean} [alignTop]
	 * @prop {boolean} [useLabel]
	 * @prop {JSX.Element} [contentStart]
	 * @prop {JSX.Element} [media]
	 * @prop {JSX.Element} [title]
	 * @prop {JSX.Element} [input]
	 * @prop {JSX.Element} [after]
	 * @prop {JSX.Element} [subTitle]
	 * @prop {JSX.Element} [text]
	 *
	 * @param {ItemWraperProps} props
	 * @param {JSX.Element[]} children
	 */
	var ListItem = function ListItem(props, children) {
	  var isLink = props.isLink,
	      alignTop = props.alignTop,
	      useLabel = props.useLabel,
	      contentStart = props.contentStart,
	      media = props.media,
	      _props$title = props.title,
	      title = _props$title === undefined ? children : _props$title,
	      input = props.input,
	      after = props.after,
	      subTitle = props.subTitle,
	      text = props.text,
	      wraperProps = objectWithoutProperties(props, ['isLink', 'alignTop', 'useLabel', 'contentStart', 'media', 'title', 'input', 'after', 'subTitle', 'text']);


	  var isMedia = !!(subTitle || text);

	  var wraperCls = classnames(wraperProps.class, 'item-content', {
	    'item-link': isLink,
	    'align-top': alignTop,
	    'media-item': isMedia
	  });
	  var WraperEl = useLabel ? 'label' : 'div'; // eslint-disable-line

	  return hyperapp.h(
	    WraperEl,
	    _extends({}, wraperProps, { 'class': wraperCls }),
	    contentStart,
	    media && hyperapp.h(
	      'div',
	      { key: 'media', 'class': 'item-media' },
	      media
	    ),
	    hyperapp.h(
	      'div',
	      { key: 'inner', 'class': 'item-inner' },
	      isMedia ? [hyperapp.h(
	        'div',
	        { key: 'row', 'class': 'item-title-row' },
	        renderTitle(title, input, after)
	      ), hyperapp.h(
	        'div',
	        { key: 'sub', 'class': 'item-subtitle' },
	        subTitle
	      ), text && hyperapp.h(
	        'div',
	        { key: 'text', 'class': 'item-text' },
	        text
	      )] : renderTitle(title, input, after)
	    )
	  );
	};
	var renderTitle = function renderTitle(title, input, after) {
	  return [hyperapp.h(
	    'div',
	    { key: 'title', 'class': classnames('item-title', { label: !!input }) },
	    title
	  ), input && hyperapp.h(
	    'div',
	    { 'class': 'item-input' },
	    input
	  ), hyperapp.h(
	    'div',
	    { key: 'after', 'class': 'item-after' },
	    after
	  )];
	};

	// eslint-disable-next-line

	var checkboxIcon = hyperapp.h(Icon, { name: 'form-checkbox' });

	/**
	 * @typedef {Object} CheckboxItemProps
	 * @prop {boolean} checked
	 * @prop {string} name
	 * @prop {string} value
	 * @prop {(e: Event) => void} onchange
	 * @prop {boolean} [disabled]
	 * @prop {boolean} [readonly]
	 * @prop {boolean} [required]
	 * @prop {JSX.Element} [media]
	 *
	 * @param {CheckboxItemProps} props
	 * @param {JSX.Element[]} children
	 */
	var CheckboxItem = function CheckboxItem(props, children) {
	  var checked = props.checked,
	      name = props.name,
	      value = props.value,
	      onchange = props.onchange,
	      disabled = props.disabled,
	      readonly = props.readonly,
	      required = props.required,
	      media = props.media,
	      itemProps = objectWithoutProperties(props, ['checked', 'name', 'value', 'onchange', 'disabled', 'readonly', 'required', 'media']);


	  return hyperapp.h(
	    ListItem,
	    _extends({}, itemProps, {
	      useLabel: true,
	      'class': classnames('label-checkbox', itemProps.class),
	      media: media || checkboxIcon,
	      contentStart: hyperapp.h('input', _extends({ checked: checked, name: name, value: value, onchange: onchange, disabled: disabled, readonly: readonly, required: required }, {
	        type: 'checkbox',
	        key: 'content-start'
	      }))
	    }),
	    ' ',
	    children
	  );
	};

	// eslint-disable-next-line

	/**
	 * @typedef {Object} ContentBlockProps
	 * @prop {boolean} [inner=false]
	 * @prop {boolean} [inset=false]
	 * @prop {string} [title]
	 * @prop {boolean} [noHairlines]
	 *
	 * @param {ContentBlockProps} props
	 * @param {JSX.Element[]} children
	 */
	var ContentBlock = function ContentBlock(props, children) {
	  var inner = props.inner,
	      inset = props.inset,
	      title = props.title,
	      noHairlines = props.noHairlines,
	      elProps = objectWithoutProperties(props, ['inner', 'inset', 'title', 'noHairlines']);


	  var elClass = classnames(elProps.class, 'content-block', {
	    inset: inset,
	    'no-hairlines': noHairlines
	  });

	  return renderWithTitle(title, children.length > 0 && hyperapp.h(
	    'div',
	    _extends({}, elProps, { 'class': elClass }),
	    renderContent(inner, children)
	  ));
	};

	function renderWithTitle(title, content) {
	  return title ? [hyperapp.h(
	    'div',
	    { 'class': 'content-block-title' },
	    title
	  ), content] : content;
	}

	function renderContent(inner, content) {
	  return inner ? hyperapp.h(
	    'div',
	    { 'class': 'content-block-inner' },
	    content
	  ) : content;
	}

	function install(_ref) {
	  var state = _ref.state,
	      actions = _ref.actions,
	      view = _ref.view,
	      api = _ref.api;

	  var el = document.createElement('div');
	  var appActions = hyperapp.app(state, actions, view, el);
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

	/**
	 * 添加事件
	 * @param {HTMLElement} el
	 * @param {string} type
	 * @param {EventListener} fn
	 * @param {boolean} options
	 * @returns {Function}
	 */
	function on(el, type, fn, options) {
	  el.addEventListener(type, fn, options);
	  return function () {
	    return el.removeEventListener(type, fn, options);
	  };
	}

	var requestAnimationFrame$1 = window.requestAnimationFrame;

	/**
	 * @param {HTMLElement} el
	 * @param {Function} callback
	 */
	function transitionEnd(el, callback) {
	  var run = function run(e) {
	    callback && callback(e);
	    offs.map(function (off) {
	      return off();
	    });
	  };

	  var offs = ['webkitTransitionEnd', 'transitionend'].map(function (type) {
	    return on(el, type, run);
	  });
	}

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

	var enumOverlayTypes = {
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
	      type = _props$type === undefined ? enumOverlayTypes.modal : _props$type,
	      notAnimated = props.notAnimated,
	      onOverlayClick = props.onOverlayClick,
	      key = props.key,
	      overlayClass = props.overlayClass,
	      _props$enterClass = props.enterClass,
	      enterClass = _props$enterClass === undefined ? ANIM_NAMES.fadeIn : _props$enterClass,
	      _props$exitClass = props.exitClass,
	      exitClass = _props$exitClass === undefined ? ANIM_NAMES.fadeOut : _props$exitClass;


	  var noAnim = notAnimated || type === enumOverlayTypes.preloader;

	  return hyperapp.h(
	    CSSTransition,
	    {
	      enter: !noAnim && enterClass,
	      exit: !noAnim && exitClass
	    },
	    hyperapp.h('div', {
	      key: key,
	      'class': classnames(type + '-overlay', overlayClass),
	      onclick: onOverlayClick
	    })
	  );
	};

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

	  return hyperapp.h(
	    'div',
	    { key: wraperKey, 'class': wraperClass },
	    show && [hyperapp.h(Overlay, { onOverlayClick: onOverlayClick }), hyperapp.h(
	      CSSTransition,
	      {
	        enter: enterClass,
	        exit: exitClass
	      },
	      hyperapp.h(
	        'div',
	        { 'class': 'modal', oncreate: sizeModal },
	        hyperapp.h(
	          'div',
	          { 'class': 'modal-inner' },
	          hyperapp.h(
	            'div',
	            { 'class': 'modal-title' },
	            title
	          ),
	          hyperapp.h(
	            'div',
	            { 'class': 'modal-text' },
	            text
	          ),
	          afterText
	        ),
	        hyperapp.h(
	          'div',
	          { 'class': buttonWraperCls, onclick: onButtonsClick },
	          buttons.map(function (button) {
	            return hyperapp.h(
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


	  return hyperapp.h(Dialog, _extends({}, rest, {
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


	  return hyperapp.h('span', _extends({}, rest, { 'class': classnames('preloader', rest.class, { 'preloader-white': white }) }));
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


	  return hyperapp.h(
	    'div',
	    { key: wraperKey, 'class': wraperClass },
	    show && [hyperapp.h(Overlay, {
	      type: enumOverlayTypes.preloader,
	      notAnimated: true
	    }), hyperapp.h(
	      'div',
	      { 'class': 'preloader-indicator-modal' },
	      hyperapp.h(Preloader, { white: true })
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
	  return hyperapp.h(Loading, { show: state.show });
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
	// import './index.less'

	/**
	 * @typedef {Object} PageProps
	 * @prop {JSX.Element} [navbar]
	 * @prop {JSX.Element} [toolbar]
	 * @prop {JSX.Element} [outside]
	 *
	 * @param {PageProps} props
	 * @param {JSX.Element[]} children
	 */
	var Page = function Page(props, children) {
	  var navbar = props.navbar,
	      toolbar = props.toolbar,
	      outside = props.outside,
	      restProps = objectWithoutProperties(props, ['navbar', 'toolbar', 'outside']);


	  return hyperapp.h(
	    'div',
	    _extends({}, restProps, { 'class': classnames('page', restProps.class, {
	        'navbar-fixed': !!navbar,
	        'toolbar-fixed': !!toolbar
	      }) }),
	    navbar,
	    hyperapp.h(
	      'div',
	      { key: 'content', 'class': 'page-content' },
	      children
	    ),
	    toolbar,
	    outside && hyperapp.h(
	      'div',
	      { key: 'outside', 'class': 'page-outside' },
	      outside
	    )
	  );
	};

	// eslint-disable-next-line

	/**
	 * @typedef {Object} PickerModalProps
	 * @prop {JSX.Element} [toolbar]
	 * @prop {boolean} [noColumns=false]
	 * @prop {boolean} [inline=false]
	 * @prop {string} [modalClass]
	 * @param {PickerModalProps} props
	 * @param {JSX.Element} children
	 */
	var PickerModal = function PickerModal(props, children) {
	  var toolbar = props.toolbar,
	      noColumns = props.noColumns,
	      inline = props.inline,
	      modalClass = props.modalClass;


	  return hyperapp.h(
	    CSSTransition,
	    { enter: !inline && 'anim-slidein', exit: !inline && 'anim-slideout' },
	    hyperapp.h(
	      'div',
	      {
	        'class': classnames('picker-modal', modalClass, { 'picker-modal-inline': inline }),
	        style: { display: 'block' }
	      },
	      toolbar,
	      hyperapp.h(
	        'div',
	        { 'class': classnames('picker-modal-inner', { 'picker-items': !noColumns }) },
	        children,
	        !noColumns && hyperapp.h('div', { key: 'center-highlight', 'class': 'picker-center-highlight' })
	      )
	    )
	  );
	};

	/**
	 * Scroll Behaiver
	 * @typedef {Object} ScrollerState
	 * @prop {boolean} isTouched
	 * @prop {boolean} isMoved
	 * @prop {number} startY
	 * @prop {number} startTranslate
	 * @prop {number} startTime
	 * @prop {number} currentY
	 * @prop {number} currentTranslate
	 * @prop {number} currentTime
	 * @prop {number} velocityTranslate
	 */
	var BaseScroller = function () {
	  function BaseScroller() {
	    classCallCheck(this, BaseScroller);
	  }

	  createClass(BaseScroller, [{
	    key: 'initializeState',

	    /**
	     * @param {number} currentTranslate
	     */
	    value: function initializeState(currentTranslate) {
	      if (this.__initialized) {
	        return;
	      }

	      var n = Date.now();

	      /**
	       *  @type {ScrollerState}
	       */
	      this.state = {
	        isTouched: false,
	        /**
	         * move end
	         */
	        isMoved: false,
	        startY: 0,
	        startTime: n,
	        startTranslate: 0,
	        currentY: 0,
	        currentTime: n,
	        currentTranslate: currentTranslate,
	        velocityTranslate: 0
	      };

	      this.__initialized = true;
	    }

	    /**
	     * @param {number} maxTranslate Translate value when scroll content on the top
	     * @param {number} minTranslate Translate value when content on the bottom
	     */

	  }, {
	    key: 'setSize',
	    value: function setSize(maxTranslate, minTranslate) {
	      this.size = { maxTranslate: maxTranslate, minTranslate: minTranslate };
	    }

	    /**
	     * @param {number} finalTranslate
	     */

	  }, {
	    key: 'updateTranslate',
	    value: function updateTranslate(finalTranslate) {
	      if (this.state.isTouched || this.state.isMoved) {
	        throw new Error('Do not update translate until touch end !');
	      }

	      this._setState({
	        currentTranslate: finalTranslate
	      });
	    }

	    /**
	     * publish translate to render
	     * @param {(translate: number, isMove: boolean) => void} callback
	     */

	  }, {
	    key: 'setCallback',
	    value: function setCallback(callback) {
	      this._callback = callback;
	    }

	    /**
	     * @param {Touch[]} touches
	     * @param {number} startTime
	     */

	  }, {
	    key: 'onTouchStart',
	    value: function onTouchStart(touches, startTime) {
	      this._setState({
	        isTouched: true,
	        startY: touches[0].pageY,
	        startTime: startTime,
	        startTranslate: this.state.currentTranslate
	      });
	    }

	    /**
	     * @param {Touch[]} touches
	     * @param {number} currentTime
	     */

	  }, {
	    key: 'onTouchMove',
	    value: function onTouchMove(touches, currentTime) {
	      if (!this.state.isTouched) {
	        return;
	      }

	      var isMoved = true;
	      var currentY = touches[0].pageY;
	      var newTranslate = this.state.startTranslate + currentY - this.state.startY;
	      var currentTranslate = this._normalize(newTranslate);

	      this._setState({
	        isMoved: isMoved,
	        currentY: currentY,
	        currentTime: currentTime,
	        currentTranslate: currentTranslate,
	        velocityTranslate: currentTranslate - this.state.currentTranslate
	      });

	      this._publish(currentTranslate, isMoved);
	    }

	    /**
	     * @param {Touch[]} [touches]
	     * @param {number} endTime
	     */

	  }, {
	    key: 'onTouchEnd',
	    value: function onTouchEnd(touches, endTime) {
	      var isTouched = false;
	      var isMoved = false;

	      if (!this.state.isTouched || !this.state.isMoved) {
	        this._setState({ isTouched: isTouched, isMoved: isMoved });
	        return;
	      }

	      var currentTranslate = this._accelerate(endTime);

	      this._setState({
	        isTouched: isTouched,
	        isMoved: isMoved,
	        currentTranslate: currentTranslate
	      });

	      this._publish(currentTranslate, isMoved);
	    }

	    /**
	     * @param {ScrollerState} nextState
	     */

	  }, {
	    key: '_setState',
	    value: function _setState(nextState) {
	      var prevState = this.state;
	      this.state = _extends({}, prevState, nextState);
	    }
	  }, {
	    key: '_publish',
	    value: function _publish(translate, isMoved) {
	      if (this._callback) {
	        this._callback(translate, isMoved);
	      }
	    }

	    /**
	     * @param {number} translate
	     */

	  }, {
	    key: '_normalize',
	    value: function _normalize(translate) {
	      var _size = this.size,
	          min = _size.minTranslate,
	          max = _size.maxTranslate;


	      if (translate < min) {
	        return min - Math.pow(min - translate, 0.8);
	      } else if (translate > max) {
	        return max + Math.pow(translate - max, 0.8);
	      } else {
	        return translate;
	      }
	    }

	    /**
	     * @param {Date} endTime
	     */

	  }, {
	    key: '_accelerate',
	    value: function _accelerate(endTime) {
	      var momentumRatio = 7;
	      var _state = this.state,
	          startTime = _state.startTime,
	          curr = _state.currentTranslate,
	          v = _state.velocityTranslate;


	      var newTranslate = endTime - startTime > 300 ? curr : curr + v * momentumRatio;

	      return newTranslate;
	    }

	    // bindEvents () {
	    //   throw new Error('bindEvents should be implemented by subClass')
	    // }

	    // update () {
	    //   throw new Error('update should be implemented by subClass')
	    // }

	    // render () {
	    //   throw new Error('render should be implemented by sub-class')
	    // }

	  }]);
	  return BaseScroller;
	}();

	var ScrollerHandler = function (_BaseScroller) {
	  inherits(ScrollerHandler, _BaseScroller);

	  /**
	   * @typedef {Object} PickerScrollerOptions
	   * @prop {(val: string) => void} onChange
	   * @prop {string} value
	   * @prop {PickerColumnItemProps[]} items
	   *
	   * @param {HTMLElement} wraper
	   * @param {PickerScrollerOptions} props
	   */
	  function ScrollerHandler(wraper, props) {
	    classCallCheck(this, ScrollerHandler);

	    var _this = possibleConstructorReturn(this, (ScrollerHandler.__proto__ || Object.getPrototypeOf(ScrollerHandler)).call(this)); // eslint-disable-line


	    _this.wraper = wraper;
	    /**
	     * @type {PickerScrollerOptions}
	     */
	    _this.props = {};

	    var container = wraper.parentNode.offsetHeight;
	    var item = wraper.offsetHeight / wraper.children.length;
	    var currentTranslate = 0;

	    _this.heights = { container: container, item: item };
	    _this.initializeState(currentTranslate);
	    _this.update(props);
	    _this.bindEvents();
	    return _this;
	  }

	  // #region update

	  createClass(ScrollerHandler, [{
	    key: 'update',
	    value: function update(newProps) {
	      this.props.onChange = newProps.onChange;

	      if (!isSameItems(this.props.items, newProps.items)) {
	        return this._updateItems(newProps.value, newProps.items);
	      }

	      if (newProps.value !== this.props.value) {
	        this._updateValue(newProps.value, newProps.items);
	      }
	    }
	  }, {
	    key: '_updateItems',
	    value: function _updateItems(value, data) {
	      // data
	      this.props.items = data;

	      // resize size
	      var itemLength = data.length;
	      var _heights = this.heights,
	          container = _heights.container,
	          item = _heights.item;

	      var maxTranslate = (container - item) / 2;
	      var minTranslate = (container - item * (itemLength * 2 - 1)) / 2;
	      this.setSize(maxTranslate, minTranslate);

	      // update value
	      this._updateValue(value, data);
	    }
	  }, {
	    key: '_updateValue',
	    value: function _updateValue(value, data) {
	      var foundIndex = data.map(function (item) {
	        return item.value;
	      }).indexOf(value);
	      var foundInData = foundIndex > -1;
	      var activeIndex = foundInData ? foundIndex : 0;

	      // translate
	      this._scrollToItem(activeIndex, false, !foundInData);
	    }

	    // #endregion

	  }, {
	    key: '_scrollToItem',
	    value: function _scrollToItem(activeIndex, animate, emitValue) {
	      var _this2 = this;

	      // translate
	      var max = this.size.maxTranslate;

	      var finalTranslate = max - activeIndex * this.heights.item;
	      this.updateTranslate(finalTranslate);
	      this._render(finalTranslate, animate);

	      // value
	      this.props.value = this.props.items[activeIndex].value;

	      // emit value
	      if (emitValue) {
	        animate ? transitionEnd(this.wraper, function () {
	          _this2._emitValue();
	        }) : this._emitValue();
	      }
	    }
	  }, {
	    key: '_render',
	    value: function _render(translate, animate) {
	      setTranslate(this.wraper.style, translate, animate);
	    }
	  }, {
	    key: '_emitValue',
	    value: function _emitValue() {
	      // console.log('emit value', { ...this.props })
	      this.props.onChange && this.props.onChange(this.props.value);
	    }

	    // #region event entry

	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this3 = this;

	      this.setCallback(this._onTouchScroll.bind(this));

	      var events = {
	        touchstart: function touchstart(e) {
	          _this3.onTouchStart(e.targetTouches, Date.now());
	        },
	        touchmove: function touchmove(e) {
	          _this3.onTouchMove(e.targetTouches, Date.now());
	        },
	        touchend: function touchend(e) {
	          _this3.onTouchEnd(e.targetTouches, Date.now());
	        },
	        // click to select
	        click: function click(e) {
	          if (_this3.state.isMoved) {
	            return;
	          }
	          _this3._onItemClick(e);
	        }
	      };

	      for (var eventName in events) {
	        on(this.wraper, eventName, events[eventName]);
	      }
	    }
	  }, {
	    key: '_onTouchScroll',
	    value: function _onTouchScroll(translate, isMoved) {
	      var animate = !isMoved;

	      if (isMoved) {
	        this._render(translate, animate);
	      } else {
	        this._scrollToItem(this._getActiveIndex(translate), animate, true);
	      }
	    }
	  }, {
	    key: '_getActiveIndex',
	    value: function _getActiveIndex(translate) {
	      var _size = this.size,
	          min = _size.minTranslate,
	          max = _size.maxTranslate;

	      var newTranslate = Math.max(Math.min(translate, max), min);
	      var activeIndex = Math.round((max - newTranslate) / this.heights.item);
	      return activeIndex;
	    }
	  }, {
	    key: '_onItemClick',
	    value: function _onItemClick(e) {
	      var itemCls = 'picker-item';
	      var isItem = function isItem(el) {
	        return el.className.indexOf(itemCls) > -1 ? el : false;
	      };
	      var target = isItem(e.target) || isItem(e.target.parentNode);

	      if (target) {
	        var activeIndex = void 0;
	        for (var i = 0, len = this.wraper.children.length; i < len; i++) {
	          if (this.wraper.children[i] === target) {
	            activeIndex = i;
	            break;
	          }
	        }
	        this._scrollToItem(activeIndex, true, true);
	      }
	    }

	    // #endregion

	  }]);
	  return ScrollerHandler;
	}(BaseScroller);

	/**
	 *
	 * @param {PickerColumnItemProps[]} prev
	 * @param {PickerColumnItemProps[]} data
	 */
	function isSameItems(prev, data) {
	  return prev && data && data.length === prev.length && data.every(function (item, i) {
	    return item.value === prev[i].value;
	  });
	}

	function setTranslate(nodestyle, translate, animate) {
	  nodestyle.transform = 'translate3d(0px, ' + translate + 'px, 0px)';
	  nodestyle.webkitTransform = 'translate3d(0px, ' + translate + 'px, 0px)';
	  var duration = animate ? '' : '0ms';
	  nodestyle.transitionDuration = duration;
	  nodestyle.webkitTransitionDuration = duration;
	}

	// eslint-disable-next-line

	var processWidth = function processWidth(width) {
	  return parseInt(width, 10) === width ? width + 'px' : '';
	};

	/**
	 * @typedef {Object} PickerDividerProps
	 * @prop {string | JSX.Element} content
	 * @prop {number} [width]
	 * @prop {string} [class]
	 * @prop {string} [key]
	 *
	 * @param {PickerDividerProps} props
	 */
	var PickerDivider = function PickerDivider(props) {
	  var content = props.content,
	      width = props.width,
	      key = props.key;


	  return hyperapp.h(
	    'div',
	    {
	      key: key,
	      'class': classnames('picker-items-col picker-items-col-divider', props.class),
	      style: { width: processWidth(width) }
	    },
	    content
	  );
	};

	/**
	 * Picker-Column must be controlled
	 *
	 * @typedef {Object} PickerItemProps
	 * @prop {string} label
	 * @prop {string} value
	 *
	 * @typedef {Object} PickerColumnProps
	 * @prop {string} value
	 * @prop {PickerItemProps[]} items
	 * @prop {(value: string) => void} onChange
	 * @prop {'left' | 'center' | 'right'} [align='right']
	 * @prop {number} [width]
	 * @prop {string} [class]
	 * @prop {string} [key]
	 *
	 * @param {PickerColumnProps} props
	 */
	var PickerColumn = function PickerColumn(props) {
	  var value = props.value,
	      items = props.items,
	      align = props.align,
	      onChange = props.onChange,
	      width = props.width,
	      key = props.key;


	  var columnCls = classnames('picker-items-col', props.class, defineProperty({}, 'picker-items-col-' + align, align));

	  return hyperapp.h(
	    'div',
	    {
	      key: key,
	      'class': columnCls,
	      style: { width: processWidth(width) }
	    },
	    hyperapp.h(
	      'div',
	      {
	        'class': 'picker-items-col-wrapper',
	        onupdate: function onupdate(el) {
	          if (el._scroller) {
	            try {
	              el._scroller.update({ items: items, value: value, onChange: onChange });
	            } catch (e) {}
	          }
	        },
	        oncreate: function oncreate(el) {
	          el._scroller = new ScrollerHandler(el, { items: items, value: value, onChange: onChange });
	        },
	        ondestroy: function ondestroy(el) {
	          el._scroller && (el._scroller = null);
	        }
	      },
	      items.map(function (item) {
	        return hyperapp.h(
	          'div',
	          { 'class': classnames('picker-item', { 'picker-selected': item.value === value }) },
	          hyperapp.h(
	            'span',
	            null,
	            item.label
	          )
	        );
	      })
	    )
	  );
	};

	// eslint-disable-next-line

	/**
	 * @typedef {Object} PickerItem
	 * @prop {string} label
	 * @prop {string} value
	 * @prop {PickerItem[]} [children]
	 *
	 * @typedef {Object} PickerColumnTypes
	 * @prop {boolean} [isDivider]
	 * @prop {string} [content]
	 * @prop {string} [class]
	 * @prop {string} [key]
	 * @prop {number} [width]
	 * @prop {'left' | 'center'} [align]
	 *
	 * @typedef {Object} PickerColumnsProps
	 * @prop {boolean} [cascade]
	 * @prop {PickerItem[]} items
	 * @prop {string[]} values
	 * @prop {(values: string[]) => void} onChange
	 * @prop {PickerColumn[]} [columns]
	 *
	 * @param {PickerColumnsProps} props
	 */
	var PickerColumns = function PickerColumns(props) {
	  var cascade = props.cascade,
	      items = props.items,
	      values = props.values,
	      columns = props.columns,
	      _onChange = props.onChange;


	  if (!items || !values) {
	    return false;
	  }

	  var models = modelColumn(cascade, items, values, columns);

	  return models.map(function (_ref, i) {
	    var isDivider = _ref.isDivider,
	        props = _ref.props,
	        content = _ref.content;

	    return isDivider ? hyperapp.h(PickerDivider, _extends({}, props, { content: content })) : hyperapp.h(PickerColumn, _extends({}, _extends({}, props, content), {
	      onChange: function onChange(val) {
	        var newValues = values.map(function (prev) {
	          return prev === content.value ? val : prev;
	        });
	        _onChange(newValues);
	      }
	    }));
	  });
	};

	/**
	 * final column model
	 *
	 * @typedef {Object} FinalColumnModel
	 * @prop {boolean} [isDivider]
	 * @prop {string | {items: PickerItem[], value: string}} [content]
	 * @prop {PickerColumnTypes} [props]
	 *
	 * @param {boolean} cascade
	 * @param {PickerItem[]} items
	 * @param {string []} values
	 * @param {PickerColumnTypes[]} [columns]
	 *
	 */
	function modelColumn(cascade, items, values, columns) {
	  var datas = cascade ? getCascadeDatas(items, values) : compatDatas(items);

	  var contents = datas.map(function (items, i) {
	    return {
	      items: items,
	      value: values[i]
	    };
	  });

	  if (!columns) {
	    return contents.map(function (content) {
	      return { content: content };
	    });
	  }

	  var itemIndex = 0;
	  return columns.map(function (_ref2, i) {
	    var isDivider = _ref2.isDivider,
	        content = _ref2.content,
	        props = objectWithoutProperties(_ref2, ['isDivider', 'content']);

	    return {
	      isDivider: isDivider,
	      props: props,
	      content: isDivider ? content : contents[++itemIndex]
	    };
	  });
	}

	/**
	 * convert cascade items to multiple columns items
	 * @param {PickerItem[]} items
	 * @param {string[]} value
	 * @returns {PickerItem[][]}
	 */
	function getCascadeDatas(items, value) {
	  var f = function f(data, _ref3, acc) {
	    var _ref4 = toArray(_ref3),
	        val = _ref4[0],
	        restVals = _ref4.slice(1);

	    var selected = data.filter(function (item) {
	      return item.value === val;
	    }).pop();

	    return restVals.length > 0 ? f(selected.children, restVals, acc.concat([data.map(function (_ref5) {
	      var label = _ref5.label,
	          value = _ref5.value;
	      return { label: label, value: value };
	    })])) : acc.concat([data]);
	  };
	  return f(items, value, []);
	}

	/**
	 * campat items between single column and multiple columns
	 * @param {PickerItem[] | PickerItem[][]} data
	 * @returns {PickerItem[][]}
	 */
	function compatDatas(data) {
	  return data[0].value ? data : [data];
	}

	// eslint-disable-next-line

	/**
	 * @typedef {Object} PickerItem
	 * @prop {string} label
	 * @prop {string} value
	 * @prop {PickerItem[]} [children]
	 *
	 * @typedef {Object} PickerColumn
	 * @prop {boolean} [isDivider]
	 * @prop {string} [content]
	 * @prop {string} [class]
	 * @prop {string} [key]
	 * @prop {number} [width]
	 * @prop {'left' | 'center'} [align]
	 *
	 * @typedef {Object} PickerProps
	 * @prop {boolean} show
	 * @prop {string} [wraperClass='picker-wraper']
	 * @prop {string} [wraperKey]
	 * @prop {(e: Event) => void} [onOverlayClick]
	 * @prop {string} [modalClass]
	 * @prop {JSX.Element} [toolbar]
	 * @prop {boolean} [cascade]
	 * @prop {PickerItem[]} items
	 * @prop {string[]} values
	 * @prop {PickerColumn[]} [columns]
	 * @prop {(values: string[]) => void} onChange
	 *
	 * @param {PickerProps} props
	 * @param {JSX.Element} children
	 */
	var Picker = function Picker(props, children) {
	  var show = props.show,
	      wraperClass = props.wraperClass,
	      wraperKey = props.wraperKey,
	      modalClass = props.modalClass,
	      onOverlayClick = props.onOverlayClick,
	      toolbar = props.toolbar,
	      columnsProps = objectWithoutProperties(props, ['show', 'wraperClass', 'wraperKey', 'modalClass', 'onOverlayClick', 'toolbar']);


	  return hyperapp.h(
	    'div',
	    { key: wraperKey, 'class': classnames('protal-picker', wraperClass) },
	    show && [hyperapp.h(Overlay, { type: enumOverlayTypes.picker, onOverlayClick: onOverlayClick }), hyperapp.h(
	      PickerModal,
	      { modalClass: modalClass, toolbar: toolbar },
	      hyperapp.h(PickerColumns, columnsProps)
	    )]
	  );
	};

	var ContentPicker = function ContentPicker(props, children) {
	  var show = props.show,
	      wraperClass = props.wraperClass,
	      wraperKey = props.wraperKey,
	      modalClass = props.modalClass,
	      onOverlayClick = props.onOverlayClick,
	      toolbar = props.toolbar;


	  return hyperapp.h(
	    'div',
	    { key: wraperKey, 'class': wraperClass },
	    show && [hyperapp.h(Overlay, { type: enumOverlayTypes.picker, onOverlayClick: onOverlayClick }), hyperapp.h(
	      PickerModal,
	      { modalClass: modalClass, toolbar: toolbar, noColumns: true },
	      children
	    )]
	  );
	};

	var InlinePicker = function InlinePicker(props) {
	  var modalClass = props.modalClass,
	      toolbar = props.toolbar,
	      columnsProps = objectWithoutProperties(props, ['modalClass', 'toolbar']);


	  return hyperapp.h(
	    PickerModal,
	    { modalClass: modalClass, toolbar: toolbar, inline: true },
	    hyperapp.h(PickerColumns, columnsProps)
	  );
	};

	// eslint-disable-next-line

	var Navbar = function Navbar(_ref, children) {
	  var left = _ref.left,
	      right = _ref.right,
	      center = _ref.center,
	      noBorder = _ref.noBorder,
	      r = objectWithoutProperties(_ref, ['left', 'right', 'center', 'noBorder']);

	  return hyperapp.h(
	    'div',
	    _extends({}, r, { 'class': classnames('navbar', { 'no-border': noBorder }, r.class) }),
	    hyperapp.h(
	      'div',
	      { 'class': 'navbar-inner' },
	      hyperapp.h(
	        'div',
	        { 'class': 'left' },
	        left
	      ),
	      hyperapp.h(
	        'div',
	        { 'class': 'center' },
	        center || children
	      ),
	      hyperapp.h(
	        'div',
	        { 'class': 'right' },
	        right
	      )
	    )
	  );
	};

	// eslint-disable-next-line

	/**
	 * @typedef {Object} ToolbarProps
	 * @prop {boolean} noBorder
	 *
	 * @param {ToolbarProps} props
	 * @param {JSX.Element[]} children
	 */
	var Toolbar = function Toolbar(props, children) {
	  return hyperapp.h(
	    'div',
	    _extends({}, props, { 'class': classnames('toolbar', { 'no-border': props.noBorder }, props.class) }),
	    hyperapp.h(
	      'div',
	      { 'class': 'toolbar-inner' },
	      children
	    )
	  );
	};

	/**
	 * @typedef {Object} ToolbarLinkProps
	 * @prop {string} text
	 * @prop {Function} [onclick]
	 * @prop {string} [class]
	 *
	 * @param {ToolbarLinkProps} props
	 */
	var ToolbarLink = function ToolbarLink(props, children) {
	  return hyperapp.h(
	    'a',
	    _extends({}, props, { 'class': classnames('link', props.class) }),
	    children
	  );
	};

	// eslint-disable-next-line
	// import cc from 'classnames'

	/**
	 * @typedef {Object} PickerToolbarProps
	 * @prop {JSX.Element} [left]
	 * @prop {JSX.Element} [right]
	 * @prop {JSX.Element} [center]
	 * @prop {string} [toolbarClass]
	 * @param {PickerToolbarProps} props
	 */
	var PickerToolbar = function PickerToolbar(props) {
	  var left = props.left,
	      right = props.right,
	      center = props.center,
	      toolbarClass = props.toolbarClass;


	  return hyperapp.h(
	    Toolbar,
	    { 'class': toolbarClass },
	    hyperapp.h(
	      'div',
	      { key: 'left', 'class': 'left' },
	      left
	    ),
	    center && hyperapp.h(
	      'div',
	      { 'class': 'center' },
	      center
	    ),
	    hyperapp.h(
	      'div',
	      { key: 'right', 'class': 'right' },
	      right
	    )
	  );
	};

	var state$1 = {
	  // internal
	  isColumnPicker: true,
	  // extra props
	  content: null,
	  toolbarText: 'Done',
	  // wraper
	  show: false,
	  wraperClass: '',
	  wraperKey: '',
	  onOverlayClick: null,
	  // modal
	  modalClass: '',
	  toolbar: null,
	  // columns
	  cascade: false,
	  items: [],
	  values: [],
	  columns: null,
	  onChange: function onChange() {}
	};

	var actions$2 = {
	  openPicker: function openPicker(props) {
	    return _extends({}, props, {
	      show: true,
	      isColumnPicker: true
	    });
	  },
	  openContent: function openContent(props) {
	    return _extends({}, props, {
	      show: true,
	      isColumnPicker: false
	    });
	  },
	  close: function close() {
	    return state$1;
	  },
	  readState: function readState(reader) {
	    return function (state) {
	      return reader(state);
	    };
	  }
	};

	var view$2 = function view(state, actions) {
	  var isColumnPicker = state.isColumnPicker,
	      content = state.content,
	      toolbarText = state.toolbarText,
	      onOverlayClick = state.onOverlayClick,
	      toolbar = state.toolbar,
	      rest = objectWithoutProperties(state, ['isColumnPicker', 'content', 'toolbarText', 'onOverlayClick', 'toolbar']);


	  var handleOverlayClick = onOverlayClick || actions.close;
	  var toolbarVNode = toolbar || hyperapp.h(PickerToolbar, { right: hyperapp.h(
	      'a',
	      { 'class': 'link', onclick: actions.close },
	      toolbarText
	    ) });

	  return isColumnPicker ? hyperapp.h(Picker, _extends({}, rest, {
	    onOverlayClick: handleOverlayClick,
	    toolbar: toolbarVNode
	  })) : hyperapp.h(
	    ContentPicker,
	    _extends({}, rest, {
	      onOverlayClick: handleOverlayClick,
	      toolbar: toolbarVNode
	    }),
	    content
	  );
	};

	var api$2 = function api(_ref) {
	  var open = _ref.openPicker,
	      openContent = _ref.openContent,
	      close = _ref.close,
	      readState = _ref.readState;

	  var methods = { open: open, openContent: openContent, close: close
	    // for debug only
	  };var internalState = void 0;
	  Object.defineProperty(methods, 'internalState', {
	    get: function get$$1() {
	      readState(function (state) {
	        internalState = state;
	      });
	      return _extends({}, internalState);
	    }
	  });
	  return methods;
	};

	var plugin$2 = {
	  state: state$1,
	  actions: actions$2,
	  view: view$2,
	  api: api$2
	};

	var apis$2 = install(plugin$2);
	var Picker$1 = apiMixin(Picker, apis$2);

	var transitionCls = 'pull-to-refresh-transition';

	var enumRefreshStatus = {
	  deactivate: 'deactivate',
	  activate: 'activate',
	  release: 'release',
	  finish: 'finish'
	};

	var PullToRefreshScroller = function (_BaseScroller) {
	  inherits(PullToRefreshScroller, _BaseScroller);

	  function PullToRefreshScroller() {
	    classCallCheck(this, PullToRefreshScroller);
	    return possibleConstructorReturn(this, (PullToRefreshScroller.__proto__ || Object.getPrototypeOf(PullToRefreshScroller)).apply(this, arguments));
	  }

	  createClass(PullToRefreshScroller, [{
	    key: 'bindEvents',

	    /**
	     * run on create
	     * @param {HTMLElement} containerEl
	     * @param {HTMLElement} contentEl
	     */
	    value: function bindEvents(containerEl, contentEl) {
	      var _this2 = this;

	      var isOnEdge = true;
	      var scroll = function scroll(e) {
	        isOnEdge = containerEl.scrollTop === 0;
	      };
	      var touchstart = function touchstart(e) {
	        if (isOnEdge) {
	          _this2.onTouchStart(e.touches, Date.now());
	          contentEl.classList.remove(transitionCls);
	        }
	      };
	      var touchmove = function touchmove(e) {
	        if (isOnEdge) {
	          if (_this2._checkDirection(e.touches[0].pageY)) {
	            _this2.onTouchMove(e.touches, Date.now());
	          } else {
	            touchend({ touches: [] });
	          }
	        }
	      };
	      var touchend = function touchend(e) {
	        if (isOnEdge) {
	          _this2.onTouchEnd(e.touches, Date.now());
	          contentEl.classList.add(transitionCls);
	        }
	      };
	      var events = {
	        scroll: scroll,
	        touchstart: touchstart,
	        touchmove: touchmove,
	        touchend: touchend,
	        touchcancel: touchend
	      };

	      for (var eventName in events) {
	        on(containerEl, eventName, events[eventName]);
	      }

	      return this;
	    }
	  }, {
	    key: '_checkDirection',
	    value: function _checkDirection(currentY) {
	      return currentY > this.state.startY;
	    }

	    /**
	     * run on create and update
	     * @typedef {Object} Props
	     * @prop {number} distance
	     * @prop {string} refreshStatus
	     * @prop {(status: string) => any} onRefreshChange
	     * @prop {(finish: () => void) => void} onRefresh
	     *
	     * @param {HTMLElement} contentEl
	     * @param {Props} props
	     * @param {{distance: number, refreshStatus: string}} oldProps
	     */

	  }, {
	    key: 'update',
	    value: function update(contentEl, props, oldProps) {
	      var _this3 = this;

	      if (props.distance !== oldProps.distance || props.refreshStatus !== oldProps.refreshStatus) {
	        this.setCallback(function (translate, isMove) {
	          var isActivate = translate > props.distance;
	          _this3[isMove ? '_drag' : '_drop'](contentEl, translate, props, isActivate);
	        });
	      }
	    }
	  }, {
	    key: '_drag',
	    value: function _drag(contentEl, translate, props, isActivate) {
	      render(contentEl, translate);

	      var newRefresh = isActivate ? enumRefreshStatus.activate : enumRefreshStatus.deactivate;
	      if (newRefresh !== props.refreshStatus) {
	        props.onRefreshChange(newRefresh);
	      }
	    }
	  }, {
	    key: '_drop',
	    value: function _drop(contentEl, translate, props, isActivate) {
	      var newTranslate = isActivate ? props.distance : 0;
	      render(contentEl, newTranslate);
	      if (newTranslate !== translate) {
	        this.updateTranslate(newTranslate);
	      }

	      var newRefresh = isActivate ? enumRefreshStatus.release : enumRefreshStatus.deactivate;
	      if (newRefresh !== props.refreshStatus) {
	        props.onRefreshChange(newRefresh);
	        if (newRefresh === enumRefreshStatus.release) {
	          this._release(contentEl, props);
	        }
	      }
	    }
	  }, {
	    key: '_release',
	    value: function _release(contentEl, props) {
	      var _this4 = this;

	      var finish = function finish() {
	        runAndCleanUp(contentEl, function () {
	          props.onRefreshChange(enumRefreshStatus.finish);
	          window.requestAnimationFrame(function () {
	            render(contentEl, 0);
	          });
	        }, function () {
	          props.onRefreshChange(enumRefreshStatus.deactivate);
	          _this4.updateTranslate(0);
	        });
	      };
	      props.onRefresh(finish);
	    }

	    /**
	     * run on create
	     * @param {HTMLElement} contentEl
	     * @param {Props} props
	     */

	  }, {
	    key: 'ready',
	    value: function ready(contentEl, props) {
	      this.setSize(0, 0);

	      if (props.refreshStatus === enumRefreshStatus.release) {
	        this.initializeState(props.distance);
	        render(contentEl, props.distance);
	        this._release(contentEl, props);
	      } else if (props.refreshStatus === enumRefreshStatus.deactivate) {
	        this.initializeState(0);
	      } else {
	        throw new Error('F7cError in PullToRefresh: Initial state can only be \'deactivate\' or \'release\'');
	      }
	    }
	  }]);
	  return PullToRefreshScroller;
	}(BaseScroller);

	function render(content, translate) {
	  var value = 'translate3d(0, ' + translate + 'px, 0)';
	  css(content, {
	    transform: value,
	    webkitTransform: value,
	    MozTransform: value
	  });
	}

	// eslint-disable-next-line no-unused-vars

	var defaultIndicator = {
	  deactivate: '下拉刷新',
	  activate: '松开立即刷新',
	  release: '加载中...',
	  finish: '完成刷新'

	  /**
	   * @typedef {Object} PullToRefreshProps
	   * @prop {number} distance
	   * @prop {Object} [indicator]
	   * @prop {(e: HTMLElement) => void} [onContainerScroll]
	   * @prop {(finish: () => void) => void} onRefresh
	   * @prop {string} refreshStatus this prop must be controled
	   * @prop {(status: string) => any} onRefreshChange
	   *
	   * @param {PullToRefreshProps} props
	   */
	};var PullToRefresh = function PullToRefresh(props, children) {
	  var _props$distance = props.distance,
	      distance = _props$distance === undefined ? 25 : _props$distance,
	      _props$indicator = props.indicator,
	      indicator = _props$indicator === undefined ? {} : _props$indicator,
	      onContainerScroll = props.onContainerScroll,
	      refreshStatus = props.refreshStatus,
	      rests = objectWithoutProperties(props, ['distance', 'indicator', 'onContainerScroll', 'refreshStatus']);


	  props.distance = distance;

	  return hyperapp.h(
	    'div',
	    _extends({}, rests, {
	      'class': classnames('pull-to-refresh', rests.class),
	      onscroll: onContainerScroll
	    }),
	    hyperapp.h(
	      'div',
	      { 'class': 'pull-to-refresh-wraper' },
	      hyperapp.h(
	        'div',
	        {
	          'class': 'pull-to-refresh-content',
	          oncreate: function oncreate(el) {
	            el._scroller = new PullToRefreshScroller().bindEvents(el.parentNode.parentNode, el);
	            el._scroller.update(el, props, {});
	            el._scroller.ready(el, props);
	          },
	          onupdate: function onupdate(el, oldAttr) {
	            try {
	              el._scroller.update(el, props, oldAttr);
	            } catch (e) {}
	          },
	          distance: distance,
	          refreshStatus: refreshStatus
	        },
	        hyperapp.h(
	          'div',
	          { key: 'indicator', 'class': 'pull-to-refresh-indicator' },
	          indicator[refreshStatus] || defaultIndicator[refreshStatus]
	        ),
	        hyperapp.h(
	          'div',
	          { key: 'inner' },
	          children
	        )
	      )
	    )
	  );
	};

	// eslint-disable-next-line
	// import './index.less'

	var radioIcon = hyperapp.h(Icon, { name: 'form-radio' });

	/**
	 * @typedef {Object} RadioItemProps
	 * @prop {boolean} checked
	 * @prop {string} name
	 * @prop {string} value
	 * @prop {(e: Event) => void} onchange
	 * @prop {boolean} [disabled]
	 * @prop {boolean} [readonly]
	 * @prop {boolean} [required]
	 * @prop {JSX.Element} [media]
	 *
	 * @param {RadioItemProps} props
	 * @param {JSX.Element[]} children
	 */
	var RadioItem = function RadioItem(props, children) {
	  var checked = props.checked,
	      name = props.name,
	      value = props.value,
	      onchange = props.onchange,
	      disabled = props.disabled,
	      readonly = props.readonly,
	      required = props.required,
	      media = props.media,
	      itemProps = objectWithoutProperties(props, ['checked', 'name', 'value', 'onchange', 'disabled', 'readonly', 'required', 'media']);


	  return hyperapp.h(
	    ListItem,
	    _extends({}, itemProps, {
	      useLabel: true,
	      'class': classnames('label-radio', itemProps.class),
	      media: media || radioIcon,
	      contentStart: hyperapp.h('input', _extends({ checked: checked, name: name, value: value, onchange: onchange, disabled: disabled, readonly: readonly, required: required }, {
	        type: 'radio',
	        key: 'content-start'
	      }))
	    }),
	    ' ',
	    children
	  );
	};

	// eslint-disable-next-line

	/**
	 * @typedef {Object} RangeSliderProps
	 * @prop {number} min
	 * @prop {number} max
	 * @prop {number} step
	 * @prop {number} value
	 *
	 * @param {RangeSliderProps} props
	 */
	var RangeSlider = function RangeSlider(props) {
	  return hyperapp.h(
	    "div",
	    { "class": "range-slider" },
	    hyperapp.h("input", _extends({}, props, { type: "range" }))
	  );
	};

	// eslint-disable-next-line

	var WRAPER = 'toast-wraper';

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


	  return hyperapp.h(
	    'div',
	    { key: wraperKey, 'class': wraperClass },
	    show && [hyperapp.h(Overlay, {
	      type: enumOverlayTypes.preloader,
	      notAnimated: true
	    }), hyperapp.h(
	      CSSTransition,
	      {
	        enter: enterClass,
	        exit: exitClass
	      },
	      hyperapp.h(
	        'div',
	        {
	          'class': classnames('toast toast-transition', toastClass),
	          oncreate: function oncreate(el) {
	            sizeEl(el, true, true);
	          },
	          onclick: onToastClick
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

	var actions$3 = {
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

	var view$3 = function view(state, actions) {
	  return hyperapp.h(Toast, { show: state.show, msg: state.msg });
	};

	var api$3 = function api(_ref2) {
	  var toast = _ref2.toast;

	  return {
	    text: function text(msg, duration) {
	      return toast({ msg: msg, duration: duration });
	    }
	  };
	};

	var plugin$3 = {
	  state: defaultState$1,
	  actions: actions$3,
	  view: view$3,
	  api: api$3
	};

	var apis$3 = install(plugin$3);
	var Toast$1 = apiMixin(Toast, apis$3);

	// eslint-disable-next-line

	var View = function View(props, children) {
	  return hyperapp.h(
	    'div',
	    _extends({}, props, { 'class': classnames('view', props.class) }),
	    hyperapp.h(
	      'div',
	      { 'class': 'pages' },
	      children
	    )
	  );
	};

	exports.CSSTransition = CSSTransition;
	exports.runAndCleanUp = runAndCleanUp;
	exports.Button = index;
	exports.CheckboxItem = CheckboxItem;
	exports.ContentBlock = ContentBlock;
	exports.Dialog = Dialog$1;
	exports.ImgIcon = Icon;
	exports.List = List;
	exports.ListItem = ListItem;
	exports.Loading = Loading$1;
	exports.Overlay = Overlay;
	exports.enumOverlayTypes = enumOverlayTypes;
	exports.Page = Page;
	exports.Picker = Picker$1;
	exports.ContentPicker = ContentPicker;
	exports.InlinePicker = InlinePicker;
	exports.PickerToolbar = PickerToolbar;
	exports.Preloader = Preloader;
	exports.PullToRefresh = PullToRefresh;
	exports.enumRefreshStatus = enumRefreshStatus;
	exports.RadioItem = RadioItem;
	exports.RangeSlider = RangeSlider;
	exports.Toast = Toast$1;
	exports.Navbar = Navbar;
	exports.Toolbar = Toolbar;
	exports.ToolbarLink = ToolbarLink;
	exports.View = View;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

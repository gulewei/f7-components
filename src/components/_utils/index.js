export const noop = () => { }

/**
 * 添加类名
 * @param {HTMLElement} el
 * @param {string} className
 */
export function addClass (el, className) {
  // http://caniuse.com/#search=classList
  el.classList.add(className)
}

/**
 * 去除类名
 * @param {HTMLElement} el
 * @param {string} className
 */
export function removeClass (el, className) {
  // http://caniuse.com/#search=classList
  el.classList.remove(className)
}

/**
 * 修改样式
 * @param {HTMLElement} el
 * @param {object<string>} obj
 */
export function css (el, obj) {
  for (let key in obj) {
    el.style[key] = obj[key]
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
export function on (el, type, fn, options) {
  el.addEventListener(type, fn, options)
  return () => el.removeEventListener(type, fn, options)
}

export const requestAnimationFrame = window.requestAnimationFrame

/**
 * @param {HTMLElement} el
 * @param {Function} callback
 */
export function transitionEnd (el, callback) {
  const run = (e) => {
    callback && callback(e)
    offs.map(off => off())
  }

  const offs = ['webkitTransitionEnd', 'transitionend'].map(type => {
    return on(el, type, run)
  })
}

/**
 * Animation names
 */
export const ANIM_NAMES = {
  fadeIn: 'anim-fadein',
  fadeOut: 'anim-fadeout',
  slideIn: 'anim-slidein',
  slideOut: 'anim-slideOut',
  bounceIn: 'anim-bouncein',
  bounceOut: 'anim-bounceout'
}

/**
 * Size element make it center
 * @param {HTMLElement} el
 */
export function sizeEl (el, sizeTop, sizeLeft) {
  let size = {}

  if (sizeTop) {
    size['margin-top'] = `${el.offsetHeight / -2}px`
  }

  if (sizeLeft) {
    size['margin-left'] = `${el.offsetWidth / -2}px`
  }

  css(el, size)
}

import { app } from 'hyperapp'

export function createApp (getApp) {
  const div = document.createElement('div')
  const actions = app(
    ...getApp(() => {
      document.body.removeChild(div)
    }),
    div
  )
  document.body.appendChild(div)
  return actions
}

export function apiMixin (Component, apis) {
  const newComponent = Component
  for (let name in apis) {
    newComponent[name] = apis[name]
  }

  return newComponent
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
  const types = type.split(' ')
  const offs = types.map(type => {
    el.addEventListener(type, fn, options)
    return () => el.removeEventListener(type, fn, options)
  })
  return () => {
    offs.map(off => off())
  }
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

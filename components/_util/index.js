export function createElement () {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return {
    div,
    remove: () => {
      document.body.removeChild(div)
    }
  }
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

/**
 * https://github.com/dojo/widget-core/blob/master/src/animations/cssTransitions.ts
 */

let transitionEndName = ''
let animationEndName = ''

function determineNames (element) {
  if ('WebkitTransition' in element.style) {
    transitionEndName = 'webkitTransitionEnd'
    animationEndName = 'webkitAnimationEnd'
  } else if ('transition' in element.style || 'MozTransition' in element.style) {
    transitionEndName = 'transitionend'
    animationEndName = 'animationend'
  } else {
    throw new Error('Your browser is not supported')
  }
}

function initialize (element) {
  if (animationEndName === '') {
    determineNames(element)
  }
}

/**
 * @param {HTMLElement} element
 * @param {() => void} startAnimation
 * @param {() => void} finishAnimation
 */
export function runAndCleanUp (element, startAnimation, finishAnimation) {
  initialize(element)
  let finished = false
  let transitionEnd = function () {
    if (!finished) {
      finished = true
      element.removeEventListener(transitionEndName, transitionEnd)
      element.removeEventListener(animationEndName, transitionEnd)
      finishAnimation()
    }
  }
  startAnimation()
  element.addEventListener(animationEndName, transitionEnd)
  element.addEventListener(transitionEndName, transitionEnd)
}

export const raf = window.requestAnimationFrame

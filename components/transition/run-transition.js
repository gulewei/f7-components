/**
 * https://github.com/dojo/widget-core/blob/master/src/animations/cssTransitions.ts
 */

let transitionEndName = ''
let animationEndName = ''

const requestAnimationFrame = window.requestAnimationFrame

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

export function runExit (node, exitAnimationActive, exitAnimation, removeNode) {
  const activeClass = exitAnimationActive || `${exitAnimation}-active`

  runAndCleanUp(
    node,
    () => {
      node.classList.add(exitAnimation)

      requestAnimationFrame(function () {
        node.classList.add(activeClass)
      })
    },
    () => {
      removeNode()
    }
  )
}

export function runEnter (node, enterAnimationActive, enterAnimation, onEntered) {
  const activeClass = enterAnimationActive || `${enterAnimation}-active`

  runAndCleanUp(
    node,
    () => {
      node.classList.add(enterAnimation)

      requestAnimationFrame(function () {
        /**
         * bug: add enter-animation-active classname in this frame won't perform transition as expected, but add in next frame will.
         *
         * I don't know exactly, but I'm guessing that is beacuse we run this after node inserted into document,
         * add enter-animation classname may perform an frame immediately,
         * and add enter-animation-active classname here may merge into repaint in this same frame.
         */
        requestAnimationFrame(function () {
          node.classList.add(activeClass)
        })
      })
    },
    () => {
      node.classList.remove(enterAnimation)
      node.classList.remove(activeClass)
      if (onEntered) {
        onEntered(node)
      }
    }
  )
}

import { runAndCleanUp, raf } from '../_util/run-and-clean'

export {
  runAndCleanUp
}

export function runExit (node, exitAnimationActive, exitAnimation, removeNode) {
  const activeClass = exitAnimationActive || `${exitAnimation}-active`

  runAndCleanUp(
    node,
    () => {
      node.classList.add(exitAnimation)

      raf(function () {
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

      raf(function () {
        /**
         * bug: add enter-animation-active classname in this frame won't perform transition as expected, but add in next frame will.
         *
         * I don't know exactly, but I'm guessing that is beacuse we run this after node inserted into document,
         * add enter-animation classname may perform an frame immediately,
         * and add enter-animation-active classname here may merge into repaint in this same frame.
         */
        raf(function () {
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

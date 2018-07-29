import cc from 'classnames'
import { runEnter, runExit } from './run-transition'

/**
 * @typedef {Object} CSSTransitionProps
 * @prop {string} [enter]
 * @prop {string} [enterActive]
 * @prop {string} [exit]
 * @prop {string} [exitActive]
 * @prop {(el: HTMLElement) => void} [beforeEnter]
 * @prop {(el: HTMLElement) => void} [afterEnter]
 * @prop {(el: HTMLElement) => void} [beforeExit]
 * @prop {(el: HTMLElement, removeNode: () => void) => void} [afterExit]
 *
 * @param {CSSTransitionProps} props
 * @param {JSX.Element[]} children
 */
const CSSTransition = (props, children) => {
  const {
    enter,
    enterActive = `${enter}-active`,
    exit,
    exitActive = `${exit}-active`,
    beforeEnter,
    afterEnter = () => { },
    beforeExit,
    afterExit
  } = props

  const child = children[0]

  if (!child.attributes) {
    return child
  }

  const attr = child.attributes
  let replaceAttr = {}

  if (enter) {
    replaceAttr.oncreate = (el) => {
      if (enter) {
        runEnter(el, enterActive, enter, afterEnter)
      }
      // TOOD: why put this before runEnter can affect Toast animation
      if (beforeEnter) {
        beforeEnter(el)
      }
    }
  }

  if (exit) {
    replaceAttr.onremove = (el, done) => {
      if (beforeExit) {
        beforeExit(el)
      }
      if (exit) {
        runExit(el, exitActive, exit, afterExit ? () => afterExit(el, done) : done)
      }
    }
  }

  return {
    ...child,
    attributes: {
      ...attr,
      ...replaceAttr
    }
  }
}

export default CSSTransition

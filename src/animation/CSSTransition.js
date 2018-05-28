// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import run from './run-transition'
import hyperFn from '../fn'

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
const CSSTransition = (props, children) => {
  const {
    enter,
    enterActive = `${enter}-active`,
    exit,
    exitActive = `${exit}-active`
  } = props

  const child = hyperFn.childOnly(children)
  const attr = child.attributes
  let replaceAttr = {}

  if (enter) {
    replaceAttr.class = cc(attr.class, { [enter]: enter })
    replaceAttr.oncreate = (el) => {
      if (enter) {
        run.enter(el, enterActive, enter)
      }
      if (attr.oncreate) {
        attr.oncreate(el)
      }
    }
  }

  if (exit) {
    replaceAttr.onremove = (el, done) => {
      if (exit) {
        run.exit(el, exitActive, exit, done)
      }
      if (attr.onremove) {
        attr.onremove(el, () => { })
      }
    }
  }

  return hyperFn.cloneNode(child, replaceAttr)
}

export default CSSTransition

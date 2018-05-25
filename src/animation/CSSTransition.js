import { h } from 'hyperapp'
import Children from '../children'
import cc from 'classnames'
import anim from './run-transition'

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

  const child = Children.only(children)
  const attr = child.attributes

  return {
    ...child,
    attributes: {
      ...attr,
      class: cc(attr.class, { [enter]: enter }),
      oncreate: (el) => {
        if (enter) {
          anim.enter(el, enterActive, enter)
        }
        if (attr.oncreate) {
          attr.oncreate(el)
        }
      },
      onremove: (el, done) => {
        if (exit) {
          anim.exit(el, exitActive, exit, done)
        }
        if (attr.onremove) {
          attr.onremove(el, () => { })
        }
      }
    }
  }
}

export default CSSTransition

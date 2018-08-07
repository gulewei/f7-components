import { runEnter, runExit } from './run-transition'

/**
 * @typedef {Object} TransitionProps
 * @prop {string} [enter]
 * @prop {string} [enterActive]
 * @prop {(el: HTMLElement) => void} [onEnter]
 * @prop {(el: HTMLElement) => void} [afterEnter]
 * @prop {string} [exit]
 * @prop {string} [exitActive]
 * @prop {(el: HTMLElement, removeNode: () => void) => void} [onExit]
 * @prop {(el: HTMLElement, removeNode: () => void) => void} [afterExit]
 *
 * @param {TransitionProps} props
 * @param {JSX.Element[]} children
 */
function makeTransition (props, children) {
  const child = children[0]
  if (!child.attributes) {
    return child
  }
  const { attributes, ...rest } = child

  return {
    ...rest,
    attributes: {
      ...attributes,
      oncreate: (el) => {
        transitionEnter(el, props, attributes)
      },
      onremove: (el, done) => {
        transitionExit(el, props, attributes, done)
      }
    }
  }
}

function transitionEnter (el, props, attributes) {
  if (props.enter) {
    runEnter(el, props.enterActive, props.enter, props.afterEnter)
  }

  if (props.onEnter) {
    props.onEnter(el)
  }

  if (attributes.oncreate) {
    attributes.oncreate(el)
  }
}

function transitionExit (el, props, attributes, removeNode) {
  let directlyRemove = true

  if (props.exit) {
    runExit(el, props.exitActive, props.exit, removeNode, props.afterExit)
    directlyRemove = false
  }

  if (props.onExit) {
    props.onExit(el, removeNode)
    directlyRemove = false
  }

  if (attributes.onremove) {
    attributes.onremove(el, removeNode)
    directlyRemove = false
  }

  if (directlyRemove) {
    removeNode()
  }
}

export default (props, children) => {
  if (typeof children === 'function') {
    return (state, actions) => {
      return makeTransition(props, children(state, actions))
    }
  } else {
    return makeTransition(props, children)
  }
}

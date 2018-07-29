import { Component } from '../_util/interfaces'

export interface CSSTransitionProperties {
  /**
   * Enter class name
   */
  enter?: string

  enterActive?: string

  exit?: string

  exitActive?: string

  beforeEnter: (el: HTMLElement) => void

  afterEnter: (el: HTMLElement) => void

  beforeExit: (el: HTMLElement) => void

  afterExit: (el: HTMLElement, removeNode: () => void) => void
}

interface TransitionComponent<P> extends Component<P> {
  /**
   * Perform an animation
   */
  runAndCleanUp: (element: HTMLElement, startAnimation: () => void, finishAnimation: () => void) => void
  runEnter: (element: HTMLElement, enterAnimationActive: string, enterAnimation: string, afterEnter: (node: HTMLElement) => void) => void
  runExit: (element: HTMLElement, enterAnimationActive: string, enterAnimation: string, removeNode: () => void) => void
}

/**
 * Transition decarator component
 * Note: lifecyle hook `oncreate` and `onremove` of child will be repleaced, don't use them on child.
 */
declare const Transition: TransitionComponent<CSSTransitionProperties>

export default Transition
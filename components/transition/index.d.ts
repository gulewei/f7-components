import { Component } from '../_util/interfaces'

export interface CSSTransitionProperties {
  /**
   * A classname added when element was inserted into document, and will be removed when animation was completed.
   * PS: no enter-classname no animation
   */
  enter?: string
  /**
   * Classname add in next frame and removed when complete
   */
  enterActive?: string
  /**
   * A classname added when element is about to remove, and removed when animation was completed.
   * PS: no exit-classname no animation
   */
  exit?: string
  /**
   * Classname add in next frame and removed when complete
   */
  exitActive?: string
  /**
   * Animation hook when enter-animation completed.
   * As for other animtion hooks, you can just use lifecycle in children:
   * oncreate -> onEnter
   * onremove -> onExit
   * ondestroy -> onExited
   * PS: 
   * While perform exit-animation, onremove signature will be `(el: HTMLElement, noop: () => void) => void`
   * instead of original `(el: HTMLElement, done: () => void) => void`,
   * the second param used be a method to remove element when we done our stuff, now it bacome a method of noop, do nothing.
   * Element will be removed when exit-animation completed, not by yourself.
   */
  onEntered?: (el: HTMLElement) => void
  /**
   * Compute dynamic classnames for exit animation.
   * There is a `onremove` hook fired before a node is removed, but it fired from the old node. 
   * So if you need decide classnames from lastest state, you might need this.
   */
  getExitClasses?: () => ExitClasses
}

export type ExitClasses = {
  exit: string
  exitActive?: string
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
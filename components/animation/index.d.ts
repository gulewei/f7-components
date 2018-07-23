import { Component } from '../_util/interfaces'

/**
 * Perform an animation
 */
export function runAndCleanUp (): {
  (element: HTMLElement, startAnimation: () => void, finishAnimation: () => void): void
}

export function runEnter (): {
  (element: HTMLElement, enterAnimationActive: string, enterAnimation: string, afterEnter: (node: HTMLElement) => void): void
}

export function runExit (): {
  (element: HTMLElement, enterAnimationActive: string, enterAnimation: string, removeNode: () => void): void
}

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

/**
 * Transition decarator component
 * Note: lifecyle hook `oncreate` and `onremove` of child will be repleaced, don't use them on child.
 */
declare const CSSTransition: Component<CSSTransitionProperties>

export default CSSTransition
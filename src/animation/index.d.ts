import { Component } from 'hyperapp'

// export as namespace h7Animation

/**
 * Perform an animation
 */
export function runAndCleanUp(): {
  (element: HTMLElement, startAnimation: () => void, finishAnimation: () => void): void
}

/**
 * Transition decarator component
 */
declare const CSSTransition: Component<{
  /**
   * Enter class name
   */
  enter?: string

  enterActive?: string

  exit?: string

  exitActive?: string
}>

export default CSSTransition
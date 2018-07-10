import { Component } from 'hyperapp'

// export as namespace h7Animation

/**
 * Perform an animation
 */
export function runAndCleanUp (): {
  (element: HTMLElement, startAnimation: () => void, finishAnimation: () => void): void
}

export function runEnter (): {
  (element: HTMLElement, enterAnimationActive: string, enterAnimation: string): void
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
}

/**
 * Transition decarator component
 */
declare const CSSTransition: Component<CSSTransitionProperties>

export default CSSTransition
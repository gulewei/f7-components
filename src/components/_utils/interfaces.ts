export interface ElementProperties {

  key?: string

  class?: string

  onclick?: (e: Event) => void

  oncreate?: (el: HTMLElement) => void

  onupdate?: (el: HTMLElement, oldAttr: any) => void

  onremove?: (el: HTMLElement, done: () => void) => void

  ondestroy?: (el: HTMLElement) => void

  [restProps: string]: any

}

export interface TransitionProperties {
  /**
   * Enter transition class
   */
  enterClass?: string
  /**
   * Exit transition class
   */
  exitClass?: string

}

export interface WraperProperties {
  /**
   * Wrapered element visible
   */
  show: boolean
  /**
   * Wraper element key
   */
  wraperKey?: string
  /**
   * Wraper element class name
   */
  wraperClass?: string
  
}

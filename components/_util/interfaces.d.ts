import { VNode } from 'hyperapp'

export {
  VNode
}

export type Slot = string | VNode<any> | VNode<any>[]

type Fragment = Array<VNode<any> | string | number | boolean | null>
export interface Component<P extends ElementProperties = {}, C = any> {
  (props: P, children: Array<C>): VNode<any> | Fragment
}

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
   * enter transition class
   */
  enterClass?: string
  /**
   * exit transition class
   */
  exitClass?: string
}

export interface WraperProperties {
  /**
   * wrapered element visible
   */
  show: boolean
  /**
   * wraper element key
   */
  wraperKey?: string
  /**
   * wraper element class name
   */
  wraperClass?: string
}

export interface OuterHairlines {
  /**
   * removes outer hairlines
   */
  noHairlines?: boolean
}

export interface InnerHairlines {
  /**
   * removes inner hairlines
   */
  noHairlinesBetween?: boolean
}

export interface Bordered {
  noBorder?: boolean
}

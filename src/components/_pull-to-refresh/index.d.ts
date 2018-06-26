import { ElementProperties } from '../_utils/interfaces'
import { VNode, Component } from 'hyperapp'

export const enumRefreshStatus: {
  deactivate: 'deactivate',
  activate: 'activate',
  release: 'release',
  finish: 'finish'
}

export interface IPullToRefreshIndicator {
  deactivate?: VNode
  activate?: VNode
  release?: VNode
  finish?: VNode
}

export interface PullToRefreshProperties extends ElementProperties {
  /**
   * 
   */
  distance: number
  /**
   * 
   */
  indicator?: IPullToRefreshIndicator

  onRefresh: (finish: () => void) => void

  onContainerScroll?: (scrollTop: number, clientHeight: number) => void

  refreshStatus: string

  inScrolling: boolean
  
  updateRefreshStatus: (refreshStatus: string) => Object

  updateInScrolling: (inScrolling: boolean) => Object
}

declare const PullToRefresh: Component<PullToRefreshProperties>

export default PullToRefresh

export const state: {
  refreshStatus: string,
  inScrolling: boolean
}

export const actions: {
  updateRefreshStatus: (refreshStatus: string) => Object
  updateInScrolling: (inScrolling: boolean) => Object
}
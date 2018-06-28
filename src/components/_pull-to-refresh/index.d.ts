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

  onContainerScroll?: (e: HTMLElement) => void

  refreshStatus: string

  onRefreshChange: (status: string) => any

}

declare const PullToRefresh: Component<PullToRefreshProperties>

export default PullToRefresh

export const state: {
  refreshStatus: string
}

export const actions: {
  onRefreshChange: (status: string) => any
}
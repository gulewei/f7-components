import { ElementProperties, VNode, Component } from '../_utils/interfaces'

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
  /**
   * Initial state can only be 'deactivate' or 'release'.
   */
  refreshStatus: string

  onRefreshChange: (status: string) => any

}

declare const PullToRefresh: Component<PullToRefreshProperties>

export default PullToRefresh

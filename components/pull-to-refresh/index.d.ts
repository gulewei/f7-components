import { ElementProperties, VNode, Component } from '../_util/interfaces'

interface EnumRefreshStatus {
  deactivate: 'deactivate'
  activate: 'activate'
  release: 'release'
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

interface PullToRefreshComponent<P> extends Component<P> {
  STATUS: EnumRefreshStatus
}

declare const PullToRefresh: PullToRefreshComponent<PullToRefreshProperties>

export default PullToRefresh

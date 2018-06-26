// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import { enumRefreshStatus } from './constant'
import { PullToRefreshScroller } from './pull-to-refresh-scroller'

export const state = {
  refreshStatus: enumRefreshStatus.deactivate
}

export const actions = {
  onRefreshChange: (refreshStatus) => ({ refreshStatus })
}

const defaultIndicator = {
  deactivate: '下拉刷新',
  activate: '松开立即刷新',
  release: '加载中...',
  finish: '完成刷新'
}

/**
 * @typedef {Object} PullToRefreshProps
 * @prop {number} distance
 * @prop {Object<any>} [indicator]
 * @prop {(scrollTop: number, clientHeight: number) => void} [onContainerScroll]
 * @prop {(finish: () => void) => void} onRefresh
 * @prop {string} refreshStatus this prop must be controled
 * @prop {(status: string) => any} onRefreshChange
 */
const PullToRefresh = (props, children) => {
  const {
    // props
    distance = 25,
    indicator = {},
    onContainerScroll,

    // state & actions
    refreshStatus = enumRefreshStatus.deactivate,

    ...rests
  } = props

  props.distance = distance

  return (
    <div {...rests}
      class={cc('pull-to-refresh', rests.class)}
      onscroll={e => {
        onContainerScroll && onContainerScroll(e.target.scrollTop, e.target.clientHeight)
      }}
    >
      <div class="pull-to-refresh-wraper">
        <div
          class="pull-to-refresh-content"
          oncreate={el => {
            el._scroller = new PullToRefreshScroller()
              .bindEvents(el.parentNode.parentNode, el)
              .update(el, props, {})
          }}
          onupdate={(el, oldAttr) => {
            try {
              el._scroller.update(el, props, oldAttr)
            } catch (e) { }
          }}
          distance={distance}
          refreshStatus={refreshStatus}
        >
          <div key="indicator" class="pull-to-refresh-indicator">
            {indicator[refreshStatus] || defaultIndicator[refreshStatus]}
          </div>
          <div key="inner">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PullToRefresh

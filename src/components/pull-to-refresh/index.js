// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import { PullToRefreshScroller } from './pull-to-refresh-scroller'

export { enumRefreshStatus } from './constant'

const defaultIndicator = {
  deactivate: '下拉刷新',
  activate: '松开立即刷新',
  release: '加载中...',
  finish: '完成刷新'
}

/**
 * @typedef {Object} PullToRefreshProps
 * @prop {number} distance
 * @prop {Object} [indicator]
 * @prop {(e: HTMLElement) => void} [onContainerScroll]
 * @prop {(finish: () => void) => void} onRefresh
 * @prop {string} refreshStatus this prop must be controled
 * @prop {(status: string) => any} onRefreshChange
 *
 * @param {PullToRefreshProps} props
 */
const PullToRefresh = (props, children) => {
  const {
    // props
    distance = 25,
    indicator = {},
    onContainerScroll,
    // state
    refreshStatus,

    ...rests
  } = props

  props.distance = distance

  return (
    <div {...rests}
      class={cc('pull-to-refresh', rests.class)}
      onscroll={onContainerScroll}
    >
      <div class="pull-to-refresh-wraper">
        <div
          class="pull-to-refresh-content"
          oncreate={el => {
            el._scroller = new PullToRefreshScroller().bindEvents(el.parentNode.parentNode, el)
            el._scroller.update(el, props, {})
            el._scroller.ready(el, props)
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

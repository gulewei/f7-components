// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import { on, css } from '../_utils'
import BaseScroller from '../_utils/scroller'
import { runAndCleanUp } from '../../animation/run-transition'

/**
 * State of refreshing
 * @typedef {('deactivate' | 'activate' | 'release' | 'finish')} Refreshing
 */

/**
 * Pull-to-Refresh indicator
 * @typedef {Object} PtrIndicator
 * @prop {JSX.Element | string} [deactivate]
 * @prop {JSX.Element | string} [activate]
 * @prop {JSX.Element | string} [release]
 * @prop {JSX.Element | string} [finish]
 */

/**
 * Pull-to-Refresh state
 * @typedef {Object} PtrState
 * @prop {Refreshing} refreshing
 * @prop {number} startY
 * @prop {number} translateY
 * @prop {boolean} isTracking
 * @prop {boolean} isScrolling
 */

export const enumRefreshStatus = {
  deactivate: 'deactivate',
  activate: 'activate',
  release: 'release',
  finish: 'finish'
}

const defaultIndicator = {
  deactivate: '下拉刷新',
  activate: '松开立即刷新',
  release: '加载中...',
  finish: '完成刷新'
}

const transitionCls = 'pull-to-refresh-transition'

/**
 *
 */
const PullToRefresh = (props, children) => {
  const {
    // props
    distance = 25,
    indicator = {},
    onRefresh,
    onContainerScroll,

    // state & actions
    refreshStatus = enumRefreshStatus.deactivate,
    inScrolling,
    updateRefreshStatus,
    updateInScrolling,

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
            attachScroller(el, props)
          }}
          onupdate={(el, oldAttr) => {
            if (oldAttr.distance !== distance ||
              oldAttr.refreshStatus !== refreshStatus
            ) {
              el._scroller.setCallback(getCallback(el, props, el._scroller))
            }
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

export const state = {
  refreshStatus: enumRefreshStatus.deactivate,
  inScrolling: false
}

export const actions = {
  updateRefreshStatus: (refreshStatus) => ({ refreshStatus }),
  updateInScrolling: (inScrolling) => ({ inScrolling })
}

function attachScroller (container, content, props) {
  const scroller = new BaseScroller()
  scroller.initializeState(0)
  scroller.setSize(0, 0)
  scroller.setCallback(getCallback(content, props, scroller))

  // const { updateInScrolling } = props

  let inScrolling = false
  on(container, 'scroll', (e) => {
    inScrolling = e.target.scrollTop !== 0
  })

  const touchstart = (e) => {
    if (!inScrolling) {
      scroller.onTouchStart(e.touches, Date.now())
      content.classList.remove(transitionCls)
    }
  }
  const touchmove = (e) => {
    !inScrolling && scroller.onTouchMove(e.touches, Date.now())
  }
  const touchend = (e) => {
    if (!inScrolling) {
      scroller.onTouchEnd(e.touches, Date.now())
      content.classList.add(transitionCls)
    }
  }
  const events = {
    touchstart,
    touchmove,
    touchend,
    touchcancel: touchend
  }

  for (let eventName in events) {
    on(content, eventName, events[eventName])
  }

  content._scroller = scroller
}

function getCallback (el, props, scroller) {
  const {
    distance,
    refreshStatus: prevRefresh,
    updateRefreshStatus,
    onRefresh
  } = props

  const finish = () => {
    runAndCleanUp(
      el,
      () => {
        updateRefreshStatus(enumRefreshStatus.finish)
        window.requestAnimationFrame(() => {
          render(el, 0)
          scroller.updateTranslate(0)
        })
      },
      () => {
        updateRefreshStatus(enumRefreshStatus.deactivate)
      }
    )
  }

  return (translate, isMove) => {
    const isActivate = translate > distance

    let newRefresh
    let newTranslate

    if (isMove) {
      newTranslate = translate
      newRefresh = isActivate
        ? enumRefreshStatus.activate
        : enumRefreshStatus.deactivate
    } else {
      newTranslate = isActivate ? distance : 0
      newRefresh = isActivate
        ? enumRefreshStatus.release
        : enumRefreshStatus.deactivate
      scroller.updateTranslate(newTranslate)
    }

    render(el, newTranslate)
    if (prevRefresh !== newRefresh) {
      updateRefreshStatus(newRefresh)
      if (newRefresh === enumRefreshStatus.release) {
        onRefresh(finish)
      }
    }
  }
}

function render (content, translate) {
  const value = `translate3d(0, ${translate}px, 0)`
  css(content, {
    transform: value,
    webkitTransform: value,
    MozTransform: value
  })
}

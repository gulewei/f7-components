// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import '../css/pull-to-refresh.css'

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

const enumRefreshing = {
  deactivate: 'deactivate',
  activate: 'activate',
  release: 'release',
  finish: 'finish'
}

const defaultIndiacotr = {
  deactivate: '下拉刷新',
  activate: '松开立即刷新',
  release: '加载中...',
  finish: '完成刷新'
}

/** @type {PtrState} */
const state = {
  refreshing: enumRefreshing.deactivate,
  startY: 0,
  translateY: 0,
  isTracking: false,
  isScrolling: false
}

const actions = {
  doTouchStart: (touches) => ({ isTracking, isScrolling }) => {
    if (isTracking || isScrolling) {
      return
    }

    return {
      isTracking: true,
      startY: touches.item(0).pageY
    }
  },
  doTouchMove: ({ touches, distance }) => ({ startY, isTracking }) => {
    if (!isTracking) {
      return
    }

    const pageY = touches.item(0).pageY
    const translateY = Math.max(Math.pow((pageY - startY), 0.85), 0)

    return {
      translateY,
      refreshing: translateY > distance ? enumRefreshing.activate : enumRefreshing.deactivate
    }
  },
  doTouchEnd: (distance) => ({ isTracking, refreshing }) => {
    if (!isTracking) {
      return
    }

    const isActivate = refreshing === enumRefreshing.activate

    return {
      isTracking: false,
      translateY: isActivate ? distance : 0,
      refreshing: isActivate ? enumRefreshing.release : enumRefreshing.deactivate
    }
  },
  doScroll: (scrollTop) => ({ isScrolling }) => {
    const scroll = scrollTop !== 0
    if (scroll !== isScrolling) {
      return { isScrolling: scroll }
    }
  },
  doDeactivate: () => ({ refreshing }) => {
    if (refreshing === enumRefreshing.finish) {
      return { refreshing: enumRefreshing.deactivate }
    }
  },
  finish: () => ({ refreshing: enumRefreshing.finish, translateY: 0 })
}

/**
 * Pull-to-Refresh props
 * @typedef {Object} PtrProps
 * @prop {number} distance
 * @prop {PtrIndicator} indicator
 */
const view = (props, children) => {
  const {
    distance,
    indicator,
    onRefresh,

    // state
    isTracking,
    translateY,
    refreshing,

    // actions
    doTouchStart,
    doTouchMove,
    doTouchEnd,
    doScroll,
    doDeactivate,
    finish
  } = props

  const realIndicator = {
    ...defaultIndiacotr,
    ...indicator
  }

  if (refreshing === enumRefreshing.release) {
    onRefresh && onRefresh(finish)
  }

  return (
    <div style={{overflow: 'hidden', height: '100%'}}>
      <div
        class={cc('content', `ptr-state-${refreshing}`, { 'ptr-is-tracking': isTracking })}
        style={{ transform: `translate3d(0, ${translateY}px, 0)` }}
        ontouchstart={e => doTouchStart(e.touches)}
        ontouchmove={e => doTouchMove({ touches: e.touches, distance })}
        ontouchend={e => doTouchEnd(distance)}
        onanimationend={doDeactivate}
      >
        <div key="layer" class="ptr-layer">{realIndicator[refreshing]}</div>
        <div key="inner" class="content-inner" onscroll={e => doScroll(e.target.scrollTop)}>{children}</div>
      </div>
    </div>
  )
}

export default {
  state,
  actions,
  view
}

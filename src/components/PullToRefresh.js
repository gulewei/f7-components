// eslint-disable-next-line no-unused-vars
import { h } from 'hyperapp'
import cc from 'classnames'
import on from 'dom-helpers/events/on'
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

export default {
  /**
   * Pull-to-Refresh view
   * @typedef {Object} PtrProps
   * @prop {number} [distance=25]
   * @prop {PtrIndicator} [indicator={}]
   * @prop {(finish: Function) => void} onRefresh
   * @param {PtrProps} props
   */
  view: (props, children) => {
    const {
      distance = 25,
      indicator = {},
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
      finish,

      // rest
      ...rests
    } = props

    const realIndicator = {
      ...defaultIndiacotr,
      ...indicator
    }

    if (refreshing === enumRefreshing.release) {
      onRefresh && onRefresh(finish)
    }

    return (
      <div {...rests} class={cc('f7c-pull-to-refresh', rests.class)} onscroll={e => doScroll(e.target.scrollTop)}>
        <div class="f7c-pull-to-refresh-wraper">
          <div
            class={cc('f7c-pull-to-refresh-content', { 'f7c-pull-to-refresh-transition': !isTracking })}
            style={{ ...getTransformObj(translateY) }}
            oncreate={el => attachPullToRefresh(el, { doTouchStart, doTouchMove, doTouchEnd, doDeactivate }, distance)}
          >
            <div key="indicator" class="f7c-pull-to-refresh-indicator">{realIndicator[refreshing]}</div>
            <div key="inner">{children}</div>
          </div>
        </div>
      </div>
    )
  },

  actions: {
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
  },

  state: {
    refreshing: enumRefreshing.deactivate,
    startY: 0,
    translateY: 0,
    isTracking: false,
    isScrolling: false
  }
}

function getTransformObj (y) {
  const value = `translate3d(0, ${y}px, 0)`

  return {
    transform: value,
    webkitTransform: value,
    MozTransform: value
  }
}

function attachPullToRefresh (el, actions, distance) {
  const {
    doTouchStart,
    doTouchMove,
    doTouchEnd,
    doDeactivate
  } = actions

  on(el, 'touchstart', e => doTouchStart(e.touches))
  on(el, 'touchmove', e => doTouchMove({ touches: e.touches, distance }))
  on(el, 'touchend', e => doTouchEnd(distance))
  on(el, 'touchcancel', e => doTouchEnd(distance))
  on(el, 'transitionend', doDeactivate)
}

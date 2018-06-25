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

const enumRefreshStatus = {
  deactivate: 'deactivate',
  activate: 'activate',
  release: 'release',
  finish: 'finish'
}

const renderDefaultIndiacotr = (refreshStatus) => {
  return {
    deactivate: '下拉刷新',
    activate: '松开立即刷新',
    release: '加载中...',
    finish: '完成刷新'
  }[refreshStatus]
}

const PullToRefresh = (props, children) => {
  const {
    distance = 25,
    // indicator = {},
    renderIndicator = renderDefaultIndiacotr,
    // onRefresh,
    onRefreshChange,
    ...rests
  } = props

  return (
    <div {...rests}
      class={cc('pull-to-refresh', rests.class)}
    >
      <div class="pull-to-refresh-wraper">
        <div
          class="pull-to-refresh-content"
          oncreate={el => attachPullToRefresh({
            container: el.parentNode.parentNode,
            content: el,
            distance,
            onRefreshChange
          })}
        >
          <div key="indicator" class="pull-to-refresh-indicator">
            {renderDefaultIndiacotr()}
          </div>
          <div key="inner">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default PullToRefresh

export const m = {
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
      ...renderDefaultIndiacotr,
      ...indicator
    }

    if (refreshing === enumRefreshStatus.release) {
      // trigger refresh after render done
      onRefresh && setTimeout(() => onRefresh(finish), 0)
    }

    return (
      <div
        {...rests}
        class={cc('pull-to-refresh', rests.class)}
        onscroll={e => doScroll(e.target.scrollTop)}
      >
        <div class="pull-to-refresh-wraper">
          <div
            class={cc('pull-to-refresh-content', { 'pull-to-refresh-transition': !isTracking })}
            style={{ ...getTransformObj(translateY) }}
            oncreate={el => attachPullToRefresh(el, { doTouchStart, doTouchMove, doTouchEnd, doDeactivate }, distance)}
          >
            <div key="indicator" class="pull-to-refresh-indicator">{realIndicator[refreshing]}</div>
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
        refreshing: translateY > distance ? enumRefreshStatus.activate : enumRefreshStatus.deactivate
      }
    },
    doTouchEnd: (distance) => ({ isTracking, refreshing }) => {
      if (!isTracking) {
        return
      }

      const isActivate = refreshing === enumRefreshStatus.activate

      return {
        isTracking: false,
        translateY: isActivate ? distance : 0,
        refreshing: isActivate ? enumRefreshStatus.release : enumRefreshStatus.deactivate
      }
    },
    doScroll: (scrollTop) => ({ isScrolling }) => {
      const scroll = scrollTop !== 0
      if (scroll !== isScrolling) {
        return { isScrolling: scroll }
      }
    },
    doDeactivate: () => ({ refreshing }) => {
      if (refreshing === enumRefreshStatus.finish) {
        return { refreshing: enumRefreshStatus.deactivate }
      }
    },
    finish: () => ({ refreshing: enumRefreshStatus.finish, translateY: 0 })
  },

  state: {
    refreshing: enumRefreshStatus.deactivate,
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

// function attachPullToRefresh (el, actions, distance) {
//   const {
//     doTouchStart,
//     doTouchMove,
//     doTouchEnd,
//     doDeactivate
//   } = actions

//   on(el, 'touchstart', e => doTouchStart(e.touches))
//   on(el, 'touchmove', e => doTouchMove({ touches: e.touches, distance }))
//   on(el, 'touchend', e => doTouchEnd(distance))
//   on(el, 'touchcancel', e => doTouchEnd(distance))
//   on(el, 'transitionend', doDeactivate)
// }

function attachPullToRefresh ({ container, content, distance, onRefreshChange }) {
  const refresh = {
    status: enumRefreshStatus.deactivate,
    changeStatus (status) {
      refresh.status = status
      onRefreshChange(status, refresh.finish)
    },
    finish: () => {
      runAndCleanUp(
        content,
        () => {
          refresh.changeStatus(enumRefreshStatus.finish)
          content.classList.add('pull-to-refresh-transition')
        },
        () => {
          content.classList.remove('pull-to-refresh-transition')
          if (refresh.status === enumRefreshStatus.finish) {
            refresh.changeStatus(enumRefreshStatus.deactivate)
          }
        }
      )
    }
  }

  const scroller = new BaseScroller()
  scroller.setSize(0, 0)
  scroller.setCallback((translate, isMove) => {
    const isActivate = refresh.status === enumRefreshStatus.activate

    let newRefreshing
    let newTranslate

    if (isMove) {
      newTranslate = translate
      newRefreshing = translate > distance
        ? enumRefreshStatus.activate
        : enumRefreshStatus.deactivate
    } else {
      newTranslate = isActivate ? distance : 0
      newRefreshing = isActivate
        ? enumRefreshStatus.release
        : enumRefreshStatus.deactivate
    }

    css(content, getTransformObj(newTranslate))

    if (newRefreshing !== refresh.status) {
      refresh.changeStatus(newRefreshing)
    }
  })

  const scrolling = {
    status: false,
    changeStatus (status) {
      scrolling.status = status
    }
  }

  on(container, 'scroll', (e) => {
    scrolling.changeStatus(e.target.scrollTop !== 0)
  })

  const events = {
    touchstart: (e) => {
      !scrolling.status && scroller.onTouchStart(e.touches, Date.now())
    },
    touchmove: (e) => {
      !scrolling.status && scroller.onTouchMove(e.touches, Date.now())
    },
    touchend: (e) => {
      !scrolling.status && scroller.onTouchEnd(e.touches, Date.now())
    },
    touchcancel: (e) => {
      !scrolling.status && scroller.onTouchEnd(e.touches, Date.now())
    }
  }

  for (let { eventName, eventListener } in events) {
    on(eventName === 'scroll' ? container : content, eventName, eventListener)
  }
}

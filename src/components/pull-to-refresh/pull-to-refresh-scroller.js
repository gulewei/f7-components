import BaseScroller from '../_utils/scroller'
import { css, on } from '../_utils'
import { runAndCleanUp } from '../../animation/run-transition'
import { enumRefreshStatus, transitionCls } from './constant'

export class PullToRefreshScroller extends BaseScroller {
  constructor () {
    super()
    this.initializeState(0)
    this.setSize(0, 0)
  }

  bindEvents (containerEl, contentEl) {
    let isOnEdge = true
    const scroll = (e) => {
      isOnEdge = containerEl.scrollTop === 0
    }
    const touchstart = (e) => {
      if (isOnEdge) {
        this.onTouchStart(e.touches, Date.now())
        contentEl.classList.remove(transitionCls)
      }
    }
    const touchmove = (e) => {
      if (isOnEdge) {
        if (this._checkDirection(e.touches[0].pageY)) {
          this.onTouchMove(e.touches, Date.now())
        } else {
          touchend({ touches: [] })
        }
      }
    }
    const touchend = (e) => {
      if (isOnEdge) {
        this.onTouchEnd(e.touches, Date.now())
        contentEl.classList.add(transitionCls)
      }
    }
    const events = {
      scroll,
      touchstart,
      touchmove,
      touchend,
      touchcancel: touchend
    }

    for (let eventName in events) {
      on(containerEl, eventName, events[eventName])
    }

    return this
  }

  _checkDirection (currentY) {
    return currentY > this.state.startY
  }

  /**
   * @typedef {Object} Props
   * @prop {number} distance
   * @prop {string} refreshStatus
   * @prop {(status: string) => any} onRefreshChange
   * @prop {(finish: () => void) => void} onRefresh
   *
   * @param {HTMLElement} contentEl
   * @param {Props} props
   * @param {{distance: number, refreshStatus: string}} oldProps
   */
  update (contentEl, props, oldProps) {
    if (props.distance !== oldProps.distance ||
      props.refreshStatus !== oldProps.refreshStatus
    ) {
      this.setCallback((translate, isMove) => {
        const isActivate = translate > props.distance
        this[isMove ? '_drag' : '_drop'](contentEl, translate, props, isActivate)
      })
    }
  }

  _drag (contentEl, translate, props, isActivate) {
    render(contentEl, translate)

    const newRefresh = isActivate ? enumRefreshStatus.activate : enumRefreshStatus.deactivate
    if (newRefresh !== props.refreshStatus) {
      props.onRefreshChange(newRefresh)
    }
  }

  _drop (contentEl, translate, props, isActivate) {
    const newTranslate = isActivate ? props.distance : 0
    render(contentEl, newTranslate)
    if (newTranslate !== translate) {
      this.updateTranslate(newTranslate)
    }

    const newRefresh = isActivate ? enumRefreshStatus.release : enumRefreshStatus.deactivate
    if (newRefresh !== props.refreshStatus) {
      props.onRefreshChange(newRefresh)
      if (newRefresh === enumRefreshStatus.release) {
        const finish = this._getFinish(contentEl, props)
        props.onRefresh(finish)
      }
    }
  }

  _getFinish (contentEl, props) {
    return () => {
      runAndCleanUp(
        contentEl,
        () => {
          props.onRefreshChange(enumRefreshStatus.finish)
          window.requestAnimationFrame(() => {
            render(contentEl, 0)
          })
        },
        () => {
          props.onRefreshChange(enumRefreshStatus.deactivate)
          this.updateTranslate(0)
        }
      )
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

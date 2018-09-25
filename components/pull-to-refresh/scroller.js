import BaseScroller from '../_util/scroller'
import { runAndCleanUp, raf } from '../_util/run-and-clean'
import { css, on } from '../_util'
import { enumRefreshStatus, transitionCls } from './constant'

export default class PullToRefreshScroller extends BaseScroller {
  /**
   * run on create
   * @param {HTMLElement} containerEl
   * @param {HTMLElement} contentEl
   */
  bindEvents (containerEl, contentEl) {
    let isOnEdge = () => containerEl.scrollTop === 0
    const touchstart = (e) => {
      if (isOnEdge()) {
        this.onTouchStart(e.touches, Date.now())
      }
    }
    const touchmove = (e) => {
      const onEdge = isOnEdge()
      if (onEdge && !this.state.isTouched) {
        touchstart(e)
        // console.log(`startY: ${e.touches[0].pageY}`)
      } else if (onEdge && e.touches[0].pageY > this.state.startY) {
        // prevent unexpect browser behavier
        e.preventDefault()
        this.onTouchMove(e.touches, Date.now())
      } else if (this.state.isMoved) {
        touchend({ touches: [] })
        // console.log(`endY: ${e.touches[0].pageY}`)
      }
    }
    const touchend = (e) => {
      this.onTouchEnd(e.touches, Date.now())
    }
    const events = {
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
   * run on create and update
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
    runAndCleanUp(
      contentEl,
      () => {
        contentEl.classList.add(transitionCls)
        raf(() => {
          render(contentEl, newTranslate)
        })
      },
      () => {
        contentEl.classList.remove(transitionCls)
      }
    )
    if (newTranslate !== translate) {
      this.updateTranslate(newTranslate)
    }

    const newRefresh = isActivate ? enumRefreshStatus.release : enumRefreshStatus.deactivate
    if (newRefresh !== props.refreshStatus) {
      props.onRefreshChange(newRefresh)
      if (newRefresh === enumRefreshStatus.release) {
        this._release(contentEl, props)
      }
    }
  }

  _release (contentEl, props) {
    const finish = () => {
      runAndCleanUp(
        contentEl,
        () => {
          contentEl.classList.add(transitionCls)
          props.onRefreshChange(enumRefreshStatus.finish)
          raf(() => {
            render(contentEl, 0)
          })
        },
        () => {
          contentEl.classList.remove(transitionCls)
          props.onRefreshChange(enumRefreshStatus.deactivate)
        }
      )
      this.updateTranslate(0)
    }
    props.onRefresh(finish)
  }

  /**
   * run on create
   * @param {HTMLElement} contentEl
   * @param {Props} props
   */
  ready (contentEl, props) {
    this.setSize(0, 0)

    if (props.refreshStatus === enumRefreshStatus.release) {
      this.initializeState(props.distance)
      render(contentEl, props.distance)
      this._release(contentEl, props)
    } else if (props.refreshStatus === enumRefreshStatus.deactivate) {
      this.initializeState(0)
    } else {
      throw new Error(`F7cError in PullToRefresh: Initial state can only be 'deactivate' or 'release'`)
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

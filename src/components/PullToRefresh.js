// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import { f7app, $ } from '../utils'
import '../css/pull-to-refresh.css'

// eslint-disable-next-line
const PullToRefreshLayer = () => {
  return (
    <div class="pull-to-refresh-layer" key='pull-to-refresh-layer'>
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
  )
}

// eslint-disable-next-line
const InfinitePreloader = () => {
  return (
    <div
      key='infinite-scroll-preloader'
      class="infinite-scroll-preloader"
      style={{ display: 'none' }}
    >
      <div class="preloader"></div>
    </div>
  )
}

/**
 * 增加onRefresh, onInfinite对闭包支持
 */
const EVENT_REFRESH = 'f7refresh'
const EVENT_INFINITE = 'f7infinite'

/**
 * @typedef {Object} PullToRefreshProps
 * @prop {number} height
 * @prop {(done: Function) => void} [onRefresh]
 * @prop {boolean} [triggerRefreshOnCreate=false]
 * @prop {(done: Function, end: Function) => void} [onInfinite]
 * @prop {boolean} [triggerInfiniteOnCreate=false]
 * @param {PullToRefreshProps} props 
 * @param {JSX.Element[]} children 
 */
export const PullToRefresh = (props, children) => {
  const {
    height,
    // refresh
    onRefresh, triggerRefreshOnCreate = false,
    // infinit
    onInfinite, triggerInfiniteOnCreate = false,
    // other
    ...r
  } = props

  return (
    <div {...r} class={cc('f7c-pull-to-refresh', r.class)} style={{ height: height ? `${height}px` : 'auto' }}>
      <div
        class={cc('f7c-pull-to-refresh-el', {
          'pull-to-refresh-content': onRefresh,
          'infinite-scroll': onInfinite
        })}
        onf7refresh={e => onRefresh && onRefresh(e.detail.done)}
        onf7infinite={e => onInfinite && onInfinite(e.detail.done, e.detail.end)}
        oncreate={el => {
          if (onRefresh) {
            attchPullToRefresh(el, triggerRefreshOnCreate)
          }

          if (onInfinite) {
            attchInfiniteScroll(el, triggerInfiniteOnCreate)
          }
        }}
        ondestroy={el => {
          if (onRefresh) {
            f7app.destroyPullToRefresh(el)
          }

          if (onInfinite) {
            f7app.detachInfiniteScroll(el)
          }
        }}
      >
        {onRefresh && <PullToRefreshLayer />}
        {children}
        {onInfinite && <InfinitePreloader />}
      </div>
    </div>
  )
}

function attchPullToRefresh (el, triggerRefresh) {
  f7app.initPullToRefresh(el)

  const done = () => f7app.pullToRefreshDone()
  const $el = $(el)

  $el.on('refresh', e => $el.trigger(EVENT_REFRESH, { done }))

  if (triggerRefresh) {
    $el.trigger(EVENT_REFRESH, { done })
  }
}

function attchInfiniteScroll (el, triggerInfinite) {
  f7app.attachInfiniteScroll(el)

  const $el = $(el)
  const $preloader = $el.find('.infinite-scroll-preloader')

  let loading = false

  const done = () => {
    loading = false
    $preloader.hide()
  }
  const end = () => f7app.detachInfiniteScroll(el)

  const triggerF7Event = () => {
    loading = true
    $preloader.show()
    $el.trigger(EVENT_INFINITE, { done, end })
  }

  $el.on('infinite', e => !loading && triggerF7Event())

  if (triggerInfinite) {
    triggerF7Event()
  }
}

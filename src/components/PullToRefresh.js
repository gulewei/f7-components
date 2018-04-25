// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import { f7app, $ } from '../utils'
import EasyScroller from '../scroller'
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
 * @param {PullToRefreshProps} props
 * @param {JSX.Element[]} children
 */
const PullToRefreshInner = (props, children) => {
  const {
    onRefresh, triggerRefreshOnCreate = false
  } = props

  return (
    <div
      class={cc({ 'pull-to-refresh-content': onRefresh })}
      onf7refresh={e => onRefresh && onRefresh(e.detail.done)}
      oncreate={el => onRefresh && attchPullToRefresh(el, triggerRefreshOnCreate)}
      ondestroy={el => onRefresh && f7app.destroyPullToRefresh(el)}
    >
      {onRefresh && <PullToRefreshLayer />}
      {children}
    </div>
  )
}

/**
 * @param {PullToRefreshProps} props
 * @param {JSX.Element[]} children
 */
const InfiniteScroll = (props, children) => {
  const {
    height,
    onInfinite, triggerInfiniteOnCreate = false,
    oncreate, ondestroy, ...r
  } = props

  return (
    <div
      {...r} style={{ height: height ? `${height}px` : 'auto' }}
      class={cc('f7c-ptr', r.class, { 'infinite-scroll': onInfinite })}
      onf7infinite={e => onInfinite && onInfinite(e.detail.done, e.detail.end)}
      oncreate={el => {
        if (onInfinite) {
          attchInfiniteScroll(el, triggerInfiniteOnCreate)
        }
        if (oncreate) {
          oncreate(el)
        }
      }}
      ondestroy={el => {
        if (onInfinite) {
          f7app.detachInfiniteScroll(el)
        }
        if (ondestroy) {
          ondestroy(el)
        }
      }}
    >
      {children}
      {onInfinite && <InfinitePreloader />}
    </div>
  )
}

/**
 * @typedef {Object} PullToRefreshProps
 * @prop {(done: Function) => void} [onRefresh]
 * @prop {boolean} [triggerRefreshOnCreate=false]
 * @prop {number} height
 * @prop {(done: Function, end: Function) => void} [onInfinite]
 * @prop {boolean} [triggerInfiniteOnCreate=false]
 * @param {PullToRefreshProps} props
 * @param {JSX.Element[]} children
 */
export const PullToRefresh = (props, children) => {
  const {
    onRefresh, triggerRefreshOnCreate = false, ...r
  } = props

  return (
    <InfiniteScroll {...r}>
      {onRefresh
        ? <PullToRefreshInner {...{ onRefresh, triggerRefreshOnCreate }}>{children}</PullToRefreshInner>
        : children
      }
    </InfiniteScroll>
  )
}

/**
 * 增加onRefresh, onInfinite对闭包支持
 */
const EVENT_INFINITE = 'f7infinite'

function attchPullToRefresh (el, triggerRefresh) {
  // f7app.initPullToRefresh(el)

  // const done = () => f7app.pullToRefreshDone()
  // const $el = $(el)

  // $el.on('refresh', e => $el.trigger(EVENT_REFRESH, { done }))

  // if (triggerRefresh) {
  //   $el.trigger(EVENT_REFRESH, { done })
  // }

  el.__scroller = new EasyScroller(el, (x, y, z) => { }, {})
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

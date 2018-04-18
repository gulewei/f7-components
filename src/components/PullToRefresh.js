// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import { f7app, $ } from '../utils'

// eslint-disable-next-line
const PullToRefreshLayer = () => {
  return (
    <div class="pull-to-refresh-layer" key='pull-to-refresh-layer'>
      {/* <div class="preloader"></div> */}
      <div class="pull-to-refresh-arrow"></div>
    </div>
  )
}

// eslint-disable-next-line
const InfinitePreloader = (props) => {
  const {
    show,
    visible
  } = props

  return (
    <div
      key='infinite-scroll-preloader'
      class="infinite-scroll-preloader"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div class="preloader" style={{ visibility: visible ? 'visible' : 'hidden' }}></div>
    </div>
  )
}

export const PullToRefresh = (props, children) => {
  const {
    // refresh
    onRefresh,

    // infinit
    onInfinite,
    loading,
    toggleLoading,
    preloaderVisible = true,

    // other
    oncreate,
    ondestroy,
    ...r
  } = props

  return (
    <div {...r} class={cc('f7c-pull-to-refresh', { 'pull-to-refresh-content': onRefresh })}
      oncreate={el => {
        if (onRefresh) {
          attchPullToRefresh(el, onRefresh)
        }

        if (onInfinite) {
          attchInfiniteScroll(el, onInfinite, loading, toggleLoading)
        }

        if (oncreate) {
          oncreate(el)
        }
      }}
      ondestroy={el => {
        if (onRefresh) {
          f7app.destroyPullToRefresh(el)
        }

        if (onInfinite) {
          f7app.detachInfiniteScroll(el)
        }

        if (ondestroy) {
          ondestroy(el)
        }
      }}
    >
      {onRefresh && <PullToRefreshLayer />}
      {children}
      {onInfinite && <InfinitePreloader show={loading} visible={preloaderVisible} />}
    </div>
  )
}

function attchPullToRefresh (el, onRefresh) {
  f7app.initPullToRefresh(el)
  const done = () => f7app.pullToRefreshDone(el)
  $(el).on('refresh', e => {
    onRefresh(done)
    console.log('attach refresh, done')
  })
}

function attchInfiniteScroll (el, onInfinite, loading, toggleLoading) {
  f7app.attachInfiniteScroll(el)
  const start = () => toggleLoading(true)
  const end = () => toggleLoading(false)

  $(el).on('infinite', e => {
    console.log('attach infinit >>>>>>>>>')
    if (!loading) {
      onInfinite(start, end)
    }
  })

  console.log('attach infinit')
}

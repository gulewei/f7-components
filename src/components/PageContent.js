// eslint-disable-next-line
import { h } from 'hyperapp'
import cc from 'classnames'
import f7App from '@module/f7app'

const $ = window.Dom7

// eslint-disable-next-line
const PullToRefreshLayer = () => {
  return (
    <div class="pull-to-refresh-layer" key='pull-to-refresh-layer'>
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
  )
}

// TODO: a lot things
export const PageContent = ({ onRefresh, oncreate, key, ...r }, children) => {
  return (
    <div
      key={key}
      class={cc('page-content', { 'pull-to-refresh-content': !!onRefresh }, r.class)}
      oncreate={initPullToRefresh(oncreate, onRefresh)}
      {...r}
    >
      {onRefresh && <PullToRefreshLayer />}
      {children}
    </div>
  )
}

// eslint-disable-next-line
function initPullToRefresh(oncreate, onRefresh) {
  return el => {
    if (onRefresh) {
      f7App.initPullToRefresh(el)
      const done = () => f7App.pullToRefreshDone(el)
      $(el).on('refresh', e => onRefresh(done))
    }

    oncreate && oncreate(el)
  }
}

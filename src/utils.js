import f7app from '@module/f7app'
import { app } from 'hyperapp'

export { f7app }

export const $ = window.Dom7

export const noop = () => { }

export function install (state, actions, view, api) {
  const el = document.createElement('div')
  const appActions = app(state, actions, view, el)
  document.body.appendChild(el)

  return api(appActions)
}

export function isarray (arr) {
  return toString.call(arr) === '[object Array]'
}

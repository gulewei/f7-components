import 'framework7';
import { app } from 'hyperapp'

export const f7app = new window.Framework7()

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

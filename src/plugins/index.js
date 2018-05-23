import { app } from 'hyperapp'
import pickerPlugin from './picker'

export {
  pickerPlugin
}

export default function install ({ state, actions, view, api }) {
  const el = document.createElement('div')
  const appActions = app(state, actions, view, el)
  document.body.appendChild(el)

  return api(appActions)
}

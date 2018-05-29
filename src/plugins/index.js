import { app } from 'hyperapp'

export function install ({ state, actions, view, api }) {
  const el = document.createElement('div')
  const appActions = app(state, actions, view, el)
  document.body.appendChild(el)

  return api(appActions)
}

export default function (...plugins) {
  return plugins.reduce((modals, plugin) => {
    const installed = install(plugin)
    return {
      ...modals,
      ...installed
    }
  }, {})
}

export { default as loadingPlugin } from './loading'
export { default as toastPlugin } from './toast'
export { default as dialogPlugin } from './dialog'
export { default as pickerPlugin } from './picker'

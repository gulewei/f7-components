import { app } from 'hyperapp'

export function install (state, actions, view, api) {
  const el = document.createElement('div')
  const appActions = app(state, actions, view, el)
  document.body.appendChild(el)

  return api(appActions)
}

export function isarray (arr) {
  return toString.call(arr) === '[object Array]'
}

function modularApp (ownState, ownActions, connector) {
  return function getContaienr (key) {
    // auto generate key if not provided
    if (!key) {
      key = modularApp.prefix + (modularApp.modulars.length + 1)
      modularApp.modulars.push(key)
    }
    return {
      state: { [key]: ownState },
      actions: { [key]: ownActions },
      connector: (props, children) => (state, actions) => {
        return connector(state[key], actions[key], props, children)
      }
    }
  }
}

modularApp.modulars = []
modularApp.prefix = '_modular_'

export {
  modularApp
}

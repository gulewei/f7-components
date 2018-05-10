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

/**
 * @param {string[]} pathes
 */
export function setPath (pathes, value) {
  function f (pathes, acc) {
    const key = pathes.slice(-1).pop()
    if (key === undefined) {
      return acc
    }

    return f(pathes.slice(0, -1), { [key]: acc })
  }

  return f(pathes, value)
}

/**
 * @param {string[]} pathes
 * @param {*} obj
 */
export function getPath (pathes, obj) {
  return pathes.reduce((acc, path) => {
    return acc == null ? acc : acc[path]
  }, obj)
}

export class ProxyRender {
  getRender () {
    return (props, children) => (state, actions) => {
      this.state = state
      this.actions = actions
      const vnodes = this.render(props, children)
      if (typeof vnodes === 'function') {
        return vnodes(state, actions)
      }
      return vnodes
    }
  }

  render () {
    throw new Error('ProxyRender: render methods is not implemented')
  }
}

export default modularApp

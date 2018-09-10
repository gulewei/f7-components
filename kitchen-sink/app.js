// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter, Route } from 'hyperapp-hoa-router'
// eslint-disable-next-line
import { factories, RouterView } from './router'
// eslint-disable-next-line
import Layout from './Layout'
import modules from './demos'
import '../components/index.less'

/**
 * @typedef {Object} ModuleModel
 * @prop {Object} state
 * @prop {Object} actions
 * @prop {() => Object} [view]
 * @prop {string} title - page title and home list label
 * @prop {string} key - state key
 * @prop {string} [path] - router path
 * @prop {boolean} noLayout - no default layout
 *
 * @param {ModuleModel[]} modules
 */
function register (modules) {
  return {
    state: modules.reduce(
      (acc, { state, key }) => {
        return { ...acc, [key]: state }
      },
      {}
    ),
    actions: modules.reduce(
      (acc, { actions, key }) => {
        return { ...acc, [key]: actions }
      },
      {}
    ),
    view: (state, actions) => {
      window.$app = { state, actions }
      return (
        <RouterView>
          {
            modules.map(({ view, path, key, title, noLayout }) => {
              return (
                view && <Route
                  path={path}
                  render={(match) => {
                    const viewNode = view(state[key], actions[key], match)
                    return (
                      noLayout
                        ? viewNode
                        : <Layout title={title} key={path}>{viewNode}</Layout>
                    )
                  }}
                />
              )
            })
          }
        </RouterView>
      )
    }
  }
}

const { state, actions, view } = register(modules)
withRouter(app, { factories })(state, actions, view, document.body)

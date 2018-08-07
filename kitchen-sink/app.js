// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter, Route, Switch } from 'hyperapp-hoa-router'
// eslint-disable-next-line
import { View, Transition } from './components'
// eslint-disable-next-line
import Layout from './Layout'
import Home from './Home'
import { history, handleHistory, Router } from './router'
import { demos } from './demos'
import '../components/index.less'

/**
 * @typedef {Object} PageModel
 * @prop {Object} state
 * @prop {Object} actions
 * @prop {() => Object} [view]
 * @prop {string} title - page title and home list label
 * @prop {string} key - state key
 * @prop {string} [path] - router path
 * @prop {boolean} noLayout - no default layout
 *
 * @param {PageModel[]} models
 */
function main (pages) {
  return {
    state: pages.reduce(
      (acc, { state, key }) => {
        return { ...acc, [key]: state }
      },
      {}
    ),
    actions: pages.reduce(
      (acc, { actions, key }) => {
        return { ...acc, [key]: actions }
      },
      {}
    ),
    view: (state, actions) => {
      window.$app = { state, actions }
      return (
        <View>
          <Transition
            onEnter={el => actions[Router.key].pageEnter(el)}
            onExit={(el, done) => actions[Router.key].pageExit({ el, done })}
          >
            <Switch>
              {
                pages.map(({ view, path, key, title, noLayout }) => {
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
            </Switch>
          </Transition>
        </View>
      )
    }
  }
}
const { state, actions, view } = main(demos.concat(Home, Router))
const appActions = withRouter(app, history)(state, actions, view, document.body)
handleHistory(appActions[Router.key])

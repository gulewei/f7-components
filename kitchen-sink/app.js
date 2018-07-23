// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter, Route, Switch, Link } from 'hyperapp-hoa-router'
import { history } from './router'
import '../components/index.less'

// eslint-disable-next-line
import { View, runEnter, runExit, ImgIcon, ContentBlock, List, ListItem } from '../components'
// eslint-disable-next-line
import Layout from './Layout'
import pageList from './demos'

const F7Icon = <ImgIcon name='f7' />

const Home = {
  path: '/',
  key: 'home',
  title: 'F7 Components',
  state: {},
  actions: {},
  view: () => (_, { pageAnim }) => {
    return (
      <div>
        <ContentBlock title='Components' />
        <List>
          {
            pageList.map(({ title, path, key }) => {
              return (
                <Link
                  key={key}
                  to={path}
                  onclick={() => {
                    pageAnim.changeDirection('forward')
                  }}
                >
                  <ListItem media={F7Icon} title={title} isLink />
                </Link>
              )
            })
          }
        </List>
      </div>
    )
  }
}
const PageAnim = {
  state: {
    direction: 'center'
  },
  actions: {
    changeDirection: (direction) => {
      return { direction }
    },
    pageCreate: (el) => ({ direction }) => {
      if (direction === 'center') {
        return
      }
      direction === 'forward'
        ? runEnter(el, 'page-from-right-to-center', 'page-on-right', () => { })
        : runEnter(el, 'page-from-left-to-center', 'page-on-left', () => { })
    },
    pageRemove: ({ el, done }) => ({ direction }) => {
      direction === 'forward'
        ? runExit(el, 'page-from-center-to-left', 'page-on-center', done)
        : runExit(el, 'page-from-center-to-right', 'page-on-center', done)
    }
  },
  key: 'pageAnim'
}

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
function register (pages) {
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
        </View>
      )
    }
  }
}
const { state, actions, view } = register(pageList.concat(Home, PageAnim))
withRouter(app, history)(state, actions, view, document.body)

// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Transition, View } from './components'
// eslint-disable-next-line
import { Switch } from 'hyperapp-hoa-router'
// import createBrowserHistory from 'history/createBrowserHistory'

// export const history = createBrowserHistory({
// basename: '/#/'
// })

import createHashHistory from 'history/createHashHistory'
export const history = createHashHistory()

const sessionStorage = window.sessionStorage

/**
 * 历史记录
 */
const store = {
  key: '_hoa_router_session_',
  get () {
    return JSON.parse(sessionStorage.getItem(store.key)) || []
  },
  save (pathes) {
    sessionStorage.setItem(store.key, JSON.stringify(pathes))
  },
  push (pathes, pathname) {
    store.save(pathes.concat(pathname))
  },
  replace (pathes, pathname) {
    store.save(pathes.slice(0, -1).cancat(pathname))
  },
  pop (pathes) {
    store.save(pathes.slice(0, -1))
  }
}

/**
 * 判断动画放向
 * @param {Object} appActions
 */
const subscribe = (appActions) => {
  const { setForward, setBackward, setNone } = appActions[direction.key]
  history.listen((location, action) => {
    const pathes = store.get()
    switch (action) {
      case 'PUSH':
        store.push(pathes, location.pathname)
        setForward()
        break
      case 'REPLACE':
        store.replace(pathes, location.pathname)
        setNone()
        break
      case 'POP':
        if (pathes.indexOf(location.pathname) > -1) {
          store.pop(pathes, location.pathname)
          setBackward()
        } else {
          store.push(pathes, location.pathname)
          setForward()
        }
        break
    }
  })
}

/**
 * 动画方向
 */
const enumDirection = {
  none: 0,
  forward: 1,
  backward: 2
}

/**
 * 进场动画
 * @param {HTMLElement} el
 */
const performEnter = (el) => ({ direction }) => {
  if (direction === enumDirection.none) {
    return
  }
  direction === enumDirection.forward
    ? Transition.runEnter(el, 'page-from-right-to-center', 'page-on-right', () => { })
    : Transition.runEnter(el, 'page-from-left-to-center', 'page-on-left', () => { })
}

/**
 * 出场动画
 * @param {{el: HTMLElement, done: () => {}}} param0
 */
const performExit = ({ el, done }) => ({ direction }) => {
  if (direction === enumDirection.none) {
    return
  }
  direction === enumDirection.forward
    ? Transition.runExit(el, 'page-from-center-to-left', 'page-on-center', done)
    : Transition.runExit(el, 'page-from-center-to-right', 'page-on-center', done)
}

export const direction = {
  key: 'direction',
  view: false,
  state: { direction: enumDirection.none },
  actions: {
    performEnter,
    performExit,
    setForward: () => ({ direction: enumDirection.forward }),
    setBackward: () => ({ direction: enumDirection.backward }),
    setNone: () => ({ direction: enumDirection.none })
  },
  subscribe
}

/**
 * 页面动画容器
 * @param {*} _
 * @param {*} children
 */
export const RouterView = (_, children) => (_, appActions) => {
  return (
    <View>
      <Transition
        onEnter={el => appActions[direction.key].performEnter(el)}
        onExit={(el, done) => appActions[direction.key].performExit({ el, done })}
      >
        <Switch>{children}</Switch>
      </Transition>
    </View>
  )
}

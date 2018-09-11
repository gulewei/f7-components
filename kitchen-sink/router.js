// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Transition, View } from './components'
// eslint-disable-next-line
import { Switch, pathOf, routerFactory } from 'hyperapp-hoa-router'
import { sessionFactory } from './session'
import createHashHistory from 'history/createHashHistory'

export const history = createHashHistory({ hashType: 'hashbang' })

/**
 *
 * @param {'none' | 'forward' | 'backward'} direction
 */
const animProps = (direction) => {
  return {
    none: {
      enter: 'not-animated',
      enterActive: 'not-animated',
      exit: 'not-animated',
      exitActive: 'not-animated'
    },
    forward: {
      enter: 'page-on-right',
      enterActive: 'page-from-right-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-left'
    },
    backward: {
      enter: 'page-on-left',
      enterActive: 'page-from-left-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-right'
    }
  }[direction]
}

function animateFactory () {
  return {
    state: {},
    actions: {
      onPageEnter: (el) => ({ direction }) => {
        const animate = animProps(direction)
        Transition.runEnter(el, animate.enterActive, animate.enter, () => { })
      },
      onPageExit: ({ el, done }) => ({ direction }) => {
        const animate = animProps(direction)
        Transition.runExit(el, animate.exitActive, animate.exit, done)
      }
    },
    sub: () => () => { }
  }
}

export const factories = [
  routerFactory(history),
  sessionFactory(history),
  animateFactory()
]

export const runEnter = (a, el) => pathOf(a).onPageEnter(el)
export const runExit = (a, el, done) => pathOf(a).onPageExit({ el, done })

/**
 * 页面动画容器
 * @param {*} _
 * @param {*} children
 */
export const RouterView = (_, children) => (state, actions) => {
  return (
    <View>
      <TransitionWraper>
        <Switch>{children}</Switch>
      </TransitionWraper>
    </View>
  )
}

// eslint-disable-next-line
const TransitionWraper = ({ }, children) => (state, actions) => {
  let child = children[0]
  if (!child) {
    return child
  }
  if (typeof child === 'function') {
    child = child(state, actions)
  }
  const { oncreate, onremove } = child.attributes
  child.attributes.oncreate = (el) => {
    runEnter(actions, el)
    oncreate && oncreate(el)
  }
  child.attributes.onremove = (el, done) => {
    runExit(actions, el, done)
    onremove && onremove(el, () => { })
  }
  return child
}

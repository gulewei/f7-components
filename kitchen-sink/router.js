// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Transition, View } from './components'
// eslint-disable-next-line
import { Switch, pathOf, routerFactory } from 'hyperapp-hoa-router'
import sessionFactory from 'hyperapp-hoa-router/lib/session-factory'
import createHashHistory from 'history/createHashHistory'

export const history = createHashHistory({ hashType: 'hashbang' })

const animProps = (direction) => {
  return {
    // none
    none: {
      enter: 'not-animated',
      enterActive: 'not-animated',
      exit: 'not-animated',
      exitActive: 'not-animated'
    },
    // forward
    forward: {
      enter: 'page-on-right',
      enterActive: 'page-from-right-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-left'
    },
    // backward
    backward: {
      enter: 'page-on-left',
      enterActive: 'page-from-left-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-right'
    }
  }[direction]
}

const animateFactory = () => {
  return {
    state: {},
    actions: {
      onPageEnter: (el) => ({ direction }) => {
        Transition.runEnter(el, animProps[direction].enterActive, animProps[direction].enter, () => { })
      },
      onPageExit: ({ el, done }) => ({ direction }) => {
        Transition.runExit(el, animProps[direction].exitActive, animProps[direction].exit, done)
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

/**
 * 页面动画容器
 * @param {*} _
 * @param {*} children
 */
export const RouterView = (_, children) => {
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
  return children.map(child => {
    if (!child) {
      return child
    }
    if (typeof child === 'function') {
      child = child(state, actions)
    }
    const { oncreate, onremove } = child.attributes
    child.attributes.oncreate = (el) => {
      pathOf(actions).onPageEnter(el)
      oncreate && oncreate(el)
    }
    child.attributes.onremove = (el, done) => {
      pathOf(actions)({ el, done })
      onremove(el, () => { })
    }
    return child
  })
}

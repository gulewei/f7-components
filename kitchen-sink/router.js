import createBrowserHistory from 'history/createBrowserHistory'
import { Transition } from './components'

// History

export const history = createBrowserHistory({
  basename: '/#/'
})

// Handle session

const sessionStorage = window.sessionStorage

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

export function handleHistory ({ setForward, setBackward, setNone }) {
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

// Router module

const enumDirection = {
  none: 0,
  forward: 1,
  backward: 2
}

export const Router = {
  key: 'routeAnim',
  view: false,
  state: {
    direction: enumDirection.none
  },
  actions: {
    setForward () {
      return { direction: enumDirection.forward }
    },
    setBackward () {
      return { direction: enumDirection.backward }
    },
    setNone () {
      return { direction: enumDirection.none }
    },
    // Handle transition
    pageEnter: (el) => ({ direction }) => {
      if (direction === enumDirection.none) {
        return
      }
      direction === enumDirection.forward
        ? Transition.runEnter(el, 'page-from-right-to-center', 'page-on-right', () => { })
        : Transition.runEnter(el, 'page-from-left-to-center', 'page-on-left', () => { })
    },
    pageExit: ({ el, done }) => ({ direction }) => {
      if (direction === enumDirection.none) {
        return
      }
      direction === enumDirection.forward
        ? Transition.runExit(el, 'page-from-center-to-left', 'page-on-center', done)
        : Transition.runExit(el, 'page-from-center-to-right', 'page-on-center', done)
    }
  }
}

// export function handleTransitions (routerState, noneTranstionCls = '') {
//   if (routerState.direction === enumDirection.none) {
//     return {
//       enter: noneTranstionCls,
//       exit: noneTranstionCls
//     }
//   }

//   return routerState.direction === enumDirection.forward
//     ? {
//       enter: 'page-on-right',
//       enterActive: 'page-from-right-to-center',
//       exit: 'page-on-center',
//       exitActive: 'page-from-center-to-left'
//     }
//     : {
//       enter: 'page-on-left',
//       enterActive: 'page-from-left-to-center',
//       exit: 'page-on-center',
//       exitActive: 'page-from-center-to-right'
//     }
// }

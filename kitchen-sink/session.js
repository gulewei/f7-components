import { pathOf } from 'hyperapp-hoa-router'

const SESSION_KEY = '_hoa_router_session'
const store = window.sessionStorage
const getSession = (sessionKey) => JSON.parse(store.getItem(sessionKey))

const DIRECTION = {
  forward: 'forward',
  backward: 'backward',
  none: 'none'
}

function nextSession (location, action, stack) {
  let direction
  let nextStack
  let i
  switch (action) {
  case 'PUSH':
    nextStack = stack.concat(location)
    direction = DIRECTION.forward
    break
  case 'REPLACE':
    nextStack = stack.slice(0, -1).concat(location)
    direction = DIRECTION.none
    break
  case 'POP':
  default:
    i = stack.map(loc => loc.pathname).indexOf(location.pathname)
    direction = i > -1 ? DIRECTION.backward : DIRECTION.forward
    nextStack = i > -1 ? stack.slice(0, i + 1) : stack.concat(location)
  }
  return { stack: nextStack, direction }
}

export function sessionFactory (history, sessionKey = SESSION_KEY) {
  const setSession = (val) => store.setItem(sessionKey, JSON.stringify(val))
  const prevSession = getSession(sessionKey)
  const initSession = {
    stack: nextSession(history.location, history.action, prevSession ? prevSession.stack : []).stack,
    direction: DIRECTION.none
  }
  setSession(initSession)
  return {
    state: initSession,
    actions: {
      onSessionChange: ({ location, action }) => ({ stack }) => {
        const session = nextSession(location, action, stack)
        setSession(session)
        return session
      }
    },
    sub: (main) => {
      return history.listen((location, action) => {
        pathOf(main).onSessionChange({ location, action })
      })
    }
  }
}

/**
 * 
 * @return {'none' | 'forward' | 'backward'}
 */
export function getDirection (sessionKey = SESSION_KEY) {
  return getSession(sessionKey).direction || 'none'
}

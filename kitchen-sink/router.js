import createHashHistory from 'history/createHashHistory'
import { routerFactory } from 'hyperapp-hoa-router'
import { sessionFactory, getDirection } from './session'

export const history = createHashHistory({ hashType: 'hashbang' })

export const factories = [
  routerFactory(history),
  sessionFactory(history)
]

const animProps = {
  none: {
    enter: '',
    enterActive: '',
    exit: '',
    exitActive: ''
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
}

export function getClasses () {
  return animProps[getDirection()]
}

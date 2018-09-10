// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Transition, View } from './components'
// eslint-disable-next-line
import { Switch, pathOf } from 'hyperapp-hoa-router'
import createHashHistory from 'history/createHashHistory'

export const history = createHashHistory({ hashType: 'hashbang' })

/**
 * 动画方向
 */
const enumDirection = {
  none: 0,
  forward: 1,
  backward: 2
}

const findIndex = (path, stack) => stack.map(loc => loc.pathname).indexOf(path)
const animProps = ({ pathname, previous, stack }) => {
  const i = findIndex(pathname, stack)
  const j = findIndex(previous, stack)
  let direction
  if (j < 0 || i === j) {
    direction = enumDirection.none
  } else if (i > j) {
    direction = enumDirection.forward
  } else {
    direction = enumDirection.backward
  }
  return [
    // none
    {
      enter: '',
      enterActive: '',
      exit: '',
      exitActive: ''
    },
    // forward
    {
      enter: 'page-on-right',
      enterActive: 'page-from-right-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-left'
    },
    // backward
    {
      enter: 'page-on-left',
      enterActive: 'page-from-left-to-center',
      exit: 'page-on-center',
      exitActive: 'page-from-center-to-right'
    }
  ][direction]
}

/**
 * 页面动画容器
 * @param {*} _
 * @param {*} children
 */
export const RouterView = (_, children) => (state) => {
  return (
    <View>
      <Transition {...animProps(pathOf(state))}>
        <Switch>{children}</Switch>
      </Transition>
    </View>
  )
}

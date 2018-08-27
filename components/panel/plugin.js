import { h } from 'hyperapp'
import Panel from './Panel'

const defaultState = {
  children: [],
  show: false,
  notAnimated: false,
  position: 'left',
  effect: 'cover',
  overlayClass: '',
  panelClass: '',
  onOverlayClick: null,
  onOpen: null,
  onOpened: null,
  onClose: null,
  onClosed: null
}

const actions = {
  open: (props) => {
    return {
      ...props,
      show: true
    }
  },
  close: () => {
    return defaultState
  },
  update: (props) => {
    return props
  }
}

const view = (state, actions) => {
  const {
    show,
    children,
    ...props
  } = state

  return (
    <div class="panel-wraper">
      {show && <Panel {...props}>{children}</Panel>}
    </div>
  )
}

export default {
  state: defaultState,
  actions,
  view,
  api: actions => actions
}

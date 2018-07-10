// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter, Route, Switch } from 'hyperapp-hoa-router'
import { createHashHistory } from 'history'
import Home from './pages/Home'
import Button from './pages/Button'
import Forms from './pages/Forms'
import List from './pages/List'
import Modals from './pages/Modals'
import Overlay from './pages/Overlay'
import Picker from './pages/Picker'
import PullToRefresh from './pages/PullToRefresh'
import '../components/index.less'

withRouter(app, createHashHistory())(
  {
    forms: Forms.state,
    list: List.state,
    modals: Modals.state,
    overlay: Overlay.state,
    picker: Picker.state,
    ptr: PullToRefresh.state
  },
  {
    forms: Forms.actions,
    list: List.actions,
    modals: Modals.actions,
    overlay: Overlay.actions,
    picker: Picker.actions,
    ptr: PullToRefresh.actions
  },
  (state, actions) => {
    return (
      <Switch>
        <Route path="/" render={Home.view} />
        <Route path="/button" render={Button.view} />
        <Route path="/forms" render={() => Forms.view(state.forms, actions.forms) } />
        <Route path="/list" render={() => List.view(state.list, actions.list) } />
        <Route path="/modals" render={() => Modals.view(state.modals, actions.modals) } />
        <Route path="/overlay" render={() => Overlay.view(state.overlay, actions.overlay) } />
        <Route path="/picker" render={() => Picker.view(state.picker, actions.picker) } />
        <Route path="/pull-to-refresh" render={() => PullToRefresh.view(state.ptr, actions.ptr) } />
      </Switch>
    )
  },
  document.body
)

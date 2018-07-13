// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter } from 'hyperapp-hoa-router'
import { createHashHistory } from 'history'
import App from './App/App'
import '../components/index.less'

export const history = createHashHistory()
window.$history = history

withRouter(app, history)(App.state, App.actions, App.view, document.body)

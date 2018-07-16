// eslint-disable-next-line
import { h, app } from 'hyperapp'
// eslint-disable-next-line
import { withRouter } from 'hyperapp-hoa-router'
import App from './App/App'
import { history } from './router'
import '../components/index.less'

withRouter(app, history)(App.state, App.actions, App.view, document.body)

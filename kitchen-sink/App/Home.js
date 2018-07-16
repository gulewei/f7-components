// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { ContentBlock, List, ListItem, ImgIcon } from '../../components'
// eslint-disable-next-line
import { Link } from 'hyperapp-hoa-router'
import Layout from '../Layout'

// eslint-disable-next-line
const F7Icon = <ImgIcon name='f7' />

const routerList = [
  { title: 'Button', to: '/button' },
  { title: 'Forms', to: '/forms' },
  { title: 'List', to: '/list' },
  { title: 'Modals', to: '/modals' },
  { title: 'Overlay', to: '/overlay' },
  { title: 'Picker', to: '/picker' },
  { title: 'PullToRefresh', to: '/pull-to-refresh' },
  { title: 'Transition', to: '/transition' }
]

export default {
  state: {},
  actions: {},
  view: () => {
    return (
      <Layout key="home" title="F7 Components">
        <ContentBlock title='Components' />
        <List>
          {
            routerList.map(({ title, to }) => {
              return (
                <Link to={to} key={title}>
                  <ListItem media={F7Icon} title={title} isLink />
                </Link>
              )
            })
          }
        </List>
      </Layout>
    )
  }
}

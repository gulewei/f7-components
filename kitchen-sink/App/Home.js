// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Page, ContentBlock, List, ListItem, Navbar, ImgIcon } from '../../components'
// eslint-disable-next-line
import { Link } from 'hyperapp-hoa-router'

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
  { title: 'Animation', to: '/animation' }
]

export default {
  state: {},
  actions: {},
  view: () => {
    return (
      <Page
        key='home'
        navbar={
          <Navbar center='F7 Components' />
        }
      >
        <ContentBlock title='Components' />
        <List>
          {
            routerList.map(({ title, to }) => {
              return (
                <Link to={to}>
                  <ListItem media={F7Icon} title={title} isLink />
                </Link>
              )
            })
          }
        </List>
      </Page>
    )
  }
}

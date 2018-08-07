// eslint-disable-next-line
import { h } from 'hyperapp'
// eslint-disable-next-line
import { Link } from 'hyperapp-hoa-router'
// eslint-disable-next-line
import { ImgIcon, ContentBlock, List, ListItem } from './components'
// eslint-disable-next-line
import Layout from './Layout'
import { categories } from './demos'

const F7Icon = <ImgIcon name='f7' />

const Home = {
  path: '/',
  key: 'home',
  title: 'F7 Components',
  state: {},
  actions: {},
  noLayout: true,
  view: () => {
    return (
      <Layout
        key={Home.key}
        title={Home.title}
        noBackIcon
      >
        {
          categories.map(({ category, components }) => {
            return [
              <ContentBlock title={category} key={category} />,
              <List key={`${category}-list`}>
                {
                  components.map(({ title, path, key, view }) => {
                    return (
                      <Link
                        class="home-link"
                        key={key}
                        to={!!view && path}
                      >
                        <ListItem media={F7Icon} title={title} isLink={!!view} />
                      </Link>
                    )
                  })
                }
              </List>
            ]
          })
        }
      </Layout>
    )
  }
}

export default Home

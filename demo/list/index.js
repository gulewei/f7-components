/* eslint-disable no-unused-vars */
import { app, h } from 'hyperapp'
import Page from '../../src/components/page'
import List, { Item } from '../../src/components/list'
import ContentBlock from '../../src/components/content-block'
import Icon from '../../src/components/icon'

app(
  {
    full: [
      { title: 'Item Title', after: 'Label', icon: 'f7', isLink: false },
      { title: 'Item Title', after: 'Label', icon: 'f7', isLink: false },
      { title: 'Another Item', after: 'Another Label', icon: 'f7', isLink: false }
    ],
    label: 'List block label text goes here',
    title: ['Item Title', 'Item Title2', 'Another Item'],
    links: [
      { title: 'Item Title', after: 'Label', icon: 'f7', isLink: true },
      { title: 'Item Title', after: 'Label', icon: 'f7', isLink: true },
      { title: 'Another Item', after: 'Another Label', icon: 'f7', isLink: true }
    ]
  },
  {},
  (state, actions) => {
    return (
      <Page>
        <ContentBlock title="Full Layout" />
        <List label={state.label}>
          {state.full.map(({ title, after, icon, isLink }, i) => (
            <Item key={i} media={<Icon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>

        <ContentBlock title="Only titles" />
        <List>
          {state.title.map((title, i) => (
            <Item key={i} {...{ title }} />
          ))}
        </List>

        <ContentBlock title="Links" />
        <List label={state.label}>
          {state.links.map(({ title, after, icon, isLink }, i) => (
            <Item key={i} media={<Icon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>

        <ContentBlock title="Inset List Block" />
        <List label={state.label} inset>
          {state.full.map(({ title, after, icon, isLink }, i) => (
            <Item key={i} media={<Icon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>
      </Page>
    )
  },
  document.body
)

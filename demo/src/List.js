/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { ContentBlock, List, ListItem, ImgIcon } from '../../src'
import Layout from './Layout'

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.'

export default {
  state: {
    basic: [
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
    ],

    multipleLines: [
      { title: 'Yellow Submarine', after: '$15', subTitle: 'Beatles', text, img: 'http://hhhhold.com/160/d/jpg?1', isLink: true },
      { title: `Don't Stop Me Now`, after: '$22', subTitle: 'Queen', text, img: 'http://hhhhold.com/160/d/jpg?2', isLink: true },
      { title: 'Billie Jean', after: '$16', subTitle: 'Michael Jackson', text, img: 'http://hhhhold.com/160/d/jpg?3', isLink: true }
    ],
    mails: [
      { title: 'Facebook', after: '17:14', subTitle: 'New messages from John Doe', text, isLink: true },
      { title: 'John Doe (via Twitter)', after: '17:14', subTitle: 'John Doe (@_johndoe) mentioned you on Twitter!', text, isLink: true },
      { title: 'Facebook', after: '17:14', subTitle: 'New messages from John Doe', text, isLink: true },
      { title: 'John Doe (via Twitter)', after: '17:14', subTitle: 'John Doe (@_johndoe) mentioned you on Twitter!', text, isLink: true }
    ],
    simples: [
      { title: 'Yellow Submarine', subTitle: 'Beatles', isLink: true, icon: 'f7' },
      { title: `Don't Stop Me Now`, subTitle: 'Queen', isLink: true, icon: 'f7' },
      { title: 'Billie Jean', subTitle: 'Michael Jackson', isLink: true, icon: 'f7' }
    ]
  },
  actions: {},
  view: (state, actions) => {
    return (
      <Layout key='d_list' title='List'>
        <ContentBlock title="Full Layout" />
        <List label={state.label}>
          {state.basic.map(({ title, after, icon, isLink }, i) => (
            <ListItem key={i} media={<ImgIcon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>

        <ContentBlock title="Only titles" />
        <List>
          {state.title.map((title, i) => (
            <ListItem key={i} {...{ title }} />
          ))}
        </List>

        <ContentBlock title="Links" />
        <List label={state.label}>
          {state.links.map(({ title, after, icon, isLink }, i) => (
            <ListItem key={i} media={<ImgIcon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>

        <ContentBlock title="Inset List Block" />
        <List label={state.label} inset>
          {state.basic.map(({ title, after, icon, isLink }, i) => (
            <ListItem key={i} media={<ImgIcon name={icon} />} {...{ title, after, isLink }} />
          ))}
        </List>

        <ContentBlock title="Media List" />
        <List>
          {state.multipleLines.map(({ img, ...rest }, i) => (
            <ListItem key={i} media={<img src={img} width="80" />} {...rest} />
          ))}
        </List>

        <ContentBlock title="Mail App" />
        <List>
          {state.mails.map((mail, i) => (
            <ListItem key={i} {...mail} />
          ))}
        </List>

        <ContentBlock title="Something more simple" />
        <List>
          {state.simples.map(({ icon, ...item }, i) => (
            <ListItem key={i} media={<ImgIcon name={icon} />} {...item} />
          ))}
        </List>

        <ContentBlock title="Inset" />
        <List inset label={state.label}>
          {state.simples.map(({ icon, ...item }, i) => (
            <ListItem key={i} media={<ImgIcon name={icon} />} {...item} />
          ))}
        </List>
      </Layout>
    )
  }
}

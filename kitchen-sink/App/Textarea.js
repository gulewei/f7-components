import { h } from 'hyperapp'
import Layout from '../Layout'
import { ContentBlock, List, TextareaItem } from '../../components'

export default {
  state: {
    item: '',
    resizable: '',
    list: '',
    top: ''
  },
  actions: {
    set: (props) => props
  },
  view: (state, actions) => {
    return (
      <Layout key="textarea" title="Textarea">
        <ContentBlock title="Textarea Item" />
        <List>
          <TextareaItem
            value={state.item}
            onChange={item => actions.set({ item })}
            placeholder="Textarea Item"
            maxlength="15"
            rows="2"
          />
        </List>

        <ContentBlock title="Textarea Resizable" />
        <List>
          <TextareaItem
            resizable
            value={state.resizable}
            onChange={resizable => actions.set({ resizable })}
            placeholder="Textarea Resizable"
          />
        </List>

        <ContentBlock title="Textarea in List" />
        <List>
          <TextareaItem
            title="Text"
            alignTop
            resizable
            value={state.list}
            onChange={list => actions.set({ list })}
            placeholder="Text here"
          />
          <TextareaItem
            title="Text2"
            alignTop
            value={state.top}
            onChange={top => actions.set({ top })}
            placeholder="Align top"
          />
        </List>
      </Layout>
    )
  }
}

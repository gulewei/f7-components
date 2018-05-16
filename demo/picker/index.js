/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import List from '../../src/components/list'
import InputItem from '../../src/components/input-item'
import PickerModal from '../../src/components/picker/picker-modal'
import { PickerItemsCol } from '../../src/components/picker/picker-view'

app(
  {
    book: 'book',
    picker: {
      show: false,
      data: [
        { label: '星期一', value: 'mon' },
        { label: '星期二', value: 'tue' },
        { label: '星期三', value: 'wen' },
        { label: '星期四', value: 'thu' },
        { label: '星期五', value: 'fri' },
        { label: '星期六', value: 'sat' },
        { label: '星期一', value: 'mon' },
        { label: '星期二', value: 'tue' },
        { label: '星期三', value: 'wen' },
        { label: '星期四', value: 'thu' },
        { label: '星期五', value: 'fri' },
        { label: '星期六', value: 'sat' },
        { label: '星期日', value: 'sun' }
      ]
    }
  },
  {
    picker: {
      open: () => {
        return {
          show: true
        }
      },
      close: () => {
        return {
          show: false
        }
      }
    }
  },
  (state, actions) => {
    return (
      <Page>
        <ContentBlock title="Picker" />
        <List>
          <InputItem
            title="Picker-Item"
            value={state.book}
            onclick={actions.picker.open}
            readonly
            isLink
          />
        </List>
        <PickerModal
          show={state.picker.show}
          right={
            <a class="link" onclick={actions.picker.close}>Done</a>
          }
          close={actions.picker.close}
          pickerItems
        >
          {/* <ContentBlock>It's a Picker Modal</ContentBlock> */}
          <PickerItemsCol
            data={state.picker.data}
          />
        </PickerModal>
      </Page>
    )
  },
  document.body
)

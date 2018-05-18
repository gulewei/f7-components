/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import ContentBlock from '../../src/components/content-block'
import List from '../../src/components/list'
import InputItem from '../../src/components/input-item'
import PickerModal from '../../src/components/picker/picker-modal'
import PickerView from '../../src/components/picker/picker-view'

const pickerItem = (label, value) => {
  return { label, value }
}

const mocker = {
  range (start, end) {
    let ranges = []
    for (let i = start; i <= end; i++) {
      ranges.push(i)
    }
    return ranges
  },

  mons () {
    return mocker.range(1, 12).map(m => pickerItem(`${m}月`, m))
  },

  dates (mon) {
    const a = [4, 6, 9, 11]
    const b = 2
    const maper = (date) => {
      return pickerItem(`${date}日`, date)
    }

    if (a.indexOf(mon) > -1) {
      return mocker.range(1, 30).map(maper)
    } else if (mon === b) {
      return mocker.range(1, 28).map(maper)
    } else {
      return mocker.range(1, 31).map(maper)
    }
  },

  cascadeDate () {
    return mocker.mons().map(({ value, label }) => {
      return {
        label,
        value,
        children: mocker.dates(value)
      }
    })
  }
}

app(
  {
    book: 'book',
    picker: {
      show: false,
      data: mocker.cascadeDate()
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
          <PickerView
            cascade
            data={state.picker.data}
            value={[5, 18]}
          />
        </PickerModal>
      </Page>
    )
  },
  document.body
)

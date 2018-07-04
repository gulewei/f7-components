/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Page, ContentBlock, List, ListItem, Picker, PickerToolbar } from '../../src'
import Layout from '../Layout'

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
  },

  data () {
    return mocker.range(1, 12).map(m => pickerItem(`${m} mon`, m))
  }
}

const singleColumn = mocker.data()
const cascadeColumn = mocker.cascadeDate()

export default {
  state: {
    date: [5, 18],
    picker: {
      show: false
    }
  },
  actions: {
    pickeDate: (date) => {
      return { date }
    },
    picker: {
      open: () => {
        return { show: true }
      },
      close: () => {
        return { show: false }
      }
    }
  },
  view: (state, actions) => {
    window.$_picker = { state, actions }

    return (
      <Layout
        key='picker'
        title='Picker'
        outside={
          <Picker
            show={state.picker.show}
            items={cascadeColumn}
            cascade={true}
            values={state.date}
            onOverlayClick={actions.picker.close}
            onChange={values => {
              actions.pickeDate(values)
            }}
            toolbar={
              <PickerToolbar right={
                // <PickerLink text="Done" onclick={actions.picker.close} />
                <a class="link" onclick={actions.picker.close}>Done</a>
              } />
            }
          />
        }
      >
        <ContentBlock title="Picker" />
        <List>
          <ListItem
            isLink
            title="Picker Item"
            input={
              <input
                type="text"
                value={state.date.join(' - ')}
                onclick={actions.picker.open}
                readonly
              />
            }
          />
        </List>
      </Layout>
    )
  }
}

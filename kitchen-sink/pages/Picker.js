/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { ContentBlock, List, ListItem, Picker, PickerToolbar } from '../../components'
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
    date2: [7, 10],
    picker: {
      show: false
    }
  },
  actions: {
    pickeDate: (date) => {
      return { date }
    },
    pickeDate2: (date2) => {
      return { date2 }
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
    window.$_internal_picker = Picker.internalState

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
            title="Picker"
            input={
              <input
                type="text"
                value={state.date.join(' - ')}
                onclick={actions.picker.open}
                readonly
              />
            }
          />
          <ListItem
            isLink
            title="Method"
            input={
              <input
                type="text"
                value={state.date2.join(' - ')}
                onclick={() => {
                  Picker.open({
                    items: cascadeColumn,
                    cascade: true,
                    values: state.date2,
                    onChange: actions.pickeDate2
                  })
                }}
                readonly
              />
            }
          />
        </List>
      </Layout>
    )
  }
}

/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { ContentBlock, List, Picker } from '../components'
import Layout from '../Layout'

const pickerItem = (label, value) => {
  return { label, value }
}

const mocker = {
  _range (start, end) {
    let ranges = []
    for (let i = start; i <= end; i++) {
      ranges.push(i)
    }
    return ranges
  },
  _mons () {
    return mocker._range(1, 12).map(m => pickerItem(`${m}月`, m))
  },
  _dates (mon) {
    const a = [4, 6, 9, 11]
    const b = 2
    const maper = (date) => {
      return pickerItem(`${date}日`, date)
    }

    if (a.indexOf(mon) > -1) {
      return mocker._range(1, 30).map(maper)
    } else if (mon === b) {
      return mocker._range(1, 28).map(maper)
    } else {
      return mocker._range(1, 31).map(maper)
    }
  },
  cascade () {
    return mocker._mons().map(({ value, label }) => {
      return {
        label,
        value,
        children: mocker._dates(value)
      }
    })
  },
  simple () {
    return [
      'Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot'.split(' ')
        .map(label => pickerItem(label, label)),
      'Man Luthor Woman Boy Girl Person Cutie Babe Raccoon'.split(' ').map(label => pickerItem(label, label))
    ]
  },
  single () {
    return ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3'].map(label => pickerItem(label, label))
  }
}

const singelData = mocker.single()
const simpleData = mocker.simple()
const cascadeData = mocker.cascade()

export default {
  key: 'pickers',
  title: 'Picker',
  state: {
    contentShow: false,
    outside: {
      show: false
    },
    cascade: [5, 18],
    two: ['Super', 'Man'],
    single: ['iPhone 4'],
    custom: ['Super', 'Man'],
    inline: ['Super', 'Man']
  },
  actions: {
    contentAction: (show) => {
      return { contentShow: show }
    },
    outside: {
      open: () => {
        return { show: true }
      },
      close: () => {
        return { show: false }
      }
    },
    cascadeAction: (value) => {
      return { cascade: value }
    },
    twoAction: (value) => {
      return { two: value }
    },
    singleAction: (value) => {
      return { single: value }
    },
    customAction: (value) => {
      return { custom: value }
    },
    inlineAction: (value) => {
      return { inline: value }
    }
  },
  noLayout: true,
  view: (state, actions) => {
    window.$_picker = { state, actions }

    return (
      <Layout
        key='picker'
        title='Picker'
        outside={[
          // custom toolbar
          <Picker
            show={state.outside.show}
            items={simpleData}
            values={state.custom}
            onOverlayClick={actions.outside.close}
            onChange={actions.customAction}
            onClose={() => {
              console.log('custom toolbar close')
            }}
            onOpen={() => {
              console.log('custom toolbar open')
            }}
            toolbar={
              <Picker.Toolbar
                cancelText="Give up"
                onCancel={actions.outside.close}
                okText="Ok"
                onOk={actions.outside.close}
              >
              </Picker.Toolbar>
            }
          />,
          // content picker
          <Picker.Modal
            show={state.contentShow}
            onOverlayClick={() => actions.contentAction(false)}
            onClose={() => {
              console.log('content picker close')
            }}
            onOpen={() => {
              console.log('content picker open')
            }}
            toolbar={
              <Picker.Toolbar
                okText="Done"
                onOk={() => actions.contentAction(false)}
              >
              </Picker.Toolbar>
            }
          >
            <ContentBlock>
              <h4>Info 1</h4>
              <p>Lorem ipsum dolor...</p>
            </ContentBlock>
          </Picker.Modal>
        ]}
      >
        <ContentBlock title="Picker With Single Value" />
        <List>
          <List.Item
            input={
              <input
                type="text"
                value={state.single.join('')}
                onclick={() => {
                  Picker.open({
                    items: singelData,
                    values: state.single,
                    onChange: actions.singleAction,
                    onOpen: () => {
                      console.log('Picker With Single Value opened')
                    },
                    onClose: () => {
                      console.log('Picker With Single Value closed')
                    }
                  })
                }}
                readonly
              />
            }
          />
        </List>
        <ContentBlock title="Two Values" />
        <List>
          <List.Item
            input={
              <input
                type="text"
                value={state.two.join(' ')}
                onclick={() => {
                  Picker.open({
                    items: simpleData,
                    values: state.two,
                    onChange: actions.twoAction,
                    onOpen: () => {
                      console.log('Two Values opened')
                    },
                    onClose: () => {
                      console.log('Two Values closed')
                    }
                  })
                }}
                readonly
              />
            }
          />
        </List>
        <ContentBlock title="Cascade Values" />
        <List>
          <List.Item
            input={
              <input
                type="text"
                value={state.cascade.join(' - ')}
                onclick={() => {
                  Picker.open({
                    items: cascadeData,
                    values: state.cascade,
                    onChange: actions.cascadeAction,
                    cascade: true
                  })
                }}
                readonly
              />
            }
          />
        </List>
        <ContentBlock title="Custom toolbar" />
        <List>
          <List.Item
            input={
              <input
                type="text"
                value={state.custom.join(' ')}
                onclick={actions.outside.open}
                readonly
              />
            }
          />
        </List>
        <ContentBlock title="Content Picker">
          <a class="link" onclick={() => actions.contentAction(true)}>open content</a>
          <p>
            <a
              class="link"
              onclick={() => {
                Picker.modal({
                  content: (
                    <ContentBlock>
                      <h4>Info 1</h4>
                      <p>Lorem ipsum dolor...</p>
                    </ContentBlock>
                  )
                })
              }}
            >
              open content by method
            </a>
          </p>
        </ContentBlock>
        {/* <ContentBlock title="Inline toolbar" />
        <List>
          <List.Item
            input={
              <input
                type="text"
                readonly
                value={state.inline.join(' ')}
              />
            }
          />
        </List>
        <InlinePicker
          items={simpleData}
          values={state.inline}
          onChange={actions.inlineAction}
        /> */}
      </Layout >
    )
  }
}

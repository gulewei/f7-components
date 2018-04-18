/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import {
  Navbar,
  Page, PageContent,
  Button,
  List, Item,
  Checkbox, Radio, InputItem,
  Picker, PickerView,
  PullToRefresh,
  alert, confirm, dialog, setDialog,
  toast, setToast,
  loading
} from '@module/f7-components'
import '../style.css'

const state = {
  checked: false,
  radio: 'radio1',
  input: '123',
  picker: ['c', 'f'],
  picker2: ['e', 'f'],
  loading: true,
  mocks: []
}

const actions = {
  toggleCheckBox (checked) {
    return { checked }
  },
  toggleRadio: radio => ({ radio }),
  input: input => ({ input }),
  onPickerChange: picker => ({ picker }),
  onPickerChange2: picker => ({ picker }),
  appendMocks: mocks => state => ({ mocks: state.mocks.concat(mocks) }),
  resetMocks: mocks => ({ mocks }),
  toggleLoading: loading => ({ loading })
}

const Area = (props, children) => {
  return (
    <div class="area" style={{ display: props.hidden ? 'none' : 'block' }}>
      <p>{props.title}</p>
      {children}
    </div>
  )
}

const ButtonArea = (props) => (state, actions) => {
  return (
    <Area title="Buttons" {...props}>
      <Button >button default</Button><br />
      <Button fill round >button fill & round</Button> <br />
      <Button big text='button big' /> <br />
      <Button disabled fill>button fill & disabled</Button> <br />
    </Area>
  )
}

const ModalArea = (props) => (state, actions) => {
  return props.hidden ? false : (
    <div>
      {/* dialog */}
      <Area title="Dialogs">
        <div class="row">
          <div class="col-50">
            <Button fill big onclick={_ => alert('alert 123')}>Alert</Button>
          </div>
          <div class="col-50">
            <Button fill big onclick={_ => confirm('confrim 123')}>Confrim</Button>
          </div>
        </div>
      </Area>

      {/* toast loading */}
      <Area title="Toast Loading">
        <div class="row">
          <div class="col-50">
            <Button fill big onclick={_ => toast('toast 123')}>Toast</Button>
          </div>
          <div class="col-50">
            <Button fill big onclick={_ => {
              loading(true)
              setTimeout(() => loading(false), 1500)
            }}>Loading show</Button>
          </div>
        </div>
      </Area>
    </div>
  )
}

const PickerArea = (props) => (state, actions) => {
  const pickerData = [
    [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
      { label: 'c', value: 'c' },
      { label: 'd', value: 'd' },
      { label: 'e', value: 'e' },
      { label: 'f', value: 'f' },
      { label: 'g', value: 'g' }
    ], [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
      { label: 'c', value: 'c' },
      { label: 'd', value: 'd' },
      { label: 'e', value: 'e' },
      { label: 'f', value: 'f' },
      { label: 'g', value: 'g' }
    ]
  ]

  return !props.hidden && (
    <div>
      {/* picker-view */}
      < Area title="picker view" >
        <div class="picker-container">
          <PickerView
            data={pickerData}
            value={['c', 'f']}
            onColChange={_ => console.log('>>>>>>')}
          />
        </div>
      </Area >

      {/* picker 1 */}
      < div class="area" >
        <Picker
          data={pickerData}
          value={state.picker}
          // onColChange={_ => console.log('->->->->', _)}
          onChange={values => actions.onPickerChange(values)}
        >
          <Button>Picker</Button>
        </Picker>
      </div >

      {/* picker 2 */}
      < div class="area" >
        <Picker
          data={pickerData}
          value={state.picker2}
          // onColChange={_ => console.log('->->->->', _)}
          onChange={values => actions.onPickerChange2(values)}
        >
          <Button>Picker2</Button>
        </Picker>
      </div >
    </div>
  )
}

const mocker = {
  next: () => {
    let m = []
    for (let i = 0; i < 15; i++) {
      m.push(Math.random() * 1000)
    }

    return m
  }
}

const PullToRefreshArea = (props) => (state, actions) => {
  return !props.hidden && (
    <Area title="Pull to Refresh">
      <div className="mock-container">
        <PullToRefresh
          oncreate={el => { actions.appendMocks(mocker.next()) }}
          loading={state.loading}
          toggleLoading={actions.toggleLoading}
          onRefresh={done => actions.resetMocks(mocker.next())}
          onInfinite={(start, end) => {
            start()
            setTimeout(() => {
              actions.appendMocks(mocker.next())
              end()
            }, 1000)
          }}
        >
          <List whiteBg margins="mt0">
            {state.mocks.map(t => <Item>{t}</Item>)}
          </List>
        </PullToRefresh>
      </div>
    </Area>
  )
}

const view = (state, actions) => {
  window.$demo = { state, actions }

  return (
    <Page>
      <Navbar>demo</Navbar>
      <PageContent>

        {/* button */}
        <ButtonArea hidden />

        <ModalArea hidden />

        <PickerArea hidden />

        {/* list form */}
        <Area title="list form">
          <List whiteBg margins="mt10">
            <Checkbox title="check box" checked={state.checked} onCheckChange={actions.toggleCheckBox} />
            <Radio title="radio box 1" name="radio" value="radio1" checked={state.radio === 'radio1'} onCheckChange={actions.toggleRadio} />
            <Radio title="radio box 2" name="radio" value="radio2" checked={state.radio === 'radio2'} onCheckChange={actions.toggleRadio} />
            <InputItem title="input item" value={state.input} onValueChange={actions.input} />
          </List>
        </Area>

        <PullToRefreshArea />

      </PageContent>
    </Page>
  )
}

export default function () {
  app(state, actions, view, document.getElementById('InitPageContainer'))
}

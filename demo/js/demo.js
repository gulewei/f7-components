/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import {
  Button,
  CheckBox,
  PageContent,
  Navbar,
  ListBlock,
  PickerView,
  alert, confirm, dialog, setDialog,
  toast, setToast,
  loading
} from '@module/f7-components'
import '../style.css'

const state = {
  checked: false
}

const actions = {
  toggleCheckBox (checked) {
    return { checked }
  }
}

const view = (state, actions) => {
  return (
    <div className="page">
      <Navbar center='demo' />
      <PageContent>
        <div className="area" style={{ display: 'none' }}>
          <p>Buttons</p>
          <Button >button default</Button><br />
          <Button fill round >button fill & round</Button> <br />
          <Button big text='button big' /> <br />
          <Button disabled fill>button fill & disabled</Button> <br />
        </div>

        <div className="area" style={{ display: 'none' }}>
          <p>Dialogs</p>
          <div class="row">
            <div class="col-50">
              <Button fill big onclick={_ => alert('alert 123')}>Alert</Button>
            </div>
            <div class="col-50">
              <Button fill big onclick={_ => confirm('confrim 123')}>Confrim</Button>
            </div>
          </div>
        </div>

        <div className="area">
          <p>Toast</p>
          <div class="row">
            <div class="col-50">
              <Button fill big onclick={_ => toast('toast 123')}>Alert</Button>
            </div>
            <div class="col-50">
              <Button fill big onclick={_ => toast('toast 456')}>Confrim</Button>
            </div>
          </div>
        </div>

        <div className="area">
          <p>Toast</p>
          <div class="row">
            <div class="col-50">
              <Button fill big onclick={_ => {
                loading(true)
                setTimeout(() => loading(false), 1500)
              }}>Loading show</Button>
            </div>
          </div>
        </div>

        <div className="area">
          <div className="picker-container">
            <PickerView data={[[
              { label: 'a' },
              { label: 'b' },
              { label: 'c' },
              { label: 'd' },
              { label: 'e' },
              { label: 'f' },
              { label: 'g' }
            ]]} />
          </div>
        </div>

        <ListBlock whiteBg>
          <CheckBox title="check box" checked={state.checked} onchange={actions.toggleCheckBox} />
        </ListBlock>
      </PageContent>
    </div>
  )
}

export default function () {
  app(state, actions, view, document.getElementById('InitPageContainer'))
}

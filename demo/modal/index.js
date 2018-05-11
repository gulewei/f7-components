/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import Page from '../../src/components/page'
import Mask from '../../src/components/mask'
import ContentBlock from '../../src/components/content-block'
import Preloader from '../../src/components/preloader'
import modals from '../../src/plugins/modals'
import toast from '../../src/plugins/toast'
import loading from '../../src/plugins/loading'

window.$loading = loading

app(
  {
    masker: {
      show: false
    }
  },
  {
    masker: {
      show: show => ({ show })
    }
  },
  (state, actions) => {
    window.$modal = { state, actions }

    return (
      <Page>
        <ContentBlock
          title="Predefined Modals"
        >
          <p onclick={e => modals.alert('Here goes alert text')}>
            <a>Alert With Text</a>
          </p>

          <p onclick={e => modals.alert('Here goes alert text', 'Custom Title!')}>
            <a>Alert With Text and Title</a>
          </p>

          <p onclick={e => {
            modals.confirm('Are you sure?', () => {
              console.log('You clicked Ok button')
            })
          }}>
            <a>Confirm with text and Ok callback</a>
          </p>

          <p onclick={e => {
            modals.confirm('Are you sure?',
              () => console.log('You clicked Ok button'),
              () => console.log('You clicked Cancel button')
            )
          }}>
            <a>Confirm with text, Ok and Cancel callbacks</a>
          </p>

          <p onclick={e => {
            modals.dialog(
              'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
              'Modal with 3 buttons',
              [
                { text: 'B1', onclick: () => console.log('You clicked first button!') },
                { text: 'B2', onclick: () => console.log('You clicked second button!') },
                { text: 'B3', onclick: () => console.log('You clicked third button!') }
              ]
            )
          }}>
            <a>Modal With 3 Buttons</a>
          </p>

          <p onclick={e => {
            modals.custom({
              text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
              title: 'Vertical Buttons Layout',
              verticalButtons: true,
              buttons: [
                { text: 'B1', onclick: () => console.log('You clicked first button!') },
                { text: 'B2', onclick: () => console.log('You clicked second button!') },
                { text: 'B3', onclick: () => console.log('You clicked third button!') }
              ]
            })
          }}>
            <a>Modal With Vertical Buttons</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Toast">
          <p onclick={e => toast(`It's a toast`)}>
            <a>Toast</a>
          </p>

          <p onclick={e => toast(`It's a 2s toast`, 2000)}>
            <a>Toast with 2s duration</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Mask">
          <p onclick={e => actions.masker.show(true)}>
            <a>Mask</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Preloader">
          <Preloader />
        </ContentBlock>

        <ContentBlock title="Loading">
          <p onclick={e => {
            loading.show()
            setTimeout(() => loading.hide(), 2000)
          }}
          ><a>loading</a></p>
        </ContentBlock>

        <Mask
          // key="mask"
          show={state.masker.show}
          onclick={e => actions.masker.show(false)}
        ></Mask>

      </Page >
    )
  },
  document.body
)

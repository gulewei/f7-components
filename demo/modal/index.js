/* eslint-disable no-unused-vars */
import { h, app } from 'hyperapp'
import { Page, ContentBlock, Preloader, Overlay, Toast, Loading, Dialog } from '../../src'
import '../../src/index.less'

app(
  {
    overlay: {
      show: false
    }
  },
  {
    overlay: {
      show: show => ({ show })
    }
  },
  (state, actions) => {
    window.$_modal = { state, actions }

    return (
      <Page
        outside={[
          state.overlay.show && <Overlay key="overlay" onOverlayClick={() => actions.overlay.show(false)} />
        ]}
      >
        <ContentBlock title="Predefined Modals">
          <p onclick={e => {
            Dialog.alert('Here goes alert text')
          }}>
            <a>Alert With Text</a>
          </p>
          <p onclick={e => {
            Dialog.alert('Here goes alert text', 'Custom Title!')
          }}>
            <a>Alert With Text and Title</a>
          </p>
          <p onclick={e => {
            Dialog.confirm('Are you sure?', () => {
              console.log('You clicked Ok button')
            })
          }}>
            <a>Confirm with text and Ok callback</a>
          </p>
          <p onclick={e => {
            Dialog.confirm('Are you sure?',
              () => console.log('You clicked Ok button'),
              () => console.log('You clicked Cancel button')
            )
          }}>
            <a>Confirm with text, Ok and Cancel callbacks</a>
          </p>
          <p onclick={e => {
            Dialog.action(
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
            Dialog.custom({
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
          <p onclick={e => {
            Toast.text(`It's a toast`)
          }}>
            <a>Toast</a>
          </p>

          <p onclick={e => {
            Toast.text(`It's a 2s toast`, 2000)
          }}>
            <a>Toast with 2s duration</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Overlay">
          <p onclick={e => actions.overlay.show(true)}>
            <a>Overlay</a>
          </p>
        </ContentBlock>

        <ContentBlock title="Preloader">
          <Preloader />
        </ContentBlock>

        <ContentBlock title="Loading">
          <p onclick={e => {
            Loading.show()
            setTimeout(() => {
              Loading.hide()
            }, 2000)
          }}
          ><a>loading</a></p>
        </ContentBlock>
      </Page >
    )
  },
  document.body
)
